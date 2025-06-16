
import { AudioRecorder, encodeAudioForAPI } from '@/utils/RealtimeAudio';

export class VoiceAudioRecorder {
  private recorder: AudioRecorder | null = null;
  private isRecording = false;

  async start(onAudioData: (encodedAudio: string) => void): Promise<void> {
    if (this.isRecording) {
      return;
    }

    console.log('Starting audio recording...');
    this.recorder = new AudioRecorder((audioData) => {
      const encodedAudio = encodeAudioForAPI(audioData);
      onAudioData(encodedAudio);
    });
    
    await this.recorder.start();
    this.isRecording = true;
    console.log('Recording started successfully');
  }

  stop(): void {
    console.log('Stopping audio recording...');
    if (this.recorder) {
      this.recorder.stop();
      this.recorder = null;
    }
    this.isRecording = false;
  }

  getIsRecording(): boolean {
    return this.isRecording;
  }
}
