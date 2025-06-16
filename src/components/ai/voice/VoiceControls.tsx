
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

interface VoiceControlsProps {
  isConnected: boolean;
  connectionStatus: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isConnected,
  connectionStatus,
  onConnect,
  onDisconnect
}) => {
  return (
    <div className="flex justify-center gap-4">
      {!isConnected ? (
        <Button 
          onClick={onConnect}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          disabled={connectionStatus === 'connecting'}
        >
          {connectionStatus === 'connecting' ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Mic className="h-4 w-4 mr-2" />
          )}
          {connectionStatus === 'connecting' ? 'Connecting...' : 'Start Voice Chat'}
        </Button>
      ) : (
        <Button 
          onClick={onDisconnect}
          variant="outline"
          className="px-8 py-3"
        >
          <MicOff className="h-4 w-4 mr-2" />
          End Conversation
        </Button>
      )}
    </div>
  );
};

export default VoiceControls;
