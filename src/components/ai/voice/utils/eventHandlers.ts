
import { AudioPlayer } from './audioPlayer';
import { encodeAudioForAPI } from './audioRecorder';

export interface VoiceEventHandlers {
  onConnectionOpen: () => void;
  onConnectionClose: () => void;
  onConnectionError: (error: Event) => void;
  onAudioDelta: (audioData: string) => void;
  onTranscriptDelta: (text: string) => void;
  onSpeakingStart: () => void;
  onSpeakingEnd: () => void;
}

export class VoiceEventManager {
  private audioPlayer: AudioPlayer;
  private handlers: VoiceEventHandlers;

  constructor(handlers: VoiceEventHandlers) {
    this.handlers = handlers;
    this.audioPlayer = new AudioPlayer();
  }

  async initialize() {
    await this.audioPlayer.init();
  }

  async handleSSEMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);
      console.log('📨 Received SSE message:', data.type);

      switch (data.type) {
        case 'connection_established':
          this.handlers.onConnectionOpen();
          break;

        case 'openai_connected':
          console.log('✅ OpenAI connection established');
          break;

        case 'response.audio.delta':
          await this.handleAudioDelta(data.delta);
          break;

        case 'response.audio_transcript.delta':
          this.handlers.onTranscriptDelta(data.delta);
          break;

        case 'response.audio.done':
          this.handlers.onSpeakingEnd();
          break;

        case 'response.created':
          this.handlers.onSpeakingStart();
          break;

        case 'error':
          console.error('❌ Received error from server:', data.error);
          this.handlers.onConnectionError(new Event('error'));
          break;

        default:
          console.log('📝 Unhandled message type:', data.type);
      }
    } catch (error) {
      console.error('❌ Error parsing SSE message:', error);
    }
  }

  private async handleAudioDelta(audioData: string) {
    try {
      const binaryString = atob(audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      await this.audioPlayer.playAudioChunk(bytes);
      this.handlers.onAudioDelta(audioData);
    } catch (error) {
      console.error('❌ Error playing audio delta:', error);
    }
  }

  destroy() {
    this.audioPlayer.destroy();
  }
}

export const createAudioMessage = (audioData: Float32Array) => {
  return {
    type: 'input_audio_buffer.append',
    audio: encodeAudioForAPI(audioData)
  };
};

export const createTextMessage = (text: string) => {
  return {
    type: 'conversation.item.create',
    item: {
      type: 'message',
      role: 'user',
      content: [
        {
          type: 'input_text',
          text
        }
      ]
    }
  };
};

export const createResponseTrigger = () => {
  return { type: 'response.create' };
};
