
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAgents } from '@/hooks/useAgents';

interface AgentCreatorProps {
  onSubmit?: (agentData: any) => Promise<void>;
  onCancel?: () => void;
}

const AgentCreator: React.FC<AgentCreatorProps> = ({ onSubmit, onCancel }) => {
  const { toast } = useToast();
  const { createAgent } = useAgents();
  const [agentData, setAgentData] = useState({
    name: '',
    description: '',
    type: 'conversational',
    specialization: 'design' as 'design' | 'development' | 'testing' | 'deployment',
    systemPrompt: '',
    capabilities: [] as string[],
    personality: '',
    responseStyle: ''
  });

  const [newCapability, setNewCapability] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const agentTypes = [
    'conversational',
    'task-oriented',
    'analytical',
    'creative'
  ];

  const specializations = [
    'design',
    'development', 
    'testing',
    'deployment'
  ];

  const addCapability = () => {
    if (newCapability.trim() && !agentData.capabilities.includes(newCapability.trim())) {
      setAgentData(prev => ({
        ...prev,
        capabilities: [...prev.capabilities, newCapability.trim()]
      }));
      setNewCapability('');
    }
  };

  const removeCapability = (capability: string) => {
    setAgentData(prev => ({
      ...prev,
      capabilities: prev.capabilities.filter(c => c !== capability)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agentData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide an agent name",
        variant: "destructive"
      });
      return;
    }

    if (!agentData.description.trim()) {
      toast({
        title: "Missing Information", 
        description: "Please provide an agent description",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const agentPayload = {
        name: agentData.name,
        description: agentData.description,
        type: agentData.type,
        specialization: agentData.specialization,
        status: 'idle',
        configuration: {
          systemPrompt: agentData.systemPrompt,
          capabilities: agentData.capabilities,
          personality: agentData.personality,
          responseStyle: agentData.responseStyle
        }
      };

      if (onSubmit) {
        await onSubmit(agentPayload);
      } else {
        await createAgent(agentPayload);
      }

      toast({
        title: "Agent Created",
        description: `${agentData.name} has been created successfully!`,
      });

      // Reset form
      setAgentData({
        name: '',
        description: '',
        type: 'conversational',
        specialization: 'design',
        systemPrompt: '',
        capabilities: [],
        personality: '',
        responseStyle: ''
      });

    } catch (error) {
      console.error('Error creating agent:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create agent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Create New AI Agent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  value={agentData.name}
                  onChange={(e) => setAgentData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter agent name"
                />
              </div>

              <div>
                <Label htmlFor="type">Agent Type</Label>
                <Select
                  value={agentData.type}
                  onValueChange={(value) => setAgentData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {agentTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Select
                  value={agentData.specialization}
                  onValueChange={(value: 'design' | 'development' | 'testing' | 'deployment') => 
                    setAgentData(prev => ({ ...prev, specialization: value }))}
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
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={agentData.description}
                onChange={(e) => setAgentData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this agent does"
                rows={6}
              />
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <Label>Capabilities</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newCapability}
                onChange={(e) => setNewCapability(e.target.value)}
                placeholder="Add capability (e.g., Natural Language Processing)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCapability())}
              />
              <Button type="button" onClick={addCapability} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {agentData.capabilities.map((capability, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {capability}
                  <button
                    type="button"
                    onClick={() => removeCapability(capability)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Advanced Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="personality">Personality</Label>
              <Textarea
                id="personality"
                value={agentData.personality}
                onChange={(e) => setAgentData(prev => ({ ...prev, personality: e.target.value }))}
                placeholder="Describe the agent's personality traits"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="responseStyle">Response Style</Label>
              <Textarea
                id="responseStyle"
                value={agentData.responseStyle}
                onChange={(e) => setAgentData(prev => ({ ...prev, responseStyle: e.target.value }))}
                placeholder="How should the agent respond to users?"
                rows={3}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              value={agentData.systemPrompt}
              onChange={(e) => setAgentData(prev => ({ ...prev, systemPrompt: e.target.value }))}
              placeholder="Define the agent's core instructions and behavior"
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-6 border-t">
            <div>
              {onCancel && (
                <Button type="button" onClick={onCancel} variant="ghost">
                  Cancel
                </Button>
              )}
            </div>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? 'Creating...' : 'Create Agent'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgentCreator;
