import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTestCases } from '@/hooks/useTestCases';
import TestCaseBuilder from '@/components/testing/TestCaseBuilder';
import TestCaseList from '@/components/testing/TestCaseList';
import AITestGenerator from '@/components/testing/AITestGenerator';
import StepLibrary from '@/components/testing/StepLibrary';
import QualityAssessment from '@/components/testing/QualityAssessment';
import TestEnvironment from '@/components/testing/TestEnvironment';
import { TestCase } from '@/types/testing';

const Testing = () => {
  const { toast } = useToast();
  const { testCases, loading, createTestCase, updateTestCase, deleteTestCase, runTestCase, refetch } = useTestCases();
  const [activeTab, setActiveTab] = useState('list');
  const [editingTestCase, setEditingTestCase] = useState<TestCase | null>(null);

  const handleCreateNew = () => {
    setEditingTestCase(null);
    setActiveTab('builder');
  };

  const handleEdit = (testCase: TestCase) => {
    setEditingTestCase(testCase);
    setActiveTab('builder');
  };

  const handleSave = async (testCaseData: Partial<TestCase>) => {
    try {
      if (editingTestCase) {
        await updateTestCase(editingTestCase.id, testCaseData);
        toast({
          title: "Test Case Updated",
          description: `${testCaseData.name} has been updated successfully`,
        });
      } else {
        await createTestCase(testCaseData);
        toast({
          title: "Test Case Created",
          description: `${testCaseData.name} has been created successfully`,
        });
      }
      setActiveTab('list');
      setEditingTestCase(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save test case. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestCase(id);
      toast({
        title: "Test Case Deleted",
        description: "Test case has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete test case. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRun = async (testCase: TestCase) => {
    try {
      await runTestCase(testCase.id);
      toast({
        title: "Test Execution Started",
        description: `${testCase.name} is now running`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to run test case. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSchedule = (testCase: TestCase) => {
    toast({
      title: "Schedule Test",
      description: `Scheduling feature for ${testCase.name} - Coming soon!`,
    });
  };

  const handleViewVersions = (testCase: TestCase) => {
    toast({
      title: "Version History",
      description: `Viewing versions for ${testCase.name} - Coming soon!`,
    });
  };

  const handleDuplicate = async (testCase: TestCase) => {
    try {
      const duplicatedTestCase = {
        ...testCase,
        name: `${testCase.name} (Copy)`,
        status: 'draft' as const
      };
      delete (duplicatedTestCase as any).id;
      delete (duplicatedTestCase as any).created_at;
      delete (duplicatedTestCase as any).updated_at;
      delete (duplicatedTestCase as any).version;
      
      await createTestCase(duplicatedTestCase);
      toast({
        title: "Test Case Duplicated",
        description: `${duplicatedTestCase.name} has been created`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate test case. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingTestCase(null);
    setActiveTab('list');
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshed",
      description: "Test cases have been refreshed",
    });
  };

  const handleAddStep = (step: any) => {
    // This will be implemented when needed by StepLibrary
    console.log('Add step:', step);
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
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold">Test Suite</h1>
                    <p className="text-muted-foreground mt-2">
                      Create, manage, and execute automated tests
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleRefresh} variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={handleCreateNew}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Test Case
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="list">Test Cases</TabsTrigger>
                  <TabsTrigger value="builder">Builder</TabsTrigger>
                  <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
                  <TabsTrigger value="library">Step Library</TabsTrigger>
                  <TabsTrigger value="quality">Quality</TabsTrigger>
                  <TabsTrigger value="environment">Environment</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Cases ({testCases.length})</CardTitle>
                      <CardDescription>
                        Manage your automated test cases
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="text-center py-8">Loading test cases...</div>
                      ) : (
                        <TestCaseList
                          testCases={testCases}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onRun={handleRun}
                          onSchedule={handleSchedule}
                          onViewVersions={handleViewVersions}
                          onDuplicate={handleDuplicate}
                        />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="builder" className="space-y-6">
                  <TestCaseBuilder
                    testCase={editingTestCase || undefined}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                </TabsContent>

                <TabsContent value="ai-generator" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Test Generator</CardTitle>
                      <CardDescription>
                        Generate test cases using AI based on your requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AITestGenerator onTestGenerated={handleSave} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="library" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Step Library</CardTitle>
                      <CardDescription>
                        Reusable test steps and components
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <StepLibrary onAddStep={handleAddStep} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quality" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quality Assessment</CardTitle>
                      <CardDescription>
                        Analyze test coverage and quality metrics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <QualityAssessment testCases={testCases} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="environment" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Environment</CardTitle>
                      <CardDescription>
                        Configure test environments and execution settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TestEnvironment />
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

export default Testing;
