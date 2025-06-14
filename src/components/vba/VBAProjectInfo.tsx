
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { VBARequirements } from './types';

interface VBAProjectInfoProps {
  requirements: VBARequirements;
  onInputChange: (field: keyof VBARequirements, value: any) => void;
}

const VBAProjectInfo = ({ requirements, onInputChange }: VBAProjectInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          placeholder="e.g., DataProcessor"
          value={requirements.projectName}
          onChange={(e) => onInputChange('projectName', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what your macro should do..."
          value={requirements.description}
          onChange={(e) => onInputChange('description', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sourceRange">Source Range</Label>
          <Input
            id="sourceRange"
            placeholder="e.g., A1:A100"
            value={requirements.sourceRange}
            onChange={(e) => onInputChange('sourceRange', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="targetRange">Target Range</Label>
          <Input
            id="targetRange"
            placeholder="e.g., B1:B100"
            value={requirements.targetRange}
            onChange={(e) => onInputChange('targetRange', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default VBAProjectInfo;
