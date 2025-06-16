
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Target } from 'lucide-react';
import { TestCase } from '@/types/testing';

interface GeneratedTestsListProps {
  generatedTests: Array<Partial<TestCase>>;
  onAcceptTest: (test: Partial<TestCase>) => void;
  onRejectTest: (test: Partial<TestCase>) => void;
}

const GeneratedTestsList = ({ generatedTests, onAcceptTest, onRejectTest }: GeneratedTestsListProps) => {
  if (generatedTests.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-600" />
          AI-Generated Test Cases ({generatedTests.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {generatedTests.map((test, index) => (
          <Card key={index} className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{test.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{test.category}</Badge>
                    <Badge variant="secondary">{test.steps?.length || 0} steps</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onAcceptTest(test)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Target className="h-3 w-3 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRejectTest(test)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <h5 className="font-medium mb-2">Generated Test Steps:</h5>
                <ol className="space-y-1">
                  {test.steps?.slice(0, 3).map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2">
                      <span className="text-xs bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span>{step.name}</span>
                    </li>
                  ))}
                  {(test.steps?.length || 0) > 3 && (
                    <li className="text-xs text-gray-500 ml-7">
                      +{(test.steps?.length || 0) - 3} more steps...
                    </li>
                  )}
                </ol>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default GeneratedTestsList;
