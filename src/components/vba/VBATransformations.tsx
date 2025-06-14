
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { transformationOptions } from './constants';
import { VBARequirements } from './types';

interface VBATransformationsProps {
  requirements: VBARequirements;
  onArrayChange: (field: 'transformations' | 'formatting', value: string, checked: boolean) => void;
}

const VBATransformations = ({ requirements, onArrayChange }: VBATransformationsProps) => {
  return (
    <div>
      <Label className="text-base font-medium">Data Transformations</Label>
      <div className="mt-2 space-y-2">
        {transformationOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={requirements.transformations.includes(option)}
              onCheckedChange={(checked) => onArrayChange('transformations', option, checked === true)}
            />
            <Label htmlFor={option} className="text-sm">{option}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VBATransformations;
