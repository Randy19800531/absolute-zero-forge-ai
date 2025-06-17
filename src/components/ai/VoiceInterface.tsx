
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useVoiceConnection } from './voice/useVoiceConnection';
import AgentSelector from './voice/AgentSelector';
import ConnectionStatusIndicator from './voice/ConnectionStatusIndicator';
import TranscriptDisplay from './voice/TranscriptDisplay';
import VoiceControls from './voice/VoiceControls';
import AudioStatusDisplay from './voice/AudioStatusDisplay';

interface VoiceInterfaceProps {
  selectedAgent?: any;
}

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

  const [localMuted, setLocalMuted] = useState(false);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect voice interface:', error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const toggleMute = () => {
    setLocalMuted(!localMuted);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Voice Chat Interface
              <ConnectionStatusIndicator status={connectionStatus} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AgentSelector selectedAgent={selectedAgent} />
            
            <div className="text-center space-y-4">
              <AudioStatusDisplay 
                isRecording={isRecording}
                isSpeaking={isSpeaking}
                isConnected={isConnected}
              />
              
              <VoiceControls
                isConnected={isConnected}
                connectionStatus={connectionStatus}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
              
              {isConnected && (
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMute}
                    className="flex items-center gap-2"
                  >
                    {localMuted ? (
                      <>
                        <VolumeX className="h-4 w-4" />
                        Unmute
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4" />
                        Mute
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px] space-y-4">
              <TranscriptDisplay transcript={transcript} />
              
              {!isConnected && !transcript && (
                <div className="text-center text-gray-500 py-8">
                  <Mic className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Click "Start Voice Chat" to begin conversation</p>
                </div>
              )}
              
              {isConnected && !transcript && (
                <div className="text-center text-blue-600 py-8">
                  <div className="animate-pulse">
                    <Mic className="h-12 w-12 mx-auto mb-4" />
                    <p>Listening... Speak to the AI</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">Getting Started</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Click "Start Voice Chat"</li>
                <li>• Allow microphone access</li>
                <li>• Wait for connection</li>
                <li>• Start speaking naturally</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">During Conversation</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Speak clearly and naturally</li>
                <li>• Wait for AI response</li>
                <li>• Use pause between thoughts</li>
                <li>• Mute when needed</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Best Practices</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Quiet environment</li>
                <li>• Good microphone quality</li>
                <li>• Stable internet connection</li>
                <li>• Clear speech patterns</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceInterface;
