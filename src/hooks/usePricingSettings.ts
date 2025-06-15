
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePricingSettings = () => {
  const [pricingEnabled, setPricingEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('app_settings')
          .select('setting_value')
          .eq('setting_key', 'pricing_enabled')
          .single();

        if (error) {
          console.error('Error fetching pricing settings:', error);
        } else {
          setPricingEnabled(data?.setting_value?.enabled ?? true);
        }
      } catch (error) {
        console.error('Error fetching pricing settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingSettings();
  }, []);

  const updatePricingEnabled = async (enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('app_settings')
        .update({ setting_value: { enabled } })
        .eq('setting_key', 'pricing_enabled');

      if (error) {
        console.error('Error updating pricing settings:', error);
        return false;
      }

      setPricingEnabled(enabled);
      return true;
    } catch (error) {
      console.error('Error updating pricing settings:', error);
      return false;
    }
  };

  return { pricingEnabled, loading, updatePricingEnabled };
};
