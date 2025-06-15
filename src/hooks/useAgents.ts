
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string | null;
  created_at: string;
  tasks_completed: number;
  user_id: string;
  updated_at: string;
  configuration: any;
  specialization?: 'design' | 'development' | 'testing' | 'deployment';
}

export const useAgents = () => {
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchAgents();
    }
  }, [user]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAgents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  const createAgent = async (agent: Omit<Agent, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'tasks_completed'>) => {
    try {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('ai_agents')
        .insert({
          name: agent.name,
          type: agent.type,
          description: agent.description,
          configuration: agent.configuration,
          specialization: agent.specialization as 'design' | 'development' | 'testing' | 'deployment',
          status: agent.status,
          user_id: user.id,
          tasks_completed: 0
        })
        .select()
        .single();

      if (error) throw error;
      
      setAgents(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create agent');
      throw err;
    }
  };

  const updateAgent = async (id: string, updates: Partial<Agent>) => {
    try {
      const updateData: any = { ...updates };
      if (updates.specialization) {
        updateData.specialization = updates.specialization as 'design' | 'development' | 'testing' | 'deployment';
      }

      const { data, error } = await supabase
        .from('ai_agents')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setAgents(prev => prev.map(a => a.id === id ? data : a));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update agent');
      throw err;
    }
  };

  const deleteAgent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_agents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAgents(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete agent');
      throw err;
    }
  };

  return {
    agents,
    loading,
    error,
    createAgent,
    updateAgent,
    deleteAgent,
    refetch: fetchAgents
  };
};
