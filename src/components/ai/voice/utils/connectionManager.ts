
import { supabase } from '@/integrations/supabase/client';

export const createSSEConnection = async (baseUrl: string, sessionId: string): Promise<EventSource> => {
  console.log('=== CREATING SSE CONNECTION ===');
  
  // Get the current session to obtain the access token
  const { data: { session }, error } = await supabase.auth.getSession();
  
  console.log('Session retrieval result:', {
    hasSession: !!session,
    hasUser: !!session?.user,
    hasAccessToken: !!session?.access_token,
    error: error?.message
  });
  
  if (error) {
    console.error('❌ Error getting session:', error);
    throw new Error(`Failed to get user session: ${error.message}`);
  }
  
  if (!session?.access_token) {
    console.error('❌ No access token in session:', session);
    throw new Error('User not authenticated - please log out and log back in');
  }

  const accessToken = session.access_token;
  console.log('✅ Access token retrieved successfully');
  console.log('Token length:', accessToken.length);
  console.log('Token preview:', accessToken.substring(0, 20) + '...');
  console.log('Creating SSE connection to:', `${baseUrl}?session=${sessionId}`);
  
  // EventSource doesn't support custom headers directly, so we need to pass the token as a query parameter
  const urlWithAuth = `${baseUrl}?session=${sessionId}&token=${encodeURIComponent(accessToken)}`;
  console.log('Full URL (token masked):', urlWithAuth.replace(/token=[^&]+/, 'token=***'));
  
  const eventSource = new EventSource(urlWithAuth);
  
  // Set a connection timeout
  const timeout = setTimeout(() => {
    if (eventSource.readyState === EventSource.CONNECTING) {
      console.error('❌ SSE connection timeout');
      eventSource.close();
    }
  }, 15000); // 15 second timeout

  eventSource.addEventListener('open', () => {
    clearTimeout(timeout);
    console.log('✅ SSE connection opened successfully');
  });

  eventSource.addEventListener('error', (error) => {
    clearTimeout(timeout);
    console.error('❌ SSE connection error:', error);
  });

  return eventSource;
};

export const setupSSEHandlers = (
  eventSource: EventSource,
  onMessageHandler: (event: MessageEvent) => void,
  onOpen: () => void,
  onError: (error: Event) => void,
  onClose: () => void
) => {
  eventSource.addEventListener('open', onOpen);
  eventSource.addEventListener('message', onMessageHandler);
  eventSource.addEventListener('error', onError);
  
  // EventSource doesn't have a close event, so we simulate it
  const originalClose = eventSource.close.bind(eventSource);
  eventSource.close = () => {
    originalClose();
    onClose();
  };
};

export const sendHTTPMessage = async (baseUrl: string, sessionId: string, message: any): Promise<boolean> => {
  try {
    console.log('=== SENDING HTTP MESSAGE ===');
    
    // Get the current session to obtain the access token
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session?.access_token) {
      console.error('❌ No valid session available for HTTP message:', {
        error: error?.message,
        hasSession: !!session,
        hasAccessToken: !!session?.access_token
      });
      return false;
    }

    const accessToken = session.access_token;
    console.log('✅ Sending HTTP message with auth token');

    const response = await fetch(`${baseUrl}?session=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(message)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HTTP message send failed:', {
        status: response.status,
        statusText: response.statusText,
        errorText
      });
      return false;
    }
    
    console.log('✅ HTTP message sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Error sending HTTP message:', error);
    return false;
  }
};

export const closeSSEConnection = (eventSource: EventSource | null) => {
  if (eventSource && eventSource.readyState !== EventSource.CLOSED) {
    console.log('🔌 Closing SSE connection');
    eventSource.close();
  }
};
