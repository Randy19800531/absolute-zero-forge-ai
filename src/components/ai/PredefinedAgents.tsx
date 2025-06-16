
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAgents } from '@/hooks/useAgents';
import { PREDEFINED_AGENTS } from './data/predefinedAgentsData';
import { PredefinedAgent } from './types/PredefinedAgent';
import AgentCard from './components/AgentCard';
import AgentFeatureInfo from './components/AgentFeatureInfo';

interface PredefinedAgentsProps {
  onSelectAgent: (agent: PredefinedAgent) => void;
}

const PredefinedAgents = ({ onSelectAgent }: PredefinedAgentsProps) => {
  const { toast } = useToast();
  const { createAgent } = useAgents();

  const handleSelectAgent = async (agent: PredefinedAgent) => {
    try {
      await createAgent({
        name: agent.name,
        type: 'Expert Conversation Agent',
        description: agent.description,
        status: 'idle',
        specialization: agent.id === 'don-project-manager' ? 'development' : undefined,
        configuration: {
          personality: agent.personality,
          systemPrompt: agent.systemPrompt,
          capabilities: agent.capabilities,
          expertise: agent.expertise,
          avatar: agent.avatar,
          age: agent.age,
          gender: agent.gender,
          memoryEnabled: true,
          conversationalMode: true,
          internetAccess: true,
          platformExpert: true,
          knowledgeBase: 'full_platform'
        }
      });

      toast({
        title: "Expert Agent Created",
        description: `${agent.name} has been added to your agents with full platform expertise and internet access!`,
      });

      onSelectAgent(agent);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create the expert agent. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose Your Expert AI Companion</h3>
        <p className="text-muted-foreground">
          Select from our expert AI personalities, each trained on this platform with internet access and memory capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PREDEFINED_AGENTS.map((agent) => (
          <AgentCard 
            key={agent.id} 
            agent={agent} 
            onSelect={handleSelectAgent}
          />
        ))}
      </div>

      <AgentFeatureInfo />
    </div>
  );
};

export default PredefinedAgents;
