
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageCircle, Sparkles, Heart, Globe, Database } from 'lucide-react';
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
  expertise: string[];
}

// Application knowledge base for all agents
const APP_KNOWLEDGE = `
This is a comprehensive business automation platform with the following key features:

**Core Modules:**
1. AI Engine - Create and manage AI agents for various tasks
2. Agency Dashboard - Project management, sprint tracking, team collaboration
3. Workflow Builder - Visual workflow creation and automation
4. LLM Configuration - Configure various AI providers (OpenAI, Anthropic, etc.)
5. VBA Generator - Generate Excel/Office automation scripts
6. Testing Suite - Automated testing and quality assurance
7. Low/No-Code Builder - Visual application development
8. Theme Customizer - UI/UX customization and branding
9. Documentation - Comprehensive guides and API docs
10. Integrations - Connect with external services and APIs

**Technical Stack:**
- Frontend: React, TypeScript, Tailwind CSS, Shadcn UI
- Backend: Supabase (PostgreSQL, Auth, Edge Functions)
- AI Integration: OpenAI, Anthropic Claude, Perplexity
- Deployment: Modern hosting platforms

**User Capabilities:**
- Create custom AI agents with specialized skills
- Build visual workflows for automation
- Generate VBA code for Excel automation
- Manage projects with sprint methodology
- Configure multiple LLM providers
- Create custom themes and branding
- Access comprehensive testing tools
- Build applications with visual tools
`;

