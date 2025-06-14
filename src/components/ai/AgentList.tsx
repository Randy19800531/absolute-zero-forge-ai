
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Play, Pause, Settings, Trash2 } from 'lucide-react';

interface AgentListProps {
  onAgentSelect: (agent: any) => void;
}

const AgentList = ({ onAgentSelect }: AgentListProps) => {
  const agents = [
    {
      id: 1,
      name: 'Data Analyst',
      type: 'Spreadsheet Agent',
      status: 'active',
      description: 'Analyzes spreadsheet data and provides insights',
      lastActive: '2 minutes ago',
      tasksCompleted: 45,
    },
    {
      id: 2,
      name: 'Web Scraper',
      type: 'Browser Agent',
      status: 'idle',
      description: 'Extracts data from websites automatically',
      lastActive: '1 hour ago',
      tasksCompleted: 23,
    },
    {
      id: 3,
      name: 'Customer Service',
      type: 'Conversation Agent',
      status: 'active',
      description: 'Handles customer inquiries with empathy',
      lastActive: '5 minutes ago',
      tasksCompleted: 128,
    },
    {
      id: 4,
      name: 'Code Reviewer',
      type: 'Development Agent',
      status: 'paused',
      description: 'Reviews code quality and suggests improvements',
      lastActive: '3 hours ago',
      tasksCompleted: 67,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Spreadsheet Agent': return 'bg-blue-100 text-blue-800';
      case 'Browser Agent': return 'bg-purple-100 text-purple-800';
      case 'Conversation Agent': return 'bg-pink-100 text-pink-800';
      case 'Development Agent': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <Card key={agent.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                {agent.name}
              </span>
              <Badge className={getStatusColor(agent.status)}>
                {agent.status}
              </Badge>
            </CardTitle>
            <Badge variant="outline" className={getTypeColor(agent.type)}>
              {agent.type}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
            
            <div className="space-y-2 text-xs text-gray-500 mb-4">
              <div className="flex justify-between">
                <span>Last Active:</span>
                <span>{agent.lastActive}</span>
              </div>
              <div className="flex justify-between">
                <span>Tasks Completed:</span>
                <span>{agent.tasksCompleted}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAgentSelect(agent)}
              >
                <Settings className="h-3 w-3 mr-1" />
                Configure
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={agent.status === 'active' ? 'text-orange-600' : 'text-green-600'}
              >
                {agent.status === 'active' ? (
                  <><Pause className="h-3 w-3 mr-1" />Pause</>
                ) : (
                  <><Play className="h-3 w-3 mr-1" />Start</>
                )}
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AgentList;
