
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Bold, Underline } from 'lucide-react';
import { fontSizeOptions } from './constants';
import { ThemeSettings } from './types';

interface FontStyleControlsProps {
  theme: ThemeSettings;
  onThemeChange: (updates: Partial<ThemeSettings>) => void;
}

const FontStyleControls = ({ theme, onThemeChange }: FontStyleControlsProps) => {
  return (
    <div className="space-y-4">
      {/* Font Size */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Font Size</Label>
        <Select 
          value={theme.fontSize.toString()} 
          onValueChange={(value) => onThemeChange({ fontSize: parseInt(value) })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {fontSizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label} ({option.value}px)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Styling */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Font Style</Label>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bold"
              checked={theme.isBold}
              onCheckedChange={(checked) => onThemeChange({ isBold: Boolean(checked) })}
            />
            <Label htmlFor="bold" className="flex items-center gap-1">
              <Bold className="h-4 w-4" />
              Bold
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="underline"
              checked={theme.isUnderline}
              onCheckedChange={(checked) => onThemeChange({ isUnderline: Boolean(checked) })}
            />
            <Label htmlFor="underline" className="flex items-center gap-1">
              <Underline className="h-4 w-4" />
              Underline
            </Label>
          </div>
        </div>
      </div>

      {/* Font Color */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Font Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={theme.fontColor}
            onChange={(e) => onThemeChange({ fontColor: e.target.value })}
            className="w-16 h-10 p-1 border rounded"
          />
          <Input
            type="text"
            value={theme.fontColor}
            onChange={(e) => onThemeChange({ fontColor: e.target.value })}
            className="flex-1"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );
};

export default FontStyleControls;
