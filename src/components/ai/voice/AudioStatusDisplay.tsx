
import React from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface AudioStatusDisplayProps {
  isRecording: boolean;
  isSpeaking: boolean;
}

const AudioStatusDisplay: React.FC<AudioStatusDisplayProps> = ({
  isRecording,
  isSpeaking
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-center p-4 border rounded-lg">
        <div className="flex items-center gap-2">
          {isRecording ? (
            <>
              <Mic className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-600">Listening</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </>
          ) : (
            <>
              <MicOff className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Not listening</span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-center p-4 border rounded-lg">
        <div className="flex items-center gap-2">
          {isSpeaking ? (
            <>
              <Volume2 className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-blue-600">AI Speaking</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </>
          ) : (
            <>
              <VolumeX className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">AI Silent</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioStatusDisplay;
