
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Play, Settings, TestTube } from 'lucide-react';

const UserManualTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-blue-600" />
            Getting Started Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start - 5 Minutes to Your First Automation</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                <div>
                  <h4 className="font-medium text-gray-900">Account Setup & Authentication</h4>
                  <p className="text-sm text-gray-600 mt-1">Create your account and verify your email. Enable two-factor authentication for enhanced security.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                <div>
                  <h4 className="font-medium text-gray-900">Configure AI Providers</h4>
                  <p className="text-sm text-gray-600 mt-1">Navigate to LLM Configuration and connect your preferred AI providers (OpenAI, Claude, Gemini, etc.) by adding API keys.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <div>
                  <h4 className="font-medium text-gray-900">Create Your First Workflow</h4>
                  <p className="text-sm text-gray-600 mt-1">Use the Visual Workflow Builder to create your first automation. Start with a simple template and customize as needed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                <div>
                  <h4 className="font-medium text-gray-900">Test & Deploy</h4>
                  <p className="text-sm text-gray-600 mt-1">Use the AI-powered testing suite to validate your automation before deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-purple-600" />
            AI-Powered Testing Suite Manual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Creating and Managing Test Cases</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">📝 Natural Language Test Creation</h4>
                <p className="text-sm text-gray-600 mb-2">Use the AI-powered test builder to create comprehensive test cases using natural language:</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Describe your test scenario in plain English</li>
                  <li>• AI automatically generates test steps and assertions</li>
                  <li>• Review and customize generated test cases</li>
                  <li>• Add custom validation points and data sources</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🎯 Test Execution & Environments</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <strong>Development:</strong> Quick validation with minimal setup</li>
                  <li>• <strong>UAT:</strong> User acceptance testing with realistic data</li>
                  <li>• <strong>Production:</strong> Full-scale testing with production-like conditions</li>
                  <li>• Configure environment-specific settings and data sources</li>
                  <li>• Set up automated scheduling for regular test runs</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">🤖 AI Quality Assessment</h4>
                <p className="text-sm text-gray-600 mb-2">The AI continuously evaluates your application's readiness for deployment:</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <strong>Quality Score:</strong> Overall health rating (0-100)</li>
                  <li>• <strong>Risk Analysis:</strong> Potential issues and their impact</li>
                  <li>• <strong>Coverage Analysis:</strong> Test coverage gaps and recommendations</li>
                  <li>• <strong>Performance Benchmarks:</strong> Response times and resource usage</li>
                  <li>• <strong>Deployment Readiness:</strong> Go/No-go recommendations with reasoning</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">📊 Test Management Best Practices</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Organize tests into logical suites and categories</li>
                  <li>• Use version control for test case management</li>
                  <li>• Implement data-driven testing for comprehensive coverage</li>
                  <li>• Set up notifications for test failures and quality thresholds</li>
                  <li>• Regular review and maintenance of test cases</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-green-600" />
            Workflow Automation Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Building Your First Workflow</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🎨 Visual Builder Interface</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Drag nodes from the library onto the canvas</li>
                  <li>• Connect nodes to create logical flow sequences</li>
                  <li>• Configure each node's properties and parameters</li>
                  <li>• Use conditional branching for complex logic</li>
                  <li>• Test individual nodes before full workflow execution</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">⚙️ Node Types and Configuration</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <strong>Trigger Nodes:</strong> Start workflows (schedule, webhook, manual)</li>
                  <li>• <strong>Action Nodes:</strong> Perform operations (API calls, data processing)</li>
                  <li>• <strong>Logic Nodes:</strong> Control flow (conditions, loops, delays)</li>
                  <li>• <strong>Integration Nodes:</strong> Connect external services</li>
                  <li>• <strong>Output Nodes:</strong> Send results (email, notifications, files)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🔄 Error Handling and Monitoring</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Set up retry policies for failed operations</li>
                  <li>• Configure error notifications and alerts</li>
                  <li>• Monitor workflow execution in real-time</li>
                  <li>• Review execution logs and performance metrics</li>
                  <li>• Use AI insights for workflow optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            Advanced Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">LLM Provider Configuration</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🔑 API Key Management</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Securely store API keys with encryption</li>
                  <li>• Configure multiple providers for redundancy</li>
                  <li>• Set usage limits and cost controls</li>
                  <li>• Monitor API usage and performance</li>
                  <li>• Implement failover strategies</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🎯 Function Allocation</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Assign specific functions to optimal AI providers</li>
                  <li>• Configure load balancing across providers</li>
                  <li>• Set quality and performance preferences</li>
                  <li>• Monitor function-specific performance metrics</li>
                  <li>• Implement custom routing rules</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">🔐 Security Settings</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Enable session locking for sensitive operations</li>
                  <li>• Configure admin password requirements</li>
                  <li>• Set up audit logging for all changes</li>
                  <li>• Implement role-based access controls</li>
                  <li>• Regular security assessment and updates</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManualTab;
