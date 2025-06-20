
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MessageCircle, Volume2 } from 'lucide-react';
import LLMProviderCard from './LLMProviderCard';
import SystemStatusIndicator from '../ai/voice/SystemStatusIndicator';
import { LLMProvider } from './types';

interface ConversationalTabProps {
  providers: LLMProvider[];
  apiKeys: Record<string, string>;
  showKeys: Record<string, boolean>;
  connectedCount: number;
  onApiKeyChange: (providerId: string, value: string) => void;
  onToggleVisibility: (providerId: string) => void;
  onSave: (providerId: string) => void;
  onRemove: (providerId: string) => void;
}

const ConversationalTab = ({
  providers,
  apiKeys,
  showKeys,
  connectedCount,
  onApiKeyChange,
  onToggleVisibility,
  onSave,
  onRemove
}: ConversationalTabProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <MessageCircle className="h-5 w-5" />
            Absolute-0.AI Voice Chat & Conversational AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span>Real-time voice conversations</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <span>Speech-to-speech AI interactions</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Configuration Status:</strong> Your Absolute-0.AI custom API key "ABSOLUTE_0_AI_CONVERSATIONAL_API_KEY" 
              is configured in Supabase secrets and ready for voice chat functionality.
            </p>
          </div>
          <div className="mt-3 p-3 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>✅ Ready:</strong> The OpenAI Realtime API is configured with your Absolute-0.AI custom key. 
              You can now use the Voice Chat feature in the AI Engine.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* System Status Diagnostics */}
      <SystemStatusIndicator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Absolute-0.AI Conversational Configuration</span>
            <Badge variant="default" className="bg-green-100 text-green-800">
              API Key Configured in Supabase
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
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
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Your Absolute-0.AI API key "ABSOLUTE_0_AI_CONVERSATIONAL_API_KEY" is already configured 
              in Supabase secrets. The voice chat functionality will use this key automatically.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationalTab;
