
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConnectionStatusIndicator from './voice/ConnectionStatusIndicator';
import VoiceControls from './voice/VoiceControls';
import AudioStatusDisplay from './voice/AudioStatusDisplay';
import TranscriptDisplay from './voice/TranscriptDisplay';
import AgentSelector from './voice/AgentSelector';
import { useVoiceConnection } from './voice/useVoiceConnection';
import { VoiceInterfaceProps } from './voice/types';

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ selectedAgent }) => {
  const {
    isConnected,
    isRecording,
    isSpeaking,
    transcript,
    connectionStatus,
    connect,
    disconnect
  } = useVoiceConnection();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Voice Conversation</span>
          <ConnectionStatusIndicator status={connectionStatus as any} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AgentSelector selectedAgent={selectedAgent} />
        
        <VoiceControls
          isConnected={isConnected}
          connectionStatus={connectionStatus}
          onConnect={connect}
          onDisconnect={disconnect}
        />

        <AudioStatusDisplay
          isRecording={isRecording}
          isSpeaking={isSpeaking}
        />

        <TranscriptDisplay transcript={transcript} />

        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>Ensure your microphone is enabled and speak clearly for best results</p>
          <p>Status: {connectionStatus === 'connected' ? '🟢 Connected' : connectionStatus === 'connecting' ? '🟡 Connecting' : '🔴 Disconnected'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInterface;
