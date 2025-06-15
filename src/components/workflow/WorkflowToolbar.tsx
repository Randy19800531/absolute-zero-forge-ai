
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  Square, 
  Save, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut,
  Download,
  Upload
} from 'lucide-react';

interface WorkflowToolbarProps {
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  isPlaying?: boolean;
  canUndo?: boolean;
  canRedo?: boolean;
}

const WorkflowToolbar = ({
  onPlay,
  onPause,
  onStop,
  onSave,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onExport,
  onImport,
  isPlaying = false,
  canUndo = false,
  canRedo = false
}: WorkflowToolbarProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Workflow Controls</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Playback Controls */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={isPlaying ? onPause : onPlay}
              className="flex items-center gap-1"
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {isPlaying ? 'Pause' : 'Run'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onStop}
              className="flex items-center gap-1"
            >
              <Square className="h-3 w-3" />
              Stop
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Edit Controls */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={onSave}
              className="flex items-center gap-1"
            >
              <Save className="h-3 w-3" />
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onUndo}
              disabled={!canUndo}
              className="flex items-center gap-1"
            >
              <Undo className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onRedo}
              disabled={!canRedo}
              className="flex items-center gap-1"
            >
              <Redo className="h-3 w-3" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* View Controls */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={onZoomIn}
              className="flex items-center gap-1"
            >
              <ZoomIn className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onZoomOut}
              className="flex items-center gap-1"
            >
              <ZoomOut className="h-3 w-3" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Import/Export */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={onImport}
              className="flex items-center gap-1"
            >
              <Upload className="h-3 w-3" />
              Import
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onExport}
              className="flex items-center gap-1"
            >
              <Download className="h-3 w-3" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowToolbar;
