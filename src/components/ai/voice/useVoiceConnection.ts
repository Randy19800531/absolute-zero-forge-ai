
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AudioRecorder, AudioQueue, encodeAudioForAPI } from '@/utils/RealtimeAudio';
import { RealtimeEvent } from './types';

export const useVoiceConnection = () => {
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

  const handleRealtimeEvent = async (event: RealtimeEvent) => {
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

  const connect = async () => {
    try {
      setConnectionStatus('connecting');
      console.log('Starting voice chat connection...');
      
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      audioQueueRef.current = new AudioQueue(audioContextRef.current);
      
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

  return {
    isConnected,
    isRecording,
    isSpeaking,
    transcript,
    connectionStatus,
    connect,
    disconnect
  };
};
