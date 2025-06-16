
import React from 'react';

export interface PredefinedAgent {
  id: string;
  name: string;
  age: string;
  gender: string;
  personality: string;
  description: string;
  avatar: string;
  icon: React.ReactNode;
  capabilities: string[];
  systemPrompt: string;
  expertise: string[];
}
