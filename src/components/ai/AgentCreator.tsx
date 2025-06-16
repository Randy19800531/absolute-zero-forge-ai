
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Brain, Globe, Database } from 'lucide-react';
import { ExpertAgentService } from '@/services/agents/ExpertAgentService';

interface AgentCreatorProps {
  onSubmit: (agentData: any) => Promise<void>;
  onCancel: () => void;
}

const AgentCreator = ({ onSubmit, onCancel }: AgentCreatorProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    specialization: '',
    platformExpert: false,
    internetAccess: false,
    memoryEnabled: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let enhancedConfig = {
      ...formData,
      memoryEnabled: formData.memoryEnabled,
      conversationalMode: true
    };

    // If platform expert is enabled, enhance with platform knowledge
    if (formData.platformExpert) {
      enhancedConfig = ExpertAgentService.enhanceAgentConfiguration(enhancedConfig, 'custom');
    }

    await onSubmit(enhancedConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Create Custom AI Agent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Agent Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter agent name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="type">Agent Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Conversation Agent">Conversation Agent</SelectItem>
                <SelectItem value="Task Assistant">Task Assistant</SelectItem>
                <SelectItem value="Data Analyzer">Data Analyzer</SelectItem>
                <SelectItem value="Creative Helper">Creative Helper</SelectItem>
                <SelectItem value="Technical Expert">Technical Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="e.g., Data Analysis, Content Creation, Platform Support"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this agent does and how it helps users"
              rows={3}
            />
          </div>

          <div className="space-y-4 border-t pt-4">
            <Label className="text-base font-medium">Expert Capabilities</Label>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-500" />
                <div>
                  <Label htmlFor="platformExpert">Platform Expert</Label>
                  <p className="text-sm text-muted-foreground">Train agent on all platform features and capabilities</p>
                </div>
              </div>
              <Switch
                id="platformExpert"
                checked={formData.platformExpert}
                onCheckedChange={(checked) => setFormData({ ...formData, platformExpert: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-green-500" />
                <div>
                  <Label htmlFor="internetAccess">Internet Access</Label>
                  <p className="text-sm text-muted-foreground">Enable agent to research current information online</p>
                </div>
              </div>
              <Switch
                id="internetAccess"
                checked={formData.internetAccess}
                onCheckedChange={(checked) => setFormData({ ...formData, internetAccess: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                <div>
                  <Label htmlFor="memoryEnabled">Conversation Memory</Label>
                  <p className="text-sm text-muted-foreground">Remember previous conversations and user preferences</p>
                </div>
              </div>
              <Switch
                id="memoryEnabled"
                checked={formData.memoryEnabled}
                onCheckedChange={(checked) => setFormData({ ...formData, memoryEnabled: checked })}
              />
            </div>
          </div>

          {(formData.platformExpert || formData.internetAccess) && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Enhanced Agent</Badge>
              </div>
              <p className="text-sm text-blue-700">
                This agent will have {formData.platformExpert ? 'comprehensive platform knowledge' : ''} 
                {formData.platformExpert && formData.internetAccess ? ' and ' : ''}
                {formData.internetAccess ? 'internet research capabilities' : ''}, 
                making it a powerful expert assistant.
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit">Create Agent</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgentCreator;
