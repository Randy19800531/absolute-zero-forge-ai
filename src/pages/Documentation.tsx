
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ArrowLeft, Shield, FileText, Users, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Documentation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  Documentation
                </h1>
                <p className="text-gray-600">
                  Comprehensive guides, security policies, and feature documentation
                </p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="user-manual">User Manual</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Platform Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      Absolute-0.AI is a comprehensive AI-native SaaS platform designed for workflow automation, 
                      VBA generation, and intelligent task execution. Our platform combines cutting-edge AI technology 
                      with enterprise-grade security and compliance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">AI-Powered Automation</h4>
                        <p className="text-sm text-blue-700">
                          Leverage advanced AI engines for intelligent task execution and workflow automation.
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Enterprise Security</h4>
                        <p className="text-sm text-green-700">
                          SOC 2, ISO 27001, and GDPR compliant with end-to-end encryption.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Engine</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Voice + personality engine with context-aware conversation memory and intelligent agent routing.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Context-aware conversations</li>
                        <li>• Intelligent agent routing</li>
                        <li>• Voice and personality customization</li>
                        <li>• Memory retention across sessions</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Visual Workflows</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Drag-and-drop workflow builder with AI-enhanced nodes and visual execution logs.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Drag-and-drop interface</li>
                        <li>• AI-enhanced nodes</li>
                        <li>• Nested subflows</li>
                        <li>• Visual execution tracking</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>VBA Generator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        AI-powered Excel automation with smart form generation and pattern recognition.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Smart form generation</li>
                        <li>• Pattern recognition</li>
                        <li>• Template export</li>
                        <li>• Excel automation</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Agency Workspace</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Complete project management with requirements forms and dynamic pricing.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Project management</li>
                        <li>• Requirements forms</li>
                        <li>• Dynamic pricing</li>
                        <li>• Developer AI assistant</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security & Compliance Policies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">SOC 2 Compliance</h4>
                        <p className="text-sm text-red-700">
                          Service Organization Control 2 certification ensuring data security and availability.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">ISO 27001</h4>
                        <p className="text-sm text-blue-700">
                          International standard for information security management systems.
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">GDPR Compliant</h4>
                        <p className="text-sm text-green-700">
                          Full compliance with General Data Protection Regulation requirements.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Security Measures</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• End-to-end encryption for all data transmission</li>
                        <li>• Comprehensive audit logging and monitoring</li>
                        <li>• Regular security assessments and penetration testing</li>
                        <li>• Multi-factor authentication (MFA) support</li>
                        <li>• Role-based access control (RBAC)</li>
                        <li>• Data encryption at rest and in transit</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="user-manual" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Manual
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Getting Started</h4>
                      <ol className="space-y-2 text-gray-600 list-decimal list-inside">
                        <li>Navigate to the dashboard to see an overview of your workspace</li>
                        <li>Use Quick Actions to create workflows, generate VBA, or deploy AI agents</li>
                        <li>Access feature-specific tools through the sidebar navigation</li>
                        <li>Monitor activity and progress through the Recent Activity panel</li>
                      </ol>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Navigation Guide</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-1">Dashboard</h5>
                          <p className="text-sm text-gray-600">Central hub with stats, quick actions, and recent activity</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-1">AI Engine</h5>
                          <p className="text-sm text-gray-600">Create and manage AI agents with custom personalities</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-1">Workflows</h5>
                          <p className="text-sm text-gray-600">Build automation workflows with drag-and-drop interface</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-1">VBA Generator</h5>
                          <p className="text-sm text-gray-600">Generate Excel macros using AI-powered tools</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Best Practices</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Regularly save your work and use version control</li>
                        <li>• Test workflows in a safe environment before deployment</li>
                        <li>• Keep security credentials secure and rotate them regularly</li>
                        <li>• Monitor system performance and resource usage</li>
                        <li>• Stay updated with platform features and security updates</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
