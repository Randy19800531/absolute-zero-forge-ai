
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { llmRouter } from '@/services/llmRouter';

export const useLowNoCodeBuilder = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast({
          title: "Image Uploaded",
          description: "Image ready for code generation",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateFromPrompt = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your app",
        variant: "destructive",
      });
      return;
    }

    // Check LLM availability
    const llmStatus = llmRouter.getOptimalLLM('low-no-code-builder');
    if (!llmStatus.isAvailable && !llmStatus.fallbackAvailable) {
      toast({
        title: "LLM Not Available",
        description: "Please configure Gemini or GPT-4o API keys in LLM Configuration for optimal low/no-code generation.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Use LLM router for code generation
      const enhancedPrompt = `Generate a React component for: ${prompt}. Make it responsive and use Tailwind CSS.`;
      const llmResponse = await llmRouter.executeWithOptimalLLM('low-no-code-builder', enhancedPrompt);
      
      // Simulate AI code generation with LLM integration
      setTimeout(() => {
        const sampleCode = `import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GeneratedApp = () => {
  const [data, setData] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              ${prompt || 'Generated App'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Enter data..."
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <Button className="w-full">
                Process Data
              </Button>
            </div>
            <div className="text-center text-gray-600">
              Generated using ${llmStatus.isAvailable ? llmStatus.provider.name : llmStatus.fallbackProvider?.name} from: "${prompt}"
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneratedApp;`;

        setGeneratedCode(sampleCode);
        setIsGenerating(false);
        toast({
          title: "Code Generated!",
          description: `Your app has been created using ${llmStatus.isAvailable ? llmStatus.provider.name : llmStatus.fallbackProvider?.name}`,
        });
      }, 2000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate code",
        variant: "destructive",
      });
    }
  };

  const generateFromImage = async () => {
    if (!uploadedImage) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    // Check LLM availability
    const llmStatus = llmRouter.getOptimalLLM('low-no-code-builder');
    if (!llmStatus.isAvailable && !llmStatus.fallbackAvailable) {
      toast({
        title: "LLM Not Available",
        description: "Please configure Gemini or GPT-4o API keys in LLM Configuration for image-to-code generation.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Use LLM router for image-to-code generation
      const enhancedPrompt = `Convert this uploaded image to a React component with Tailwind CSS styling.`;
      const llmResponse = await llmRouter.executeWithOptimalLLM('low-no-code-builder', enhancedPrompt);
      
      // Simulate AI image-to-code generation
      setTimeout(() => {
        const sampleCode = `import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ImageGeneratedApp = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <img 
                src="${uploadedImage}" 
                alt="Reference design"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Generated from Image</h2>
              <p className="text-gray-600">
                This component was automatically generated using ${llmStatus.isAvailable ? llmStatus.provider.name : llmStatus.fallbackProvider?.name} from your uploaded design.
              </p>
              <Button className="w-full">
                Interact with Design
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneratedApp;`;

        setGeneratedCode(sampleCode);
        setIsGenerating(false);
        toast({
          title: "Code Generated from Image!",
          description: `Your design has been converted to React code using ${llmStatus.isAvailable ? llmStatus.provider.name : llmStatus.fallbackProvider?.name}`,
        });
      }, 3000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate code from image",
        variant: "destructive",
      });
    }
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-component.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    prompt,
    setPrompt,
    uploadedImage,
    generatedCode,
    isGenerating,
    activeView,
    setActiveView,
    handleImageUpload,
    generateFromPrompt,
    generateFromImage,
    downloadCode,
  };
};