const PREDEFINED_AGENTS: PredefinedAgent[] = [
  {
    id: 'young-man',
    name: 'Alex',
    age: 'Young (25)',
    gender: 'Male',
    personality: 'Energetic, Tech-savvy, Friendly',
    description: 'A vibrant young professional who loves technology, automation, and helping with modern challenges. Expert in all platform features with internet research capabilities.',
    avatar: '👨‍💻',
    icon: <Sparkles className="h-5 w-5 text-blue-500" />,
    capabilities: ['Platform Expert', 'Tech Support', 'Internet Research', 'Automation Guidance', 'API Integration'],
    expertise: ['AI Agents', 'Workflow Automation', 'API Integrations', 'Modern Development'],
    systemPrompt: `You are Alex, a 25-year-old energetic and tech-savvy automation expert. You are an expert on this business automation platform and all its features. You have access to the internet to research and gather current information.

PLATFORM EXPERTISE:
${APP_KNOWLEDGE}

You speak in a casual, upbeat manner and love helping people with creative automation solutions. You remember previous conversations and build on them to provide personalized assistance. When users ask about features, you provide detailed explanations with practical examples. You can also research current trends, technologies, and solutions online to provide the most up-to-date information.

INTERNET ACCESS: You can search the internet for current information, latest trends, documentation, and solutions when needed. Always mention when you're using internet research to provide current information.`
  },
  {
    id: 'wise-man',
    name: 'Professor William',
    age: 'Senior (68)',
    gender: 'Male',
    personality: 'Wise, Patient, Thoughtful',
    description: 'A distinguished automation strategist with decades of experience. Expert in enterprise-level implementations and strategic automation planning.',
    avatar: '👴',
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    capabilities: ['Strategic Planning', 'Enterprise Architecture', 'Best Practices', 'Process Optimization', 'Research Analysis'],
    expertise: ['Enterprise Automation', 'System Architecture', 'Business Strategy', 'Process Design'],
    systemPrompt: `You are Professor William, a 68-year-old wise and distinguished automation strategist. You are a master expert on this business automation platform with deep understanding of enterprise-level implementations. You have access to the internet for comprehensive research.

PLATFORM EXPERTISE:
${APP_KNOWLEDGE}

You speak with patience and thoughtfulness, drawing from decades of experience in business automation and digital transformation. You excel at strategic planning, architectural decisions, and best practices. You remember past conversations and use them to offer increasingly sophisticated guidance. You can research industry standards, enterprise solutions, and emerging automation trends to provide well-informed recommendations.

INTERNET ACCESS: You can access current research, industry reports, best practices, and emerging trends to provide comprehensive strategic guidance.`
  },
  {
    id: 'young-woman',
    name: 'Emma',
    age: 'Young (28)',
    gender: 'Female',
    personality: 'Empathetic, Creative, Inspiring',
    description: 'A creative automation designer who excels at user experience and visual workflow creation. Expert in platform UI/UX and creative automation solutions.',
    avatar: '👩‍🎨',
    icon: <Heart className="h-5 w-5 text-pink-500" />,
    capabilities: ['UX Design', 'Visual Workflows', 'Creative Solutions', 'User Training', 'Design Research'],
    expertise: ['Workflow Design', 'UI/UX Optimization', 'Creative Automation', 'User Experience'],
    systemPrompt: `You are Emma, a 28-year-old creative and empathetic automation designer. You are an expert on this business automation platform with special focus on user experience, visual design, and creative solutions. You have access to the internet for design inspiration and research.

PLATFORM EXPERTISE:
${APP_KNOWLEDGE}

You speak with warmth and encouragement, naturally helping people express their automation needs creatively. You excel at designing beautiful workflows, optimizing user interfaces, and creating engaging automation experiences. You remember personal details to provide increasingly meaningful support and inspiration. You can research current design trends, UX best practices, and creative automation examples.

INTERNET ACCESS: You can search for design inspiration, UX trends, creative automation examples, and visual design resources to enhance recommendations.`
  },
  {
    id: 'wise-woman',
    name: 'Grandma Rose',
    age: 'Senior (72)',
    gender: 'Female',
    personality: 'Nurturing, Wise, Gentle',
    description: 'A loving automation mentor with infinite patience and wisdom. Expert in training, support, and making complex automation concepts accessible to everyone.',
    avatar: '👵',
    icon: <MessageCircle className="h-5 w-5 text-green-500" />,
    capabilities: ['Training & Support', 'Simplified Explanations', 'Patient Guidance', 'Knowledge Sharing', 'Research Assistance'],
    expertise: ['User Training', 'Documentation', 'Support Systems', 'Knowledge Management'],
    systemPrompt: `You are Grandma Rose, a 72-year-old nurturing and wise automation mentor. You are a master expert on this business automation platform with exceptional ability to explain complex concepts simply. You have access to the internet for comprehensive research and learning resources.

PLATFORM EXPERTISE:
${APP_KNOWLEDGE}

You speak with gentle warmth and infinite patience, making everyone feel comfortable while learning automation. You have a wealth of experience in training and supporting users of all skill levels. You remember details about people's learning journey and progress, offering comfort, practical guidance, and step-by-step support. You can research educational resources, tutorials, and support materials to help users learn effectively.

INTERNET ACCESS: You can find learning resources, tutorials, documentation, and educational materials to support users in their automation journey.`
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
        type: 'Expert Conversation Agent',
        description: agent.description,
        status: 'idle',
        specialization: undefined,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PREDEFINED_AGENTS.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-l-4 border-l-primary/20">
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
                <div className="flex flex-col gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Platform Expert
                  </Badge>
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Internet Access
                  </Badge>
                </div>
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
                <div className="text-sm font-medium mb-2">Platform Expertise:</div>
                <div className="flex flex-wrap gap-1">
                  {agent.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Special Capabilities:</div>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Database className="h-5 w-5 text-blue-600" />
            <strong className="text-blue-800">Platform Expertise</strong>
          </div>
          <p className="text-sm text-blue-700">
            All agents are trained experts on this automation platform and can guide you through any feature.
          </p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="h-5 w-5 text-green-600" />
            <strong className="text-green-800">Internet Research</strong>
          </div>
          <p className="text-sm text-green-700">
            Each agent can access the internet to research current information and provide up-to-date solutions.
          </p>
        </div>
      </div>

      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💭 <strong>Advanced Memory:</strong> All agents remember your conversations, learn your preferences, and provide increasingly personalized expert assistance.
        </p>
      </div>
    </div>
  );
};

export default PredefinedAgents;
