
import { useState, useRef, useCallback } from 'react';
import { AudioRecorder, encodeAudioForAPI } from '../utils/audioRecorder';
import { AudioPlayer } from '../utils/audioPlayer';

export const useAudioManagement = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRecorderRef = useRef<AudioRecorder | null>(null);
  const audioPlayerRef = useRef<AudioPlayer | null>(null);

  const startRecording = useCallback(async (onAudioData: (data: Float32Array) => void) => {
    try {
      if (audioRecorderRef.current) {
        audioRecorderRef.current.stop();
      }

      audioRecorderRef.current = new AudioRecorder(onAudioData);
      await audioRecorderRef.current.start();
      setIsRecording(true);
      console.log('🎤 Audio recording started');
    } catch (error) {
      console.error('❌ Failed to start audio recording:', error);
      setIsRecording(false);
      throw error;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      audioRecorderRef.current = null;
      setIsRecording(false);
      console.log('🛑 Audio recording stopped');
    }
  }, []);

  const initializeAudioPlayer = useCallback(async () => {
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new AudioPlayer();
      await audioPlayerRef.current.init();
      console.log('🔊 Audio player initialized');
    }
  }, []);

  const playAudioChunk = useCallback(async (audioData: Uint8Array) => {
    if (!audioPlayerRef.current) {
      await initializeAudioPlayer();
    }
    
    if (audioPlayerRef.current) {
      await audioPlayerRef.current.playAudioChunk(audioData);
      setIsSpeaking(true);
    }
  }, [initializeAudioPlayer]);

  const stopSpeaking = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.stop();
    }
    setIsSpeaking(false);
  }, []);

  const cleanup = useCallback(() => {
    stopRecording();
    stopSpeaking();
    
    if (audioPlayerRef.current) {
      audioPlayerRef.current.destroy();
      audioPlayerRef.current = null;
    }
  }, [stopRecording, stopSpeaking]);

  return {
    isRecording,
    isSpeaking,
    startRecording,
    stopRecording,
    initializeAudioPlayer,
    playAudioChunk,
    stopSpeaking,
    cleanup,
    setIsSpeaking
  };
};
