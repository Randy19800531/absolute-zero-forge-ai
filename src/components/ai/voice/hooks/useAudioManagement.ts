
import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AudioRecorder, AudioQueue, encodeAudioForAPI } from '@/utils/RealtimeAudio';

export const useAudioManagement = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const recorderRef = useRef<AudioRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioQueue | null>(null);

  const initializeAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    }
    if (!audioQueueRef.current) {
      audioQueueRef.current = new AudioQueue(audioContextRef.current);
    }
  };

  const startRecording = async (onAudioData: (encodedAudio: string) => void) => {
    try {
      console.log('Starting audio recording...');
      recorderRef.current = new AudioRecorder((audioData) => {
        const encodedAudio = encodeAudioForAPI(audioData);
        onAudioData(encodedAudio);
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

  const playAudioDelta = async (delta: string) => {
    if (delta && audioQueueRef.current) {
      try {
        const binaryString = atob(delta);
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
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
  };

  const cleanup = () => {
    stopRecording();
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (audioQueueRef.current) {
      audioQueueRef.current = null;
    }
    
    setIsSpeaking(false);
  };

  return {
    isRecording,
    isSpeaking,
    initializeAudio,
    startRecording,
    stopRecording,
    playAudioDelta,
    stopSpeaking,
    cleanup
  };
};
