
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgentCreator from '@/components/ai/AgentCreator';
import AgentList from '@/components/ai/AgentList';
import ConversationMemory from '@/components/ai/ConversationMemory';

const AIEngine = () => {
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
                  Create, manage, and deploy AI agents for automated task execution
                </p>
              </div>

              <Tabs defaultValue="agents" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="agents">AI Agents</TabsTrigger>
                  <TabsTrigger value="create">Create Agent</TabsTrigger>
                  <TabsTrigger value="memory">Conversation Memory</TabsTrigger>
                </TabsList>

                <TabsContent value="agents" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Active AI Agents</CardTitle>
                      <CardDescription>
                        Manage your deployed AI agents and monitor their performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AgentList />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="create" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New AI Agent</CardTitle>
                      <CardDescription>
                        Configure and deploy a new AI agent with custom capabilities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AgentCreator />
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
                    </CardHeader>
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
