
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Pause, Trash2, Brain, Settings, Activity } from 'lucide-react';
import AgentCreator from '@/components/ai/AgentCreator';

const AIEngine = () => {
  const [showAgentCreator, setShowAgentCreator] = useState(false);
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Data Analyzer',
      type: 'analyzer',
      status: 'active',
      specialization: 'Data Analysis',
      description: 'Processes and analyzes large datasets',
      tasksCompleted: 142,
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Content Generator',
      type: 'generator',
      status: 'paused',
      specialization: 'Content Creation',
      description: 'Creates marketing content and documentation',
      tasksCompleted: 89,
      lastActive: '1 day ago',
    },
    {
      id: 3,
      name: 'Code Assistant',
      type: 'assistant',
      status: 'active',
      specialization: 'Programming',
      description: 'Helps with code generation and debugging',
      tasksCompleted: 256,
      lastActive: '30 minutes ago',
    },
  ]);

  const handleCreateAgent = async (agentData: any) => {
    console.log('Creating agent:', agentData);
    const newAgent = {
      id: agents.length + 1,
      ...agentData,
      status: 'active',
      tasksCompleted: 0,
      lastActive: 'Just created',
    };
    setAgents([...agents, newAgent]);
    setShowAgentCreator(false);
  };

  const handleCancelCreation = () => {
    setShowAgentCreator(false);
  };

  const toggleAgentStatus = (id: number) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
        : agent
    ));
  };

  const deleteAgent = (id: number) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const activeAgents = agents.filter(agent => agent.status === 'active').length;
  const totalTasks = agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0);

  if (showAgentCreator) {
    return (
      <div className="container mx-auto p-6">
        <AgentCreator onSubmit={handleCreateAgent} onCancel={handleCancelCreation} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Engine</h1>
          <p className="text-gray-600 mt-2">Manage and deploy your AI agents</p>
        </div>
        <Button onClick={() => setShowAgentCreator(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Agent
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold text-green-600">{activeAgents}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-purple-600">{totalTasks}</p>
              </div>
              <Settings className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-blue-600">94%</p>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Your Agents</h2>
        
        {agents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No agents yet</h3>
              <p className="text-gray-600 mb-4">Create your first AI agent to get started</p>
              <Button onClick={() => setShowAgentCreator(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {agent.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Specialization</p>
                    <p className="font-medium">{agent.specialization}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600">{agent.description}</p>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tasks: {agent.tasksCompleted}</span>
                    <span>Last active: {agent.lastActive}</span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleAgentStatus(agent.id)}
                      className="flex items-center gap-1"
                    >
                      {agent.status === 'active' ? (
                        <>
                          <Pause className="h-3 w-3" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteAgent(agent.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIEngine;
