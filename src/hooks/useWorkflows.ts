
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Workflow {
  id: string;
  name: string;
  description: string;
  user_id: string;
  team_id?: string;
  status: 'draft' | 'in_progress' | 'completed' | 'failed';
  requirements: any;
  generated_code?: string;
  created_at: string;
  updated_at: string;
}

export const useWorkflows = () => {
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchWorkflows();
    }
  }, [user]);

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkflows(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createWorkflow = async (workflow: Partial<Workflow>) => {
    try {
      const { data, error } = await supabase
        .from('workflows')
        .insert({
          name: workflow.name!,
          description: workflow.description,
          requirements: workflow.requirements,
          user_id: user?.id!
        })
        .select()
        .single();

      if (error) throw error;
      setWorkflows(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workflow');
      throw err;
    }
  };

  const updateWorkflow = async (id: string, updates: Partial<Workflow>) => {
    try {
      const { data, error } = await supabase
        .from('workflows')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setWorkflows(prev => prev.map(w => w.id === id ? data : w));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workflow');
      throw err;
    }
  };

  const deleteWorkflow = async (id: string) => {
    try {
      const { error } = await supabase
        .from('workflows')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setWorkflows(prev => prev.filter(w => w.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workflow');
      throw err;
    }
  };

  return {
    workflows,
    loading,
    error,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    refetch: fetchWorkflows
  };
};
