
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTestCases } from '@/hooks/useTestCases';

const TestCaseList = () => {
  const { toast } = useToast();
  const { testCases, loading, deleteTestCase, runTestCase } = useTestCases();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const categories = ['functional', 'integration', 'performance', 'security', 'usability'];
  const statuses = ['draft', 'active', 'deprecated'];

  const filteredTestCases = testCases.filter(testCase => {
    const matchesSearch = testCase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testCase.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || testCase.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || testCase.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'functional': return 'bg-blue-100 text-blue-800';
      case 'integration': return 'bg-purple-100 text-purple-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'usability': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRunTest = async (testCaseId: string) => {
    try {
      await runTestCase(testCaseId);
      toast({
        title: "Test Started",
        description: "Test case execution has been initiated",
      });
    } catch (error) {
      toast({
        title: "Execution Failed",
        description: "Failed to start test execution",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTest = async (testCaseId: string) => {
    if (!confirm('Are you sure you want to delete this test case?')) return;

    try {
      await deleteTestCase(testCaseId);
      toast({
        title: "Test Deleted",
        description: "Test case has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: "Failed to delete test case",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search test cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center text-sm text-gray-600">
              {filteredTestCases.length} of {testCases.length} test cases
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Cases List */}
      <div className="space-y-4">
        {filteredTestCases.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No test cases found matching your criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredTestCases.map(testCase => (
            <Card key={testCase.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{testCase.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{testCase.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(testCase.status)}>
                      {testCase.status}
                    </Badge>
                    <Badge className={getCategoryColor(testCase.category)}>
                      {testCase.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Steps:</span>
                      <p className="text-gray-600">{testCase.steps?.length || 0}</p>
                    </div>
                    <div>
                      <span className="font-medium">Assertions:</span>
                      <p className="text-gray-600">{testCase.assertions?.length || 0}</p>
                    </div>
                    <div>
                      <span className="font-medium">Version:</span>
                      <p className="text-gray-600">v{testCase.version || 1}</p>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <p className="text-gray-600">
                        {new Date(testCase.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRunTest(testCase.id)}
                        disabled={testCase.status === 'deprecated'}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Run Test
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTest(testCase.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TestCaseList;
