
import { useState, useCallback, useRef, useEffect } from 'react';
import { useWebSocketConnection } from './hooks/useWebSocketConnection';
import { useAudioManagement } from './hooks/useAudioManagement';
import { VoiceEventManager, VoiceEventHandlers, createAudioMessage } from './utils/eventHandlers';

export const useVoiceConnection = () => {
  const [transcript, setTranscript] = useState('');
  const eventManagerRef = useRef<VoiceEventManager | null>(null);
  
  const {
    connectionStatus,
    connect: connectWebSocket,
    disconnect: disconnectWebSocket,
    sendMessage,
    isConnected
  } = useWebSocketConnection();

  const {
    isRecording,
    isSpeaking,
    startRecording,
    stopRecording,
    initializeAudioPlayer,
    playAudioChunk,
    stopSpeaking,
    cleanup: cleanupAudio,
    setIsSpeaking
  } = useAudioManagement();

  const handleAudioData = useCallback((audioData: Float32Array) => {
    if (isConnected) {
      const message = createAudioMessage(audioData);
      sendMessage(message);
    }
  }, [isConnected, sendMessage]);

  const eventHandlers: VoiceEventHandlers = {
    onConnectionOpen: () => {
      console.log('✅ Voice connection opened');
    },
    onConnectionClose: () => {
      console.log('🔌 Voice connection closed');
      stopRecording();
      stopSpeaking();
    },
    onConnectionError: (error) => {
      console.error('❌ Voice connection error:', error);
      stopRecording();
      stopSpeaking();
    },
    onAudioDelta: async (audioData) => {
      const binaryString = atob(audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      await playAudioChunk(bytes);
    },
    onTranscriptDelta: (text) => {
      setTranscript(prev => prev + text);
    },
    onSpeakingStart: () => {
      setIsSpeaking(true);
    },
    onSpeakingEnd: () => {
      setIsSpeaking(false);
    }
  };

  const connect = useCallback(async () => {
    try {
      await initializeAudioPlayer();
      
      if (!eventManagerRef.current) {
        eventManagerRef.current = new VoiceEventManager(eventHandlers);
        await eventManagerRef.current.initialize();
      }

      await connectWebSocket((event: MessageEvent) => {
        eventManagerRef.current?.handleSSEMessage(event);
      });

      await startRecording(handleAudioData);
    } catch (error) {
      console.error('❌ Failed to connect voice interface:', error);
      throw error;
    }
  }, [connectWebSocket, startRecording, handleAudioData, initializeAudioPlayer]);

  const disconnect = useCallback(() => {
    stopRecording();
    stopSpeaking();
    disconnectWebSocket();
    setTranscript('');
  }, [stopRecording, stopSpeaking, disconnectWebSocket]);

  useEffect(() => {
    return () => {
      cleanupAudio();
      eventManagerRef.current?.destroy();
    };
  }, [cleanupAudio]);

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
