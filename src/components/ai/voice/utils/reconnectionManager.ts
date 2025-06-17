
export class ReconnectionManager {
  private attempts = 0;
  private maxAttempts: number;
  private timeoutId: number | null = null;
  private baseDelay = 1000; // Start with 1 second
  private maxDelay = 30000; // Max 30 seconds

  constructor(maxAttempts: number = 3) {
    this.maxAttempts = maxAttempts;
  }

  attemptReconnect(
    reconnectFn: () => Promise<void>,
    onMaxAttemptsReached: () => void
  ) {
    if (this.attempts >= this.maxAttempts) {
      console.error(`❌ Max reconnection attempts (${this.maxAttempts}) reached`);
      onMaxAttemptsReached();
      return;
    }

    this.attempts++;
    const delay = Math.min(this.baseDelay * Math.pow(2, this.attempts - 1), this.maxDelay);
    
    console.log(`🔄 Reconnection attempt ${this.attempts}/${this.maxAttempts} in ${delay}ms`);

    this.timeoutId = window.setTimeout(async () => {
      try {
        await reconnectFn();
        this.resetAttempts();
      } catch (error) {
        console.error(`❌ Reconnection attempt ${this.attempts} failed:`, error);
        this.attemptReconnect(reconnectFn, onMaxAttemptsReached);
      }
    }, delay);
  }

  resetAttempts() {
    this.attempts = 0;
    this.cleanup();
  }

  cleanup() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  getAttemptCount() {
    return this.attempts;
  }

  getMaxAttempts() {
    return this.maxAttempts;
  }
}
