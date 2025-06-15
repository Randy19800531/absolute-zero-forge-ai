
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Layers, Sparkles } from 'lucide-react';

const BuilderHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Layers className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Low-No Code Builder</h1>
          <p className="text-gray-600">Generate React applications from text prompts or images</p>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          AI-Powered
        </Badge>
        <Badge variant="outline">Visual to Code</Badge>
        <Badge variant="outline">Responsive Design</Badge>
      </div>
    </div>
  );
};

export default BuilderHeader;
