
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PLATFORM_FUNCTIONS } from './constants';

interface FunctionAllocationProps {
  providerId: string;
  selectedFunctions: string[];
  isConfigOpen: boolean;
  onConfigOpenChange: (open: boolean) => void;
  onFunctionToggle: (functionId: string, checked: boolean) => void;
}

const FunctionAllocation = ({
  providerId,
  selectedFunctions,
  isConfigOpen,
  onConfigOpenChange,
  onFunctionToggle,
}: FunctionAllocationProps) => {
  return (
    <Collapsible open={isConfigOpen} onOpenChange={onConfigOpenChange}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Settings2 className="h-4 w-4 mr-2" />
          Function Allocation
          {selectedFunctions.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {selectedFunctions.length}
            </Badge>
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 mt-3">
        <div className="text-sm text-gray-600 mb-2">
          Select which platform functions this model should handle:
        </div>
        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
          {PLATFORM_FUNCTIONS.map((func) => (
            <div key={func.id} className="flex items-center space-x-2">
              <Checkbox
                id={`${providerId}-${func.id}`}
                checked={selectedFunctions.includes(func.id)}
                onCheckedChange={(checked) => 
                  onFunctionToggle(func.id, checked as boolean)
                }
              />
              <Label 
                htmlFor={`${providerId}-${func.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {func.label}
              </Label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FunctionAllocation;
