
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Plus, CheckCircle, XCircle, Clock, Brain, Zap, Target } from 'lucide-react';
import TestCaseBuilder from '@/components/testing/TestCaseBuilder';
import TestCaseList from '@/components/testing/TestCaseList';
import StepLibrary from '@/components/testing/StepLibrary';
import LLMTaskRouter from '@/components/llm/LLMTaskRouter';
import AITestGenerator from '@/components/testing/AITestGenerator';
import QualityAssessment from '@/components/testing/QualityAssessment';
import TestEnvironment from '@/components/testing/TestEnvironment';
import { TestCase } from '@/types/testing';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useTestCases } from '@/hooks/useTestCases';

const Testing = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { testCases, loading, createTestCase, updateTestCase, deleteTestCase } = useTestCases();
  const [editingTestCase, setEditingTestCase] = useState<TestCase | undefined>();

  const handleSaveTestCase = async (testCaseData: Partial<TestCase>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save test cases.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingTestCase) {
        await updateTestCase(editingTestCase.id, testCaseData);
        setEditingTestCase(undefined);
        toast({
          title: "Test Case Updated",
          description: "Your test case has been updated successfully!",
        });
      } else {
        await createTestCase(testCaseData);
        toast({
          title: "Test Case Created",
          description: "Your test case has been created successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save test case. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditTestCase = (testCase: TestCase) => {
    setEditingTestCase(testCase);
  };

  const handleDeleteTestCase = async (id: string) => {
    try {
      await deleteTestCase(id);
      toast({
        title: "Test Case Deleted",
        description: "Test case has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete test case.",
        variant: "destructive",
      });
    }
  };

  const handleRunTestCase = (testCase: TestCase) => {
    toast({
      title: "Test Running",
      description: `Running test case: ${testCase.name}`,
    });
  };

  const handleScheduleTestCase = (testCase: TestCase) => {
    toast({
      title: "Test Scheduled",
      description: `Scheduled test case: ${testCase.name}`,
    });
  };

  const handleViewVersions = (testCase: TestCase) => {
    toast({
      title: "Viewing Versions",
      description: `Viewing versions for: ${testCase.name}`,
    });
  };

  const handleDuplicateTestCase = (testCase: TestCase) => {
    const duplicated = {
      ...testCase,
      name: `${testCase.name} (Copy)`,
    };
    handleSaveTestCase(duplicated);
  };

  const handleAddStep = (step: any) => {
    toast({
      title: "Step Added",
      description: `Added step: ${step.name}`,
    });
  };

  const handleCancelTestCase = () => {
    setEditingTestCase(undefined);
  };

  // Calculate test statistics
  const totalTests = testCases.length;
  const activeTests = testCases.filter(tc => tc.status === 'active').length;
  const draftTests = testCases.filter(tc => tc.status === 'draft').length;

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
                  <h1 className="text-3xl font-bold">AI-Powered Testing Suite</h1>
                  <p className="text-muted-foreground mt-2">
                    Create intelligent tests with AI assistance and ensure deployment readiness
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Test Generator
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Test Case
                  </Button>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Tests</p>
                        <p className="text-2xl font-bold">{totalTests}</p>
                      </div>
                      <TestTube className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Tests</p>
                        <p className="text-2xl font-bold text-green-600">{activeTests}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Draft Tests</p>
                        <p className="text-2xl font-bold text-yellow-600">{draftTests}</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Quality Score</p>
                        <p className="text-2xl font-bold text-purple-600">85%</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-6">
                <LLMTaskRouter taskType="testing-suite" showDetails={true} />
              </div>

              <Tabs defaultValue="cases" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="cases">Test Cases</TabsTrigger>
                  <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
                  <TabsTrigger value="builder">Test Builder</TabsTrigger>
                  <TabsTrigger value="environment">Test Environment</TabsTrigger>
                  <TabsTrigger value="quality">Quality Assessment</TabsTrigger>
                  <TabsTrigger value="library">Step Library</TabsTrigger>
                </TabsList>

                <TabsContent value="cases" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Cases</CardTitle>
                      <CardDescription>
                        Manage your test cases and monitor their execution status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                          <p className="mt-2 text-sm text-gray-600">Loading test cases...</p>
                        </div>
                      ) : (
                        <TestCaseList 
                          testCases={testCases}
                          onEdit={handleEditTestCase}
                          onDelete={handleDeleteTestCase}
                          onRun={handleRunTestCase}
                          onSchedule={handleScheduleTestCase}
                          onViewVersions={handleViewVersions}
                          onDuplicate={handleDuplicateTestCase}
                        />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ai-generator" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI Test Generator
                      </CardTitle>
                      <CardDescription>
                        Generate comprehensive test cases using AI based on your application requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AITestGenerator onTestGenerated={handleSaveTestCase} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="builder" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Case Builder</CardTitle>
                      <CardDescription>
                        Create and edit test cases with our visual builder
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TestCaseBuilder 
                        testCase={editingTestCase}
                        onSave={handleSaveTestCase}
                        onCancel={handleCancelTestCase}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="environment" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Test Environment Configuration
                      </CardTitle>
                      <CardDescription>
                        Configure test environments and execution settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TestEnvironment />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quality" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Quality Assessment & Deployment Readiness
                      </CardTitle>
                      <CardDescription>
                        AI-powered analysis of your application's quality and deployment readiness
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <QualityAssessment testCases={testCases} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="library" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Step Library</CardTitle>
                      <CardDescription>
                        Reusable test steps and actions for building test cases
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <StepLibrary onAddStep={handleAddStep} />
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
