
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUserRole } from '@/hooks/useUserRole';
import { Lock, Eye, EyeOff } from 'lucide-react';
import LLMProviderCard from './LLMProviderCard';

interface LLMProvider {
  id: string;
  name: string;
  description: string;
  apiKeyLabel: string;
  status: 'connected' | 'disconnected';
  website?: string;
}

const LLMProviders = () => {
  const { toast } = useToast();
  const { hasRole } = useUserRole();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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
    if (isUnlocked) {
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
    }
  }, [isUnlocked]);

  const verifyMasterPassword = async () => {
    setIsVerifying(true);
    
    try {
      // Simple master password verification - in production, this should be more secure
      const MASTER_PASSWORD = 'Admin@2024!';
      
      if (masterPassword === MASTER_PASSWORD) {
        setIsUnlocked(true);
        toast({
          title: "Access Granted",
          description: "LLM configuration unlocked successfully.",
        });
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid master password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "Unable to verify master password.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

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

  // Check if user has admin access
  if (!hasRole('admin')) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-6">
          <Lock className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Access Required</h2>
          <p className="text-gray-600">
            You need administrator privileges to access LLM configuration.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Show master password verification screen
  if (!isUnlocked) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            Secure LLM Configuration Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="master-password">Master Password</Label>
            <div className="relative">
              <Input
                id="master-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter master password..."
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && verifyMasterPassword()}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={verifyMasterPassword}
            className="w-full"
            disabled={!masterPassword.trim() || isVerifying}
          >
            {isVerifying ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Lock className="h-4 w-4 mr-2" />
            )}
            {isVerifying ? 'Verifying...' : 'Unlock Configuration'}
          </Button>

          <div className="text-xs text-gray-500 text-center mt-4">
            <p>🔒 This area contains sensitive API configurations</p>
            <p>Contact your system administrator for access</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          onClick={() => setIsUnlocked(false)}
          className="text-red-600 hover:text-red-700"
        >
          <Lock className="h-4 w-4 mr-2" />
          Lock Configuration
        </Button>
      </div>

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
    </div>
  );
};

export default LLMProviders;
