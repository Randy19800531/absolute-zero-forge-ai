
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { 
  Brain, 
  Workflow, 
  Code, 
  Users, 
  TrendingUp, 
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to Absolute-0.AI
              </h1>
              <p className="text-gray-600">
                Your complete AI-native SaaS platform for workflow automation, VBA generation, and intelligent task execution.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Active Workflows"
                value="24"
                change="+12% from last month"
                icon={Workflow}
                color="blue"
              />
              <StatsCard
                title="AI Agents"
                value="8"
                change="+3 new this week"
                icon={Brain}
                color="purple"
              />
              <StatsCard
                title="VBA Scripts"
                value="156"
                change="+28 generated today"
                icon={Code}
                color="green"
              />
              <StatsCard
                title="Active Users"
                value="1,247"
                change="+5.3% growth"
                icon={Users}
                color="orange"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
            </div>

            {/* Feature Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">AI Engine</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Voice + personality engine with context-aware conversation memory and intelligent agent routing.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Workflow className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Visual Workflows</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Drag-and-drop workflow builder with AI-enhanced nodes, nested subflows, and visual execution logs.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">VBA Generator</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  AI-powered Excel automation with smart form generation, pattern recognition, and template export.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Agency Workspace</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Complete project management with requirements forms, dynamic pricing, and developer AI assistant.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Security & Compliance</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  SOC 2, ISO 27001, GDPR compliant with end-to-end encryption and comprehensive audit logging.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Zap className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Integrations</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Connect with WhatsApp, Slack, Notion, Airtable and more through our comprehensive integration system.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
