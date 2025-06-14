
import { useState } from 'react';
import { VBARequirements } from './types';

export const useVBARequirements = (onRequirementsChange: (requirements: VBARequirements) => void) => {
  const [requirements, setRequirements] = useState<VBARequirements>({
    projectName: '',
    description: '',
    sourceRange: '',
    targetRange: '',
    transformations: [],
    formatting: [],
    errorHandling: true,
    optimization: true,
  });

  const handleInputChange = (field: keyof VBARequirements, value: any) => {
    const updated = { ...requirements, [field]: value };
    setRequirements(updated);
    onRequirementsChange(updated);
  };

  const handleArrayChange = (field: 'transformations' | 'formatting', value: string, checked: boolean) => {
    const currentArray = requirements[field] || [];
    const updated = {
      ...requirements,
      [field]: checked 
        ? [...currentArray, value]
        : currentArray.filter(item => item !== value)
    };
    setRequirements(updated);
    onRequirementsChange(updated);
  };

  return {
    requirements,
    handleInputChange,
    handleArrayChange,
  };
};
