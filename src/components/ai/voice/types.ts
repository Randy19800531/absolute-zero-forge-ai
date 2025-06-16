
export interface VoiceInterfaceProps {
  selectedAgent?: any;
}

export interface ConnectionStatus {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  isRecording: boolean;
  isSpeaking: boolean;
}

export interface RealtimeEvent {
  type: string;
  delta?: string;
  error?: {
    message: string;
  };
  [key: string]: any;
}
