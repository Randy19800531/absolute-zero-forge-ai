
import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useWebSocketConnection = () => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 3;

  const attemptReconnect = (connectFn: () => void) => {
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      reconnectAttemptsRef.current++;
      console.log(`Attempting reconnect ${reconnectAttemptsRef.current}/${maxReconnectAttempts}`);
      
      reconnectTimeoutRef.current = setTimeout(() => {
        connectFn();
      }, 2000 * reconnectAttemptsRef.current);
    } else {
      console.log('Max reconnection attempts reached');
      setConnectionStatus('error');
      toast({
        title: "Connection Failed",
        description: "Unable to establish voice connection after multiple attempts. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const connect = async (onMessageHandler: (event: MessageEvent) => void) => {
    try {
      setConnectionStatus('connecting');
      console.log('Starting voice chat connection...');
      
      const wsUrl = `wss://rnhtpciitjycpqqimgce.supabase.co/functions/v1/realtime-chat`;
      
      console.log('Connecting to:', wsUrl);
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected successfully');
        setConnectionStatus('connected');
        reconnectAttemptsRef.current = 0;
        
        toast({
          title: "Voice Chat Connected",
          description: "You can now speak with the AI agent",
        });
      };

      wsRef.current.onmessage = onMessageHandler;

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        
        if (event.code !== 1000 && connectionStatus !== 'disconnected') {
          setConnectionStatus('error');
          attemptReconnect(() => connect(onMessageHandler));
        } else {
          setConnectionStatus('disconnected');
        }
      };

    } catch (error) {
      console.error('Error connecting:', error);
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
    reconnectAttemptsRef.current = maxReconnectAttempts;
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected');
      wsRef.current = null;
    }
    
    setConnectionStatus('disconnected');
  };

  const sendMessage = (message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
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
