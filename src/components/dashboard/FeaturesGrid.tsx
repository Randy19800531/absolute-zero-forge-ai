
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Workflow, 
  Code, 
  Settings,
  Building2,
  Zap,
  Palette,
  BookOpen,
  Shield
} from 'lucide-react';

const FeaturesGrid = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI Engine',
      description: 'Voice + personality engine with context-aware conversation memory and intelligent agent routing.',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      path: '/ai-engine',
    },
    {
      icon: Settings,
      title: 'LLM Configuration',
      description: 'Configure API keys for GPT-4o, Claude, Gemini, Grok and manage knowledge sources.',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      path: '/llm-config',
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
      icon: Building2,
      title: 'Agency Workspace',
      description: 'Complete project management with requirements forms, dynamic pricing, and developer AI assistant.',
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      path: '/agency',
    },
    {
      icon: Zap,
      title: 'Integrations',
      description: 'Connect with WhatsApp, Slack, Notion, Airtable and more through our comprehensive integration system.',
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      path: '/integrations',
    },
    {
      icon: Palette,
      title: 'Theme Customizer',
      description: 'Personalize your workspace with custom themes, colors, and layout preferences.',
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      path: '/theme-customizer',
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides, security policies, feature documentation, and user manuals.',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      path: '/documentation',
    },
    {
      icon: Shield,
      title: 'Admin Portal',
      description: 'Security & compliance management with SOC 2, ISO 27001, GDPR compliance features.',
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      path: '/admin',
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div 
            key={feature.title}
            className="bg-white rounded-lg p-6 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(feature.path)}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className={`p-3 ${feature.color} rounded-lg`}>
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;
