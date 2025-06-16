
export const createWebSocketConnection = (wsUrl: string): WebSocket => {
  console.log('Creating WebSocket connection to:', wsUrl);
  const ws = new WebSocket(wsUrl);
  
  // Set a connection timeout
  const timeout = setTimeout(() => {
    if (ws.readyState === WebSocket.CONNECTING) {
      console.error('WebSocket connection timeout');
      ws.close();
    }
  }, 10000); // 10 second timeout

  ws.addEventListener('open', () => {
    clearTimeout(timeout);
    console.log('WebSocket connection opened successfully');
  });

  ws.addEventListener('error', () => {
    clearTimeout(timeout);
  });

  return ws;
};

export const setupWebSocketHandlers = (
  ws: WebSocket,
  onMessageHandler: (event: MessageEvent) => void,
  onOpen: () => void,
  onError: (error: Event) => void,
  onClose: (event: CloseEvent) => void
) => {
  ws.addEventListener('open', onOpen);
  ws.addEventListener('message', onMessageHandler);
  ws.addEventListener('error', onError);
  ws.addEventListener('close', onClose);
};

export const sendWebSocketMessage = (ws: WebSocket | null, message: any): boolean => {
  if (ws?.readyState === WebSocket.OPEN) {
    try {
      ws.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
      return false;
    }
  }
  console.warn('WebSocket not ready for sending, state:', ws?.readyState);
  return false;
};

export const closeWebSocketConnection = (ws: WebSocket | null, code = 1000, reason = 'User disconnected') => {
  if (ws && ws.readyState !== WebSocket.CLOSED) {
    console.log('Closing WebSocket connection');
    ws.close(code, reason);
  }
};
