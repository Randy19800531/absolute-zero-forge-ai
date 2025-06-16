
import React from 'react';

interface TranscriptDisplayProps {
  transcript: string;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript }) => {
  if (!transcript) return null;

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-2">AI Response:</h4>
      <p className="text-sm text-gray-800">{transcript}</p>
    </div>
  );
};

export default TranscriptDisplay;
