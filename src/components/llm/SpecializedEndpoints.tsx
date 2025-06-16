import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, ExternalLink, Trash2, Save, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { llmRouter } from '@/services/llmRouter';

interface SpecializedEndpoint {
  taskType: string;
  url: string;
  name: string;
  description?: string;
}

const TASK_TYPES = [
  { id: 'ai-agents', label: 'AI Agents', primaryLLM: 'GPT-4o' },
  { id: 'low-no-code-builder', label: 'Low/No Code Builder', primaryLLM: 'Gemini' },
  { id: 'workflow-builder', label: 'Workflow Builder', primaryLLM: 'o3 / o1' },
  { id: 'vba-generator', label: 'VBA Generator', primaryLLM: 'GPT-4o' },
  { id: 'testing-suite', label: 'Testing Suite', primaryLLM: 'o3 / o1' },
  { id: 'documentation', label: 'Documentation', primaryLLM: 'Claude' },
  { id: 'code-analysis', label: 'Code Analysis', primaryLLM: 'o3 / o1' }
];

const SpecializedEndpoints = () => {
  const { toast } = useToast();
  const [endpoints, setEndpoints] = useState<SpecializedEndpoint[]>([]);
  const [newEndpoint, setNewEndpoint] = useState({
    taskType: '',
    url: '',
    name: '',
    description: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadEndpoints();
  }, []);

  const loadEndpoints = () => {
    const saved = localStorage.getItem('specialized-llm-endpoints');
    if (saved) {
      setEndpoints(JSON.parse(saved));
    }
  };

  const saveEndpoint = () => {
    if (!newEndpoint.taskType || !newEndpoint.url.trim() || !newEndpoint.name.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please provide task type, URL, and name for the specialized endpoint.",
        variant: "destructive",
      });
      return;
    }

    // Validate URL format
    try {
      new URL(newEndpoint.url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please provide a valid URL for the specialized endpoint.",
        variant: "destructive",
      });
      return;
    }

    const endpoint: SpecializedEndpoint = {
      taskType: newEndpoint.taskType,
      url: newEndpoint.url,
      name: newEndpoint.name,
      description: newEndpoint.description
    };

    llmRouter.saveSpecializedEndpoint(endpoint);
    loadEndpoints();

    setNewEndpoint({
      taskType: '',
      url: '',
      name: '',
      description: ''
    });
    setIsAdding(false);

    toast({
      title: "Specialized Endpoint Added",
      description: `${endpoint.name} has been configured for ${TASK_TYPES.find(t => t.id === endpoint.taskType)?.label}.`,
    });
  };

  const removeEndpoint = (taskType: string) => {
    llmRouter.removeSpecializedEndpoint(taskType);
    loadEndpoints();

    toast({
      title: "Specialized Endpoint Removed",
      description: "The specialized endpoint has been removed.",
    });
  };

  const getTaskTypeLabel = (taskType: string) => {
    return TASK_TYPES.find(t => t.id === taskType)?.label || taskType;
  };

  const getPrimaryLLM = (taskType: string) => {
    return TASK_TYPES.find(t => t.id === taskType)?.primaryLLM || 'Unknown';
  };

  const getAvailableTaskTypes = () => {
    const configuredTypes = endpoints.map(e => e.taskType);
    return TASK_TYPES.filter(t => !configuredTypes.includes(t.id));
  };

  return (
    <div className="space-y-6">
      {/* Add New Specialized Endpoint */}
      {!isAdding ? (
        <Card>
          <CardContent className="p-6">
            <Button 
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center gap-2"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              Add Specialized LLM Endpoint
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Add Specialized Endpoint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-type">Task Type</Label>
                <select
                  id="task-type"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newEndpoint.taskType}
                  onChange={(e) => setNewEndpoint({...newEndpoint, taskType: e.target.value})}
                >
                  <option value="">Select task type...</option>
                  {getAvailableTaskTypes().map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.label} (Primary: {task.primaryLLM})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endpoint-name">Name</Label>
                <Input
                  id="endpoint-name"
                  placeholder="e.g., VBA Genie, Code Master..."
                  value={newEndpoint.name}
                  onChange={(e) => setNewEndpoint({...newEndpoint, name: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endpoint-url">URL</Label>
              <Input
                id="endpoint-url"
                placeholder="https://chatgpt.com/g/your-specialized-gpt"
                value={newEndpoint.url}
                onChange={(e) => setNewEndpoint({...newEndpoint, url: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endpoint-description">Description (Optional)</Label>
              <Textarea
                id="endpoint-description"
                placeholder="Describe what makes this LLM specialized for this task..."
                value={newEndpoint.description}
                onChange={(e) => setNewEndpoint({...newEndpoint, description: e.target.value})}
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveEndpoint} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Endpoint
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setNewEndpoint({ taskType: '', url: '', name: '', description: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Specialized Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Configured Specialized Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          {endpoints.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No specialized endpoints configured yet. Add one above to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {endpoints.map((endpoint) => (
                <div key={endpoint.taskType} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {getTaskTypeLabel(endpoint.taskType)}
                        </Badge>
                        <h3 className="font-semibold">{endpoint.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          Primary: {getPrimaryLLM(endpoint.taskType)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                        <a 
                          href={endpoint.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline break-all"
                        >
                          {endpoint.url}
                        </a>
                      </div>
                      {endpoint.description && (
                        <p className="text-sm text-gray-600">{endpoint.description}</p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeEndpoint(endpoint.taskType)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How Specialized Endpoints Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">✓ When Used</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• When the primary LLM for a task is available</li>
                  <li>• When a specialized endpoint is configured for that task</li>
                  <li>• The specialized LLM will be prioritized over the standard API</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-orange-600">⚠ Fallback Behavior</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• If primary LLM is unavailable, falls back to secondary LLM</li>
                  <li>• Specialized endpoints are only used with primary LLM</li>
                  <li>• Standard API endpoints are used for fallbacks</li>
                </ul>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Example:</strong> Configure "VBA Genie" for VBA Generator tasks. When GPT-4o is available and you use the VBA Generator, 
                it will route to your specialized VBA Genie instead of the standard GPT-4o API.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecializedEndpoints;
