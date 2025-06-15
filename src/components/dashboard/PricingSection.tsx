
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Shield, Clock, Zap, Gift, Crown } from 'lucide-react';
import { usePricingSettings } from '@/hooks/usePricingSettings';
import { useSubscription } from '@/hooks/useSubscription';

const PricingSection = () => {
  const { pricingEnabled, loading } = usePricingSettings();
  const { subscriptionStatus, createCheckout, openCustomerPortal } = useSubscription();

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/forever',
      description: 'Perfect for getting started with AI automation',
      features: [
        'Up to 5 AI workflows',
        '50 VBA script generations/month',
        'Basic LLM integrations (GPT-4o)',
        'Community support',
        '5GB storage',
        'Basic analytics',
        'Apache 2.0 licensed codebase'
      ],
      buttonText: 'Start Free Now',
      popular: false,
      color: 'border-gray-200',
      highlight: 'free'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Ideal for growing businesses and professional teams',
      features: [
        'Unlimited AI workflows',
        '500 VBA script generations/month',
        'All LLM integrations (GPT-4o, Claude, Gemini)',
        'Priority support',
        '50GB storage',
        'Advanced analytics',
        'Custom integrations',
        'Team collaboration tools',
        '14-day free trial'
      ],
      buttonText: 'Start Free Trial',
      popular: true,
      color: 'border-blue-500',
      highlight: 'trial'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For large organizations with advanced requirements',
      features: [
        'Unlimited everything',
        'Custom VBA templates',
        'All LLM integrations + custom models',
        'Dedicated support manager',
        '500GB storage',
        'Custom analytics dashboard',
        'White-label options',
        'SOC 2 compliance',
        'Custom knowledge sources',
        'API access',
        'Custom SLA agreements'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'border-purple-500',
      highlight: 'enterprise'
    }
  ];

  const handleSubscribe = (planId: string) => {
    if (planId === 'free') {
      console.log('Free plan selected - no payment required');
      return;
    }
    
    if (planId === 'enterprise') {
      console.log('Contact sales for Enterprise plan');
      // TODO: Implement contact sales functionality
      return;
    }

    if (subscriptionStatus.subscribed && subscriptionStatus.subscription_tier?.toLowerCase() === planId) {
      // User already has this subscription, open customer portal
      openCustomerPortal();
    } else {
      // Create new subscription
      createCheckout(planId);
    }
  };

  const isCurrentPlan = (planId: string) => {
    if (planId === 'free' && !subscriptionStatus.subscribed) return true;
    return subscriptionStatus.subscribed && 
           subscriptionStatus.subscription_tier?.toLowerCase() === planId;
  };

  if (loading) {
    return (
      <div className="mb-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!pricingEnabled) {
    return (
      <div className="mb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Free Access for Everyone
            <span className="ml-3 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              <Gift className="h-4 w-4" />
              Community Access
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're proud to offer free access to all features for students, educators, and underprivileged communities
          </p>
        </div>

        <Card className="max-w-md mx-auto border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold">Community Access</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-900">Free</span>
              <span className="text-gray-600">/forever</span>
            </div>
            <p className="text-gray-600 mt-2">Full access to all AI automation features</p>
          </CardHeader>
          
          <CardContent className="pt-0">
            <ul className="space-y-3 mb-6">
              {[
                'Unlimited AI workflows',
                'Unlimited VBA script generation',
                'All LLM integrations',
                'Priority community support',
                'Unlimited storage',
                'Advanced analytics',
                'All premium features included'
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={() => handleSubscribe('free')}
            >
              Get Started Free
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-y-4">
          <p className="text-gray-600">
            Free access • No credit card required • Full features included
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              SOC 2 Compliant
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              99.9% Uptime
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Plan
          <span className="ml-3 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Gift className="h-4 w-4" />
            Start Free
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Begin with our generous free tier, then scale your AI automation with flexible pricing options
        </p>
        {subscriptionStatus.subscribed && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
            <div className="flex items-center gap-2 text-blue-700">
              <Crown className="h-4 w-4" />
              <span className="font-medium">
                Current Plan: {subscriptionStatus.subscription_tier}
              </span>
            </div>
            {subscriptionStatus.subscription_end && (
              <p className="text-sm text-blue-600 mt-1">
                Renews on {new Date(subscriptionStatus.subscription_end).toLocaleDateString()}
              </p>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 border-blue-300 text-blue-700 hover:bg-blue-100"
              onClick={openCustomerPortal}
            >
              Manage Subscription
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => {
          const currentPlan = isCurrentPlan(plan.id);
          return (
            <Card 
              key={plan.name} 
              className={`relative ${plan.color} ${plan.popular ? 'border-2 shadow-lg scale-105' : 'border'} ${plan.highlight === 'free' ? 'bg-gradient-to-br from-green-50 to-emerald-50' : ''} ${currentPlan ? 'ring-2 ring-blue-500' : ''} transition-all duration-300 hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {currentPlan && (
                <div className="absolute -top-3 right-4">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Current Plan
                  </div>
                </div>
              )}

              {plan.highlight === 'free' && !currentPlan && (
                <div className="absolute -top-3 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Gift className="h-3 w-3" />
                    Free Forever
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlight === 'free' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : plan.popular 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : ''
                  } ${currentPlan ? 'bg-gray-500 hover:bg-gray-600' : ''}`}
                  variant={plan.popular || plan.highlight === 'free' || currentPlan ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {currentPlan ? 'Manage Plan' : plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Pricing Info */}
      <div className="text-center mt-8 space-y-4">
        <p className="text-gray-600">
          Start free • No credit card required • 14-day premium trials • Cancel anytime
        </p>
        <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            SOC 2 Compliant
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            99.9% Uptime
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
