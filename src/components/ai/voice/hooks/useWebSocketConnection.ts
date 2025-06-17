
import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createSSEConnection, setupSSEHandlers, sendHTTPMessage, closeSSEConnection } from '../utils/connectionManager';
import { ReconnectionManager } from '../utils/reconnectionManager';
import { useAuth } from '@/hooks/useAuth';

export const useWebSocketConnection = () => {
  console.log('useWebSocketConnection: Starting hook execution');
  
  // All hooks at the top level - consistent order
  const { toast } = useToast();
  console.log('useWebSocketConnection: useToast called');
  
  const { user, session } = useAuth();
  console.log('useWebSocketConnection: useAuth called');
  
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  console.log('useWebSocketConnection: useState called');
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const reconnectionManagerRef = useRef<ReconnectionManager>(new ReconnectionManager(3));
  console.log('useWebSocketConnection: useRef calls completed');

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
      // Check if user is authenticated before attempting connection
      if (!user || !session?.access_token) {
        setConnectionStatus('error');
        toast({
          title: "Authentication Required",
          description: "Please log in to use voice chat",
          variant: "destructive",
        });
        return;
      }

      setConnectionStatus('connecting');
      console.log('Starting voice chat connection...');
      console.log('User authenticated:', user.email);
      console.log('Session token available:', !!session.access_token);
      
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
      
      try {
        eventSourceRef.current = await createSSEConnection(baseUrl, sessionIdRef.current);
      } catch (error) {
        console.error('Failed to create SSE connection:', error);
        setConnectionStatus('error');
        
        // Show more specific error message based on error type
        if (error instanceof Error) {
          if (error.message.includes('authentication') || error.message.includes('Unauthorized')) {
            toast({
              title: "Authentication Error",
              description: "Please log out and log back in, then try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Connection Error",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Connection Error",
            description: "Failed to connect to voice service. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

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
          description: "Voice chat connection failed. Please check your authentication and try again.",
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

  console.log('useWebSocketConnection: Returning values');
  return {
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    isConnected: connectionStatus === 'connected'
  };
};
