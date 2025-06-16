
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LLMProviderCard from './LLMProviderCard';
import { LLMProvider } from './types';

interface ProvidersTabProps {
  providers: LLMProvider[];
  apiKeys: Record<string, string>;
  showKeys: Record<string, boolean>;
  connectedCount: number;
  onApiKeyChange: (providerId: string, value: string) => void;
  onToggleVisibility: (providerId: string) => void;
  onSave: (providerId: string) => void;
  onRemove: (providerId: string) => void;
}

const ProvidersTab = ({
  providers,
  apiKeys,
  showKeys,
  connectedCount,
  onApiKeyChange,
  onToggleVisibility,
  onSave,
  onRemove
}: ProvidersTabProps) => {
  return (
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
              onApiKeyChange={(value) => onApiKeyChange(provider.id, value)}
              onToggleVisibility={() => onToggleVisibility(provider.id)}
              onSave={() => onSave(provider.id)}
              onRemove={() => onRemove(provider.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProvidersTab;
