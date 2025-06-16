
import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { VoiceAudioRecorder } from '../utils/audioRecorder';
import { VoiceAudioPlayer } from '../utils/audioPlayer';

export const useAudioManagement = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const recorderRef = useRef<VoiceAudioRecorder | null>(null);
  const playerRef = useRef<VoiceAudioPlayer | null>(null);

  const initializeAudio = () => {
    if (!recorderRef.current) {
      recorderRef.current = new VoiceAudioRecorder();
    }
    if (!playerRef.current) {
      playerRef.current = new VoiceAudioPlayer();
      playerRef.current.initialize();
    }
  };

  const startRecording = async (onAudioData: (encodedAudio: string) => void) => {
    try {
      if (!recorderRef.current) {
        initializeAudio();
      }
      
      await recorderRef.current!.start(onAudioData);
      setIsRecording(true);
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
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const playAudioDelta = async (delta: string) => {
    if (playerRef.current) {
      await playerRef.current.playAudioDelta(delta);
      setIsSpeaking(playerRef.current.getIsSpeaking());
    }
  };

  const stopSpeaking = () => {
    if (playerRef.current) {
      playerRef.current.stopSpeaking();
    }
    setIsSpeaking(false);
  };

  const cleanup = () => {
    stopRecording();
    
    if (playerRef.current) {
      playerRef.current.cleanup();
      playerRef.current = null;
    }
    
    if (recorderRef.current) {
      recorderRef.current = null;
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
