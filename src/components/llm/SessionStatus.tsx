
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface SessionStatusProps {
  onLock: () => void;
}

const SessionStatus = ({ onLock }: SessionStatusProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm text-green-600 font-medium">Secure Session Active</span>
      </div>
      <Button 
        variant="outline" 
        onClick={onLock}
        className="text-red-600 hover:text-red-700"
      >
        <Lock className="h-4 w-4 mr-2" />
        Lock Configuration
      </Button>
    </div>
  );
};

export default SessionStatus;
