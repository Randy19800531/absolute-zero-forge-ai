
import { useState, useEffect } from 'react';
import { useWebSocketConnection } from './hooks/useWebSocketConnection';
import { useAudioManagement } from './hooks/useAudioManagement';
import { createEventHandler } from './utils/eventHandlers';
import { RealtimeEvent } from './types';

export const useVoiceConnection = () => {
  const [transcript, setTranscript] = useState('');
  
  const { 
    connectionStatus, 
    connect: connectWs, 
    disconnect: disconnectWs, 
    sendMessage,
    isConnected 
  } = useWebSocketConnection();
  
  const {
    isRecording,
    isSpeaking,
    initializeAudio,
    startRecording,
    stopRecording,
    playAudioDelta,
    stopSpeaking,
    cleanup: cleanupAudio
  } = useAudioManagement();

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const handleMessage = async (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      const eventHandler = createEventHandler(playAudioDelta, stopSpeaking, setTranscript);
      await eventHandler(data);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const handleAudioData = (encodedAudio: string) => {
    sendMessage({
      type: 'input_audio_buffer.append',
      audio: encodedAudio
    });
  };

  const connect = async () => {
    initializeAudio();
    
    await connectWs(handleMessage);
    
    if (connectionStatus === 'connected') {
      await startRecording(handleAudioData);
    }
  };

  const disconnect = () => {
    stopRecording();
    cleanupAudio();
    disconnectWs();
    setTranscript('');
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
