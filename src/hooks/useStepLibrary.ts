
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
      
      // Convert the database records to our TypeScript interface
      const convertedSteps: StepLibraryItem[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        type: item.type as 'click' | 'type' | 'assert' | 'wait' | 'navigate' | 'select' | 'hover',
        description: item.description,
        parameters: (item.parameters as any) || {},
        icon: item.icon,
        is_custom: item.is_custom || false,
        user_id: item.user_id,
        created_at: item.created_at
      }));
      
      setSteps(convertedSteps);
    } catch (error) {
      console.error('Error fetching step library:', error);
    } finally {
      setLoading(false);
    }
  };

  return { steps, loading, refetch: fetchSteps };
};
