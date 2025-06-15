
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { usePricingSettings } from '@/hooks/usePricingSettings';
import { DollarSign, Users, GraduationCap, Heart } from 'lucide-react';

const PricingControl = () => {
  const { pricingEnabled, loading, updatePricingEnabled } = usePricingSettings();
  const { toast } = useToast();

  const handleTogglePricing = async (enabled: boolean) => {
    const success = await updatePricingEnabled(enabled);
    if (success) {
      toast({
        title: enabled ? "Pricing Enabled" : "Pricing Disabled",
        description: enabled 
          ? "Users will now see pricing plans and be required to pay."
          : "All users now have free access to premium features.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update pricing settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Pricing Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">Enable Pricing</h3>
            <p className="text-sm text-gray-600">
              Control whether users see pricing plans or get free access
            </p>
          </div>
          <Switch
            checked={pricingEnabled}
            onCheckedChange={handleTogglePricing}
            disabled={loading}
          />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Current Status:</h4>
          {pricingEnabled ? (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">Pricing Enabled</span>
              </div>
              <p className="text-sm text-blue-600">
                Users will see pricing plans and need to subscribe for premium features.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Heart className="h-4 w-4" />
                <span className="font-medium">Free Access Enabled</span>
              </div>
              <p className="text-sm text-green-600">
                All users have free access to premium features. Perfect for students and underprivileged groups.
              </p>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Use Cases for Free Access:</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GraduationCap className="h-4 w-4" />
              <span>Educational institutions and students</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>Non-profit organizations</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Heart className="h-4 w-4" />
              <span>Underprivileged communities</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingControl;
