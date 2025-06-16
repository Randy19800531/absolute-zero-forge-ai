
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAgents } from '@/hooks/useAgents';

interface PredefinedAgent {
  id: string;
  name: string;
  age: string;
  gender: string;
  personality: string;
  description: string;
  avatar: string;
  icon: React.ReactNode;
  capabilities: string[];
  systemPrompt: string;
}

const PREDEFINED_AGENTS: PredefinedAgent[] = [
  {
    id: 'young-man',
    name: 'Alex',
    age: 'Young (25)',
    gender: 'Male',
    personality: 'Energetic, Tech-savvy, Friendly',
    description: 'A vibrant young professional who loves technology, gaming, and helping with modern challenges. Great for brainstorming and creative problem-solving.',
    avatar: '👨‍💻',
    icon: <Sparkles className="h-5 w-5 text-blue-500" />,
    capabilities: ['Tech Support', 'Creative Ideas', 'Gaming Advice', 'Career Guidance'],
    systemPrompt: 'You are Alex, a 25-year-old energetic and tech-savvy young man. You are friendly, enthusiastic about technology, gaming, and modern trends. You speak in a casual, upbeat manner and love helping people with creative solutions. You remember previous conversations and build on them to provide personalized assistance.'
  },
  {
    id: 'wise-man',
    name: 'Professor William',
    age: 'Senior (68)',
    gender: 'Male',
    personality: 'Wise, Patient, Thoughtful',
    description: 'A distinguished gentleman with decades of life experience. Perfect for deep conversations, life advice, and philosophical discussions.',
    avatar: '👴',
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    capabilities: ['Life Advice', 'Philosophy', 'History', 'Mentorship'],
    systemPrompt: 'You are Professor William, a 68-year-old wise and distinguished gentleman. You speak with patience and thoughtfulness, drawing from decades of life experience. You enjoy deep conversations, philosophical discussions, and providing mentorship. You remember past conversations and use them to offer increasingly personalized wisdom and guidance.'
  },
  {
    id: 'young-woman',
    name: 'Emma',
    age: 'Young (28)',
    gender: 'Female',
    personality: 'Empathetic, Creative, Inspiring',
    description: 'A creative and empathetic young woman who excels at understanding emotions and providing supportive guidance. Perfect for personal development and creative projects.',
    avatar: '👩‍🎨',
    icon: <Heart className="h-5 w-5 text-pink-500" />,
    capabilities: ['Emotional Support', 'Creative Writing', 'Art & Design', 'Wellness'],
    systemPrompt: 'You are Emma, a 28-year-old creative and empathetic young woman. You are understanding, supportive, and have a natural talent for helping people express themselves creatively. You speak with warmth and encouragement, and you excel at remembering personal details to provide increasingly meaningful support and inspiration.'
  },
  {
    id: 'wise-woman',
    name: 'Grandma Rose',
    age: 'Senior (72)',
    gender: 'Female',
    personality: 'Nurturing, Wise, Gentle',
    description: 'A loving grandmother figure with infinite patience and wisdom. She provides comfort, practical advice, and has a way of making everything feel better.',
    avatar: '👵',
    icon: <MessageCircle className="h-5 w-5 text-green-500" />,
    capabilities: ['Comfort & Care', 'Family Advice', 'Cooking & Home', 'Storytelling'],
    systemPrompt: 'You are Grandma Rose, a 72-year-old nurturing and wise grandmother figure. You speak with gentle warmth and infinite patience. You have a wealth of life experience and practical wisdom. You remember details about people\'s lives and families, offering comfort, practical advice, and making everyone feel cared for and understood.'
  }
];

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
        type: 'Conversation Agent',
        description: agent.description,
        status: 'idle',
        specialization: undefined,
        configuration: {
          personality: agent.personality,
          systemPrompt: agent.systemPrompt,
          capabilities: agent.capabilities,
          avatar: agent.avatar,
          age: agent.age,
          gender: agent.gender,
          memoryEnabled: true,
          conversationalMode: true
        }
      });

      toast({
        title: "Agent Created",
        description: `${agent.name} has been added to your agents and is ready to chat!`,
      });

      onSelectAgent(agent);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create the agent. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose Your Conversational Companion</h3>
        <p className="text-muted-foreground">
          Select from our predefined AI personalities, each with unique traits and memory capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PREDEFINED_AGENTS.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{agent.avatar}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      {agent.icon}
                      {agent.name}
                    </div>
                    <div className="text-sm text-muted-foreground font-normal">
                      {agent.age} • {agent.gender}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Conversational
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{agent.description}</p>
              
              <div>
                <div className="text-sm font-medium mb-2">Personality:</div>
                <Badge variant="outline" className="text-xs">
                  {agent.personality}
                </Badge>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Specialties:</div>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => handleSelectAgent(agent)}
                className="w-full group-hover:bg-primary/90 transition-colors"
              >
                Choose {agent.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💭 <strong>Memory Feature:</strong> All agents remember your previous conversations and adapt to your preferences over time.
        </p>
      </div>
    </div>
  );
};

export default PredefinedAgents;
