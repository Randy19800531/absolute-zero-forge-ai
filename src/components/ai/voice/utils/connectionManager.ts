
export const createWebSocketConnection = (wsUrl: string): WebSocket => {
  console.log('Connecting to:', wsUrl);
  return new WebSocket(wsUrl);
};

export const setupWebSocketHandlers = (
  ws: WebSocket,
  onMessageHandler: (event: MessageEvent) => void,
  onOpen: () => void,
  onError: (error: Event) => void,
  onClose: (event: CloseEvent) => void
) => {
  ws.onopen = onOpen;
  ws.onmessage = onMessageHandler;
  ws.onerror = onError;
  ws.onclose = onClose;
};

export const sendWebSocketMessage = (ws: WebSocket | null, message: any): boolean => {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
    return true;
  }
  return false;
};

export const closeWebSocketConnection = (ws: WebSocket | null, code = 1000, reason = 'User disconnected') => {
  if (ws) {
    ws.close(code, reason);
  }
};
