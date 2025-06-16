
import { useToast } from '@/hooks/use-toast';
import { RealtimeEvent } from '../types';

export const createEventHandler = (
  playAudioDelta: (delta: string) => Promise<void>,
  stopSpeaking: () => void,
  setTranscript: (updater: (prev: string) => string) => void
) => {
  const { toast } = useToast();

  return async (event: RealtimeEvent) => {
    console.log('Received event:', event.type, event);
    
    switch (event.type) {
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
        setTranscript(prev => prev + (event.delta || ''));
        break;
        
      case 'response.audio_transcript.done':
        console.log('Transcript completed');
        break;
        
      case 'error':
        console.error('Realtime API error:', event);
        toast({
          title: "API Error",
          description: event.error?.message || 'An error occurred with the AI service',
          variant: "destructive",
        });
        break;
        
      default:
        console.log('Unhandled event type:', event.type);
    }
  };
};
