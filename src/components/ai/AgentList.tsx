
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Trash2, Edit, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Agent {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  specialization: string;
  configuration: any;
  created_at: string;
  tasks_completed: number;
}

const AgentList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAgents();
    }
  }, [user]);

  const fetchAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAgents(data || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast({
        title: "Error",
        description: "Failed to load agents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAgentStatus = async (agentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('ai_agents')
        .update({ status: newStatus })
        .eq('id', agentId);

      if (error) throw error;

      setAgents(prev => prev.map(agent => 
        agent.id === agentId ? { ...agent, status: newStatus } : agent
      ));

      toast({
        title: "Status Updated",
        description: `Agent status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating agent status:', error);
      toast({
        title: "Error",
        description: "Failed to update agent status",
        variant: "destructive"
      });
    }
  };

  const deleteAgent = async (agentId: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;

    try {
      const { error } = await supabase
        .from('ai_agents')
        .delete()
        .eq('id', agentId);

      if (error) throw error;

      setAgents(prev => prev.filter(agent => agent.id !== agentId));
      toast({
        title: "Agent Deleted",
        description: "Agent has been successfully deleted",
      });
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast({
        title: "Error",
        description: "Failed to delete agent",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
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

  if (agents.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Bot className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No Custom Agents</h3>
          <p className="text-gray-600 mb-4">
            You haven't created any custom agents yet. Create your first agent to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {agents.map(agent => (
        <Card key={agent.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bot className="h-5 w-5 text-blue-600" />
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
                <Badge variant="outline">
                  {agent.specialization}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                <div>
                  <span className="font-medium">Capabilities:</span>
                  <p className="text-gray-600">
                    {agent.configuration?.capabilities?.length || 0} defined
                  </p>
                </div>
              </div>

              {agent.configuration?.capabilities && agent.configuration.capabilities.length > 0 && (
                <div>
                  <span className="font-medium text-sm">Capabilities:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {agent.configuration.capabilities.map((capability: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex gap-2">
                  {agent.status === 'active' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateAgentStatus(agent.id, 'idle')}
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateAgentStatus(agent.id, 'active')}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                  )}
                  <Button variant="outline" size="sm" disabled>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteAgent(agent.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AgentList;
