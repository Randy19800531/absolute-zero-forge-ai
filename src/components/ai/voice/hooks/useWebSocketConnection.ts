
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
  console.log('Auth state:', { 
    hasUser: !!user, 
    userEmail: user?.email, 
    hasSession: !!session,
    hasAccessToken: !!session?.access_token 
  });
  
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
      description: "Unable to establish voice connection after multiple attempts. Please try logging out and back in, then try again.",
      variant: "destructive",
    });
  };

  const connect = async (onMessageHandler: (event: MessageEvent) => void) => {
    try {
      // Enhanced authentication check with detailed logging
      console.log('=== AUTHENTICATION CHECK ===');
      console.log('User object:', user);
      console.log('Session object:', session);
      console.log('Access token present:', !!session?.access_token);
      console.log('Access token length:', session?.access_token?.length || 0);
      
      if (!user || !session?.access_token) {
        console.error('❌ Authentication check failed:', {
          hasUser: !!user,
          hasSession: !!session,
          hasAccessToken: !!session?.access_token
        });
        
        setConnectionStatus('error');
        toast({
          title: "Authentication Required",
          description: "Please log out and log back in, then try again.",
          variant: "destructive",
        });
        return;
      }

      setConnectionStatus('connecting');
      console.log('✅ Authentication check passed');
      console.log('Starting voice chat connection...');
      console.log('User authenticated:', user.email);
      console.log('Session token available:', !!session.access_token);
      console.log('Token preview:', session.access_token.substring(0, 20) + '...');
      
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
        console.log('Creating SSE connection with session ID:', sessionIdRef.current);
        eventSourceRef.current = await createSSEConnection(baseUrl, sessionIdRef.current);
        console.log('SSE connection created successfully');
      } catch (error) {
        console.error('❌ Failed to create SSE connection:', error);
        setConnectionStatus('error');
        
        // Show more specific error message based on error type
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            stack: error.stack
          });
          
          if (error.message.includes('authentication') || error.message.includes('Unauthorized')) {
            toast({
              title: "Authentication Error",
              description: "Your session has expired. Please log out and log back in.",
              variant: "destructive",
            });
          } else if (error.message.includes('User not authenticated')) {
            toast({
              title: "Authentication Required",
              description: "Please ensure you are logged in and try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Connection Error",  
              description: `Failed to connect: ${error.message}. Please check if the OpenAI API key is configured.`,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Connection Error",
            description: "Failed to connect to voice service. Please check if all required API keys are configured and try again.",
            variant: "destructive",
          });
        }
        return;
      }

      const handleOpen = () => {
        console.log('✅ SSE connected successfully');
        setConnectionStatus('connected');
        reconnectionManagerRef.current.resetAttempts();
        
        toast({
          title: "Voice Chat Connected",
          description: "You can now speak with the AI agent",
        });
      };

      const handleError = (error: Event) => {
        console.error('❌ SSE error occurred:', error);
        setConnectionStatus('error');
        
        // Show more specific error message
        toast({
          title: "Connection Error",
          description: "Voice chat connection failed. Please check your authentication and ensure the OpenAI API key is configured, then try again.",
          variant: "destructive",
        });
      };

      const handleClose = () => {
        console.log('🔌 SSE connection closed');
        
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
          console.log('📨 Received SSE message:', data.type);
          
          // Handle specific message types
          if (data.type === 'error') {
            console.error('❌ Received error from server:', data.error);
            setConnectionStatus('error');
            
            let errorMessage = "An error occurred with the voice connection";
            if (data.error?.details?.includes('API key')) {
              errorMessage = "OpenAI API key is not configured or invalid. Please check the configuration.";
            } else if (data.error?.message) {
              errorMessage = data.error.message;
            }
            
            toast({
              title: "Voice Chat Error",
              description: errorMessage,
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
          console.error('❌ Error parsing SSE message:', error);
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
      console.error('❌ Error in connect function:', error);
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
      console.warn('⚠️ SSE connection not ready for session:', sessionIdRef.current);
      return false;
    }

    const baseUrl = `https://rnhtpciitjycpqqimgce.supabase.co/functions/v1/realtime-chat`;
    const success = await sendHTTPMessage(baseUrl, sessionIdRef.current, message);
    if (!success) {
      console.warn('❌ Failed to send message via HTTP');
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
