import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';
import NodeLibrary from '@/components/workflow/NodeLibrary';
import WorkflowToolbar from '@/components/workflow/WorkflowToolbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Workflow, Play, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Workflows = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const navigate = useNavigate();

  const workflows = [
    { id: 1, name: 'Customer Data Sync', status: 'active', lastRun: '2 hours ago' },
    { id: 2, name: 'Lead Processing', status: 'draft', lastRun: 'Never' },
    { id: 3, name: 'Invoice Generation', status: 'active', lastRun: '1 day ago' },
  ];

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
                  Visual Workflows
                </h1>
                <p className="text-gray-600">
                  Build and manage AI-enhanced workflow automations
                </p>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                New Workflow
              </Button>
            </div>

            {!selectedWorkflow ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workflows.map((workflow) => (
                  <Card key={workflow.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Workflow className="h-5 w-5" />
                        {workflow.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Status:</span>
                          <span className={`text-sm px-2 py-1 rounded ${
                            workflow.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {workflow.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Last run:</span>
                          <span className="text-sm">{workflow.lastRun}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedWorkflow(workflow)}
                          >
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col h-[calc(100vh-200px)]">
                <WorkflowToolbar 
                  workflow={selectedWorkflow}
                  onBack={() => setSelectedWorkflow(null)}
                />
                <div className="flex flex-1 gap-4">
                  <NodeLibrary />
                  <WorkflowCanvas workflow={selectedWorkflow} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Workflows;
