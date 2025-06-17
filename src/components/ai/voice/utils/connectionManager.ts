
import { supabase } from '@/integrations/supabase/client';

export const createSSEConnection = async (baseUrl: string, sessionId: string): Promise<EventSource> => {
  // Get the current session to obtain the access token
  const { data: { session } } = await supabase.auth.getSession();
  const accessToken = session?.access_token;

  if (!accessToken) {
    throw new Error('User not authenticated - please log in first');
  }

  console.log('Creating SSE connection to:', `${baseUrl}?session=${sessionId}`);
  console.log('Using access token:', accessToken.substring(0, 20) + '...');
  
  // EventSource doesn't support custom headers directly, so we need to use a different approach
  // We'll pass the token as a query parameter for SSE connections
  const urlWithAuth = `${baseUrl}?session=${sessionId}&token=${encodeURIComponent(accessToken)}`;
  
  const eventSource = new EventSource(urlWithAuth);
  
  // Set a connection timeout
  const timeout = setTimeout(() => {
    if (eventSource.readyState === EventSource.CONNECTING) {
      console.error('SSE connection timeout');
      eventSource.close();
    }
  }, 10000); // 10 second timeout

  eventSource.addEventListener('open', () => {
    clearTimeout(timeout);
    console.log('SSE connection opened successfully');
  });

  eventSource.addEventListener('error', () => {
    clearTimeout(timeout);
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
    // Get the current session to obtain the access token
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (!accessToken) {
      console.error('No access token available for HTTP message');
      return false;
    }

    const response = await fetch(`${baseUrl}?session=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(message)
    });
    
    if (!response.ok) {
      console.error('HTTP message send failed:', response.status, response.statusText);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending HTTP message:', error);
    return false;
  }
};

export const closeSSEConnection = (eventSource: EventSource | null) => {
  if (eventSource && eventSource.readyState !== EventSource.CLOSED) {
    console.log('Closing SSE connection');
    eventSource.close();
  }
};
