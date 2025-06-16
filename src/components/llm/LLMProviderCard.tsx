
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Save, Check, AlertCircle, Trash2, Settings2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

const PLATFORM_FUNCTIONS = [
  { id: 'ai-agents', label: 'AI Agents' },
  { id: 'low-no-code', label: 'Low/No Code Builder' },
  { id: 'workflow-builder', label: 'Workflow Builder' },
  { id: 'vba-generator', label: 'VBA Generator' },
  { id: 'testing-suite', label: 'Testing Suite' },
  { id: 'documentation', label: 'Documentation Assistant' },
  { id: 'code-analysis', label: 'Code Analysis' },
  { id: 'chat-support', label: 'General Chat Support' }
];

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
    <Card className="border-2 hover:shadow-md transition-shadow">
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
        <div className="space-y-2">
          <Label htmlFor={`api-key-${provider.id}`}>
            {provider.apiKeyLabel}
          </Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id={`api-key-${provider.id}`}
                type={showKey ? 'text' : 'password'}
                placeholder="Enter your API key..."
                value={apiKey || ''}
                onChange={(e) => onApiKeyChange(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={onToggleVisibility}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Function Allocation Section */}
        <Collapsible open={isConfigOpen} onOpenChange={setIsConfigOpen}>
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
                    id={`${provider.id}-${func.id}`}
                    checked={selectedFunctions.includes(func.id)}
                    onCheckedChange={(checked) => 
                      handleFunctionToggle(func.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`${provider.id}-${func.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {func.label}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex gap-2">
          <Button 
            onClick={validateApiKey}
            className="flex-1"
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
              className="flex items-center gap-2"
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
