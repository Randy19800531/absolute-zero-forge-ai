
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Webhook, 
  Database, 
  Code, 
  Mail, 
  Filter, 
  Brain,
  Globe,
  FileSpreadsheet
} from 'lucide-react';

interface WorkflowNodeProps {
  node: {
    id: string;
    type: string;
    x: number;
    y: number;
    data: { label: string };
  };
  onDragStart: (e: React.MouseEvent) => void;
}

const WorkflowNode = ({ node, onDragStart }: WorkflowNodeProps) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'trigger': return Webhook;
      case 'database': return Database;
      case 'transform': return Code;
      case 'action': return Mail;
      case 'filter': return Filter;
      case 'ai': return Brain;
      case 'api': return Globe;
      case 'excel': return FileSpreadsheet;
      default: return Code;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'border-green-500 bg-green-50';
      case 'database': return 'border-blue-500 bg-blue-50';
      case 'transform': return 'border-purple-500 bg-purple-50';
      case 'action': return 'border-orange-500 bg-orange-50';
      case 'filter': return 'border-yellow-500 bg-yellow-50';
      case 'ai': return 'border-pink-500 bg-pink-50';
      case 'api': return 'border-indigo-500 bg-indigo-50';
      case 'excel': return 'border-emerald-500 bg-emerald-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const Icon = getNodeIcon(node.type);

  return (
    <Card 
      className={`absolute w-40 h-20 cursor-move border-2 ${getNodeColor(node.type)} hover:shadow-lg transition-shadow select-none`}
      style={{ left: node.x, top: node.y }}
      onMouseDown={onDragStart}
    >
      <CardContent className="p-3 h-full flex items-center">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium truncate">{node.data.label}</span>
        </div>
        
        {/* Connection points */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
      </CardContent>
    </Card>
  );
};

export default WorkflowNode;
