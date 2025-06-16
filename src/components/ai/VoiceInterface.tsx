
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AudioRecorder, AudioQueue, encodeAudioForAPI } from '@/utils/RealtimeAudio';

interface VoiceInterfaceProps {
  selectedAgent?: any;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ selectedAgent }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  const wsRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioQueue | null>(null);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const connect = async () => {
    try {
      setConnectionStatus('connecting');
      console.log('Starting voice chat connection...');
      
      // Initialize audio context
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      audioQueueRef.current = new AudioQueue(audioContextRef.current);
      
      // Use the correct WebSocket URL for Supabase edge functions
      const wsUrl = `wss://lrhfqdqudnajfcqlmvag.supabase.co/functions/v1/realtime-chat`;
      
      console.log('Connecting to:', wsUrl);
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected successfully');
        setIsConnected(true);
        setConnectionStatus('connected');
        startRecording();
        
        toast({
          title: "Voice Chat Connected",
          description: "You can now speak with the AI agent",
        });
      };

      wsRef.current.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received message:', data);
          
          await handleRealtimeEvent(data);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
        toast({
          title: "Connection Error",
          description: "Failed to connect to voice chat. Please check your internet connection.",
          variant: "destructive",
        });
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        setIsConnected(false);
        setConnectionStatus('disconnected');
        stopRecording();
        
        if (event.code !== 1000) {
          toast({
            title: "Connection Lost",
            description: "Voice chat connection was lost. You can try reconnecting.",
            variant: "destructive",
          });
        }
      };

    } catch (error) {
      console.error('Error connecting:', error);
      setConnectionStatus('error');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to start voice chat',
        variant: "destructive",
      });
    }
  };

  const disconnect = () => {
    console.log('Disconnecting voice chat...');
    stopRecording();
    
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected');
      wsRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
    setTranscript('');
    setIsSpeaking(false);
  };

  const startRecording = async () => {
    try {
      console.log('Starting audio recording...');
      recorderRef.current = new AudioRecorder((audioData) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const encodedAudio = encodeAudioForAPI(audioData);
          wsRef.current.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: encodedAudio
          }));
        }
      });
      
      await recorderRef.current.start();
      setIsRecording(true);
      console.log('Recording started successfully');
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions and try again.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    console.log('Stopping audio recording...');
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current = null;
    }
    setIsRecording(false);
  };

  const handleRealtimeEvent = async (event: any) => {
    switch (event.type) {
      case 'session.created':
        console.log('Session created successfully');
        break;
        
      case 'session.updated':
        console.log('Session updated');
        break;
        
      case 'input_audio_buffer.speech_started':
        console.log('User started speaking');
        break;
        
      case 'input_audio_buffer.speech_stopped':
        console.log('User stopped speaking');
        break;
        
      case 'response.audio.delta':
        if (event.delta && audioQueueRef.current) {
          try {
            const binaryString = atob(event.delta);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            await audioQueueRef.current.addToQueue(bytes);
            setIsSpeaking(true);
          } catch (error) {
            console.error('Error processing audio delta:', error);
          }
        }
        break;
        
      case 'response.audio.done':
        console.log('Audio response completed');
        setIsSpeaking(false);
        break;
        
      case 'response.audio_transcript.delta':
        setTranscript(prev => prev + (event.delta || ''));
        break;
        
      case 'response.audio_transcript.done':
        console.log('Transcript completed');
        break;
        
      case 'error':
        console.error('Realtime API error:', event);
        toast({
          title: "API Error",
          description: event.error?.message || 'An error occurred with the AI service',
          variant: "destructive",
        });
        break;
        
      default:
        console.log('Unhandled event type:', event.type);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600';
      case 'connecting': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Voice Conversation</span>
          <div className={`flex items-center gap-2 ${getStatusColor()}`}>
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'connecting' ? 'bg-yellow-500' : 
              connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-500'
            }`} />
            <span className="text-sm capitalize">{connectionStatus}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedAgent && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Talking with: <strong>{selectedAgent.name}</strong>
            </p>
          </div>
        )}
        
        <div className="flex justify-center gap-4">
          {!isConnected ? (
            <Button 
              onClick={connect}
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
              onClick={disconnect}
              variant="outline"
              className="px-8 py-3"
            >
              <MicOff className="h-4 w-4 mr-2" />
              End Conversation
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              {isRecording ? (
                <>
                  <Mic className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-red-600">Listening</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </>
              ) : (
                <>
                  <MicOff className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Not listening</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-center p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <>
                  <Volume2 className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-blue-600">AI Speaking</span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                </>
              ) : (
                <>
                  <VolumeX className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">AI Silent</span>
                </>
              )}
            </div>
          </div>
        </div>

        {transcript && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">AI Response:</h4>
            <p className="text-sm text-gray-800">{transcript}</p>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>Ensure your microphone is enabled and speak clearly for best results</p>
          <p>Status: {connectionStatus === 'connected' ? '🟢 Connected' : connectionStatus === 'connecting' ? '🟡 Connecting' : '🔴 Disconnected'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInterface;
