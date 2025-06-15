
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Edit, Trash2, Calendar, GitBranch, Copy } from 'lucide-react';
import { TestCase } from '@/types/testing';
import { formatDistanceToNow } from 'date-fns';

interface TestCaseListProps {
  testCases: TestCase[];
  onEdit: (testCase: TestCase) => void;
  onDelete: (id: string) => void;
  onRun: (testCase: TestCase) => void;
  onSchedule: (testCase: TestCase) => void;
  onViewVersions: (testCase: TestCase) => void;
  onDuplicate: (testCase: TestCase) => void;
}

const TestCaseList = ({
  testCases,
  onEdit,
  onDelete,
  onRun,
  onSchedule,
  onViewVersions,
  onDuplicate
}: TestCaseListProps) => {
  const [selectedCases, setSelectedCases] = useState<string[]>([]);

  const getCategoryColor = (category: string) => {
    const colors = {
      functional: 'bg-blue-100 text-blue-800',
      integration: 'bg-green-100 text-green-800',
      regression: 'bg-purple-100 text-purple-800',
      performance: 'bg-orange-100 text-orange-800',
      security: 'bg-red-100 text-red-800',
      ui: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      archived: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (testCases.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-gray-500">
            <Play className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No test cases yet</h3>
            <p>Create your first test case to get started with automated testing.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {testCases.map((testCase) => (
        <Card key={testCase.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-lg">{testCase.name}</CardTitle>
                  <Badge className={getCategoryColor(testCase.category)}>
                    {testCase.category}
                  </Badge>
                  <Badge className={getStatusColor(testCase.status)}>
                    {testCase.status}
                  </Badge>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    v{testCase.version}
                  </span>
                </div>
                {testCase.description && (
                  <p className="text-sm text-gray-600 mt-1">{testCase.description}</p>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRun(testCase)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(testCase)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSchedule(testCase)}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewVersions(testCase)}
                >
                  <GitBranch className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDuplicate(testCase)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(testCase.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>{testCase.steps?.length || 0} steps</span>
                <span>Created {formatDistanceToNow(new Date(testCase.created_at))} ago</span>
              </div>
              <div>
                Last updated {formatDistanceToNow(new Date(testCase.updated_at))} ago
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestCaseList;
