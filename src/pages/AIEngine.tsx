
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AgentList from '@/components/ai/AgentList';
import AgentListData from '@/components/ai/AgentListData';
import AgentCreator from '@/components/ai/AgentCreator';
import AgentCreatorData from '@/components/ai/AgentCreatorData';
import ConversationMemory from '@/components/ai/ConversationMemory';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Brain, Plus, List, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIEngine = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const navigate = useNavigate();

  const handleAgentSelect = (agent: any) => {
    setSelectedAgent(agent);
    console.log('Selected agent:', agent);
  };

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
                  AI Agent Engine
                </h1>
                <p className="text-gray-600">
                  Create and manage intelligent AI agents for automation and assistance
                </p>
              </div>
            </div>

            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  My Agents
                </TabsTrigger>
                <TabsTrigger value="create" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create
                </TabsTrigger>
                <TabsTrigger value="memory" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Memory
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-6">
                <AgentListData onAgentSelect={handleAgentSelect} />
              </TabsContent>

              <TabsContent value="create" className="mt-6">
                <AgentCreatorData />
              </TabsContent>

              <TabsContent value="memory" className="mt-6">
                <ConversationMemory />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIEngine;
