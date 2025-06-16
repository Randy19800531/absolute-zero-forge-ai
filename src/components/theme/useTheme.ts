
import { useState, useEffect } from 'react';
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

  // Load Google Fonts when font changes
  useEffect(() => {
    const systemFonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia'];
    if (!systemFonts.includes(theme.font)) {
      const existingLink = document.querySelector(`link[href*="${theme.font.replace(/\s+/g, '+')}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${theme.font.replace(/\s+/g, '+')}:wght@400;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    }
  }, [theme.font]);

  const updateTheme = (updates: Partial<ThemeSettings>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  const exportTheme = () => {
    return JSON.stringify(theme, null, 2);
  };

  const importTheme = (themeJson: string) => {
    try {
      const importedTheme = JSON.parse(themeJson);
      setTheme({ ...defaultTheme, ...importedTheme });
      return true;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return false;
    }
  };

  return {
    theme,
    updateTheme,
    resetTheme,
    exportTheme,
    importTheme,
  };
};
