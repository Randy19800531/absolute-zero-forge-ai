import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Play, Settings, Upload } from 'lucide-react';
import WorkflowList from '@/components/workflow/WorkflowList';
import WorkflowToolbar from '@/components/workflow/WorkflowToolbar';
import LLMTaskRouter from '@/components/llm/LLMTaskRouter';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const Workflows = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const handleCreateWorkflow = () => {
    navigate('/workflow-builder');
  };

  const handleImportWorkflow = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.yaml,.yml';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = event.target?.result as string;
            // Parse the workflow file
            const workflowData = JSON.parse(content);
            console.log('Imported workflow:', workflowData);
            toast({
              title: "Workflow Imported",
              description: `Successfully imported workflow: ${workflowData.name || 'Unnamed Workflow'}`,
            });
          } catch (error) {
            toast({
              title: "Import Failed",
              description: "Failed to parse workflow file. Please ensure it's a valid JSON format.",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExportWorkflow = () => {
    const sampleWorkflow = {
      name: "Sample Workflow",
      description: "Exported workflow template",
      version: "1.0.0",
      steps: [],
      created_at: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(sampleWorkflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow-template.json';
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Workflow Exported",
      description: "Workflow template has been downloaded",
    });
  };

  const handlePlay = () => {
    setIsPlaying(true);
    toast({
      title: "Workflow Started",
      description: "Workflow execution has begun",
    });
    // Simulate workflow completion after 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
      toast({
        title: "Workflow Completed",
        description: "Workflow execution finished successfully",
      });
    }, 3000);
  };

  const handlePause = () => {
    setIsPlaying(false);
    toast({
      title: "Workflow Paused",
      description: "Workflow execution has been paused",
    });
  };

  const handleStop = () => {
    setIsPlaying(false);
    toast({
      title: "Workflow Stopped",
      description: "Workflow execution has been stopped",
    });
  };

  const handleSave = () => {
    toast({
      title: "Workflow Saved",
      description: "All workflow changes have been saved",
    });
  };

  const handleUndo = () => {
    if (canUndo) {
      toast({
        title: "Action Undone",
        description: "Last action has been undone",
      });
      setCanRedo(true);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      toast({
        title: "Action Redone",
        description: "Action has been redone",
      });
      setCanRedo(false);
    }
  };

  const handleZoomIn = () => {
    toast({
      title: "Zoomed In",
      description: "Workflow view has been zoomed in",
    });
  };

  const handleZoomOut = () => {
    toast({
      title: "Zoomed Out", 
      description: "Workflow view has been zoomed out",
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
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Workflow Management</h1>
                  <p className="text-muted-foreground mt-2">
                    Create, manage, and execute automated workflows
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleImportWorkflow} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Import Workflow
                  </Button>
                  <Button onClick={handleCreateWorkflow} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Workflow
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <LLMTaskRouter taskType="workflow-builder" showDetails={true} />
              </div>

              <div className="mb-6">
                <WorkflowToolbar
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onStop={handleStop}
                  onSave={handleSave}
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onExport={handleExportWorkflow}
                  onImport={handleImportWorkflow}
                  isPlaying={isPlaying}
                  canUndo={canUndo}
                  canRedo={canRedo}
                />
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
