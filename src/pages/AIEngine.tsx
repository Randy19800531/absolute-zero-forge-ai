
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AgentList from '@/components/ai/AgentList';
import AgentCreator from '@/components/ai/AgentCreator';
import ConversationMemory from '@/components/ai/ConversationMemory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, MessageSquare, Settings, Zap } from 'lucide-react';

const AIEngine = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Brain className="h-8 w-8 text-purple-500" />
                  AI Engine
                </h1>
                <p className="text-gray-600">
                  Manage AI agents, personalities, and conversation memory
                </p>
              </div>
            </div>

            <Tabs defaultValue="agents" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="agents" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Agents
                </TabsTrigger>
                <TabsTrigger value="create" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Create
                </TabsTrigger>
                <TabsTrigger value="memory" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Memory
                </TabsTrigger>
                <TabsTrigger value="config" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Config
                </TabsTrigger>
              </TabsList>

              <TabsContent value="agents">
                <AgentList onAgentSelect={setSelectedAgent} />
              </TabsContent>

              <TabsContent value="create">
                <AgentCreator />
              </TabsContent>

              <TabsContent value="memory">
                <ConversationMemory />
              </TabsContent>

              <TabsContent value="config">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Engine Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">AI engine settings and configuration options.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIEngine;
