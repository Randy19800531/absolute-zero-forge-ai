
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ArrowLeft, Shield, FileText, Users, Settings, Brain, Workflow, Code, Building2, Zap, Palette } from 'lucide-react';
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="user-manual">User Manual</TabsTrigger>
                <TabsTrigger value="api-docs">API Docs</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Platform Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-600 text-lg">
                        Absolute-0.AI is a comprehensive AI-native SaaS platform designed for workflow automation, 
                        VBA generation, and intelligent task execution. Our platform combines cutting-edge AI technology 
                        with enterprise-grade security and compliance to deliver unparalleled automation capabilities.
                      </p>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Key Capabilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">🤖 AI-Powered Automation</h4>
                          <p className="text-sm text-blue-700">
                            Leverage advanced AI engines for intelligent task execution, natural language processing, 
                            and automated workflow generation with context-aware decision making.
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-2">🔒 Enterprise Security</h4>
                          <p className="text-sm text-green-700">
                            SOC 2 Type II, ISO 27001, and GDPR compliant with end-to-end encryption, 
                            comprehensive audit logging, and role-based access controls.
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-2">⚡ Real-time Processing</h4>
                          <p className="text-sm text-purple-700">
                            Process thousands of tasks simultaneously with our distributed computing architecture, 
                            ensuring low latency and high availability across all operations.
                          </p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <h4 className="font-semibold text-orange-900 mb-2">🔗 Universal Integration</h4>
                          <p className="text-sm text-orange-700">
                            Connect seamlessly with 500+ applications including CRM systems, databases, 
                            communication platforms, and custom APIs through our integration framework.
                          </p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Architecture Overview</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <ul className="space-y-3 text-gray-700">
                          <li><strong>Frontend Layer:</strong> React-based responsive web application with real-time updates</li>
                          <li><strong>API Gateway:</strong> RESTful and GraphQL APIs with rate limiting and authentication</li>
                          <li><strong>Processing Engine:</strong> Distributed microservices architecture with auto-scaling</li>
                          <li><strong>AI/ML Layer:</strong> Advanced neural networks for natural language understanding and generation</li>
                          <li><strong>Data Layer:</strong> Multi-region encrypted databases with automatic backups</li>
                          <li><strong>Integration Hub:</strong> Centralized connector management with real-time synchronization</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-blue-600" />
                        AI Engine - Advanced Intelligence System
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">
                        Our AI Engine is the core intelligence system that powers all automation capabilities across the platform.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">🧠 Core Capabilities</h4>
                          <ul className="space-y-1 text-sm text-gray-600 ml-4">
                            <li>• Natural Language Understanding (NLU) with 99.2% accuracy</li>
                            <li>• Context-aware conversation memory spanning multiple sessions</li>
                            <li>• Intelligent agent routing based on intent and complexity</li>
                            <li>• Multi-modal processing (text, voice, images, documents)</li>
                            <li>• Real-time sentiment analysis and emotional intelligence</li>
                            <li>• Adaptive learning from user interactions and feedback</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">🎭 Personality Engine</h4>
                          <ul className="space-y-1 text-sm text-gray-600 ml-4">
                            <li>• Customizable AI personalities with distinct communication styles</li>
                            <li>• Industry-specific knowledge bases and vocabularies</li>
                            <li>• Tone adjustment (professional, casual, technical, friendly)</li>
                            <li>• Cultural and linguistic adaptations for global deployment</li>
                            <li>• Brand voice consistency across all interactions</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Workflow className="h-5 w-5 text-green-600" />
                        Visual Workflows - Drag-and-Drop Automation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">
                        Create complex automation workflows using our intuitive visual interface with advanced execution capabilities.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">🎨 Visual Builder</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Drag-and-drop interface with 50+ pre-built nodes</li>
                            <li>• Real-time validation and error checking</li>
                            <li>• Version control and branching capabilities</li>
                            <li>• Collaborative editing with team permissions</li>
                            <li>• Template library with industry-specific workflows</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">⚙️ Advanced Features</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Nested subflows and conditional branching</li>
                            <li>• Parallel execution and synchronization points</li>
                            <li>• Error handling and retry mechanisms</li>
                            <li>• Variable passing and data transformation</li>
                            <li>• Scheduled execution and event-driven triggers</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-purple-600" />
                        VBA Generator - Excel Automation Suite
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">
                        Transform Excel spreadsheets into powerful automation tools with AI-generated VBA code and smart templates.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">📊 Code Generation</h4>
                          <ul className="space-y-1 text-sm text-gray-600 ml-4">
                            <li>• Natural language to VBA code conversion</li>
                            <li>• Pattern recognition from existing spreadsheets</li>
                            <li>• Automated macro optimization and debugging</li>
                            <li>• Cross-platform compatibility (Excel, Google Sheets)</li>
                            <li>• Code documentation and commenting</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">🔧 Smart Features</h4>
                          <ul className="space-y-1 text-sm text-gray-600 ml-4">
                            <li>• Intelligent form generation with validation</li>
                            <li>• Data import/export automation</li>
                            <li>• Report generation and formatting</li>
                            <li>• Chart creation and data visualization</li>
                            <li>• Email integration and automated reporting</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-orange-600" />
                        Agency Workspace - Project Management Hub
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">
                        Complete project management solution with intelligent requirements gathering and dynamic pricing.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">📋 Project Management</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Interactive requirements forms</li>
                            <li>• Automated project scoping</li>
                            <li>• Resource allocation and scheduling</li>
                            <li>• Progress tracking and reporting</li>
                            <li>• Client communication portal</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">💰 Smart Pricing</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Dynamic pricing based on complexity</li>
                            <li>• Market rate analysis and optimization</li>
                            <li>• Proposal generation and approval</li>
                            <li>• Invoice automation and tracking</li>
                            <li>• Revenue forecasting and analytics</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security & Compliance Framework
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">SOC 2 Type II</h4>
                        <p className="text-sm text-red-700">
                          Comprehensive controls for security, availability, processing integrity, 
                          confidentiality, and privacy with annual audits.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">ISO 27001:2013</h4>
                        <p className="text-sm text-blue-700">
                          International standard for information security management systems 
                          with continuous monitoring and improvement processes.
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">GDPR Compliant</h4>
                        <p className="text-sm text-green-700">
                          Full compliance with European data protection regulations including 
                          data portability, right to erasure, and consent management.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">🔐 Data Protection Measures</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ul className="space-y-2 text-gray-600">
                            <li>• AES-256 encryption for data at rest</li>
                            <li>• TLS 1.3 for data in transit</li>
                            <li>• Zero-knowledge architecture</li>
                            <li>• Hardware security modules (HSMs)</li>
                            <li>• Regular key rotation and management</li>
                          </ul>
                          <ul className="space-y-2 text-gray-600">
                            <li>• Multi-region data replication</li>
                            <li>• Point-in-time recovery capabilities</li>
                            <li>• Automated backup verification</li>
                            <li>• Disaster recovery testing</li>
                            <li>• Business continuity planning</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">🛡️ Access Control & Authentication</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ul className="space-y-2 text-gray-600">
                            <li>• Multi-factor authentication (MFA) required</li>
                            <li>• Single Sign-On (SSO) integration</li>
                            <li>• Role-based access control (RBAC)</li>
                            <li>• Principle of least privilege</li>
                            <li>• Session management and timeout</li>
                          </ul>
                          <ul className="space-y-2 text-gray-600">
                            <li>• API key management and rotation</li>
                            <li>• OAuth 2.0 and OpenID Connect</li>
                            <li>• IP whitelisting and geo-blocking</li>
                            <li>• Device fingerprinting</li>
                            <li>• Anomaly detection and response</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">📊 Monitoring & Compliance</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• 24/7 security operations center (SOC)</li>
                          <li>• Real-time threat detection and response</li>
                          <li>• Comprehensive audit logging (5-year retention)</li>
                          <li>• Vulnerability scanning and penetration testing</li>
                          <li>• Regular security awareness training</li>
                          <li>• Incident response and forensics capabilities</li>
                          <li>• Third-party security assessments</li>
                          <li>• Compliance reporting and documentation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="user-manual" className="space-y-6">
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
              </TabsContent>

              <TabsContent value="api-docs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      API Documentation & Integration Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">🔌 REST API Overview</h4>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                          <p className="text-sm mb-2">Base URL: <code className="text-green-400">https://api.absolute-0.ai/v1</code></p>
                          <p className="text-sm mb-2">Authentication: Bearer Token (API Key)</p>
                          <p className="text-sm">Rate Limit: 1000 requests/hour (adjustable per plan)</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">🔑 Authentication</h4>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium mb-2">API Key Generation</h5>
                            <ol className="text-sm text-gray-600 space-y-1">
                              <li>1. Navigate to Admin Portal → API Management</li>
                              <li>2. Click "Generate New API Key"</li>
                              <li>3. Set permissions and expiration date</li>
                              <li>4. Copy and securely store the generated key</li>
                            </ol>
                          </div>
                          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                            <p className="text-sm mb-2">Example Request Header:</p>
                            <code className="text-green-400">Authorization: Bearer your-api-key-here</code>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">📡 Core Endpoints</h4>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span>
                              <code className="text-sm">/workflows/execute</code>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Execute a workflow with custom parameters</p>
                            <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                              <pre>{`{
  "workflow_id": "wf_123abc",
  "parameters": {
    "input_data": "value",
    "options": {}
  }
}`}</pre>
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                              <code className="text-sm">/workflows/{id}/status</code>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Get workflow execution status and results</p>
                            <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                              <pre>{`{
  "status": "completed",
  "progress": 100,
  "result": {...},
  "execution_time": "2.3s"
}`}</pre>
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span>
                              <code className="text-sm">/ai/generate-vba</code>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Generate VBA code from natural language description</p>
                            <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                              <pre>{`{
  "description": "Create a macro to format cells",
  "requirements": {
    "excel_version": "2019",
    "complexity": "intermediate"
  }
}`}</pre>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">🔗 Webhook Integration</h4>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-700">
                              Configure webhooks to receive real-time notifications about workflow executions, 
                              system events, and integration status updates.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium mb-2">Supported Events</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• workflow.started</li>
                                <li>• workflow.completed</li>
                                <li>• workflow.failed</li>
                                <li>• integration.connected</li>
                                <li>• integration.error</li>
                                <li>• system.maintenance</li>
                              </ul>
                            </div>
                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium mb-2">Configuration</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Admin Portal → Webhooks</li>
                                <li>• Set endpoint URL</li>
                                <li>• Choose event types</li>
                                <li>• Configure retry settings</li>
                                <li>• Test webhook delivery</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">📚 SDK & Libraries</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border rounded-lg p-4">
                            <h5 className="font-medium mb-2">JavaScript SDK</h5>
                            <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                              <pre>{`npm install @absolute0/js-sdk

import A0 from '@absolute0/js-sdk';
const client = new A0('your-api-key');`}</pre>
                            </div>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h5 className="font-medium mb-2">Python SDK</h5>
                            <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                              <pre>{`pip install absolute0-python

from absolute0 import Client
client = Client('your-api-key')`}</pre>
                            </div>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h5 className="font-medium mb-2">REST Client</h5>
                            <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                              <pre>{`curl -X POST \\
  -H "Authorization: Bearer key" \\
  -H "Content-Type: application/json" \\
  https://api.absolute-0.ai/v1/`}</pre>
                            </div>
                          </div>
                        </div>
                      </div>
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
