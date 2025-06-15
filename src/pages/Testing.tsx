
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube, Plus, ArrowLeft, BarChart3, Calendar, GitBranch, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTestCases } from '@/hooks/useTestCases';
import { useToast } from '@/hooks/use-toast';
import TestCaseBuilder from '@/components/testing/TestCaseBuilder';
import TestCaseList from '@/components/testing/TestCaseList';
import { TestCase } from '@/types/testing';

const Testing = () => {
  const [activeView, setActiveView] = useState<'list' | 'builder'>('list');
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    testCases,
    loading,
    error,
    createTestCase,
    updateTestCase,
    deleteTestCase
  } = useTestCases();

  const handleCreateNew = () => {
    setSelectedTestCase(null);
    setActiveView('builder');
  };

  const handleEdit = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setActiveView('builder');
  };

  const handleSave = async (testCaseData: Partial<TestCase>) => {
    try {
      if (selectedTestCase) {
        await updateTestCase(selectedTestCase.id, testCaseData);
        toast({
          title: 'Test case updated',
          description: 'Your test case has been updated successfully.'
        });
      } else {
        await createTestCase(testCaseData);
        toast({
          title: 'Test case created',
          description: 'Your test case has been created successfully.'
        });
      }
      setActiveView('list');
      setSelectedTestCase(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save test case. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this test case?')) {
      try {
        await deleteTestCase(id);
        toast({
          title: 'Test case deleted',
          description: 'The test case has been deleted successfully.'
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete test case. Please try again.',
          variant: 'destructive'
        });
      }
    }
  };

  const handleRun = (testCase: TestCase) => {
    toast({
      title: 'Test execution started',
      description: `Running test case: ${testCase.name}`
    });
    // TODO: Implement test execution
  };

  const handleSchedule = (testCase: TestCase) => {
    toast({
      title: 'Schedule test',
      description: `Opening scheduler for: ${testCase.name}`
    });
    // TODO: Implement scheduling
  };

  const handleViewVersions = (testCase: TestCase) => {
    toast({
      title: 'Version history',
      description: `Viewing versions for: ${testCase.name}`
    });
    // TODO: Implement version history
  };

  const handleDuplicate = async (testCase: TestCase) => {
    try {
      await createTestCase({
        ...testCase,
        name: `${testCase.name} (Copy)`,
        id: undefined,
        created_at: undefined,
        updated_at: undefined
      });
      toast({
        title: 'Test case duplicated',
        description: 'A copy of the test case has been created.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to duplicate test case. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const stats = {
    totalCases: testCases.length,
    activeCases: testCases.filter(tc => tc.status === 'active').length,
    passedTests: 0, // TODO: Calculate from test runs
    failedTests: 0  // TODO: Calculate from test runs
  };

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
                    <TestTube className="h-8 w-8 text-purple-500" />
                    Testing Module
                  </h1>
                  <p className="text-gray-600">
                    Visual script editor, auto-scheduling, and comprehensive test management
                  </p>
                </div>
                
                {activeView === 'list' && (
                  <Button onClick={handleCreateNew} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Test Case
                  </Button>
                )}
              </div>

              {activeView === 'list' ? (
                <div className="space-y-6">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Total Cases</p>
                            <p className="text-2xl font-bold">{stats.totalCases}</p>
                          </div>
                          <TestTube className="h-8 w-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Active Cases</p>
                            <p className="text-2xl font-bold">{stats.activeCases}</p>
                          </div>
                          <BarChart3 className="h-8 w-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Passed Tests</p>
                            <p className="text-2xl font-bold text-green-600">{stats.passedTests}</p>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Failed Tests</p>
                            <p className="text-2xl font-bold text-red-600">{stats.failedTests}</p>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                            <div className="h-4 w-4 rounded-full bg-red-500"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main Content Tabs */}
                  <Tabs defaultValue="test-cases" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="test-cases" className="flex items-center gap-2">
                        <TestTube className="h-4 w-4" />
                        Test Cases
                      </TabsTrigger>
                      <TabsTrigger value="schedules" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedules
                      </TabsTrigger>
                      <TabsTrigger value="history" className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4" />
                        History
                      </TabsTrigger>
                      <TabsTrigger value="reports" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Reports
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="test-cases" className="space-y-4">
                      {loading ? (
                        <Card>
                          <CardContent className="p-8">
                            <div className="animate-pulse space-y-4">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-20 bg-gray-200 rounded"></div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ) : error ? (
                        <Card>
                          <CardContent className="p-8 text-center text-red-600">
                            Error loading test cases: {error}
                          </CardContent>
                        </Card>
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
                    </TabsContent>
                    
                    <TabsContent value="schedules">
                      <Card>
                        <CardHeader>
                          <CardTitle>Test Schedules</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-500">Schedule management coming soon...</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="history">
                      <Card>
                        <CardHeader>
                          <CardTitle>Version History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-500">Git-like version tracking coming soon...</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="reports">
                      <Card>
                        <CardHeader>
                          <CardTitle>Test Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-500">Excel/PDF report generation coming soon...</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <TestCaseBuilder
                  testCase={selectedTestCase || undefined}
                  onSave={handleSave}
                  onCancel={() => {
                    setActiveView('list');
                    setSelectedTestCase(null);
                  }}
                />
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Testing;
