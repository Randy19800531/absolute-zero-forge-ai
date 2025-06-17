
import { useState, useEffect } from 'react';
import { useWebSocketConnection } from './hooks/useWebSocketConnection';
import { useAudioManagement } from './hooks/useAudioManagement';
import { createEventHandler } from './utils/eventHandlers';
import { RealtimeEvent } from './types';

export const useVoiceConnection = () => {
  console.log('useVoiceConnection: Starting hook execution');
  
  // All hooks at the top level - consistent order
  const [transcript, setTranscript] = useState('');
  console.log('useVoiceConnection: useState called');
  
  const { 
    connectionStatus, 
    connect: connectWs, 
    disconnect: disconnectWs, 
    sendMessage,
    isConnected 
  } = useWebSocketConnection();
  console.log('useVoiceConnection: useWebSocketConnection called');
  
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
  console.log('useVoiceConnection: useAudioManagement called');

  // Define disconnect function before useEffect
  const disconnect = () => {
    console.log('useVoiceConnection: disconnect called');
    stopRecording();
    cleanupAudio();
    disconnectWs();
    setTranscript('');
  };

  useEffect(() => {
    console.log('useVoiceConnection: useEffect called');
    return () => {
      console.log('useVoiceConnection: cleanup effect running');
      disconnect();
    };
  }, []); // Empty dependency array to run only once

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
    console.log('useVoiceConnection: connect called');
    initializeAudio();
    
    await connectWs(handleMessage);
    
    if (connectionStatus === 'connected') {
      await startRecording(handleAudioData);
    }
  };

  console.log('useVoiceConnection: Returning values');
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
