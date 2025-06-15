
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Workflow, Code, Brain, Settings, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Workflow,
      title: 'Create Workflow',
      description: 'Build new automation',
      color: 'bg-blue-500 hover:bg-blue-600',
      path: '/workflows',
    },
    {
      icon: Code,
      title: 'Generate VBA',
      description: 'Excel macro generator',
      color: 'bg-green-500 hover:bg-green-600',
      path: '/vba-generator',
    },
    {
      icon: Brain,
      title: 'Deploy Agent',
      description: 'AI task executor',
      color: 'bg-purple-500 hover:bg-purple-600',
      path: '/ai-engine',
    },
    {
      icon: Layers,
      title: 'Low-No Code',
      description: 'Visual app builder',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      path: '/low-no-code-builder',
    },
    {
      icon: Settings,
      title: 'LLM Config',
      description: 'Setup AI models',
      color: 'bg-orange-500 hover:bg-orange-600',
      path: '/llm-config',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex items-center gap-3 text-left hover:shadow-md transition-shadow justify-start"
              onClick={() => navigate(action.path)}
            >
              <div className={`p-2 rounded-lg ${action.color} text-white flex-shrink-0`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{action.title}</div>
                <div className="text-xs text-gray-500 truncate">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
