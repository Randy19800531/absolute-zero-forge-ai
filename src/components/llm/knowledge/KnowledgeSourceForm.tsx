
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { NewKnowledgeSource, KnowledgeSource } from './types';

interface KnowledgeSourceFormProps {
  newSource: NewKnowledgeSource;
  onSourceChange: (source: NewKnowledgeSource) => void;
  onSaveSource: () => void;
}

const KnowledgeSourceForm = ({ newSource, onSourceChange, onSaveSource }: KnowledgeSourceFormProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    if (!newSource.name.trim() || !newSource.url.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please provide both name and URL for the knowledge source.",
        variant: "destructive",
      });
      return;
    }
    onSaveSource();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Knowledge Source
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="source-type">Source Type</Label>
            <select
              id="source-type"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newSource.type}
              onChange={(e) => onSourceChange({...newSource, type: e.target.value as any})}
            >
              <option value="github">GitHub Repository</option>
              <option value="web">Web Knowledge</option>
              <option value="gpt-url">GPT Knowledge URL</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="source-name">Name</Label>
            <Input
              id="source-name"
              placeholder="Enter source name..."
              value={newSource.name}
              onChange={(e) => onSourceChange({...newSource, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source-url">URL</Label>
            <Input
              id="source-url"
              placeholder="Enter URL..."
              value={newSource.url}
              onChange={(e) => onSourceChange({...newSource, url: e.target.value})}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="source-description">Description (Optional)</Label>
          <Textarea
            id="source-description"
            placeholder="Describe this knowledge source..."
            value={newSource.description}
            onChange={(e) => onSourceChange({...newSource, description: e.target.value})}
            rows={3}
          />
        </div>
        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Add Knowledge Source
        </Button>
      </CardContent>
    </Card>
  );
};

export default KnowledgeSourceForm;
