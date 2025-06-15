
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronUp, ChevronDown, Trash2, Edit3 } from 'lucide-react';
import { TestStep } from '@/types/testing';

interface TestStepEditorProps {
  step: TestStep;
  index: number;
  onUpdate: (stepId: string, updates: Partial<TestStep>) => void;
  onRemove: (stepId: string) => void;
  onMove: (stepId: string, direction: 'up' | 'down') => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const TestStepEditor = ({
  step,
  index,
  onUpdate,
  onRemove,
  onMove,
  canMoveUp,
  canMoveDown
}: TestStepEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateParameter = (key: string, value: any) => {
    onUpdate(step.id, {
      parameters: { ...step.parameters, [key]: value }
    });
  };

  const renderParameterInput = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => updateParameter(key, e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">{key.replace(/_/g, ' ')}</span>
        </label>
      );
    }

    if (typeof value === 'number') {
      return (
        <div>
          <Label htmlFor={`${step.id}-${key}`} className="text-xs">
            {key.replace(/_/g, ' ')}
          </Label>
          <Input
            id={`${step.id}-${key}`}
            type="number"
            value={value}
            onChange={(e) => updateParameter(key, Number(e.target.value))}
            className="mt-1"
          />
        </div>
      );
    }

    return (
      <div>
        <Label htmlFor={`${step.id}-${key}`} className="text-xs">
          {key.replace(/_/g, ' ')}
        </Label>
        {key.includes('text') || key.includes('message') ? (
          <Textarea
            id={`${step.id}-${key}`}
            value={value || ''}
            onChange={(e) => updateParameter(key, e.target.value)}
            className="mt-1"
            rows={2}
          />
        ) : (
          <Input
            id={`${step.id}-${key}`}
            value={value || ''}
            onChange={(e) => updateParameter(key, e.target.value)}
            className="mt-1"
          />
        )}
      </div>
    );
  };

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
              {index + 1}
            </div>
            <div>
              <h4 className="font-medium">{step.name}</h4>
              <p className="text-sm text-gray-500">{step.type}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove(step.id, 'up')}
              disabled={!canMoveUp}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove(step.id, 'down')}
              disabled={!canMoveDown}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(step.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <div>
              <Label htmlFor={`${step.id}-description`} className="text-xs">
                Description
              </Label>
              <Textarea
                id={`${step.id}-description`}
                value={step.description || ''}
                onChange={(e) => onUpdate(step.id, { description: e.target.value })}
                placeholder="Optional step description"
                className="mt-1"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(step.parameters).map(([key, value]) => (
                <div key={key}>
                  {renderParameterInput(key, value)}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestStepEditor;
