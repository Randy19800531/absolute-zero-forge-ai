
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';
import LLMTaskRouter from '@/components/llm/LLMTaskRouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkflowVisualBuilder = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/workflows')}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Workflows
                    </Button>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Visual Workflow Builder
                  </h1>
                  <p className="text-gray-600">
                    Drag and drop workflow components to build your automation
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <LLMTaskRouter taskType="workflow-builder" showDetails={true} />
              </div>

              <div className="h-[calc(100vh-200px)]">
                <WorkflowCanvas />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default WorkflowVisualBuilder;
