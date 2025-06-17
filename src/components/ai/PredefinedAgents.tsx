
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Star, ChevronRight } from 'lucide-react';
import { predefinedAgentsData } from './data/predefinedAgentsData';
import AgentCard from './components/AgentCard';
import { PredefinedAgent } from './types/PredefinedAgent';

interface PredefinedAgentsProps {
  onAgentSelect?: (agent: PredefinedAgent) => void;
}

const PredefinedAgents: React.FC<PredefinedAgentsProps> = ({ onAgentSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<PredefinedAgent | null>(null);

  const categories = [
    { id: 'all', name: 'All Agents', count: predefinedAgentsData.length },
    { id: 'business', name: 'Business', count: predefinedAgentsData.filter(a => a.category === 'business').length },
    { id: 'technical', name: 'Technical', count: predefinedAgentsData.filter(a => a.category === 'technical').length },
    { id: 'creative', name: 'Creative', count: predefinedAgentsData.filter(a => a.category === 'creative').length },
    { id: 'support', name: 'Support', count: predefinedAgentsData.filter(a => a.category === 'support').length },
    { id: 'education', name: 'Education', count: predefinedAgentsData.filter(a => a.category === 'education').length },
  ];

  const filteredAgents = selectedCategory === 'all' 
    ? predefinedAgentsData 
    : predefinedAgentsData.filter(agent => agent.category === selectedCategory);

  const handleAgentSelect = (agent: PredefinedAgent) => {
    setSelectedAgent(agent);
    onAgentSelect?.(agent);
  };

  const popularAgents = predefinedAgentsData.filter(agent => agent.popular);

  return (
    <div className="space-y-6">
      {/* Popular Agents Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Popular Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularAgents.map(agent => (
              <div
                key={agent.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedAgent?.id === agent.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => handleAgentSelect(agent)}
              >
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
                      <Badge variant="outline" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedCategory === category.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agents Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              {selectedCategory === 'all' ? 'All Agents' : categories.find(c => c.id === selectedCategory)?.name}
            </h3>
            <p className="text-gray-600 text-sm">
              Choose from {filteredAgents.length} specialized AI agents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAgents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent?.id === agent.id}
                onSelect={() => handleAgentSelect(agent)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Selected Agent Details */}
      {selectedAgent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              {selectedAgent.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600 mb-4">{selectedAgent.description}</p>
                
                <h4 className="font-semibold mb-2">Capabilities</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedAgent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Use Cases</h4>
                <ul className="space-y-2 mb-4">
                  {selectedAgent.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-blue-500" />
                      {useCase}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t">
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Conversation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredefinedAgents;
