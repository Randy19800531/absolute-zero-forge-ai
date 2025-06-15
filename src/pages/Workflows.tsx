
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import WorkflowBuilder from '@/components/workflow/WorkflowBuilder';
import WorkflowList from '@/components/workflow/WorkflowList';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Workflow, Plus, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Workflows = () => {
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Multi-Agent Workflows
                  </h1>
                  <p className="text-gray-600">
                    Build applications using specialist AI agents for design, development, testing, and deployment
                  </p>
                </div>
              </div>

              <Tabs defaultValue="builder" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                  <TabsTrigger value="builder" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Workflow
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    My Workflows
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="builder" className="mt-6">
                  <WorkflowBuilder />
                </TabsContent>

                <TabsContent value="list" className="mt-6">
                  <WorkflowList />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Workflows;
