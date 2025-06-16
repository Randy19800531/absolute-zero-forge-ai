
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Brain, Wand2, FileText, Target, Download, Trash2 } from 'lucide-react';
import { TestCase } from '@/types/testing';

interface AITestGeneratorProps {
  onTestGenerated: (testCase: Partial<TestCase>) => Promise<void>;
}

const AITestGenerator = ({ onTestGenerated }: AITestGeneratorProps) => {
  const [description, setDescription] = useState('');
  const [appType, setAppType] = useState('');
  const [testType, setTestType] = useState('');
  const [complexity, setComplexity] = useState('medium');
  const [generating, setGenerating] = useState(false);
  const [generatedTests, setGeneratedTests] = useState<Array<Partial<TestCase>>>([]);

  const handleGenerateTests = async () => {
    if (!description.trim()) return;

    setGenerating(true);
    try {
      // Simulate AI test generation
      const aiGeneratedTests = await generateTestsWithAI({
        description,
        appType,
        testType,
        complexity
      });
      
      setGeneratedTests(aiGeneratedTests);
    } catch (error) {
      console.error('Error generating tests:', error);
    } finally {
      setGenerating(false);
    }
  };

  const generateTestsWithAI = async (params: any): Promise<Array<Partial<TestCase>>> => {
    // This would integrate with your AI service
    // For now, return mock generated tests based on input
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI processing

    const baseTests = [
      {
        name: `User Authentication Test - ${params.appType}`,
        description: `Comprehensive authentication testing for ${params.description}`,
        category: 'functional',
        steps: [
          {
            id: crypto.randomUUID(),
            type: 'navigate' as const,
            name: 'Navigate to login page',
            parameters: { url: '/login' }
          },
          {
            id: crypto.randomUUID(),
            type: 'type' as const,
            name: 'Enter valid credentials',
            parameters: { selector: '#email', value: 'test@example.com' }
          },
          {
            id: crypto.randomUUID(),
            type: 'click' as const,
            name: 'Click login button',
            parameters: { selector: '#login-btn' }
          },
          {
            id: crypto.randomUUID(),
            type: 'assert' as const,
            name: 'Verify successful login',
            parameters: { selector: '.dashboard', expected: 'Dashboard' }
          }
        ]
      },
      {
        name: `Data Validation Test - ${params.testType}`,
        description: `Input validation and error handling for ${params.description}`,
        category: 'functional',
        steps: [
          {
            id: crypto.randomUUID(),
            type: 'navigate' as const,
            name: 'Navigate to form',
            parameters: { url: '/form' }
          },
          {
            id: crypto.randomUUID(),
            type: 'type' as const,
            name: 'Enter invalid data',
            parameters: { selector: '#input-field', value: 'invalid@' }
          },
          {
            id: crypto.randomUUID(),
            type: 'click' as const,
            name: 'Submit form',
            parameters: { selector: '#submit-btn' }
          },
          {
            id: crypto.randomUUID(),
            type: 'assert' as const,
            name: 'Verify error message',
            parameters: { selector: '.error-message', expected: 'Invalid email format' }
          }
        ]
      }
    ];

    if (params.complexity === 'high') {
      baseTests.push({
        name: `Performance Test - ${params.appType}`,
        description: `Load testing and performance validation for ${params.description}`,
        category: 'performance',
        steps: [
          {
            id: crypto.randomUUID(),
            type: 'navigate' as const,
            name: 'Load application',
            parameters: { url: '/' }
          },
          {
            id: crypto.randomUUID(),
            type: 'wait' as const,
            name: 'Measure load time',
            parameters: { duration: 3000 }
          },
          {
            id: crypto.randomUUID(),
            type: 'assert' as const,
            name: 'Verify load time under 3s',
            parameters: { metric: 'loadTime', threshold: 3000 }
          }
        ]
      });
    }

    return baseTests;
  };

  const handleAcceptTest = async (test: Partial<TestCase>) => {
    await onTestGenerated(test);
    setGeneratedTests(prev => prev.filter(t => t !== test));
  };

  const handlePurgeOldTests = () => {
    setGeneratedTests([]);
    setDescription('');
    setAppType('');
    setTestType('');
    setComplexity('medium');
  };

  const handleExportTests = () => {
    const dataToExport = {
      generatedTests,
      metadata: {
        description,
        appType,
        testType,
        complexity,
        exportDate: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-generated-tests-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Test Generation Parameters
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportTests}
                disabled={generatedTests.length === 0}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Tests
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePurgeOldTests}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Application/Feature Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your application or feature that needs testing. Be as detailed as possible..."
              className="min-h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="appType">Application Type</Label>
              <Select value={appType} onValueChange={setAppType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select app type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-app">Web Application</SelectItem>
                  <SelectItem value="mobile-app">Mobile Application</SelectItem>
                  <SelectItem value="api">API/Service</SelectItem>
                  <SelectItem value="desktop">Desktop Application</SelectItem>
                  <SelectItem value="e-commerce">E-commerce Platform</SelectItem>
                  <SelectItem value="cms">Content Management System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="testType">Primary Test Focus</Label>
              <Select value={testType} onValueChange={setTestType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select test focus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="functional">Functional Testing</SelectItem>
                  <SelectItem value="ui-ux">UI/UX Testing</SelectItem>
                  <SelectItem value="performance">Performance Testing</SelectItem>
                  <SelectItem value="security">Security Testing</SelectItem>
                  <SelectItem value="integration">Integration Testing</SelectItem>
                  <SelectItem value="accessibility">Accessibility Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="complexity">Test Complexity</Label>
              <Select value={complexity} onValueChange={setComplexity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (5-10 tests)</SelectItem>
                  <SelectItem value="medium">Medium (10-20 tests)</SelectItem>
                  <SelectItem value="high">Comprehensive (20+ tests)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleGenerateTests}
            disabled={!description.trim() || generating}
            className="w-full"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Tests with AI...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Test Cases with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedTests.length > 0 && (
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
                        onClick={() => handleAcceptTest(test)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Target className="h-3 w-3 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setGeneratedTests(prev => prev.filter(t => t !== test))}
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
      )}
    </div>
  );
};

export default AITestGenerator;
