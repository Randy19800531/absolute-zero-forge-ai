
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const OverviewTab = () => {
  return (
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
  );
};

export default OverviewTab;
