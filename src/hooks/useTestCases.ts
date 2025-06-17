
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface TestCase {
  id: string;
  name: string;
  description?: string;
  category: string;
  status: string;
  steps: any[];
  assertions: any[];
  conditions: any;
  data_sources: any;
  version?: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
  user_id: string;
}

export const useTestCases = () => {
  const { user } = useAuth();
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTestCases();
    }
  }, [user]);

  const fetchTestCases = async () => {
    try {
      const { data, error } = await supabase
        .from('test_cases')
        .select('*')
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setTestCases(data || []);
    } catch (error) {
      console.error('Error fetching test cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTestCase = async (testCaseData: Partial<TestCase>) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('test_cases')
      .insert([{
        ...testCaseData,
        user_id: user.id,
        created_by: user.id
      }])
      .select()
      .single();

    if (error) throw error;
    
    setTestCases(prev => [data, ...prev]);
    return data;
  };

  const updateTestCase = async (id: string, updates: Partial<TestCase>) => {
    const { data, error } = await supabase
      .from('test_cases')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    setTestCases(prev => prev.map(tc => tc.id === id ? data : tc));
    return data;
  };

  const deleteTestCase = async (id: string) => {
    const { error } = await supabase
      .from('test_cases')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    setTestCases(prev => prev.filter(tc => tc.id !== id));
  };

  const runTestCase = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    // Create a test run record
    const { data, error } = await supabase
      .from('test_runs')
      .insert([{
        test_case_id: id,
        user_id: user.id,
        status: 'pending',
        triggered_by: 'manual'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return {
    testCases,
    loading,
    createTestCase,
    updateTestCase,
    deleteTestCase,
    runTestCase,
    refetch: fetchTestCases
  };
};
