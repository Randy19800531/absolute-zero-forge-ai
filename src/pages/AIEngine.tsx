
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgentCreator from '@/components/ai/AgentCreator';
import AgentList from '@/components/ai/AgentList';
import ConversationMemory from '@/components/ai/ConversationMemory';
import PredefinedAgents from '@/components/ai/PredefinedAgents';
import VoiceInterface from '@/components/ai/VoiceInterface';
import { useToast } from '@/hooks/use-toast';

const AIEngine = () => {
  const { toast } = useToast();
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleAgentSelect = (agent: any) => {
    setSelectedAgent(agent);
    toast({
      title: "Agent Selected",
      description: `Selected agent: ${agent.name}`,
    });
  };

  const handlePredefinedAgentSelect = (agent: any) => {
    setSelectedAgent(agent);
    toast({
      title: "Agent Ready",
      description: `${agent.name} is now available for voice conversation!`,
    });
  };

  const handleAgentSubmit = async (agentData: any) => {
    toast({
      title: "Agent Created",
      description: "Your AI agent has been created successfully!",
    });
  };

  const handleAgentCancel = () => {
    toast({
      title: "Creation Cancelled",
      description: "Agent creation was cancelled.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold">AI Engine</h1>
                <p className="text-muted-foreground mt-2">
                  Create, manage, and have voice conversations with AI agents
                </p>
              </div>

              <Tabs defaultValue="voice-chat" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="voice-chat">Voice Chat</TabsTrigger>
                  <TabsTrigger value="predefined">Predefined Agents</TabsTrigger>
                  <TabsTrigger value="agents">My Agents</TabsTrigger>
                  <TabsTrigger value="create">Create Custom</TabsTrigger>
                  <TabsTrigger value="memory">Conversation Memory</TabsTrigger>
                </TabsList>

                <TabsContent value="voice-chat" className="space-y-6">
                  <VoiceInterface selectedAgent={selectedAgent} />
                  
                  {!selectedAgent && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Select an Agent</CardTitle>
                        <CardDescription>
                          Choose a predefined agent or one of your custom agents to start a voice conversation
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center text-gray-500">
                          Select an agent from the "Predefined Agents" or "My Agents" tabs to start chatting
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="predefined" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ready-to-Use Conversational Agents</CardTitle>
                      <CardDescription>
                        Choose from our carefully crafted AI personalities, each with unique traits and conversational memory
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PredefinedAgents onSelectAgent={handlePredefinedAgentSelect} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="agents" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your AI Agents</CardTitle>
                      <CardDescription>
                        Manage your created AI agents and select them for voice conversations
                      </CardDescription>
                    </Card>
                    <CardContent>
                      <AgentList onAgentSelect={handleAgentSelect} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="create" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Custom AI Agent</CardTitle>
                      <CardDescription>
                        Configure and deploy a new AI agent with custom capabilities for voice conversations
                      </CardDescription>
                    </Card>
                    <CardContent>
                      <AgentCreator onSubmit={handleAgentSubmit} onCancel={handleAgentCancel} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="memory" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversation Memory</CardTitle>
                      <CardDescription>
                        View and manage conversation history and memory for your AI agents
                      </CardDescription>
                    </Card>
                    <CardContent>
                      <ConversationMemory />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AIEngine;
