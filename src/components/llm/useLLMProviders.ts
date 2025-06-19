
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LLMProvider } from './types';

export const useLLMProviders = () => {
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

  const [conversationalProviders, setConversationalProviders] = useState<LLMProvider[]>([
    {
      id: 'openai-realtime',
      name: 'OpenAI Realtime API',
      description: 'Real-time voice conversation with GPT models',
      apiKeyLabel: 'OpenAI API Key (Realtime)',
      status: 'disconnected',
      website: 'https://platform.openai.com/api-keys'
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

      setConversationalProviders(prev => prev.map(provider => ({
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

      setConversationalProviders(prev => prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, status: 'connected' }
          : provider
      ));

      const allProviders = [...providers, ...conversationalProviders];
      toast({
        title: "API Key Saved",
        description: `${allProviders.find(p => p.id === providerId)?.name} API key has been saved securely.`,
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

    setConversationalProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: 'disconnected' }
        : provider
    ));

    const allProviders = [...providers, ...conversationalProviders];
    toast({
      title: "API Key Removed",
      description: `${allProviders.find(p => p.id === providerId)?.name} API key has been removed.`,
    });
  };

  const connectedCount = providers.filter(p => p.status === 'connected').length;
  const conversationalConnectedCount = conversationalProviders.filter(p => p.status === 'connected').length;

  return {
    providers,
    conversationalProviders,
    apiKeys,
    showKeys,
    connectedCount,
    conversationalConnectedCount,
    handleApiKeyChange,
    toggleKeyVisibility,
    saveApiKey,
    removeApiKey
  };
};
