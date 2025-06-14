
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fontOptions } from './constants';
import { ThemeSettings } from './types';

interface FontSelectorProps {
  theme: ThemeSettings;
  onThemeChange: (updates: Partial<ThemeSettings>) => void;
}

const FontSelector = ({ theme, onThemeChange }: FontSelectorProps) => {
  const groupedFonts = fontOptions.reduce((groups, font) => {
    if (!groups[font.category]) {
      groups[font.category] = [];
    }
    groups[font.category].push(font);
    return groups;
  }, {} as Record<string, typeof fontOptions>);

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Font Family</Label>
      <Select value={theme.font} onValueChange={(value) => onThemeChange({ font: value })}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {Object.entries(groupedFonts).map(([category, fonts]) => (
            <div key={category}>
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{category}</div>
              {fonts.map((font) => (
                <SelectItem 
                  key={font.value} 
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSelector;
