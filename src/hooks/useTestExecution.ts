
import { useState } from 'react';
import { TestCase, TestRun } from '@/types/testing';
import { testExecutionService } from '@/services/testExecutionService';
import { useToast } from '@/hooks/use-toast';

export const useTestExecution = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentExecution, setCurrentExecution] = useState<TestRun | null>(null);
  const { toast } = useToast();

  const executeTest = async (testCase: TestCase, environment: 'dev' | 'uat' | 'prod' = 'dev') => {
    setIsExecuting(true);
    
    try {
      toast({
        title: "Test Execution Started",
        description: `Running "${testCase.name}" in ${environment} environment`,
      });

      const result = await testExecutionService.executeTestCase(testCase, environment);
      setCurrentExecution(result);

      toast({
        title: result.status === 'passed' ? "Test Passed" : "Test Failed",
        description: `"${testCase.name}" execution completed`,
        variant: result.status === 'passed' ? 'default' : 'destructive'
      });

      return result;
    } catch (error) {
      console.error('Test execution error:', error);
      toast({
        title: "Test Execution Error",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive'
      });
      throw error;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    executeTest,
    isExecuting,
    currentExecution,
    setCurrentExecution
  };
};
