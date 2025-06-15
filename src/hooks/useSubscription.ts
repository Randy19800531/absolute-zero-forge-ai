
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface SubscriptionStatus {
  subscribed: boolean;
  subscription_tier?: string | null;
  subscription_end?: string | null;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null
  });
  const [loading, setLoading] = useState(false);

  const checkSubscription = async () => {
    if (!user) {
      console.log('No user found, setting unsubscribed state');
      setSubscriptionStatus({ subscribed: false, subscription_tier: null, subscription_end: null });
      return;
    }

    setLoading(true);
    try {
      console.log('Starting subscription check for user:', user.email);

      const session = await supabase.auth.getSession();
      if (!session.data.session?.access_token) {
        console.error('No valid session found');
        throw new Error('No valid session found');
      }

      console.log('Session found, calling check-subscription function');

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
      });

      if (error) {
        console.error('Subscription check error details:', {
          message: error.message,
          context: error.context,
          details: error.details
        });
        
        // More specific error handling for PayFast
        if (error.message?.includes('PayFast credentials')) {
          toast({
            title: "Configuration Error",
            description: "PayFast integration needs to be configured. Please contact support or check your PayFast settings.",
            variant: "destructive",
          });
        } else if (error.message?.includes('Authentication error')) {
          console.log('Authentication error, user may need to log in again');
          toast({
            title: "Authentication Required",
            description: "Please log out and log back in to refresh your session.",
            variant: "destructive",
          });
        } else if (error.message?.includes('Function not found')) {
          toast({
            title: "Service Error",
            description: "Subscription service is not available. Please try again later.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Subscription Check Failed",
            description: `Error: ${error.message || 'Unknown error occurred'}`,
            variant: "destructive",
          });
        }
        throw error;
      }

      console.log('Subscription check successful:', data);

      setSubscriptionStatus({
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier,
        subscription_end: data.subscription_end
      });
    } catch (error) {
      console.error('Error in checkSubscription:', error);
      setSubscriptionStatus({ subscribed: false, subscription_tier: null, subscription_end: null });
      
      // Only show generic error toast if we haven't already shown a specific one
      if (error instanceof Error && !error.message.includes('No valid session')) {
        console.log('Showing generic error toast');
      }
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (plan: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive",
      });
      return;
    }

    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session?.access_token) {
        throw new Error('No valid session found');
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan },
        headers: {
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
      });

      if (error) throw error;

      // For PayFast, we get HTML that redirects to PayFast
      // Create a temporary window to handle the redirect
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(data);
        newWindow.document.close();
      } else {
        toast({
          title: "Popup Blocked",
          description: "Please allow popups for this site to complete payment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openCustomerPortal = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to manage your subscription.",
        variant: "destructive",
      });
      return;
    }

    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session?.access_token) {
        throw new Error('No valid session found');
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
      });

      if (error) throw error;

      // Open subscription management page
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkSubscription();

    // Auto-refresh every 30 seconds when user is active
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        checkSubscription();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [user]);

  return {
    subscriptionStatus,
    loading,
    checkSubscription,
    createCheckout,
    openCustomerPortal
  };
};
