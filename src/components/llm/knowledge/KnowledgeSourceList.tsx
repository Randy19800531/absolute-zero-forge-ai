
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Globe, Trash2 } from 'lucide-react';
import { KnowledgeSource } from './types';

interface KnowledgeSourceListProps {
  sources: KnowledgeSource[];
  onRemoveSource: (id: string) => void;
}

const KnowledgeSourceList = ({ sources, onRemoveSource }: KnowledgeSourceListProps) => {
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
                    onClick={() => onRemoveSource(source.id)}
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
  );
};

export default KnowledgeSourceList;
