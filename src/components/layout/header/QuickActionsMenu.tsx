
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Workflow, Code, Brain, Layers, Settings, Shield } from 'lucide-react';

const QuickActionsMenu = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: Workflow,
      title: 'Workflow',
      color: 'bg-blue-500 hover:bg-blue-600',
      path: '/workflows',
    },
    {
      icon: Code,
      title: 'VBA',
      color: 'bg-green-500 hover:bg-green-600',
      path: '/vba-generator',
    },
    {
      icon: Brain,
      title: 'Agent',
      color: 'bg-purple-500 hover:bg-purple-600',
      path: '/ai-engine',
    },
    {
      icon: Layers,
      title: 'Builder',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      path: '/low-no-code-builder',
    },
    {
      icon: Settings,
      title: 'LLM',
      color: 'bg-orange-500 hover:bg-orange-600',
      path: '/llm-config',
    },
  ];

  return (
    <div className="hidden lg:flex items-center gap-2">
      {/* Admin Portal */}
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 h-8 px-3"
        onClick={() => navigate('/admin')}
        title="Admin Portal"
      >
        <div className="p-1 rounded bg-red-500 hover:bg-red-600 text-white">
          <Shield className="h-3 w-3" />
        </div>
        <span className="text-xs">Admin Portal</span>
      </Button>

      {/* Quick Actions */}
      {quickActions.map((action) => (
        <Button
          key={action.title}
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 h-8 px-2"
          onClick={() => navigate(action.path)}
          title={action.title}
        >
          <div className={`p-1 rounded ${action.color} text-white`}>
            <action.icon className="h-3 w-3" />
          </div>
          <span className="text-xs">{action.title}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActionsMenu;
