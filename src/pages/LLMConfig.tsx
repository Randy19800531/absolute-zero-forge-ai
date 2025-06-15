
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import LLMProviders from '@/components/llm/LLMProviders';
import KnowledgeSources from '@/components/llm/KnowledgeSources';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, Key, Globe, Github, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LLMConfig = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Brain className="h-8 w-8 text-blue-500" />
                    LLM Configuration
                  </h1>
                  <p className="text-gray-600">
                    Configure AI models, API keys, and knowledge sources for enhanced functionality
                  </p>
                </div>
              </div>

              <Tabs defaultValue="providers" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="providers" className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    LLM Providers
                  </TabsTrigger>
                  <TabsTrigger value="knowledge" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Knowledge Sources
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="providers">
                  <LLMProviders />
                </TabsContent>

                <TabsContent value="knowledge">
                  <KnowledgeSources />
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
