
export const createSSEConnection = (baseUrl: string, sessionId: string): EventSource => {
  console.log('Creating SSE connection to:', `${baseUrl}?session=${sessionId}`);
  const eventSource = new EventSource(`${baseUrl}?session=${sessionId}`);
  
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
    const response = await fetch(`${baseUrl}?session=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
