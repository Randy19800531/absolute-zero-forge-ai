
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Save, Check, AlertCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <Card className="border-2 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{provider.name}</CardTitle>
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
            {isValidating ? 'Validating...' : 'Save'}
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
