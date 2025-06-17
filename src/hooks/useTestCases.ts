
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { TestCase } from '@/types/testing';

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
      
      // Transform the data to ensure arrays are properly typed
      const transformedData = (data || []).map(tc => ({
        ...tc,
        steps: Array.isArray(tc.steps) ? tc.steps : [],
        assertions: Array.isArray(tc.assertions) ? tc.assertions : [],
        conditions: tc.conditions || {},
        data_sources: tc.data_sources || {}
      })) as TestCase[];
      
      setTestCases(transformedData);
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
        created_by: user.id,
        steps: testCaseData.steps || [],
        assertions: testCaseData.assertions || [],
        conditions: testCaseData.conditions || {},
        data_sources: testCaseData.data_sources || {}
      }])
      .select()
      .single();

    if (error) throw error;
    
    const transformedData = {
      ...data,
      steps: Array.isArray(data.steps) ? data.steps : [],
      assertions: Array.isArray(data.assertions) ? data.assertions : [],
      conditions: data.conditions || {},
      data_sources: data.data_sources || {}
    } as TestCase;
    
    setTestCases(prev => [transformedData, ...prev]);
    return transformedData;
  };

  const updateTestCase = async (id: string, updates: Partial<TestCase>) => {
    const { data, error } = await supabase
      .from('test_cases')
      .update({
        ...updates,
        steps: updates.steps || [],
        assertions: updates.assertions || [],
        conditions: updates.conditions || {},
        data_sources: updates.data_sources || {}
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    const transformedData = {
      ...data,
      steps: Array.isArray(data.steps) ? data.steps : [],
      assertions: Array.isArray(data.assertions) ? data.assertions : [],
      conditions: data.conditions || {},
      data_sources: data.data_sources || {}
    } as TestCase;
    
    setTestCases(prev => prev.map(tc => tc.id === id ? transformedData : tc));
    return transformedData;
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
