
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Sprint {
  id: string;
  name: string;
  goal?: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  project_id: string;
  start_date: string;
  end_date: string;
  capacity_hours?: number;
  actual_hours: number;
  created_at: string;
  updated_at: string;
}

export const useSprints = (projectId?: string) => {
  const { toast } = useToast();
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSprints();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('sprints-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sprints',
          filter: projectId ? `project_id=eq.${projectId}` : undefined
        },
        (payload) => {
          console.log('Sprint change received:', payload);
          fetchSprints();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  const fetchSprints = async () => {
    try {
      let query = supabase
        .from('sprints')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectId) {
        query = query.eq('project_id', projectId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSprints(data || []);
    } catch (error) {
      console.error('Error fetching sprints:', error);
      toast({
        title: "Error",
        description: "Failed to fetch sprints",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createSprint = async (sprintData: Partial<Sprint>) => {
    try {
      const { data, error } = await supabase
        .from('sprints')
        .insert(sprintData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sprint created successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error creating sprint:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSprint = async (id: string, updates: Partial<Sprint>) => {
    try {
      const { data, error } = await supabase
        .from('sprints')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sprint updated successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error updating sprint:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    sprints,
    loading,
    createSprint,
    updateSprint,
    refetch: fetchSprints
  };
};
