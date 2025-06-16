
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PricingSettings {
  enabled: boolean;
}

export const usePricingSettings = () => {
  const [pricingEnabled, setPricingEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPricingSettings = async () => {
      try {
        setError(null);
        const { data, error: fetchError } = await supabase
          .from('app_settings')
          .select('setting_value')
          .eq('setting_key', 'pricing_enabled')
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching pricing settings:', fetchError);
          setError('Failed to fetch pricing settings');
        } else {
          const settings = data?.setting_value as unknown as PricingSettings;
          setPricingEnabled(settings?.enabled ?? true);
        }
      } catch (error) {
        console.error('Error fetching pricing settings:', error);
        setError('Failed to fetch pricing settings');
      } finally {
        setLoading(false);
      }
    };

    fetchPricingSettings();
  }, []);

  const updatePricingEnabled = async (enabled: boolean) => {
    try {
      setError(null);
      
      // Check if user has the required permissions
      const { data: userRoles, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (roleError) {
        console.error('Error checking user roles:', roleError);
        setError('Permission check failed');
        return false;
      }

      const hasAdminRole = userRoles?.some(ur => ur.role === 'admin' || ur.role === 'superuser');
      if (!hasAdminRole) {
        setError('You need admin or superuser privileges to modify pricing settings');
        return false;
      }

      const { error: updateError } = await supabase
        .from('app_settings')
        .upsert({ 
          setting_key: 'pricing_enabled',
          setting_value: { enabled },
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'setting_key' 
        });

      if (updateError) {
        console.error('Error updating pricing settings:', updateError);
        if (updateError.code === '42501') {
          setError('Insufficient permissions. You need admin or superuser privileges to modify pricing settings.');
        } else {
          setError('Failed to update pricing settings');
        }
        return false;
      }

      setPricingEnabled(enabled);
      return true;
    } catch (error) {
      console.error('Error updating pricing settings:', error);
      setError('Failed to update pricing settings');
      return false;
    }
  };

  return { pricingEnabled, loading, error, updatePricingEnabled };
};
