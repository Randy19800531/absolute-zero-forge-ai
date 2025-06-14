
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Shield, Clock, Zap } from 'lucide-react';

const PricingSection = () => {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for individuals and small teams getting started',
      features: [
        'Up to 5 AI workflows',
        '50 VBA script generations/month',
        'Basic LLM integrations (GPT-4o)',
        'Standard support',
        '5GB storage',
        'Basic analytics'
      ],
      buttonText: 'Start Free Trial',
      popular: false,
      color: 'border-gray-200'
    },
    {
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
        'Team collaboration tools'
      ],
      buttonText: 'Subscribe Now',
      popular: true,
      color: 'border-blue-500'
    },
    {
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
        'API access'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'border-purple-500'
    }
  ];

  const handleSubscribe = (planName: string) => {
    console.log(`Subscribing to ${planName} plan`);
    // TODO: Integrate with Stripe checkout
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Scale your AI automation with flexible pricing options designed for teams of all sizes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative ${plan.color} ${plan.popular ? 'border-2 shadow-lg scale-105' : 'border'} transition-all duration-300 hover:shadow-lg`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Most Popular
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
                className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => handleSubscribe(plan.name)}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Pricing Info */}
      <div className="text-center mt-8 space-y-4">
        <p className="text-gray-600">
          All plans include 14-day free trial • No setup fees • Cancel anytime
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
