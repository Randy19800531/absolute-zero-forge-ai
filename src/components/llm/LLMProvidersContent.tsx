
import React from 'react';
import { Settings, ExternalLink, Lock, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminPasswordManager from '@/components/admin/AdminPasswordManager';
import SpecializedEndpoints from './SpecializedEndpoints';
import SessionStatus from './SessionStatus';
import ProvidersTab from './ProvidersTab';
import ConversationalTab from './ConversationalTab';
import { useLLMProviders } from './useLLMProviders';
import { LLMProvidersContentProps } from './types';

const LLMProvidersContent = ({ onLock }: LLMProvidersContentProps) => {
  const {
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
  } = useLLMProviders();

  return (
    <div className="space-y-6">
      <SessionStatus onLock={onLock} />

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="providers" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            LLM Providers
          </TabsTrigger>
          <TabsTrigger value="conversational" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Voice Chat
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
          <ProvidersTab
            providers={providers}
            apiKeys={apiKeys}
            showKeys={showKeys}
            connectedCount={connectedCount}
            onApiKeyChange={handleApiKeyChange}
            onToggleVisibility={toggleKeyVisibility}
            onSave={saveApiKey}
            onRemove={removeApiKey}
          />
        </TabsContent>

        <TabsContent value="conversational">
          <ConversationalTab
            providers={conversationalProviders}
            apiKeys={apiKeys}
            showKeys={showKeys}
            connectedCount={conversationalConnectedCount}
            onApiKeyChange={handleApiKeyChange}
            onToggleVisibility={toggleKeyVisibility}
            onSave={saveApiKey}
            onRemove={removeApiKey}
          />
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
