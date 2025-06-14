import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Github, Globe, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeSource {
  id: string;
  type: 'github' | 'web' | 'gpt-url';
  name: string;
  url: string;
  description?: string;
}

const KnowledgeSources = () => {
  const { toast } = useToast();
  const [sources, setSources] = useState<KnowledgeSource[]>([]);
  const [newSource, setNewSource] = useState({
    type: 'github' as 'github' | 'web' | 'gpt-url',
    name: '',
    url: '',
    description: ''
  });

  useEffect(() => {
    // Load saved knowledge sources from localStorage
    const savedSources = localStorage.getItem('knowledge-sources');
    if (savedSources) {
      setSources(JSON.parse(savedSources));
    }
  }, []);

  const saveSource = () => {
    if (!newSource.name.trim() || !newSource.url.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please provide both name and URL for the knowledge source.",
        variant: "destructive",
      });
      return;
    }

    const source: KnowledgeSource = {
      id: Date.now().toString(),
      ...newSource
    };

    const updatedSources = [...sources, source];
    setSources(updatedSources);
    localStorage.setItem('knowledge-sources', JSON.stringify(updatedSources));

    setNewSource({
      type: 'github',
      name: '',
      url: '',
      description: ''
    });

    toast({
      title: "Knowledge Source Added",
      description: `${source.name} has been added successfully.`,
    });
  };

  const removeSource = (id: string) => {
    const updatedSources = sources.filter(source => source.id !== id);
    setSources(updatedSources);
    localStorage.setItem('knowledge-sources', JSON.stringify(updatedSources));

    toast({
      title: "Knowledge Source Removed",
      description: "The knowledge source has been removed.",
    });
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'github': return <Github className="h-4 w-4" />;
      case 'web': return <Globe className="h-4 w-4" />;
      case 'gpt-url': return <Globe className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case 'github': return 'bg-gray-100 text-gray-800';
      case 'web': return 'bg-blue-100 text-blue-800';
      case 'gpt-url': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Knowledge Source */}
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
                onChange={(e) => setNewSource({...newSource, type: e.target.value as any})}
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
                onChange={(e) => setNewSource({...newSource, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source-url">URL</Label>
              <Input
                id="source-url"
                placeholder="Enter URL..."
                value={newSource.url}
                onChange={(e) => setNewSource({...newSource, url: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="source-description">Description (Optional)</Label>
            <Textarea
              id="source-description"
              placeholder="Describe this knowledge source..."
              value={newSource.description}
              onChange={(e) => setNewSource({...newSource, description: e.target.value})}
              rows={3}
            />
          </div>
          <Button onClick={saveSource} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Add Knowledge Source
          </Button>
        </CardContent>
      </Card>

      {/* Existing Knowledge Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Configured Knowledge Sources</CardTitle>
        </CardHeader>
        <CardContent>
          {sources.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No knowledge sources configured yet. Add one above to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {sources.map((source) => (
                <div key={source.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getSourceColor(source.type)}>
                          {getSourceIcon(source.type)}
                          <span className="ml-1 capitalize">{source.type.replace('-', ' ')}</span>
                        </Badge>
                        <h3 className="font-semibold">{source.name}</h3>
                      </div>
                      <p className="text-sm text-blue-600 mb-2">{source.url}</p>
                      {source.description && (
                        <p className="text-sm text-gray-600">{source.description}</p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSource(source.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Source Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <h4 className="font-semibold">GitHub Repository</h4>
              </div>
              <p className="text-sm text-gray-600">
                Link to GitHub repositories for code knowledge and documentation access.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <h4 className="font-semibold">Web Knowledge</h4>
              </div>
              <p className="text-sm text-gray-600">
                Add web URLs for accessing online knowledge bases and documentation.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <h4 className="font-semibold">GPT Knowledge URL</h4>
              </div>
              <p className="text-sm text-gray-600">
                Special URLs for GPT to access specific knowledge sources and resolve issues.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeSources;
