import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import TestCaseBuilder from '@/components/testing/TestCaseBuilder';
import TestCaseList from '@/components/testing/TestCaseList';
import StepLibrary from '@/components/testing/StepLibrary';
import { TestCase } from '@/types/testing';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Testing = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [editingTestCase, setEditingTestCase] = useState<TestCase | undefined>();
  
  const [testSuites] = useState([
    {
      id: '1',
      name: 'User Authentication Tests',
      status: 'passed',
      testCases: 12,
      lastRun: '2024-01-15',
    },
    {
      id: '2',
      name: 'API Integration Tests',
      status: 'running',
      testCases: 8,
      lastRun: '2024-01-15',
    },
    {
      id: '3',
      name: 'UI Component Tests',
      status: 'failed',
      testCases: 15,
      lastRun: '2024-01-14',
    },
  ]);

  const handleSaveTestCase = async (testCaseData: Partial<TestCase>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save test cases.",
        variant: "destructive",
      });
      return;
    }

    const newTestCase: TestCase = {
      id: crypto.randomUUID(),
      name: testCaseData.name || '',
      description: testCaseData.description || '',
      category: testCaseData.category || 'functional',
      status: 'draft',
      version: 1,
      steps: testCaseData.steps || [],
      conditions: testCaseData.conditions || {},
      data_sources: testCaseData.data_sources || {},
      assertions: testCaseData.assertions || [],
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setTestCases(prev => [...prev, newTestCase]);
    toast({
      title: "Test Case Saved",
      description: "Your test case has been saved successfully!",
    });
  };

  const handleEditTestCase = (testCase: TestCase) => {
    setEditingTestCase(testCase);
  };

  const handleDeleteTestCase = (id: string) => {
    setTestCases(prev => prev.filter(tc => tc.id !== id));
    toast({
      title: "Test Case Deleted",
      description: "Test case has been deleted.",
    });
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
      id: crypto.randomUUID(),
      name: `${testCase.name} (Copy)`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setTestCases(prev => [...prev, duplicated]);
    toast({
      title: "Test Case Duplicated",
      description: `Duplicated: ${testCase.name}`,
    });
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      passed: 'default',
      failed: 'destructive',
      running: 'secondary',
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status}
      </Badge>
    );
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
                  <h1 className="text-3xl font-bold">Testing Suite</h1>
                  <p className="text-muted-foreground mt-2">
                    Create, manage, and execute automated tests for your applications
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Test Suite
                </Button>
              </div>

              <Tabs defaultValue="suites" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="suites">Test Suites</TabsTrigger>
                  <TabsTrigger value="cases">Test Cases</TabsTrigger>
                  <TabsTrigger value="builder">Test Builder</TabsTrigger>
                  <TabsTrigger value="library">Step Library</TabsTrigger>
                </TabsList>

                <TabsContent value="suites" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testSuites.map((suite) => (
                      <Card key={suite.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{suite.name}</CardTitle>
                            {getStatusIcon(suite.status)}
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(suite.status)}
                            <span className="text-sm text-muted-foreground">
                              {suite.testCases} test cases
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Last run: {suite.lastRun}
                            </span>
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3 mr-1" />
                              Run
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cases" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Cases</CardTitle>
                      <CardDescription>
                        Manage individual test cases and their execution
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TestCaseList 
                        testCases={testCases}
                        onEdit={handleEditTestCase}
                        onDelete={handleDeleteTestCase}
                        onRun={handleRunTestCase}
                        onSchedule={handleScheduleTestCase}
                        onViewVersions={handleViewVersions}
                        onDuplicate={handleDuplicateTestCase}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="builder" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Case Builder</CardTitle>
                      <CardDescription>
                        Create new test cases with our visual builder
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
