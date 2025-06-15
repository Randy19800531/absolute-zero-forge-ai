
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Play, Save } from 'lucide-react';
import { TestCase, TestStep } from '@/types/testing';
import StepLibrary from './StepLibrary';
import TestStepEditor from './TestStepEditor';

interface TestCaseBuilderProps {
  testCase?: TestCase;
  onSave: (testCase: Partial<TestCase>) => Promise<void>;
  onCancel: () => void;
}

const TestCaseBuilder = ({ testCase, onSave, onCancel }: TestCaseBuilderProps) => {
  const [name, setName] = useState(testCase?.name || '');
  const [description, setDescription] = useState(testCase?.description || '');
  const [category, setCategory] = useState(testCase?.category || 'functional');
  const [steps, setSteps] = useState<TestStep[]>(testCase?.steps || []);
  const [saving, setSaving] = useState(false);

  const addStep = (stepTemplate: any) => {
    const newStep: TestStep = {
      id: crypto.randomUUID(),
      type: stepTemplate.type,
      name: stepTemplate.name,
      parameters: { ...stepTemplate.parameters },
      description: stepTemplate.description
    };
    setSteps(prev => [...prev, newStep]);
  };

  const updateStep = (stepId: string, updates: Partial<TestStep>) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  const removeStep = (stepId: string) => {
    setSteps(prev => prev.filter(step => step.id !== stepId));
  };

  const moveStep = (stepId: string, direction: 'up' | 'down') => {
    setSteps(prev => {
      const index = prev.findIndex(step => step.id === stepId);
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === prev.length - 1)) {
        return prev;
      }
      
      const newSteps = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
      return newSteps;
    });
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    
    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        description: description.trim(),
        category,
        steps,
        conditions: {},
        data_sources: {},
        assertions: []
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Case Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Test Case Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter test case name"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this test case validates"
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="functional">Functional</SelectItem>
                <SelectItem value="integration">Integration</SelectItem>
                <SelectItem value="regression">Regression</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="ui">UI/UX</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <StepLibrary onAddStep={addStep} />
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Test Steps ({steps.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {steps.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No steps added yet. Drag steps from the library or use natural language prompts.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <TestStepEditor
                      key={step.id}
                      step={step}
                      index={index}
                      onUpdate={updateStep}
                      onRemove={removeStep}
                      onMove={moveStep}
                      canMoveUp={index > 0}
                      canMoveDown={index < steps.length - 1}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!name.trim() || saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Test Case'}
        </Button>
      </div>
    </div>
  );
};

export default TestCaseBuilder;
