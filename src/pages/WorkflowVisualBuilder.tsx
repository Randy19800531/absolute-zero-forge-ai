
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkflowVisualBuilder = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
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

            <div className="h-[calc(100vh-200px)]">
              <WorkflowCanvas />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkflowVisualBuilder;
