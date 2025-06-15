
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Brain, Zap } from 'lucide-react';

interface AgentData {
  name: string;
  type: string;
  description: string;
  configuration: {
    personality: string;
    capabilities: string[];
    creativity: number;
    responsiveness: number;
    precision: number;
  };
}

const AgentCreatorData = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [agent, setAgent] = useState<AgentData>({
    name: '',
    type: '',
    description: '',
    configuration: {
      personality: '',
      capabilities: [],
      creativity: 0.7,
      responsiveness: 0.8,
      precision: 0.9,
    },
  });

  const agentTypes = [
    'Spreadsheet Agent',
    'Browser Agent',
    'Conversation Agent',
    'Development Agent',
    'Data Analysis Agent',
    'Content Creation Agent',
  ];

  const handleInputChange = (field: keyof AgentData, value: any) => {
    setAgent(prev => ({ ...prev, [field]: value }));
  };

  const handleConfigChange = (field: keyof AgentData['configuration'], value: any) => {
    setAgent(prev => ({
      ...prev,
      configuration: { ...prev.configuration, [field]: value }
    }));
  };

  const createAgent = async () => {
    if (!agent.name || !agent.type || !user) {
      toast({
        title: "Missing Information",
        description: "Please fill in the agent name and type",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    try {
      const { data, error } = await supabase
        .from('ai_agents')
        .insert({
          name: agent.name,
          type: agent.type,
          description: agent.description || 'No description provided',
          configuration: agent.configuration,
          user_id: user.id,
          status: 'idle',
          tasks_completed: 0
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Agent Created Successfully",
        description: `${agent.name} has been created and is ready to use!`,
      });
      
      // Reset form
      setAgent({
        name: '',
        type: '',
        description: '',
        configuration: {
          personality: '',
          capabilities: [],
          creativity: 0.7,
          responsiveness: 0.8,
          precision: 0.9,
        },
      });
    } catch (error) {
      console.error('Agent creation error:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Create New AI Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agentName">Agent Name</Label>
              <Input
                id="agentName"
                placeholder="e.g., Data Analyst Pro"
                value={agent.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="agentType">Agent Type</Label>
              <Select value={agent.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select agent type" />
                </SelectTrigger>
                <SelectContent>
                  {agentTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What does this agent do?"
              value={agent.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="personality">Personality & Tone</Label>
            <Textarea
              id="personality"
              placeholder="Describe the agent's personality, communication style, and approach..."
              value={agent.configuration.personality}
              onChange={(e) => handleConfigChange('personality', e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Agent Parameters</Label>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label>Creativity</Label>
                <span className="text-sm text-gray-500">{agent.configuration.creativity}</span>
              </div>
              <Slider
                value={[agent.configuration.creativity]}
                onValueChange={(value) => handleConfigChange('creativity', value[0])}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Responsiveness</Label>
                <span className="text-sm text-gray-500">{agent.configuration.responsiveness}</span>
              </div>
              <Slider
                value={[agent.configuration.responsiveness]}
                onValueChange={(value) => handleConfigChange('responsiveness', value[0])}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Precision</Label>
                <span className="text-sm text-gray-500">{agent.configuration.precision}</span>
              </div>
              <Slider
                value={[agent.configuration.precision]}
                onValueChange={(value) => handleConfigChange('precision', value[0])}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          <Button 
            onClick={createAgent}
            disabled={isCreating || !agent.name || !agent.type}
            className="w-full"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isCreating ? 'Creating Agent...' : 'Create Agent'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCreatorData;
