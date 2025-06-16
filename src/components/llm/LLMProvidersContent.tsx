import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lock, Settings, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LLMProviderCard from './LLMProviderCard';
import AdminPasswordManager from '@/components/admin/AdminPasswordManager';
import SpecializedEndpoints from './SpecializedEndpoints';

interface LLMProvider {
  id: string;
  name: string;
  description: string;
  apiKeyLabel: string;
  status: 'connected' | 'disconnected';
  website?: string;
}

interface LLMProvidersContentProps {
  onLock: () => void;
}

const LLMProvidersContent = ({ onLock }: LLMProvidersContentProps) => {
  const { toast } = useToast();

  const [providers, setProviders] = useState<LLMProvider[]>([
    {
      id: 'gpt4o',
      name: 'GPT-4o',
      description: 'Latest OpenAI model with advanced reasoning',
      apiKeyLabel: 'OpenAI API Key',
      status: 'disconnected',
      website: 'https://platform.openai.com/api-keys'
    },
    {
      id: 'o3',
      name: 'o3 / o1 (OpenAI)',
      description: 'Advanced reasoning models from OpenAI',
      apiKeyLabel: 'OpenAI API Key',
      status: 'disconnected',
      website: 'https://platform.openai.com/api-keys'
    },
    {
      id: 'gemini',
      name: 'Gemini',
      description: 'Google\'s multimodal AI model',
      apiKeyLabel: 'Google AI API Key',
      status: 'disconnected',
      website: 'https://makersuite.google.com/app/apikey'
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Anthropic\'s conversational AI assistant',
      apiKeyLabel: 'Anthropic API Key',
      status: 'disconnected',
      website: 'https://console.anthropic.com/settings/keys'
    },
    {
      id: 'perplexity',
      name: 'Perplexity',
      description: 'Real-time AI search and reasoning',
      apiKeyLabel: 'Perplexity API Key',
      status: 'disconnected',
      website: 'https://www.perplexity.ai/settings/api'
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
        description: `${providers.find(p => p.id === providerId)?.name} API key has been saved securely.`,
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

  const connectedCount = providers.filter(p => p.status === 'connected').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Secure Session Active</span>
        </div>
        <Button 
          variant="outline" 
          onClick={onLock}
          className="text-red-600 hover:text-red-700"
        >
          <Lock className="h-4 w-4 mr-2" />
          Lock Configuration
        </Button>
      </div>

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="providers" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            LLM Providers
          </TabsTrigger>
          <TabsTrigger value="specialized" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Specialized Endpoints
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Security Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="providers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>LLM Provider Configuration</span>
                <span className="text-sm font-normal text-gray-600">
                  {connectedCount} of {providers.length} connected
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providers.map((provider) => (
                  <LLMProviderCard
                    key={provider.id}
                    provider={provider}
                    apiKey={apiKeys[provider.id] || ''}
                    showKey={showKeys[provider.id] || false}
                    onApiKeyChange={(value) => handleApiKeyChange(provider.id, value)}
                    onToggleVisibility={() => toggleKeyVisibility(provider.id)}
                    onSave={() => saveApiKey(provider.id)}
                    onRemove={() => removeApiKey(provider.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specialized">
          <SpecializedEndpoints />
        </TabsContent>

        <TabsContent value="security">
          <AdminPasswordManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LLMProvidersContent;
