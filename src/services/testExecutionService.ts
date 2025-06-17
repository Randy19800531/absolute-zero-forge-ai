
import { supabase } from '@/integrations/supabase/client';
import { TestCase, TestStep, TestRun } from '@/types/testing';

export interface TestExecutionResult {
  success: boolean;
  error?: string;
  evidence?: string[];
  actualOutput?: string;
  executionTime: number;
}

export class TestExecutionService {
  async executeTestCase(testCase: TestCase, environment: 'dev' | 'uat' | 'prod' = 'dev'): Promise<TestRun> {
    const startTime = Date.now();
    
    try {
      // Create test run record
      const { data: testRun, error: runError } = await supabase
        .from('test_runs')
        .insert({
          test_case_id: testCase.id,
          user_id: testCase.user_id,
          environment,
          status: 'running',
          started_at: new Date().toISOString(),
          triggered_by: 'manual'
        })
        .select()
        .single();

      if (runError) throw runError;

      let result: TestExecutionResult;
      
      try {
        // Execute the test steps
        result = await this.executeSteps(testCase.steps);
        
        // Update test run with results
        const { error: updateError } = await supabase
          .from('test_runs')
          .update({
            status: result.success ? 'passed' : 'failed',
            completed_at: new Date().toISOString(),
            actual_output: result.actualOutput,
            evidence_links: result.evidence || [],
            error_message: result.error
          })
          .eq('id', testRun.id);

        if (updateError) throw updateError;

      } catch (executionError) {
        // Update test run with failure
        await supabase
          .from('test_runs')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
            error_message: executionError instanceof Error ? executionError.message : 'Unknown execution error'
          })
          .eq('id', testRun.id);
        
        throw executionError;
      }

      return {
        ...testRun,
        status: result.success ? 'passed' : 'failed',
        completed_at: new Date().toISOString(),
        actual_output: result.actualOutput,
        evidence_links: result.evidence || [],
        error_message: result.error
      } as TestRun;

    } catch (error) {
      console.error('Test execution failed:', error);
      throw error;
    }
  }

  private async executeSteps(steps: TestStep[]): Promise<TestExecutionResult> {
    const startTime = Date.now();
    const evidence: string[] = [];
    let actualOutput = '';

    try {
      for (const step of steps) {
        const stepResult = await this.executeStep(step);
        actualOutput += `Step: ${step.name} - ${stepResult.success ? 'PASSED' : 'FAILED'}\n`;
        
        if (stepResult.evidence) {
          evidence.push(...stepResult.evidence);
        }
        
        if (!stepResult.success) {
          return {
            success: false,
            error: stepResult.error || `Step "${step.name}" failed`,
            evidence,
            actualOutput,
            executionTime: Date.now() - startTime
          };
        }
      }

      return {
        success: true,
        evidence,
        actualOutput,
        executionTime: Date.now() - startTime
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error during step execution',
        evidence,
        actualOutput,
        executionTime: Date.now() - startTime
      };
    }
  }

  private async executeStep(step: TestStep): Promise<TestExecutionResult> {
    const startTime = Date.now();
    
    try {
      // Simulate step execution based on type
      switch (step.type) {
        case 'navigate':
          return await this.executeNavigateStep(step);
        case 'click':
          return await this.executeClickStep(step);
        case 'type':
          return await this.executeTypeStep(step);
        case 'assert':
          return await this.executeAssertStep(step);
        case 'wait':
          return await this.executeWaitStep(step);
        case 'select':
          return await this.executeSelectStep(step);
        case 'hover':
          return await this.executeHoverStep(step);
        default:
          throw new Error(`Unknown step type: ${step.type}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown step execution error',
        executionTime: Date.now() - startTime
      };
    }
  }

  private async executeNavigateStep(step: TestStep): Promise<TestExecutionResult> {
    const startTime = Date.now();
    const url = step.parameters.url;
    
    if (!url) {
      return {
        success: false,
        error: 'Navigate step requires URL parameter',
        executionTime: Date.now() - startTime
      };
    }

    // Simulate navigation
    await this.simulateDelay(500);
    
    return {
      success: true,
      actualOutput: `Navigated to: ${url}`,
      executionTime: Date.now() - startTime
    };
  }

  private async executeClickStep(step: TestStep): Promise<TestExecutionResult> {
    const startTime = Date.now();
    const selector = step.parameters.selector;
    
    if (!selector) {
      return {
        success: false,
        error: 'Click step requires selector parameter',
        executionTime: Date.now() - startTime
      };
    }

    // Simulate click
    await this.simulateDelay(200);
    
    return {
      success: true,
      actualOutput: `Clicked element: ${selector}`,
      executionTime: Date.now() - startTime
    };
  }

  private async executeTypeStep(step: TestStep): Promise<TestExecutionResult> {
    const startTime = Date.now();
    const selector = step.parameters.selector;
    const value = step.parameters.value;
    
    if (!selector || !value) {
      return {
        success: false,
        error: 'Type step requires selector and value parameters',
        executionTime: Date.now() - startTime
      };
    }

    // Simulate typing
    await this.simulateDelay(300);
    
    return {
      success: true,
      actualOutput: `Typed "${value}" into: ${selector}`,
      executionTime: Date.now() - startTime
    };
  }

  private async executeAssertStep(step: TestStep): Promise<TestExecutionResult> {
    const startTime = Date.now();
    const selector = step.parameters.selector;
    const expected = step.parameters.expected;
    
    if (!selector || !expected) {
      return {
        success: false,
        error: 'Assert step requires selector and expected parameters',
        executionTime: Date.now() - startTime
      };
    }

    // Simulate assertion
    await this.simulateDelay(100);
    
    // For demo purposes, randomly pass/fail assertions
    const success = Math.random() > 0.2; // 80% success rate
    
    return {
      success,
      actualOutput: success ? `Assertion passed: ${expected}` : `Assertion failed: expected "${expected}"`,
      error: success ? undefined : `Expected "${expected}" but found different value`,
      executionTime: Date.now() - startTime
    };
  }

  private async executeWaitStep(step: TestStep): Promise<TestExecutionResult> {
    const startTime = Date.now();
    const duration = step.parameters.duration || 1000;
    
    await this.simulateDelay(duration);
    
    return {
      success: true,
      actualOutput: `Waited for ${duration}ms`,
      executionTime: Date.now() - startTime
    };
  }

  private async executeSelectStep(step: TestStep): Promise<TestExecutionResult> {
    const startTime = Date.now();
    const selector = step.parameters.selector;
    const value = step.parameters.value;
    
    if (!selector || !value) {
      return {
        success: false,
        error: 'Select step requires selector and value parameters',
        executionTime: Date.now() - startTime
      };
    }

    await this.simulateDelay(200);
    
    return {
      success: true,
      actualOutput: `Selected "${value}" from: ${selector}`,
      executionTime: Date.now() - startTime
    };
  }

  private async executeHoverStep(step: TestStep): Promise<TestExecutionResult> {
    const startTime = Date.now();
    const selector = step.parameters.selector;
    
    if (!selector) {
      return {
        success: false,
        error: 'Hover step requires selector parameter',
        executionTime: Date.now() - startTime
      };
    }

    await this.simulateDelay(100);
    
    return {
      success: true,
      actualOutput: `Hovered over: ${selector}`,
      executionTime: Date.now() - startTime
    };
  }

  private async simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const testExecutionService = new TestExecutionService();
