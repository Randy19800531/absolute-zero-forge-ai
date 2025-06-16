
export interface LLMProvider {
  id: string;
  name: string;
  description: string;
  apiKeyLabel: string;
  status: 'connected' | 'disconnected';
  website?: string;
}

export interface LLMProvidersContentProps {
  onLock: () => void;
}
