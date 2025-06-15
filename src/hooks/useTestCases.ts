
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { TestCase, TestStep } from '@/types/testing';

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
      
      // Convert the database records to our TypeScript interface
      const convertedTestCases: TestCase[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        steps: (item.steps as any) || [],
        conditions: (item.conditions as any) || {},
        data_sources: (item.data_sources as any) || {},
        assertions: (item.assertions as any) || [],
        status: item.status as 'draft' | 'active' | 'archived',
        version: item.version || 1,
        created_at: item.created_at,
        updated_at: item.updated_at,
        user_id: item.user_id,
        created_by: item.created_by
      }));
      
      setTestCases(convertedTestCases);
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
          name: testCase.name!,
          description: testCase.description,
          category: testCase.category || 'functional',
          steps: testCase.steps as any,
          conditions: testCase.conditions as any,
          data_sources: testCase.data_sources as any,
          assertions: testCase.assertions as any,
          user_id: user?.id!,
          created_by: user?.id!
        })
        .select()
        .single();

      if (error) throw error;
      
      // Convert and add to state
      const convertedTestCase: TestCase = {
        id: data.id,
        name: data.name,
        description: data.description,
        category: data.category,
        steps: (data.steps as any) || [],
        conditions: (data.conditions as any) || {},
        data_sources: (data.data_sources as any) || {},
        assertions: (data.assertions as any) || [],
        status: data.status as 'draft' | 'active' | 'archived',
        version: data.version || 1,
        created_at: data.created_at,
        updated_at: data.updated_at,
        user_id: data.user_id,
        created_by: data.created_by
      };
      
      setTestCases(prev => [convertedTestCase, ...prev]);
      return convertedTestCase;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create test case');
      throw err;
    }
  };

  const updateTestCase = async (id: string, updates: Partial<TestCase>) => {
    try {
      const { data, error } = await supabase
        .from('test_cases')
        .update({
          name: updates.name,
          description: updates.description,
          category: updates.category,
          steps: updates.steps as any,
          conditions: updates.conditions as any,
          data_sources: updates.data_sources as any,
          assertions: updates.assertions as any,
          status: updates.status
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Convert and update state
      const convertedTestCase: TestCase = {
        id: data.id,
        name: data.name,
        description: data.description,
        category: data.category,
        steps: (data.steps as any) || [],
        conditions: (data.conditions as any) || {},
        data_sources: (data.data_sources as any) || {},
        assertions: (data.assertions as any) || [],
        status: data.status as 'draft' | 'active' | 'archived',
        version: data.version || 1,
        created_at: data.created_at,
        updated_at: data.updated_at,
        user_id: data.user_id,
        created_by: data.created_by
      };
      
      setTestCases(prev => prev.map(tc => tc.id === id ? convertedTestCase : tc));
      return convertedTestCase;
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
