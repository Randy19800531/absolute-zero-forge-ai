
import React from 'react';
import { Card } from '@/components/ui/card';
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

interface WorkflowNodeProps {
  node: {
    id: string;
    type: string;
    x: number;
    y: number;
    data: {
      label: string;
    };
  };
  onDragStart: (e: React.MouseEvent) => void;
}

const WorkflowNode = ({ node, onDragStart }: WorkflowNodeProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'trigger': return Webhook;
      case 'api': return Globe;
      case 'database': return Database;
      case 'transform': return Code;
      case 'filter': return Filter;
      case 'ai': return Brain;
      case 'excel': return FileSpreadsheet;
      case 'chatbot': return MessageSquare;
      case 'browser': return Chrome;
      case 'action': return Mail;
      default: return Code;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-green-100 border-green-300 text-green-700';
      case 'api': return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'database': return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'transform': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'filter': return 'bg-orange-100 border-orange-300 text-orange-700';
      case 'ai': return 'bg-pink-100 border-pink-300 text-pink-700';
      case 'action': return 'bg-red-100 border-red-300 text-red-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const Icon = getIcon(node.type);

  return (
    <Card 
      className={`absolute cursor-move w-40 h-20 flex items-center justify-center ${getColor(node.type)} hover:shadow-md transition-shadow`}
      style={{ left: node.x, top: node.y }}
      onMouseDown={onDragStart}
    >
      <div className="flex flex-col items-center gap-1">
        <Icon className="h-5 w-5" />
        <span className="text-xs font-medium text-center">{node.data.label}</span>
      </div>
    </Card>
  );
};

export default WorkflowNode;
