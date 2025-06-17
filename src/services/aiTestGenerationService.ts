
export interface TestGenerationRequest {
  feature: string;
  userStory: string;
  acceptanceCriteria: string[];
  testType: 'functional' | 'integration' | 'performance' | 'security' | 'usability';
  complexity: 'simple' | 'medium' | 'complex';
}

export interface GeneratedTestCase {
  name: string;
  description: string;
  category: string;
  steps: TestStep[];
  assertions: string[];
  conditions: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface TestStep {
  id: string;
  action: string;
  target: string;
  value?: string;
  expected?: string;
  description: string;
}

class AITestGenerationService {
  private baseUrl = 'https://rnhtpciitjycpqqimgce.supabase.co/functions/v1';

  async generateTestCases(request: TestGenerationRequest): Promise<GeneratedTestCase[]> {
    try {
      const response = await fetch(`${this.baseUrl}/generate-tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.testCases || [];
    } catch (error) {
      console.error('Error generating test cases:', error);
      
      // Fallback: Generate mock test cases based on the request
      return this.generateMockTestCases(request);
    }
  }

  private generateMockTestCases(request: TestGenerationRequest): GeneratedTestCase[] {
    const mockTestCases: GeneratedTestCase[] = [];

    // Generate basic test case based on feature
    const basicTestCase: GeneratedTestCase = {
      name: `Test ${request.feature} - Basic Functionality`,
      description: `Verify that ${request.feature} works as expected according to user story: ${request.userStory}`,
      category: request.testType,
      priority: 'high',
      steps: [
        {
          id: '1',
          action: 'navigate',
          target: 'application',
          description: 'Navigate to the application'
        },
        {
          id: '2',
          action: 'click',
          target: `${request.feature.toLowerCase()}-button`,
          description: `Click on ${request.feature} button`
        },
        {
          id: '3',
          action: 'verify',
          target: 'result',
          expected: 'success',
          description: `Verify ${request.feature} completes successfully`
        }
      ],
      assertions: request.acceptanceCriteria.map(criteria => `Verify: ${criteria}`),
      conditions: {
        environment: 'test',
        prerequisites: [`User must have access to ${request.feature}`],
        testData: `Sample data for ${request.feature}`
      }
    };

    mockTestCases.push(basicTestCase);

    // Generate error case if complexity is medium or higher
    if (request.complexity !== 'simple') {
      const errorTestCase: GeneratedTestCase = {
        name: `Test ${request.feature} - Error Handling`,
        description: `Verify error handling for ${request.feature}`,
        category: request.testType,
        priority: 'medium',
        steps: [
          {
            id: '1',
            action: 'navigate',
            target: 'application',
            description: 'Navigate to the application'
          },
          {
            id: '2',
            action: 'input',
            target: 'invalid-data',
            value: 'invalid input',
            description: 'Enter invalid data'
          },
          {
            id: '3',
            action: 'click',
            target: `${request.feature.toLowerCase()}-button`,
            description: `Attempt to use ${request.feature} with invalid data`
          },
          {
            id: '4',
            action: 'verify',
            target: 'error-message',
            expected: 'error displayed',
            description: 'Verify appropriate error message is displayed'
          }
        ],
        assertions: ['Error message should be displayed', 'System should handle invalid input gracefully'],
        conditions: {
          environment: 'test',
          prerequisites: ['Invalid test data prepared'],
          testData: 'Invalid input samples'
        }
      };

      mockTestCases.push(errorTestCase);
    }

    // Generate performance test if complexity is complex
    if (request.complexity === 'complex') {
      const performanceTestCase: GeneratedTestCase = {
        name: `Test ${request.feature} - Performance`,
        description: `Verify performance requirements for ${request.feature}`,
        category: 'performance',
        priority: 'medium',
        steps: [
          {
            id: '1',
            action: 'setup',
            target: 'performance-monitoring',
            description: 'Setup performance monitoring'
          },
          {
            id: '2',
            action: 'execute',
            target: `${request.feature.toLowerCase()}`,
            description: `Execute ${request.feature} under load`
          },
          {
            id: '3',
            action: 'measure',
            target: 'response-time',
            expected: '< 2 seconds',
            description: 'Measure response time'
          }
        ],
        assertions: ['Response time should be less than 2 seconds', 'System should remain stable under load'],
        conditions: {
          environment: 'performance',
          prerequisites: ['Performance testing tools configured'],
          testData: 'Load testing data'
        }
      };

      mockTestCases.push(performanceTestCase);
    }

    return mockTestCases;
  }

  async optimizeTestSuite(testCases: GeneratedTestCase[]): Promise<GeneratedTestCase[]> {
    // Simple optimization: remove duplicates and sort by priority
    const uniqueTestCases = testCases.filter((testCase, index, self) =>
      index === self.findIndex(t => t.name === testCase.name)
    );

    const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
    
    return uniqueTestCases.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  async validateTestCase(testCase: GeneratedTestCase): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];

    if (!testCase.name || testCase.name.trim().length === 0) {
      issues.push('Test case name is required');
    }

    if (!testCase.steps || testCase.steps.length === 0) {
      issues.push('Test case must have at least one step');
    }

    if (!testCase.assertions || testCase.assertions.length === 0) {
      issues.push('Test case must have at least one assertion');
    }

    testCase.steps.forEach((step, index) => {
      if (!step.action) {
        issues.push(`Step ${index + 1}: Action is required`);
      }
      if (!step.target) {
        issues.push(`Step ${index + 1}: Target is required`);
      }
    });

    return {
      valid: issues.length === 0,
      issues
    };
  }
}

export const aiTestGenerationService = new AITestGenerationService();
