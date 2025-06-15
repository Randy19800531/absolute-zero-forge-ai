
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Brain, Workflow, Code, Building2, Zap, Palette, Shield, BookOpen } from 'lucide-react';

const UserManualTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Complete User Manual
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">🚀 Getting Started Guide</h4>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="space-y-3 text-gray-700">
                <li><strong>1. Account Setup:</strong> Create your account and complete email verification</li>
                <li><strong>2. Profile Configuration:</strong> Set up your organization details and preferences</li>
                <li><strong>3. Dashboard Overview:</strong> Familiarize yourself with the main dashboard layout</li>
                <li><strong>4. Quick Actions:</strong> Use the Quick Actions panel to create your first workflow</li>
                <li><strong>5. Feature Exploration:</strong> Navigate through each feature using the sidebar menu</li>
                <li><strong>6. Integration Setup:</strong> Connect your external applications and services</li>
                <li><strong>7. Team Collaboration:</strong> Invite team members and set up permissions</li>
              </ol>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">🔗 Essential Integrations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-purple-50 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <h5 className="font-semibold text-purple-900">GitHub Integration</h5>
                </div>
                <p className="text-sm text-purple-700 mb-3">
                  Connect your project to GitHub for version control, collaboration, and deployment workflows.
                </p>
                <ul className="text-xs text-purple-600 space-y-1 mb-3">
                  <li>• Bidirectional sync between Lovable and GitHub</li>
                  <li>• Automatic commits and version tracking</li>
                  <li>• Branch management and pull requests</li>
                  <li>• CI/CD pipeline integration</li>
                  <li>• Self-hosting deployment options</li>
                </ul>
                <div className="text-xs text-purple-600">
                  <strong>Setup:</strong> Click GitHub button → Authorize → Create Repository
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <h5 className="font-semibold text-green-900">Supabase Backend</h5>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Enable powerful backend functionality with authentication, databases, and APIs.
                </p>
                <ul className="text-xs text-green-600 space-y-1 mb-3">
                  <li>• User authentication and session management</li>
                  <li>• PostgreSQL database with real-time features</li>
                  <li>• Edge functions for serverless computing</li>
                  <li>• Secure API key and secrets management</li>
                  <li>• File storage and CDN capabilities</li>
                </ul>
                <div className="text-xs text-green-600">
                  <strong>Setup:</strong> Click Supabase button → Connect Account → Configure Project
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">🧭 Detailed Navigation Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <h5 className="font-medium">AI Engine</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Create and manage AI agents with custom personalities</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Agent creation wizard</li>
                    <li>• Personality configuration</li>
                    <li>• Training data management</li>
                    <li>• Performance analytics</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Workflow className="h-4 w-4 text-green-600" />
                    <h5 className="font-medium">Visual Workflows</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Build automation workflows with drag-and-drop interface</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Canvas workspace</li>
                    <li>• Node library and tools</li>
                    <li>• Execution monitoring</li>
                    <li>• Version control</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4 text-purple-600" />
                    <h5 className="font-medium">VBA Generator</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Generate Excel macros using AI-powered tools</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Requirements input form</li>
                    <li>• Code generation engine</li>
                    <li>• Template library</li>
                    <li>• Export and deployment</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-orange-600" />
                    <h5 className="font-medium">Agency Workspace</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Manage projects with intelligent requirements gathering</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Project dashboard</li>
                    <li>• Client portal</li>
                    <li>• Pricing calculator</li>
                    <li>• Resource management</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-indigo-600" />
                    <h5 className="font-medium">Integrations</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Connect external services and applications</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Integration marketplace</li>
                    <li>• Connection manager</li>
                    <li>• API configuration</li>
                    <li>• Sync monitoring</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="h-4 w-4 text-pink-600" />
                    <h5 className="font-medium">Theme Customizer</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Personalize workspace appearance and layout</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Color scheme editor</li>
                    <li>• Layout preferences</li>
                    <li>• Font customization</li>
                    <li>• Preview and apply</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-red-600" />
                    <h5 className="font-medium">Admin Portal</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Manage security, compliance, and system settings</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• User management</li>
                    <li>• Security settings</li>
                    <li>• Audit logs</li>
                    <li>• System monitoring</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <h5 className="font-medium">Documentation</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Access guides, tutorials, and support resources</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Feature documentation</li>
                    <li>• Video tutorials</li>
                    <li>• API reference</li>
                    <li>• Support tickets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">💡 Best Practices & Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Workflow Design</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Start simple and iterate incrementally</li>
                  <li>• Use descriptive names for nodes and variables</li>
                  <li>• Implement proper error handling</li>
                  <li>• Test in staging before production deployment</li>
                  <li>• Document complex logic and decisions</li>
                  <li>• Monitor performance and optimize regularly</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Security & Maintenance</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Enable MFA for all team members</li>
                  <li>• Regularly review and rotate API keys</li>
                  <li>• Keep integrations updated and monitored</li>
                  <li>• Backup critical workflows and data</li>
                  <li>• Follow principle of least privilege</li>
                  <li>• Stay updated with platform features</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">🔧 Integration Best Practices</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">GitHub Workflow</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Connect GitHub early in your project</li>
                  <li>• Use meaningful commit messages</li>
                  <li>• Create feature branches for major changes</li>
                  <li>• Set up automated testing and deployment</li>
                  <li>• Review changes through pull requests</li>
                  <li>• Keep your repository documentation updated</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Supabase Backend</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Set up authentication before other features</li>
                  <li>• Design your database schema carefully</li>
                  <li>• Use Row Level Security (RLS) policies</li>
                  <li>• Store sensitive data in Supabase secrets</li>
                  <li>• Monitor database performance and usage</li>
                  <li>• Implement proper error handling</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">🆘 Troubleshooting Guide</h4>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h5 className="font-medium text-yellow-800 mb-2">Common Issues & Solutions</h5>
                <div className="space-y-2 text-sm text-yellow-700">
                  <p><strong>Workflow not executing:</strong> Check trigger conditions and node connections</p>
                  <p><strong>Integration failures:</strong> Verify API credentials and endpoint availability</p>
                  <p><strong>Performance issues:</strong> Review workflow complexity and data volume</p>
                  <p><strong>Authentication problems:</strong> Clear browser cache and re-authenticate</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">Getting Help</h5>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>• Check our comprehensive FAQ section</p>
                  <p>• Submit support tickets through the admin portal</p>
                  <p>• Join our community forum for peer support</p>
                  <p>• Schedule one-on-one training sessions</p>
                  <p>• Access video tutorials and documentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManualTab;
