
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StepLibraryItem } from '@/types/testing';

export const useStepLibrary = () => {
  const [steps, setSteps] = useState<StepLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    try {
      const { data, error } = await supabase
        .from('step_library')
        .select('*')
        .order('name');

      if (error) throw error;
      setSteps(data || []);
    } catch (error) {
      console.error('Error fetching step library:', error);
    } finally {
      setLoading(false);
    }
  };

  return { steps, loading, refetch: fetchSteps };
};
