
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LLMProviders from '@/components/llm/LLMProviders';
import KnowledgeSources from '@/components/llm/KnowledgeSources';

const LLMConfig = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold">LLM Configuration</h1>
                <p className="text-muted-foreground mt-2">
                  Configure AI models, providers, and knowledge sources for your applications
                </p>
              </div>

              <Tabs defaultValue="providers" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="providers">Model Providers</TabsTrigger>
                  <TabsTrigger value="knowledge">Knowledge Sources</TabsTrigger>
                </TabsList>

                <TabsContent value="providers" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Model Providers</CardTitle>
                      <CardDescription>
                        Configure and manage your AI model providers and API settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LLMProviders />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="knowledge" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Knowledge Sources</CardTitle>
                      <CardDescription>
                        Add and manage knowledge bases for enhanced AI responses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <KnowledgeSources />
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

export default LLMConfig;
