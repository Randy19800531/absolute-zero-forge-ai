
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Play, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAgents, Agent as AgentFromHook } from '@/hooks/useAgents';

interface AgentListProps {
  onAgentSelect?: (agent: AgentFromHook) => void;
}

const AgentList: React.FC<AgentListProps> = ({ onAgentSelect }) => {
  const { toast } = useToast();
  const { agents, loading, deleteAgent } = useAgents();
  const [selectedAgent, setSelectedAgent] = useState<AgentFromHook | null>(null);

  const handleAgentSelect = (agent: AgentFromHook) => {
    setSelectedAgent(agent);
    onAgentSelect?.(agent);
  };

  const handleDeleteAgent = async (agentId: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;

    try {
      await deleteAgent(agentId);
      toast({
        title: "Agent Deleted",
        description: "Agent has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: "Failed to delete agent",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {agents.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Bot className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No agents created yet</p>
            <p className="text-sm text-gray-500 mt-2">Create your first AI agent to get started</p>
          </CardContent>
        </Card>
      ) : (
        agents.map(agent => (
          <Card key={agent.id} className={`cursor-pointer transition-all hover:shadow-md ${
            selectedAgent?.id === agent.id ? 'border-blue-500 bg-blue-50' : ''
          }`} onClick={() => handleAgentSelect(agent)}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{agent.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                  {agent.specialization && (
                    <Badge variant="outline">
                      {agent.specialization}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span>
                    <p className="text-gray-600">{agent.type}</p>
                  </div>
                  <div>
                    <span className="font-medium">Tasks Completed:</span>
                    <p className="text-gray-600">{agent.tasks_completed || 0}</p>
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>
                    <p className="text-gray-600">
                      {new Date(agent.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAgentSelect(agent);
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAgent(agent.id);
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AgentList;
