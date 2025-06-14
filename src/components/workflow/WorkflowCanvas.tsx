
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import WorkflowNode from './WorkflowNode';
import ConnectionLine from './ConnectionLine';

interface WorkflowCanvasProps {
  workflow: any;
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
  
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const handleNodeDragStart = (nodeId, e) => {
    const node = nodes.find(n => n.id === nodeId);
    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDraggedNode(nodeId);
  };

  const handleNodeDrag = (e) => {
    if (!draggedNode) return;
    
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

  const handleDrop = (e) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('nodeType');
    if (!nodeType) return;
    
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="flex-1 relative overflow-hidden">
      <div 
        ref={canvasRef}
        className="w-full h-full bg-gray-50 relative"
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
  );
};

export default WorkflowCanvas;
