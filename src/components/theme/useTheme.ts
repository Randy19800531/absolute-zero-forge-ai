
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

  const applyTheme = () => {
    // Apply font settings to document body
    document.body.style.fontFamily = theme.font;
    document.body.style.fontSize = `${theme.fontSize}px`;
    document.body.style.fontWeight = theme.isBold ? 'bold' : 'normal';
    document.body.style.color = theme.fontColor;
    
    // Apply background settings to document body
    const selectedScheme = getColorScheme(theme.backgroundColorScheme);
    if (selectedScheme) {
      const opacity = theme.opacity / 100;
      const fadeValue = theme.fade / 100;
      
      let backgroundColor;
      if (theme.gradient > 0) {
        backgroundColor = `linear-gradient(${theme.gradient}deg, ${selectedScheme.colors[0]}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, ${selectedScheme.colors[1]}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`;
      } else {
        backgroundColor = `${selectedScheme.colors[0]}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
      }

      const brightnessFilter = theme.backgroundMode === 'light' ? 'brightness(1.2)' : 
                              theme.backgroundMode === 'dark' ? 'brightness(0.6)' : 'brightness(1)';

      document.body.style.background = backgroundColor;
      document.body.style.filter = `${brightnessFilter} opacity(${1 - fadeValue + 0.3})`;
    }

    // Save theme to localStorage for persistence
    localStorage.setItem('applied-theme', JSON.stringify(theme));
  };

  const getColorScheme = (schemeValue: string) => {
    const colorSchemes = [
      { name: 'Blue Ocean', value: 'blue', colors: ['#1e40af', '#3b82f6', '#60a5fa'] },
      { name: 'Forest Green', value: 'green', colors: ['#166534', '#16a34a', '#4ade80'] },
      { name: 'Sunset Orange', value: 'orange', colors: ['#ea580c', '#f97316', '#fb923c'] },
      { name: 'Purple Dream', value: 'purple', colors: ['#7c3aed', '#8b5cf6', '#a78bfa'] },
      { name: 'Rose Garden', value: 'rose', colors: ['#e11d48', '#f43f5e', '#fb7185'] },
      { name: 'Emerald Isle', value: 'emerald', colors: ['#059669', '#10b981', '#34d399'] },
      { name: 'Golden Hour', value: 'amber', colors: ['#d97706', '#f59e0b', '#fbbf24'] },
      { name: 'Deep Ocean', value: 'slate', colors: ['#334155', '#475569', '#64748b'] },
    ];
    return colorSchemes.find(scheme => scheme.value === schemeValue);
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
    applyTheme,
    exportTheme,
    importTheme,
  };
};
