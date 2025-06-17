
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TestStepEditor from './TestStepEditor';

interface TestStep {
  id: string;
  action: string;
  target: string;
  value?: string;
  expected?: string;
}

interface TestCase {
  name: string;
  description: string;
  category: string;
  steps: TestStep[];
  assertions: string[];
  conditions: Record<string, any>;
}

const TestCaseBuilder = () => {
  const { toast } = useToast();
  const [testCase, setTestCase] = useState<TestCase>({
    name: '',
    description: '',
    category: 'functional',
    steps: [],
    assertions: [],
    conditions: {}
  });

  const [newAssertion, setNewAssertion] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    'functional',
    'integration',
    'performance',
    'security',
    'usability'
  ];

  const addStep = () => {
    const newStep: TestStep = {
      id: Date.now().toString(),
      action: '',
      target: '',
      value: '',
      expected: ''
    };
    setTestCase(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const updateStep = (stepId: string, updates: Partial<TestStep>) => {
    setTestCase(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    }));
  };

  const removeStep = (stepId: string) => {
    setTestCase(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  };

  const addAssertion = () => {
    if (newAssertion.trim()) {
      setTestCase(prev => ({
        ...prev,
        assertions: [...prev.assertions, newAssertion.trim()]
      }));
      setNewAssertion('');
    }
  };

  const removeAssertion = (index: number) => {
    setTestCase(prev => ({
      ...prev,
      assertions: prev.assertions.filter((_, i) => i !== index)
    }));
  };

  const saveTestCase = async () => {
    if (!testCase.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a test case name",
        variant: "destructive"
      });
      return;
    }

    if (testCase.steps.length === 0) {
      toast({
        title: "Missing Steps",
        description: "Please add at least one test step",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      // TODO: Implement save to Supabase
      console.log('Saving test case:', testCase);
      
      toast({
        title: "Test Case Saved",
        description: `${testCase.name} has been saved successfully`,
      });

      // Reset form
      setTestCase({
        name: '',
        description: '',
        category: 'functional',
        steps: [],
        assertions: [],
        conditions: {}
      });

    } catch (error) {
      console.error('Error saving test case:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save test case. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const runTestCase = () => {
    toast({
      title: "Test Execution",
      description: "Test execution feature coming soon",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Build New Test Case</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Test Case Name</Label>
                <Input
                  id="name"
                  value={testCase.name}
                  onChange={(e) => setTestCase(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter test case name"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={testCase.category}
                  onValueChange={(value) => setTestCase(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={testCase.description}
                onChange={(e) => setTestCase(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this test case validates"
                rows={5}
              />
            </div>
          </div>

          {/* Test Steps */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Test Steps</Label>
              <Button onClick={addStep} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>

            <div className="space-y-4">
              {testCase.steps.map((step, index) => (
                <TestStepEditor
                  key={step.id}
                  step={step}
                  stepNumber={index + 1}
                  onUpdate={(updates) => updateStep(step.id, updates)}
                  onRemove={() => removeStep(step.id)}
                />
              ))}

              {testCase.steps.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No test steps added yet</p>
                  <Button onClick={addStep} variant="outline" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Step
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Assertions */}
          <div>
            <Label>Test Assertions</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newAssertion}
                onChange={(e) => setNewAssertion(e.target.value)}
                placeholder="Add assertion (e.g., Page title should be 'Welcome')"
                onKeyPress={(e) => e.key === 'Enter' && addAssertion()}
              />
              <Button onClick={addAssertion} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {testCase.assertions.map((assertion, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {assertion}
                  <button
                    onClick={() => removeAssertion(index)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-6 border-t">
            <Button onClick={runTestCase} variant="outline">
              <Play className="h-4 w-4 mr-2" />
              Run Test
            </Button>

            <Button onClick={saveTestCase} disabled={isSaving}>
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save Test Case'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestCaseBuilder;
