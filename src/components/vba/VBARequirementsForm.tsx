
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Zap, FileSpreadsheet } from 'lucide-react';
import { VBARequirementsFormProps } from './types';
import { useVBARequirements } from './useVBARequirements';
import { generateVBACode } from './vbaGenerator';
import VBAProjectInfo from './VBAProjectInfo';
import VBATransformations from './VBATransformations';
import VBAFormatting from './VBAFormatting';
import VBAAdvancedOptions from './VBAAdvancedOptions';

const VBARequirementsForm = ({ onRequirementsChange, onCodeGenerated }: VBARequirementsFormProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const { requirements, handleInputChange, handleArrayChange } = useVBARequirements(onRequirementsChange);

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    
    try {
      const generatedCode = await generateVBACode(requirements);
      onCodeGenerated(generatedCode);
      toast({
        title: "VBA Code Generated",
        description: "Your Excel macro has been generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate VBA code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          VBA Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <VBAProjectInfo 
          requirements={requirements}
          onInputChange={handleInputChange}
        />

        <Separator />

        <VBATransformations 
          requirements={requirements}
          onArrayChange={handleArrayChange}
        />

        <Separator />

        <VBAFormatting 
          requirements={requirements}
          onArrayChange={handleArrayChange}
        />

        <Separator />

        <VBAAdvancedOptions 
          requirements={requirements}
          onInputChange={handleInputChange}
        />

        <Button 
          onClick={handleGenerateCode}
          disabled={isGenerating || !requirements.projectName}
          className="w-full"
        >
          <Zap className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate VBA Code'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VBARequirementsForm;
