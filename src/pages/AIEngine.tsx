
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import IntegrationButtons from '@/components/layout/IntegrationButtons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Bot, MessageSquare, Zap, Plus } from 'lucide-react';
import AgentListData from '@/components/ai/AgentListData';
import AgentCreator from '@/components/ai/AgentCreator';
import ConversationMemory from '@/components/ai/ConversationMemory';

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
  configuration: any;
}

const AIEngine = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onMenuToggle={() => setSidebarOpen(true)} />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Brain className="h-8 w-8 text-blue-500" />
                    AI Engine
                  </h1>
                  <p className="text-gray-600">
                    Create, manage, and deploy intelligent AI agents for automation
                  </p>
                </div>
                <IntegrationButtons />
              </div>

              <Tabs defaultValue="agents" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="agents">
                    <Bot className="h-4 w-4 mr-2" />
                    Agents
                  </TabsTrigger>
                  <TabsTrigger value="create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create
                  </TabsTrigger>
                  <TabsTrigger value="memory">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Memory
                  </TabsTrigger>
                  <TabsTrigger value="integrations">
                    <Zap className="h-4 w-4 mr-2" />
                    Integrations
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="agents" className="space-y-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Existing Agents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AgentListData onAgentSelect={handleAgentSelect} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="create">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Agent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AgentCreator />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="memory">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversation Memory</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ConversationMemory />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="integrations">
                  <Card>
                    <CardHeader>
                      <CardTitle>Integrations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Here you can manage integrations with other services.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AIEngine;
