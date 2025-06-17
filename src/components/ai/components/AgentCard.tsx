
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';
import { PredefinedAgent } from '../types/PredefinedAgent';

interface AgentCardProps {
  agent: PredefinedAgent;
  selected: boolean;
  onSelect: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, selected, onSelect }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        selected ? 'border-blue-500 bg-blue-50' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{agent.name}</h4>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {agent.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {agent.category}
              </Badge>
              {agent.popular && (
                <Badge variant="outline" className="text-xs">
                  Popular
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
