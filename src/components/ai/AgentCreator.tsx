
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface AgentConfig {
  name: string;
  description: string;
  specialization: 'design' | 'development' | 'testing' | 'deployment';
  type: string;
  systemPrompt: string;
  capabilities: string[];
  personality: string;
  responseStyle: string;
}

const AgentCreator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [newCapability, setNewCapability] = useState('');
  
  const [config, setConfig] = useState<AgentConfig>({
    name: '',
    description: '',
    specialization: 'development',
    type: 'conversational',
    systemPrompt: '',
    capabilities: [],
    personality: 'professional',
    responseStyle: 'detailed'
  });

  const specializations: Array<'design' | 'development' | 'testing' | 'deployment'> = [
    'design', 'development', 'testing', 'deployment'
  ];

  const personalities = [
    'professional', 'friendly', 'formal', 'casual', 'enthusiastic', 'calm'
  ];

  const responseStyles = [
    'detailed', 'concise', 'bullet-points', 'conversational', 'technical'
  ];

  const handleAddCapability = () => {
    if (newCapability.trim() && !config.capabilities.includes(newCapability.trim())) {
      setConfig(prev => ({
        ...prev,
        capabilities: [...prev.capabilities, newCapability.trim()]
      }));
      setNewCapability('');
    }
  };

  const handleRemoveCapability = (capability: string) => {
    setConfig(prev => ({
      ...prev,
      capabilities: prev.capabilities.filter(c => c !== capability)
    }));
  };

  const handleCreateAgent = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create agents",
        variant: "destructive"
      });
      return;
    }

    if (!config.name.trim() || !config.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both name and description",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      const agentData = {
        name: config.name,
        description: config.description,
        type: config.type,
        specialization: config.specialization,
        user_id: user.id,
        status: 'idle',
        configuration: {
          systemPrompt: config.systemPrompt,
          capabilities: config.capabilities,
          personality: config.personality,
          responseStyle: config.responseStyle
        }
      };

      const { error } = await supabase
        .from('ai_agents')
        .insert([agentData]);

      if (error) throw error;

      toast({
        title: "Agent Created",
        description: `${config.name} has been created successfully`,
      });

      // Reset form
      setConfig({
        name: '',
        description: '',
        specialization: 'development',
        type: 'conversational',
        systemPrompt: '',
        capabilities: [],
        personality: 'professional',
        responseStyle: 'detailed'
      });

    } catch (error) {
      console.error('Error creating agent:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create agent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Create Custom AI Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  value={config.name}
                  onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter agent name"
                />
              </div>

              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Select
                  value={config.specialization}
                  onValueChange={(value: 'design' | 'development' | 'testing' | 'deployment') => 
                    setConfig(prev => ({ ...prev, specialization: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map(spec => (
                      <SelectItem key={spec} value={spec}>
                        {spec.charAt(0).toUpperCase() + spec.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="personality">Personality</Label>
                <Select
                  value={config.personality}
                  onValueChange={(value) => setConfig(prev => ({ ...prev, personality: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {personalities.map(personality => (
                      <SelectItem key={personality} value={personality}>
                        {personality.charAt(0).toUpperCase() + personality.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="responseStyle">Response Style</Label>
                <Select
                  value={config.responseStyle}
                  onValueChange={(value) => setConfig(prev => ({ ...prev, responseStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {responseStyles.map(style => (
                      <SelectItem key={style} value={style}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={config.description}
                  onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this agent does"
                  rows={4}
                />
              </div>

              <div>
                <Label>Capabilities</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newCapability}
                    onChange={(e) => setNewCapability(e.target.value)}
                    placeholder="Add capability"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCapability()}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddCapability}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {config.capabilities.map(capability => (
                    <Badge key={capability} variant="secondary" className="gap-1">
                      {capability}
                      <button
                        onClick={() => handleRemoveCapability(capability)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="systemPrompt">System Prompt (Optional)</Label>
            <Textarea
              id="systemPrompt"
              value={config.systemPrompt}
              onChange={(e) => setConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
              placeholder="Enter custom system prompt to define agent behavior"
              rows={6}
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleCreateAgent}
              disabled={isCreating || !config.name.trim() || !config.description.trim()}
            >
              {isCreating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isCreating ? 'Creating...' : 'Create Agent'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCreator;
