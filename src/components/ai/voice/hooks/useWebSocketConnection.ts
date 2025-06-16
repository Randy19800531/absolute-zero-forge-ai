
import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createWebSocketConnection, setupWebSocketHandlers, sendWebSocketMessage, closeWebSocketConnection } from '../utils/connectionManager';
import { ReconnectionManager } from '../utils/reconnectionManager';

export const useWebSocketConnection = () => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectionManagerRef = useRef<ReconnectionManager>(new ReconnectionManager(3));

  const handleMaxAttemptsReached = () => {
    setConnectionStatus('error');
    toast({
      title: "Connection Failed",
      description: "Unable to establish voice connection after multiple attempts. Please check your internet connection and try again.",
      variant: "destructive",
    });
  };

  const connect = async (onMessageHandler: (event: MessageEvent) => void) => {
    try {
      setConnectionStatus('connecting');
      console.log('Starting voice chat connection...');
      
      // Use the full Supabase project URL
      const wsUrl = `wss://rnhtpciitjycpqqimgce.supabase.co/functions/v1/realtime-chat`;
      console.log('Connecting to WebSocket URL:', wsUrl);
      
      // Close any existing connection
      if (wsRef.current) {
        closeWebSocketConnection(wsRef.current);
        wsRef.current = null;
      }

      wsRef.current = createWebSocketConnection(wsUrl);

      const handleOpen = () => {
        console.log('WebSocket connected successfully');
        setConnectionStatus('connected');
        reconnectionManagerRef.current.resetAttempts();
        
        toast({
          title: "Voice Chat Connected",
          description: "You can now speak with the AI agent",
        });
      };

      const handleError = (error: Event) => {
        console.error('WebSocket error occurred:', error);
        console.log('WebSocket readyState:', wsRef.current?.readyState);
        setConnectionStatus('error');
      };

      const handleClose = (event: CloseEvent) => {
        console.log('WebSocket closed with code:', event.code, 'reason:', event.reason);
        
        // Only attempt reconnection if it wasn't a normal closure and we're not disconnecting
        if (event.code !== 1000 && connectionStatus !== 'disconnected') {
          setConnectionStatus('error');
          console.log('Attempting reconnection...');
          reconnectionManagerRef.current.attemptReconnect(
            () => connect(onMessageHandler),
            handleMaxAttemptsReached
          );
        } else {
          setConnectionStatus('disconnected');
        }
      };

      setupWebSocketHandlers(
        wsRef.current,
        onMessageHandler,
        handleOpen,
        handleError,
        handleClose
      );

    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      setConnectionStatus('error');
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : 'Failed to start voice chat',
        variant: "destructive",
      });
    }
  };

  const disconnect = () => {
    console.log('Disconnecting voice chat...');
    reconnectionManagerRef.current.cleanup();
    closeWebSocketConnection(wsRef.current);
    wsRef.current = null;
    setConnectionStatus('disconnected');
  };

  const sendMessage = (message: any) => {
    const success = sendWebSocketMessage(wsRef.current, message);
    if (!success) {
      console.warn('Failed to send message, WebSocket not ready');
    }
  };

  return {
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    isConnected: connectionStatus === 'connected'
  };
};
