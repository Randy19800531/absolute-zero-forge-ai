
export class ReconnectionManager {
  private reconnectTimeoutRef: NodeJS.Timeout | null = null;
  private reconnectAttemptsRef = 0;
  private maxReconnectAttempts: number;

  constructor(maxAttempts = 3) {
    this.maxReconnectAttempts = maxAttempts;
  }

  attemptReconnect(connectFn: () => void, onMaxAttemptsReached: () => void): void {
    if (this.reconnectAttemptsRef < this.maxReconnectAttempts) {
      this.reconnectAttemptsRef++;
      console.log(`Attempting reconnect ${this.reconnectAttemptsRef}/${this.maxReconnectAttempts}`);
      
      this.reconnectTimeoutRef = setTimeout(() => {
        connectFn();
      }, 2000 * this.reconnectAttemptsRef);
    } else {
      console.log('Max reconnection attempts reached');
      onMaxAttemptsReached();
    }
  }

  resetAttempts(): void {
    this.reconnectAttemptsRef = 0;
  }

  cleanup(): void {
    if (this.reconnectTimeoutRef) {
      clearTimeout(this.reconnectTimeoutRef);
      this.reconnectTimeoutRef = null;
    }
    this.reconnectAttemptsRef = this.maxReconnectAttempts;
  }

  getAttemptCount(): number {
    return this.reconnectAttemptsRef;
  }
}
