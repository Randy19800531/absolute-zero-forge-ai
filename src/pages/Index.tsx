
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Workflow, 
  Code, 
  Users, 
  TrendingUp, 
  Zap,
  Shield,
  Clock,
  Palette
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const featureCards = [
    {
      icon: Brain,
      title: 'AI Engine',
      description: 'Voice + personality engine with context-aware conversation memory and intelligent agent routing.',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      path: '/ai-engine',
    },
    {
      icon: Workflow,
      title: 'Visual Workflows',
      description: 'Drag-and-drop workflow builder with AI-enhanced nodes, nested subflows, and visual execution logs.',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      path: '/workflows',
    },
    {
      icon: Code,
      title: 'VBA Generator',
      description: 'AI-powered Excel automation with smart form generation, pattern recognition, and template export.',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      path: '/vba-generator',
    },
    {
      icon: TrendingUp,
      title: 'Agency Workspace',
      description: 'Complete project management with requirements forms, dynamic pricing, and developer AI assistant.',
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      path: '/agency',
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'SOC 2, ISO 27001, GDPR compliant with end-to-end encryption and comprehensive audit logging.',
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      path: '/admin',
    },
    {
      icon: Zap,
      title: 'Integrations',
      description: 'Connect with WhatsApp, Slack, Notion, Airtable and more through our comprehensive integration system.',
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      path: '/integrations',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome to Absolute-0.AI
                </h1>
                <p className="text-gray-600">
                  Your complete AI-native SaaS platform for workflow automation, VBA generation, and intelligent task execution.
                </p>
              </div>
              <Button 
                onClick={() => navigate('/theme-customizer')}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Palette className="h-4 w-4" />
                Customize Theme
              </Button>
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
              {featureCards.map((feature) => (
                <div 
                  key={feature.title}
                  className="bg-white rounded-lg p-6 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(feature.path)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 ${feature.color} rounded-lg`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
