
import React from 'react';

interface AgentSelectorProps {
  selectedAgent?: any;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ selectedAgent }) => {
  if (!selectedAgent) return null;

  return (
    <div className="p-3 bg-blue-50 rounded-lg">
      <p className="text-sm text-blue-800">
        Talking with: <strong>{selectedAgent.name}</strong>
      </p>
    </div>
  );
};

export default AgentSelector;
