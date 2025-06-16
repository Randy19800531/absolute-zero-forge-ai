
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { llmRouter } from '@/services/llmRouter';

interface LLMTaskRouterProps {
  taskType: string;
  showDetails?: boolean;
}

const LLMTaskRouter = ({ taskType, showDetails = false }: LLMTaskRouterProps) => {
  const { provider, isAvailable, fallbackProvider, fallbackAvailable } = llmRouter.getOptimalLLM(taskType);
  const mapping = llmRouter.getTaskMapping(taskType);

  const getStatusIcon = (available: boolean) => {
    return available ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusBadge = (available: boolean) => {
    return (
      <Badge variant={available ? 'default' : 'destructive'}>
        {available ? 'Connected' : 'Not Connected'}
      </Badge>
    );
  };

  if (!mapping) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-700">
              No LLM routing configured for this task type
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-blue-900">
          Optimal LLM Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(isAvailable)}
              <span className="font-medium text-sm">Primary: {provider.name}</span>
            </div>
            {getStatusBadge(isAvailable)}
          </div>
          
          {fallbackProvider && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(fallbackAvailable || false)}
                <span className="font-medium text-sm">Fallback: {fallbackProvider.name}</span>
              </div>
              {getStatusBadge(fallbackAvailable || false)}
            </div>
          )}
        </div>

        {showDetails && (
          <div className="pt-2 border-t border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>Why this pairing:</strong> {mapping.reasoning}
            </p>
          </div>
        )}

        {!isAvailable && !fallbackAvailable && (
          <div className="p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-xs text-red-700">
              ⚠️ No LLM providers configured. Please set up API keys in LLM Configuration.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LLMTaskRouter;
