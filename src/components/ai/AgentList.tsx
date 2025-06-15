
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Play, Pause, Settings, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'paused';
  description: string;
  lastActive: string;
  tasksCompleted: number;
}

interface AgentListProps {
  onAgentSelect: (agent: Agent) => void;
}

const AgentList = ({ onAgentSelect }: AgentListProps) => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);

  const toggleAgentStatus = (agentId: string) => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        const newStatus = agent.status === 'active' ? 'paused' : 'active';
        toast({
          title: `Agent ${newStatus === 'active' ? 'Started' : 'Paused'}`,
          description: `${agent.name} has been ${newStatus === 'active' ? 'started' : 'paused'}.`,
        });
        return { ...agent, status: newStatus };
      }
      return agent;
    }));
  };

  const deleteAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    setAgents(prev => prev.filter(a => a.id !== agentId));
    toast({
      title: "Agent Deleted",
      description: `${agent?.name} has been deleted successfully.`,
    });
  };

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

  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No agents created yet</h3>
        <p className="text-gray-500 mb-6">Create your first AI agent to get started with automation.</p>
        <Button onClick={() => toast({ title: "Navigate to Create Tab", description: "Click on the 'Create' tab to build your first agent." })}>
          <Plus className="h-4 w-4 mr-2" />
          Create Your First Agent
        </Button>
      </div>
    );
  }

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
                onClick={() => toggleAgentStatus(agent.id)}
              >
                {agent.status === 'active' ? (
                  <><Pause className="h-3 w-3 mr-1" />Pause</>
                ) : (
                  <><Play className="h-3 w-3 mr-1" />Start</>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600"
                onClick={() => deleteAgent(agent.id)}
              >
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
