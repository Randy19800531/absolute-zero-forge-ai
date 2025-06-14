
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { VBARequirements } from './types';

interface VBAAdvancedOptionsProps {
  requirements: VBARequirements;
  onInputChange: (field: keyof VBARequirements, value: any) => void;
}

const VBAAdvancedOptions = ({ requirements, onInputChange }: VBAAdvancedOptionsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="errorHandling"
          checked={requirements.errorHandling}
          onCheckedChange={(checked) => onInputChange('errorHandling', checked === true)}
        />
        <Label htmlFor="errorHandling">Include error handling</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="optimization"
          checked={requirements.optimization}
          onCheckedChange={(checked) => onInputChange('optimization', checked === true)}
        />
        <Label htmlFor="optimization">Code optimization</Label>
      </div>
    </div>
  );
};

export default VBAAdvancedOptions;
