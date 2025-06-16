
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, Check, AlertCircle, Trash2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ApiKeyInput from './ApiKeyInput';
import FunctionAllocation from './FunctionAllocation';

interface LLMProvider {
  id: string;
  name: string;
  description: string;
  apiKeyLabel: string;
  status: 'connected' | 'disconnected';
  website?: string;
}

interface LLMProviderCardProps {
  provider: LLMProvider;
  apiKey: string;
  showKey: boolean;
  onApiKeyChange: (value: string) => void;
  onToggleVisibility: () => void;
  onSave: () => void;
  onRemove: () => void;
}

const LLMProviderCard = ({
  provider,
  apiKey,
  showKey,
  onApiKeyChange,
  onToggleVisibility,
  onSave,
  onRemove,
}: LLMProviderCardProps) => {
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);

  const validateApiKey = async () => {
    if (!apiKey?.trim()) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      // Simple validation - just check if it looks like an API key
      if (apiKey.length < 10) {
        throw new Error("API key appears to be too short");
      }
      
      // Save function allocations
      const allocationKey = `llm-allocations-${provider.id}`;
      localStorage.setItem(allocationKey, JSON.stringify(selectedFunctions));
      
      onSave();
    } catch (error) {
      toast({
        title: "Validation Failed",
        description: "Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleFunctionToggle = (functionId: string, checked: boolean) => {
    setSelectedFunctions(prev => 
      checked 
        ? [...prev, functionId]
        : prev.filter(id => id !== functionId)
    );
  };

  // Load saved allocations on mount
  React.useEffect(() => {
    const allocationKey = `llm-allocations-${provider.id}`;
    const saved = localStorage.getItem(allocationKey);
    if (saved) {
      setSelectedFunctions(JSON.parse(saved));
    }
  }, [provider.id]);

  return (
    <Card className="border-2 hover:shadow-md transition-shadow relative">
      <div className="absolute top-2 right-2">
        <Shield className="h-4 w-4 text-green-500" />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{provider.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant={provider.status === 'connected' ? 'default' : 'secondary'}
              className={provider.status === 'connected' ? 'bg-green-100 text-green-800' : ''}
            >
              {provider.status === 'connected' ? (
                <Check className="h-3 w-3 mr-1" />
              ) : (
                <AlertCircle className="h-3 w-3 mr-1" />
              )}
              {provider.status}
            </Badge>
            {selectedFunctions.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {selectedFunctions.length} functions
              </Badge>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600">{provider.description}</p>
        {provider.website && (
          <a 
            href={provider.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            Get API Key →
          </a>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <ApiKeyInput
          providerId={provider.id}
          apiKeyLabel={provider.apiKeyLabel}
          apiKey={apiKey}
          showKey={showKey}
          onApiKeyChange={onApiKeyChange}
          onToggleVisibility={onToggleVisibility}
        />

        <FunctionAllocation
          providerId={provider.id}
          selectedFunctions={selectedFunctions}
          isConfigOpen={isConfigOpen}
          onConfigOpenChange={setIsConfigOpen}
          onFunctionToggle={handleFunctionToggle}
        />

        <div className="flex gap-2">
          <Button 
            onClick={validateApiKey}
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={!apiKey?.trim() || isValidating}
          >
            {isValidating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isValidating ? 'Saving...' : 'Save & Configure'}
          </Button>
          {provider.status === 'connected' && (
            <Button 
              variant="outline"
              onClick={onRemove}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMProviderCard;
