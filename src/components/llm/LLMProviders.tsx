
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Save, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LLMProvider {
  id: string;
  name: string;
  description: string;
  apiKeyLabel: string;
  status: 'connected' | 'disconnected';
}

const LLMProviders = () => {
  const { toast } = useToast();
  const [providers, setProviders] = useState<LLMProvider[]>([
    {
      id: 'gpt4o',
      name: 'GPT-4o',
      description: 'Latest OpenAI model with advanced reasoning',
      apiKeyLabel: 'OpenAI API Key',
      status: 'disconnected'
    },
    {
      id: 'o3',
      name: 'o3 / o1 (OpenAI)',
      description: 'Advanced reasoning models from OpenAI',
      apiKeyLabel: 'OpenAI API Key',
      status: 'disconnected'
    },
    {
      id: 'gemini',
      name: 'Gemini',
      description: 'Google\'s multimodal AI model',
      apiKeyLabel: 'Google AI API Key',
      status: 'disconnected'
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Anthropic\'s conversational AI assistant',
      apiKeyLabel: 'Anthropic API Key',
      status: 'disconnected'
    },
    {
      id: 'grok',
      name: 'Grok (xAI)',
      description: 'xAI\'s conversational AI model',
      apiKeyLabel: 'xAI API Key',
      status: 'disconnected'
    }
  ]);

  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load saved API keys from localStorage
    const savedKeys = localStorage.getItem('llm-api-keys');
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setApiKeys(keys);
      
      // Update provider status based on saved keys
      setProviders(prev => prev.map(provider => ({
        ...provider,
        status: keys[provider.id] ? 'connected' : 'disconnected'
      })));
    }
  }, []);

  const handleApiKeyChange = (providerId: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [providerId]: value
    }));
  };

  const toggleKeyVisibility = (providerId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  const saveApiKey = (providerId: string) => {
    const updatedKeys = { ...apiKeys };
    const currentKey = apiKeys[providerId];

    if (currentKey && currentKey.trim()) {
      // Save to localStorage
      localStorage.setItem('llm-api-keys', JSON.stringify(updatedKeys));
      
      // Update provider status
      setProviders(prev => prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, status: 'connected' }
          : provider
      ));

      toast({
        title: "API Key Saved",
        description: `${providers.find(p => p.id === providerId)?.name} API key has been saved successfully.`,
      });
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
    }
  };

  const removeApiKey = (providerId: string) => {
    const updatedKeys = { ...apiKeys };
    delete updatedKeys[providerId];
    
    localStorage.setItem('llm-api-keys', JSON.stringify(updatedKeys));
    setApiKeys(updatedKeys);
    
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: 'disconnected' }
        : provider
    ));

    toast({
      title: "API Key Removed",
      description: `${providers.find(p => p.id === providerId)?.name} API key has been removed.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LLM Provider Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id} className="border-2">
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
                          type={showKeys[provider.id] ? 'text' : 'password'}
                          placeholder="Enter your API key..."
                          value={apiKeys[provider.id] || ''}
                          onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => toggleKeyVisibility(provider.id)}
                        >
                          {showKeys[provider.id] ? (
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
                      onClick={() => saveApiKey(provider.id)}
                      className="flex-1"
                      disabled={!apiKeys[provider.id]?.trim()}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    {provider.status === 'connected' && (
                      <Button 
                        variant="outline"
                        onClick={() => removeApiKey(provider.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LLMProviders;
