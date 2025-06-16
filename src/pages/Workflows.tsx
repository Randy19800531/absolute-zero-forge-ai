
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Play, Settings } from 'lucide-react';
import WorkflowList from '@/components/workflow/WorkflowList';
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
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Workflow Management</h1>
                  <p className="text-muted-foreground mt-2">
                    Create, manage, and execute automated workflows
                  </p>
                </div>
                <Button onClick={() => navigate('/workflow-builder')} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Workflow
                </Button>
              </div>

              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Active Workflows</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="h-5 w-5" />
                        Active Workflows
                      </CardTitle>
                      <CardDescription>
                        Currently running and scheduled workflows
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <WorkflowList />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="drafts" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Draft Workflows
                      </CardTitle>
                      <CardDescription>
                        Workflows in development and testing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <WorkflowList />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="completed" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Completed Workflows</CardTitle>
                      <CardDescription>
                        Successfully executed workflow history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <WorkflowList />
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

export default Workflows;
