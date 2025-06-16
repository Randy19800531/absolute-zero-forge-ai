
import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createSSEConnection, setupSSEHandlers, sendHTTPMessage, closeSSEConnection } from '../utils/connectionManager';
import { ReconnectionManager } from '../utils/reconnectionManager';

export const useWebSocketConnection = () => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const eventSourceRef = useRef<EventSource | null>(null);
  const sessionIdRef = useRef<string>(crypto.randomUUID());
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
      
      // Use the full Supabase project URL with HTTP/SSE
      const baseUrl = `https://rnhtpciitjycpqqimgce.supabase.co/functions/v1/realtime-chat`;
      console.log('Connecting to SSE URL:', baseUrl);
      
      // Close any existing connection
      if (eventSourceRef.current) {
        closeSSEConnection(eventSourceRef.current);
        eventSourceRef.current = null;
      }

      // Generate new session ID for this connection
      sessionIdRef.current = crypto.randomUUID();
      eventSourceRef.current = createSSEConnection(baseUrl, sessionIdRef.current);

      const handleOpen = () => {
        console.log('SSE connected successfully');
        setConnectionStatus('connected');
        reconnectionManagerRef.current.resetAttempts();
        
        toast({
          title: "Voice Chat Connected",
          description: "You can now speak with the AI agent",
        });
      };

      const handleError = (error: Event) => {
        console.error('SSE error occurred:', error);
        setConnectionStatus('error');
        
        // Show more specific error message
        toast({
          title: "Connection Error",
          description: "Failed to connect to voice chat. Please check if the OpenAI API key is configured and try again.",
          variant: "destructive",
        });
      };

      const handleClose = () => {
        console.log('SSE connection closed');
        
        // Only attempt reconnection if we're not manually disconnecting
        if (connectionStatus === 'connected' || connectionStatus === 'connecting') {
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

      const handleMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received SSE message:', data.type);
          
          // Handle specific message types
          if (data.type === 'error') {
            console.error('Received error from server:', data.error);
            setConnectionStatus('error');
            toast({
              title: "Voice Chat Error",
              description: data.error?.message || "An error occurred with the voice connection",
              variant: "destructive",
            });
            return;
          }
          
          // Create a synthetic MessageEvent for compatibility
          const syntheticEvent = new MessageEvent('message', {
            data: event.data
          });
          onMessageHandler(syntheticEvent);
        } catch (error) {
          console.error('Error parsing SSE message:', error);
        }
      };

      setupSSEHandlers(
        eventSourceRef.current,
        handleMessage,
        handleOpen,
        handleError,
        handleClose
      );

    } catch (error) {
      console.error('Error connecting to SSE:', error);
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
    closeSSEConnection(eventSourceRef.current);
    eventSourceRef.current = null;
    setConnectionStatus('disconnected');
  };

  const sendMessage = async (message: any) => {
    if (!eventSourceRef.current || eventSourceRef.current.readyState !== EventSource.OPEN) {
      console.warn('SSE connection not ready');
      return false;
    }

    const baseUrl = `https://rnhtpciitjycpqqimgce.supabase.co/functions/v1/realtime-chat`;
    const success = await sendHTTPMessage(baseUrl, sessionIdRef.current, message);
    if (!success) {
      console.warn('Failed to send message via HTTP');
    }
    return success;
  };

  return {
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    isConnected: connectionStatus === 'connected'
  };
};
