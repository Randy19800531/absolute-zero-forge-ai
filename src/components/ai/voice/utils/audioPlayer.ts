
import { AudioQueue } from '@/utils/RealtimeAudio';

export class VoiceAudioPlayer {
  private audioContext: AudioContext | null = null;
  private audioQueue: AudioQueue | null = null;
  private isSpeaking = false;

  initialize(): void {
    if (!this.audioContext) {
      this.audioContext = new AudioContext({ sampleRate: 24000 });
    }
    if (!this.audioQueue) {
      this.audioQueue = new AudioQueue(this.audioContext);
    }
  }

  async playAudioDelta(delta: string): Promise<void> {
    if (delta && this.audioQueue) {
      try {
        const binaryString = atob(delta);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        await this.audioQueue.addToQueue(bytes);
        this.isSpeaking = true;
      } catch (error) {
        console.error('Error processing audio delta:', error);
      }
    }
  }

  stopSpeaking(): void {
    this.isSpeaking = false;
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    if (this.audioQueue) {
      this.audioQueue = null;
    }
    
    this.isSpeaking = false;
  }
}
