
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Edit, Trash2, Calendar, Copy, History, FileText } from 'lucide-react';
import { TestCase } from '@/types/testing';

interface TestCaseListProps {
  testCases: TestCase[];
  onEdit: (testCase: TestCase) => void;
  onDelete: (id: string) => Promise<void>;
  onRun: (testCase: TestCase) => void;
  onSchedule: (testCase: TestCase) => void;
  onViewVersions: (testCase: TestCase) => void;
  onDuplicate: (testCase: TestCase) => void;
}

const TestCaseList: React.FC<TestCaseListProps> = ({
  testCases,
  onEdit,
  onDelete,
  onRun,
  onSchedule,
  onViewVersions,
  onDuplicate
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'functional': return 'bg-blue-100 text-blue-800';
      case 'integration': return 'bg-purple-100 text-purple-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'usability': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Failed to delete test case:', error);
      }
    }
  };

  if (testCases.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No test cases found</p>
          <p className="text-sm text-gray-500 mt-2">Create your first test case to get started</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {testCases.map((testCase) => (
        <Card key={testCase.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{testCase.name}</CardTitle>
                {testCase.description && (
                  <p className="text-sm text-gray-600 mt-1">{testCase.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(testCase.status)}>
                  {testCase.status}
                </Badge>
                <Badge variant="outline" className={getCategoryColor(testCase.category)}>
                  {testCase.category}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
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
                  <p className="text-gray-600">v{testCase.version}</p>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>Created: {new Date(testCase.created_at).toLocaleDateString()}</p>
                <p>Updated: {new Date(testCase.updated_at).toLocaleDateString()}</p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onRun(testCase)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(testCase)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSchedule(testCase)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDuplicate(testCase)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewVersions(testCase)}
                  >
                    <History className="h-4 w-4 mr-2" />
                    Versions
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(testCase.id, testCase.name)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestCaseList;
