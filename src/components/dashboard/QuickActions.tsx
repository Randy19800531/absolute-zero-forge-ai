
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Workflow, Code, Brain, Settings } from 'lucide-react';
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
      icon: Settings,
      title: 'LLM Config',
      description: 'Setup AI models',
      color: 'bg-orange-500 hover:bg-orange-600',
      path: '/llm-config',
    },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto p-4 flex flex-col items-start gap-2 text-left hover:shadow-md transition-shadow"
            onClick={() => navigate(action.path)}
          >
            <div className={`p-2 rounded-lg ${action.color} text-white`}>
              <action.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold">{action.title}</div>
              <div className="text-sm text-gray-500">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
