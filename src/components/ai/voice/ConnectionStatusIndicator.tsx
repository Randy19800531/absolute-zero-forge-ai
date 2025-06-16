
import React from 'react';

interface ConnectionStatusIndicatorProps {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
}

const ConnectionStatusIndicator: React.FC<ConnectionStatusIndicatorProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'connecting': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusDotColor = () => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`flex items-center gap-2 ${getStatusColor()}`}>
      <div className={`w-2 h-2 rounded-full ${getStatusDotColor()}`} />
      <span className="text-sm capitalize">{status}</span>
    </div>
  );
};

export default ConnectionStatusIndicator;
