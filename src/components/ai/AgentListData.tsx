
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Play, Pause, Settings, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string; // Changed from union type to string to match database
  description: string | null;
  created_at: string;
  tasks_completed: number;
  user_id: string;
  updated_at: string;
  configuration: any; // Adding missing fields from database
}

interface AgentListDataProps {
  onAgentSelect: (agent: Agent) => void;
}

const AgentListData = ({ onAgentSelect }: AgentListDataProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAgents(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch agents: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAgentStatus = async (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    const newStatus = agent.status === 'active' ? 'paused' : 'active';
    
    try {
      const { error } = await supabase
        .from('ai_agents')
        .update({ status: newStatus })
        .eq('id', agentId);

      if (error) throw error;

      setAgents(prev => prev.map(a => 
        a.id === agentId ? { ...a, status: newStatus } : a
      ));

      toast({
        title: `Agent ${newStatus === 'active' ? 'Started' : 'Paused'}`,
        description: `${agent.name} has been ${newStatus === 'active' ? 'started' : 'paused'}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update agent status: " + error.message,
        variant: "destructive",
      });
    }
  };

  const deleteAgent = async (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    try {
      const { error } = await supabase
        .from('ai_agents')
        .delete()
        .eq('id', agentId);

      if (error) throw error;

      setAgents(prev => prev.filter(a => a.id !== agentId));
      toast({
        title: "Agent Deleted",
        description: `${agent.name} has been deleted successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete agent: " + error.message,
        variant: "destructive",
      });
    }
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

  if (loading) {
    return <div className="text-center py-12">Loading agents...</div>;
  }

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
                <span>Created:</span>
                <span>{new Date(agent.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tasks Completed:</span>
                <span>{agent.tasks_completed}</span>
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

export default AgentListData;
