
import { RealtimeEvent } from '../types';

export const createEventHandler = (
  playAudioDelta: (delta: string) => Promise<void>,
  stopSpeaking: () => void,
  setTranscript: (updater: (prev: string) => string) => void
) => {
  return async (event: RealtimeEvent) => {
    console.log('Received event:', event.type, event);
    
    try {
      switch (event.type) {
        case 'connection_established':
          console.log('Connection established successfully');
          break;
          
        case 'session.created':
          console.log('Session created successfully');
          break;
          
        case 'session.updated':
          console.log('Session updated');
          break;
          
        case 'input_audio_buffer.speech_started':
          console.log('User started speaking');
          break;
          
        case 'input_audio_buffer.speech_stopped':
          console.log('User stopped speaking');
          break;
          
        case 'response.audio.delta':
          if (event.delta) {
            await playAudioDelta(event.delta);
          }
          break;
          
        case 'response.audio.done':
          console.log('Audio response completed');
          stopSpeaking();
          break;
          
        case 'response.audio_transcript.delta':
          if (event.delta) {
            setTranscript(prev => prev + event.delta);
          }
          break;
          
        case 'response.audio_transcript.done':
          console.log('Transcript completed');
          break;
          
        case 'error':
          console.error('Realtime API error:', event);
          break;
          
        default:
          console.log('Unhandled event type:', event.type);
      }
    } catch (error) {
      console.error('Error processing event:', event.type, error);
    }
  };
};
