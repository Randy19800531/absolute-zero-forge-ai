
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { colorSchemes } from './constants';
import { ThemeSettings } from './types';

interface BackgroundControlsProps {
  theme: ThemeSettings;
  onThemeChange: (updates: Partial<ThemeSettings>) => void;
}

const BackgroundControls = ({ theme, onThemeChange }: BackgroundControlsProps) => {
  const selectedScheme = colorSchemes.find(scheme => scheme.value === theme.backgroundColorScheme);

  const getPreviewStyle = () => {
    if (!selectedScheme) return {};
    
    const opacity = theme.opacity / 100;
    const fadeValue = theme.fade / 100;
    
    let background;
    if (theme.gradient > 0) {
      background = `linear-gradient(${theme.gradient}deg, ${selectedScheme.colors[0]}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, ${selectedScheme.colors[1]}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`;
    } else {
      background = `${selectedScheme.colors[0]}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    }

    const brightnessFilter = theme.backgroundMode === 'light' ? 'brightness(1.2)' : 
                            theme.backgroundMode === 'dark' ? 'brightness(0.6)' : 'brightness(1)';

    return {
      background,
      filter: `${brightnessFilter} opacity(${1 - fadeValue + 0.3})`,
      transition: 'all 0.3s ease',
    };
  };

  return (
    <div className="space-y-6">
      {/* Background Mode */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Background Mode</Label>
        <Select 
          value={theme.backgroundMode} 
          onValueChange={(value: 'light' | 'medium' | 'dark') => onThemeChange({ backgroundMode: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Color Scheme */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Color Scheme</Label>
        <Select 
          value={theme.backgroundColorScheme} 
          onValueChange={(value) => onThemeChange({ backgroundColorScheme: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select color scheme" />
          </SelectTrigger>
          <SelectContent>
            {colorSchemes.map((scheme) => (
              <SelectItem key={scheme.value} value={scheme.value}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {scheme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  {scheme.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Opacity Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium">Opacity</Label>
          <span className="text-sm text-muted-foreground">{theme.opacity}%</span>
        </div>
        <Slider
          value={[theme.opacity]}
          onValueChange={(value) => onThemeChange({ opacity: value[0] })}
          max={100}
          min={10}
          step={5}
          className="w-full"
        />
      </div>

      {/* Gradient Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium">Gradient Angle</Label>
          <span className="text-sm text-muted-foreground">{theme.gradient}°</span>
        </div>
        <Slider
          value={[theme.gradient]}
          onValueChange={(value) => onThemeChange({ gradient: value[0] })}
          max={360}
          min={0}
          step={15}
          className="w-full"
        />
      </div>

      {/* Fade Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium">Fade Effect</Label>
          <span className="text-sm text-muted-foreground">{theme.fade}%</span>
        </div>
        <Slider
          value={[theme.fade]}
          onValueChange={(value) => onThemeChange({ fade: value[0] })}
          max={100}
          min={0}
          step={5}
          className="w-full"
        />
      </div>

      {/* Live Preview */}
      {selectedScheme && (
        <div className="space-y-2">
          <Label className="text-base font-medium">Background Preview</Label>
          <div 
            className="w-full h-24 rounded-lg border border-gray-200 relative overflow-hidden"
            style={getPreviewStyle()}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm font-medium bg-black/20 px-2 py-1 rounded">
                {selectedScheme.name}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Mode: {theme.backgroundMode} | Opacity: {theme.opacity}% | Gradient: {theme.gradient}° | Fade: {theme.fade}%
          </p>
        </div>
      )}
    </div>
  );
};

export default BackgroundControls;
