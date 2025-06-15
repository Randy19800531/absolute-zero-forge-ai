
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { TestCase } from '@/types/testing';

export const useTestCases = () => {
  const { user } = useAuth();
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchTestCases();
    }
  }, [user]);

  const fetchTestCases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('test_cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestCases(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createTestCase = async (testCase: Partial<TestCase>) => {
    try {
      const { data, error } = await supabase
        .from('test_cases')
        .insert({
          ...testCase,
          user_id: user?.id,
          created_by: user?.id
        })
        .select()
        .single();

      if (error) throw error;
      setTestCases(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create test case');
      throw err;
    }
  };

  const updateTestCase = async (id: string, updates: Partial<TestCase>) => {
    try {
      const { data, error } = await supabase
        .from('test_cases')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTestCases(prev => prev.map(tc => tc.id === id ? data : tc));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update test case');
      throw err;
    }
  };

  const deleteTestCase = async (id: string) => {
    try {
      const { error } = await supabase
        .from('test_cases')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTestCases(prev => prev.filter(tc => tc.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete test case');
      throw err;
    }
  };

  return {
    testCases,
    loading,
    error,
    createTestCase,
    updateTestCase,
    deleteTestCase,
    refetch: fetchTestCases
  };
};
