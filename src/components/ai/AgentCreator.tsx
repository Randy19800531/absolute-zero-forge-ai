
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Brain, Zap } from 'lucide-react';

const AgentCreator = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [agent, setAgent] = useState({
    name: '',
    type: '',
    description: '',
    personality: '',
    capabilities: [],
    creativity: [0.7],
    responsiveness: [0.8],
    precision: [0.9],
  });

  const agentTypes = [
    'Spreadsheet Agent',
    'Browser Agent',
    'Conversation Agent',
    'Development Agent',
    'Data Analysis Agent',
    'Content Creation Agent',
  ];

  const handleInputChange = (field: string, value: any) => {
    setAgent(prev => ({ ...prev, [field]: value }));
  };

  const createAgent = async () => {
    if (!agent.name || !agent.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in the agent name and type",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    try {
      // Simulate agent creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Agent Created",
        description: `${agent.name} has been created successfully!`,
      });
      
      // Reset form
      setAgent({
        name: '',
        type: '',
        description: '',
        personality: '',
        capabilities: [],
        creativity: [0.7],
        responsiveness: [0.8],
        precision: [0.9],
      });
    } catch (error) {
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
              value={agent.personality}
              onChange={(e) => handleInputChange('personality', e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Agent Parameters</Label>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label>Creativity</Label>
                <span className="text-sm text-gray-500">{agent.creativity[0]}</span>
              </div>
              <Slider
                value={agent.creativity}
                onValueChange={(value) => handleInputChange('creativity', value)}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Responsiveness</Label>
                <span className="text-sm text-gray-500">{agent.responsiveness[0]}</span>
              </div>
              <Slider
                value={agent.responsiveness}
                onValueChange={(value) => handleInputChange('responsiveness', value)}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Precision</Label>
                <span className="text-sm text-gray-500">{agent.precision[0]}</span>
              </div>
              <Slider
                value={agent.precision}
                onValueChange={(value) => handleInputChange('precision', value)}
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

export default AgentCreator;
