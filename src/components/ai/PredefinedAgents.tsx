
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PREDEFINED_AGENTS } from './data/predefinedAgentsData';
import { PredefinedAgent } from './types/PredefinedAgent';
import AgentCard from './components/AgentCard';

interface PredefinedAgentsProps {
  onSelectAgent?: (agent: PredefinedAgent) => void;
}

const PredefinedAgents: React.FC<PredefinedAgentsProps> = ({ onSelectAgent }) => {
  const [selectedAgent, setSelectedAgent] = useState<PredefinedAgent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(PREDEFINED_AGENTS.map(agent => agent.category)))];

  const filteredAgents = selectedCategory === 'all' 
    ? PREDEFINED_AGENTS 
    : PREDEFINED_AGENTS.filter(agent => agent.category === selectedCategory);

  const handleAgentSelect = (agent: PredefinedAgent) => {
    setSelectedAgent(agent);
    onSelectAgent?.(agent);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === 'all' ? 'All Categories' : category}
          </Button>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            selected={selectedAgent?.id === agent.id}
            onSelect={() => handleAgentSelect(agent)}
          />
        ))}
      </div>

      {/* Selected Agent Details */}
      {selectedAgent && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg text-white">
                {selectedAgent.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedAgent.name}</h3>
                <p className="text-sm text-gray-600">{selectedAgent.age} • {selectedAgent.gender}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personality</h4>
              <p className="text-gray-700">{selectedAgent.personality}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Expertise Areas</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAgent.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Capabilities</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAgent.capabilities.map((capability, index) => (
                  <Badge key={index} variant="outline">{capability}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Best Use Cases</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {selectedAgent.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t">
              <Button 
                onClick={() => handleAgentSelect(selectedAgent)}
                className="w-full"
              >
                Select {selectedAgent.name} for Voice Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredAgents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">No agents found in this category</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredefinedAgents;
