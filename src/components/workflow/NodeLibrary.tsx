
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Webhook, 
  Database, 
  Code, 
  Mail, 
  Filter, 
  Brain,
  Globe,
  FileSpreadsheet,
  MessageSquare,
  Chrome
} from 'lucide-react';

const NodeLibrary = () => {
  const nodeTypes = [
    { type: 'trigger', label: 'Webhook', icon: Webhook, description: 'Start workflow on HTTP request' },
    { type: 'api', label: 'API Call', icon: Globe, description: 'Make HTTP requests' },
    { type: 'database', label: 'Database', icon: Database, description: 'Query or update database' },
    { type: 'transform', label: 'Transform', icon: Code, description: 'Process and transform data' },
    { type: 'filter', label: 'Filter', icon: Filter, description: 'Filter data based on conditions' },
    { type: 'ai', label: 'AI Agent', icon: Brain, description: 'Execute AI-powered tasks' },
    { type: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Excel operations' },
    { type: 'chatbot', label: 'Chatbot', icon: MessageSquare, description: 'Chat interactions' },
    { type: 'browser', label: 'Browser', icon: Chrome, description: 'Web scraping and automation' },
    { type: 'action', label: 'Email', icon: Mail, description: 'Send emails and notifications' },
  ];

  const handleDragStart = (e, nodeType) => {
    e.dataTransfer.setData('nodeType', nodeType);
  };

  return (
    <Card className="w-64 h-fit">
      <CardHeader>
        <CardTitle className="text-sm">Node Library</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="flex items-center gap-3 p-2 border rounded-lg cursor-grab hover:bg-gray-50 transition-colors"
            draggable
            onDragStart={(e) => handleDragStart(e, node.type)}
          >
            <node.icon className="h-4 w-4 text-gray-600" />
            <div className="flex-1">
              <div className="text-sm font-medium">{node.label}</div>
              <div className="text-xs text-gray-500">{node.description}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NodeLibrary;
