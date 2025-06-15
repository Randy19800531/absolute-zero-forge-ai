
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import WorkflowNode from './WorkflowNode';
import ConnectionLine from './ConnectionLine';
import WorkflowToolbar from './WorkflowToolbar';
import NodeLibrary from './NodeLibrary';

interface WorkflowCanvasProps {
  workflow?: any;
}

const WorkflowCanvas = ({ workflow }: WorkflowCanvasProps) => {
  const [nodes, setNodes] = useState([
    { id: 'start', type: 'trigger', x: 100, y: 100, data: { label: 'Webhook Trigger' } },
    { id: 'process', type: 'transform', x: 300, y: 200, data: { label: 'Data Transform' } },
    { id: 'end', type: 'action', x: 500, y: 100, data: { label: 'Send Email' } },
  ]);
  
  const [connections, setConnections] = useState([
    { from: 'start', to: 'process' },
    { from: 'process', to: 'end' },
  ]);
  
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleNodeDragStart = (nodeId: string, e: React.MouseEvent) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDraggedNode(nodeId);
  };

  const handleNodeDrag = (e: React.MouseEvent) => {
    if (!draggedNode || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - dragOffset.x;
    const y = e.clientY - canvasRect.top - dragOffset.y;
    
    setNodes(nodes.map(node => 
      node.id === draggedNode 
        ? { ...node, x: Math.max(0, x), y: Math.max(0, y) }
        : node
    ));
  };

  const handleNodeDragEnd = () => {
    setDraggedNode(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('nodeType');
    if (!nodeType || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    const newNode = {
      id: `node-${Date.now()}`,
      type: nodeType,
      x,
      y,
      data: { label: `New ${nodeType}` },
    };
    
    setNodes([...nodes, newNode]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handlePlay = () => {
    setIsPlaying(true);
    console.log('Starting workflow execution...');
  };

  const handlePause = () => {
    setIsPlaying(false);
    console.log('Pausing workflow execution...');
  };

  const handleStop = () => {
    setIsPlaying(false);
    console.log('Stopping workflow execution...');
  };

  const handleSave = () => {
    console.log('Saving workflow...', { nodes, connections });
  };

  return (
    <div className="flex gap-4 h-full">
      <NodeLibrary />
      
      <div className="flex-1 flex flex-col gap-4">
        <WorkflowToolbar
          onPlay={handlePlay}
          onPause={handlePause}
          onStop={handleStop}
          onSave={handleSave}
          isPlaying={isPlaying}
        />
        
        <Card className="flex-1 relative overflow-hidden">
          <div 
            ref={canvasRef}
            className="w-full h-full bg-gray-50 relative min-h-[600px]"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseMove={handleNodeDrag}
            onMouseUp={handleNodeDragEnd}
          >
            {/* Grid background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />
            
            {/* Connection lines */}
            {connections.map((connection, index) => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              if (!fromNode || !toNode) return null;
              
              return (
                <ConnectionLine
                  key={index}
                  from={{ x: fromNode.x + 80, y: fromNode.y + 40 }}
                  to={{ x: toNode.x, y: toNode.y + 40 }}
                />
              );
            })}
            
            {/* Workflow nodes */}
            {nodes.map((node) => (
              <WorkflowNode
                key={node.id}
                node={node}
                onDragStart={(e) => handleNodeDragStart(node.id, e)}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
