
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { formattingOptions } from './constants';
import { VBARequirements } from './types';

interface VBAFormattingProps {
  requirements: VBARequirements;
  onArrayChange: (field: 'transformations' | 'formatting', value: string, checked: boolean) => void;
}

const VBAFormatting = ({ requirements, onArrayChange }: VBAFormattingProps) => {
  return (
    <div>
      <Label className="text-base font-medium">Formatting Options</Label>
      <div className="mt-2 space-y-2">
        {formattingOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={requirements.formatting.includes(option)}
              onCheckedChange={(checked) => onArrayChange('formatting', option, checked === true)}
            />
            <Label htmlFor={option} className="text-sm">{option}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VBAFormatting;
