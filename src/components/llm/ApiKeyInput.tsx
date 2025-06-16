
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Shield } from 'lucide-react';

interface ApiKeyInputProps {
  providerId: string;
  apiKeyLabel: string;
  apiKey: string;
  showKey: boolean;
  onApiKeyChange: (value: string) => void;
  onToggleVisibility: () => void;
}

const ApiKeyInput = ({
  providerId,
  apiKeyLabel,
  apiKey,
  showKey,
  onApiKeyChange,
  onToggleVisibility,
}: ApiKeyInputProps) => {
  const getMaskedApiKey = () => {
    if (!apiKey) return '';
    if (showKey) return apiKey;
    return apiKey.length > 8 ? '••••••••' + apiKey.slice(-4) : '••••••••';
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`api-key-${providerId}`} className="flex items-center gap-2">
        {apiKeyLabel}
        <Shield className="h-3 w-3 text-gray-400" />
      </Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            id={`api-key-${providerId}`}
            type="password"
            placeholder="Enter your API key..."
            value={showKey ? apiKey : getMaskedApiKey()}
            onChange={(e) => onApiKeyChange(e.target.value)}
            className="pr-10 font-mono"
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
      <p className="text-xs text-gray-500">
        🔒 API keys are securely encrypted and stored locally
      </p>
    </div>
  );
};

export default ApiKeyInput;
