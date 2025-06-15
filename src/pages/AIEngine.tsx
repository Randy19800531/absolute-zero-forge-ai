
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Brain, Settings, Play, Pause, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAgents } from '@/hooks/useAgents';
import AgentCreator from '@/components/ai/AgentCreator';
import AgentList from '@/components/ai/AgentList';
import { Badge } from '@/components/ui/badge';

const AIEngine = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  const navigate = useNavigate();
  const { agents, loading, createAgent, updateAgent, deleteAgent } = useAgents();

  const handleCreateAgent = async (agentData: any) => {
    try {
      await createAgent(agentData);
      setShowCreator(false);
    } catch (error) {
      console.error('Failed to create agent:', error);
    }
  };

  const handleToggleAgent = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'idle' : 'active';
    try {
      await updateAgent(id, { status: newStatus });
    } catch (error) {
      console.error('Failed to toggle agent status:', error);
    }
  };

  const handleDeleteAgent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await deleteAgent(id);
      } catch (error) {
        console.error('Failed to delete agent:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', variant: 'default' as const },
      idle: { label: 'Idle', variant: 'secondary' as const },
      error: { label: 'Error', variant: 'destructive' as const },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.idle;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (showCreator) {
    return (
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onMenuToggle={() => setSidebarOpen(true)} />
          
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreator(false)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Agents
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Create New Agent</h1>
              </div>

              <AgentCreator onSubmit={handleCreateAgent} onCancel={() => setShowCreator(false)} />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  AI Engine
                </h1>
                <p className="text-gray-600">
                  Manage and deploy intelligent AI agents
                </p>
              </div>
              <Button 
                onClick={() => setShowCreator(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Agent
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agents.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {agents.filter(a => a.status === 'active').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Tasks Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {agents.reduce((sum, agent) => sum + agent.tasks_completed, 0)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Set(agents.map(a => a.specialization).filter(Boolean)).size}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Agents List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : agents.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No agents created yet</h3>
                  <p className="text-gray-600 mb-4">Create your first AI agent to get started</p>
                  <Button onClick={() => setShowCreator(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Agent
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{agent.type}</p>
                        </div>
                        {getStatusBadge(agent.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {agent.description || 'No description provided'}
                      </p>
                      
                      {agent.specialization && (
                        <div className="mb-4">
                          <Badge variant="outline" className="text-xs">
                            {agent.specialization}
                          </Badge>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>Tasks: {agent.tasks_completed}</span>
                        <span>Created: {new Date(agent.created_at).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={agent.status === 'active' ? 'outline' : 'default'}
                          onClick={() => handleToggleAgent(agent.id, agent.status)}
                          className="flex-1 flex items-center gap-2"
                        >
                          {agent.status === 'active' ? (
                            <>
                              <Pause className="h-3 w-3" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3" />
                              Activate
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => console.log('Configure agent:', agent.id)}
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAgent(agent.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIEngine;
