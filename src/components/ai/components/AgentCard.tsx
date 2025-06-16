
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import { PredefinedAgent } from '../types/PredefinedAgent';

interface AgentCardProps {
  agent: PredefinedAgent;
  onSelect: (agent: PredefinedAgent) => void;
}

const AgentCard = ({ agent, onSelect }: AgentCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-l-4 border-l-primary/20">
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
          onClick={() => onSelect(agent)}
          className="w-full group-hover:bg-primary/90 transition-colors"
        >
          Choose {agent.name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
