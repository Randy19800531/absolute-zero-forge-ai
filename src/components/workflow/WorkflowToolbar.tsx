
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Play, 
  Save, 
  Settings, 
  Eye, 
  Download,
  Upload,
  Share2
} from 'lucide-react';

interface WorkflowToolbarProps {
  workflow: any;
  onBack: () => void;
}

const WorkflowToolbar = ({ workflow, onBack }: WorkflowToolbarProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-lg font-semibold">{workflow.name}</h2>
          <p className="text-sm text-gray-500">Visual workflow editor</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button variant="outline" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button size="sm" className="bg-green-500 hover:bg-green-600">
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
      </div>
    </div>
  );
};

export default WorkflowToolbar;
