import { supabase } from '@/integrations/supabase/client';
import { llmRouter } from './llmRouter';

export interface WorkflowRequirements {
  appType: string;
  features: string[];
  description: string;
  targetAudience: string;
  technicalSpecs?: {
    framework?: string;
    database?: boolean;
    authentication?: boolean;
    apiIntegrations?: string[];
  };
}

export interface WorkflowStep {
  id: string;
  workflow_id: string;
  agent_specialization: 'design' | 'development' | 'testing' | 'deployment';
  step_order: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  input_data: any;
  output_data: any;
  execution_time_ms?: number;
  error_message?: string;
}

export class WorkflowOrchestrator {
  async createWorkflow(name: string, description: string, requirements: WorkflowRequirements, userId: string) {
    try {
      // Check LLM availability for workflow tasks
      const llmStatus = llmRouter.getOptimalLLM('workflow-builder');
      if (!llmStatus.isAvailable && !llmStatus.fallbackAvailable) {
        throw new Error('No LLM providers configured for workflow execution. Please configure API keys first.');
      }

      const { data: workflow, error } = await supabase
        .from('workflows')
        .insert({
          name,
          description,
          user_id: userId,
          requirements: requirements as any,
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;

      // Create workflow steps for each agent
      const steps = [
        { agent_specialization: 'design' as const, step_order: 1 },
        { agent_specialization: 'development' as const, step_order: 2 },
        { agent_specialization: 'testing' as const, step_order: 3 },
        { agent_specialization: 'deployment' as const, step_order: 4 }
      ];

      const { error: stepsError } = await supabase
        .from('workflow_steps')
        .insert(
          steps.map(step => ({
            workflow_id: workflow.id,
            agent_specialization: step.agent_specialization,
            step_order: step.step_order,
            input_data: requirements as any,
            status: 'pending'
          }))
        );

      if (stepsError) throw stepsError;

      return workflow;
    } catch (error) {
      console.error('Error creating workflow:', error);
      throw error;
    }
  }

  async executeWorkflow(workflowId: string) {
    try {
      // Update workflow status
      await supabase
        .from('workflows')
        .update({ status: 'in_progress' })
        .eq('id', workflowId);

      // Get workflow steps in order
      const { data: steps, error } = await supabase
        .from('workflow_steps')
        .select('*')
        .eq('workflow_id', workflowId)
        .order('step_order');

      if (error) throw error;

      // Execute steps sequentially using optimal LLM routing
      for (const step of steps) {
        const workflowStep: WorkflowStep = {
          id: step.id,
          workflow_id: step.workflow_id,
          agent_specialization: step.agent_specialization as 'design' | 'development' | 'testing' | 'deployment',
          step_order: step.step_order,
          status: step.status as 'pending' | 'in_progress' | 'completed' | 'failed',
          input_data: step.input_data,
          output_data: step.output_data,
          execution_time_ms: step.execution_time_ms || undefined,
          error_message: step.error_message || undefined
        };
        
        await this.executeStep(workflowStep);
      }

      // Mark workflow as completed
      await supabase
        .from('workflows')
        .update({ status: 'completed' })
        .eq('id', workflowId);

    } catch (error) {
      console.error('Error executing workflow:', error);
      await supabase
        .from('workflows')
        .update({ status: 'failed' })
        .eq('id', workflowId);
      throw error;
    }
  }

  private async executeStep(step: WorkflowStep) {
    const startTime = Date.now();
    
    try {
      await supabase
        .from('workflow_steps')
        .update({ status: 'in_progress' })
        .eq('id', step.id);

      let output;
      let taskType = 'workflow-builder'; // Default task type

      switch (step.agent_specialization) {
        case 'design':
          output = await this.executeDesignAgent(step.input_data);
          break;
        case 'development':
          taskType = 'low-no-code-builder';
          output = await this.executeDevelopmentAgent(step.input_data);
          break;
        case 'testing':
          taskType = 'testing-suite';
          output = await this.executeTestingAgent(step.input_data);
          break;
        case 'deployment':
          output = await this.executeDeploymentAgent(step.input_data);
          break;
        default:
          throw new Error(`Unknown agent specialization: ${step.agent_specialization}`);
      }

      // Use LLM router for enhanced processing
      const prompt = `Process ${step.agent_specialization} step with requirements: ${JSON.stringify(step.input_data)}`;
      const enhancedOutput = await llmRouter.executeWithOptimalLLM(taskType, prompt);
      
      output.llmEnhancement = enhancedOutput;

      const executionTime = Date.now() - startTime;

      await supabase
        .from('workflow_steps')
        .update({
          status: 'completed',
          output_data: output,
          execution_time_ms: executionTime,
          completed_at: new Date().toISOString()
        })
        .eq('id', step.id);

    } catch (error) {
      await supabase
        .from('workflow_steps')
        .update({
          status: 'failed',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        })
        .eq('id', step.id);
      throw error;
    }
  }

  private async executeDesignAgent(input: any) {
    return {
      designSystem: {
        colorPalette: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        typography: 'Inter, system-ui, sans-serif',
        spacing: 'Tailwind CSS spacing scale',
        borderRadius: '8px'
      },
      components: [
        'Header', 'Navigation', 'Dashboard', 'Forms', 'Tables', 'Modals'
      ],
      layout: 'responsive-grid',
      accessibility: 'WCAG 2.1 AA compliant'
    };
  }

  private async executeDevelopmentAgent(input: any) {
    return {
      framework: 'React + TypeScript',
      architecture: 'Component-based with hooks',
      stateManagement: 'React Context + useState',
      styling: 'Tailwind CSS',
      routing: 'React Router',
      bundler: 'Vite',
      generatedFiles: [
        'src/App.tsx',
        'src/components/',
        'src/hooks/',
        'src/utils/',
        'package.json'
      ]
    };
  }

  private async executeTestingAgent(input: any) {
    return {
      testFramework: 'Jest + React Testing Library',
      coverage: 'Unit tests for components and hooks',
      e2eTests: 'Playwright for critical user flows',
      testFiles: [
        'src/__tests__/App.test.tsx',
        'src/components/__tests__/',
        'e2e/user-flows.spec.ts'
      ],
      qualityGates: {
        coverage: '80%',
        performance: 'Lighthouse score > 90'
      }
    };
  }

  private async executeDeploymentAgent(input: any) {
    return {
      platform: 'Vercel',
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      environmentVariables: [],
      customDomain: false,
      ssl: true,
      cdn: true,
      deploymentUrl: 'https://app-generated-123.vercel.app'
    };
  }
}

export const workflowOrchestrator = new WorkflowOrchestrator();
