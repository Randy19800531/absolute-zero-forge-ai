
import { useState } from 'react';
import { ThemeSettings } from './types';

const defaultTheme: ThemeSettings = {
  font: 'Inter',
  fontSize: 16,
  isBold: false,
  isUnderline: false,
  fontColor: '#000000',
  backgroundMode: 'light',
  backgroundColorScheme: 'blue',
  opacity: 100,
  gradient: 0,
  fade: 0,
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);

  const updateTheme = (updates: Partial<ThemeSettings>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return {
    theme,
    updateTheme,
    resetTheme,
  };
};
