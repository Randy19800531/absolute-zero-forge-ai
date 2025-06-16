
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTheme } from './useTheme';
import FontSelector from './FontSelector';
import FontStyleControls from './FontStyleControls';
import BackgroundControls from './BackgroundControls';
import { colorSchemes } from './constants';

const ThemeCustomizer = () => {
  const { theme, updateTheme, resetTheme } = useTheme();

  // Get the selected color scheme
  const selectedScheme = colorSchemes.find(scheme => scheme.value === theme.backgroundColorScheme);

  // Generate dynamic background style
  const getBackgroundStyle = () => {
    if (!selectedScheme) return {};
    
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

    return {
      background: backgroundColor,
      filter: `${brightnessFilter} opacity(${1 - fadeValue + 0.3})`,
      transition: 'all 0.3s ease',
    };
  };

  const previewStyle = {
    fontFamily: theme.font,
    fontSize: `${theme.fontSize}px`,
    fontWeight: theme.isBold ? 'bold' : 'normal',
    textDecoration: theme.isUnderline ? 'underline' : 'none',
    color: theme.fontColor,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Theme Customizer</h2>
          <p className="text-muted-foreground">Customize fonts, colors, and background settings</p>
        </div>
        <Button variant="outline" onClick={resetTheme}>
          Reset to Default
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Typography Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Configure font family, size, and styling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FontSelector theme={theme} onThemeChange={updateTheme} />
            <Separator />
            <FontStyleControls theme={theme} onThemeChange={updateTheme} />
          </CardContent>
        </Card>

        {/* Background Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Background</CardTitle>
            <CardDescription>Customize background colors and effects</CardDescription>
          </CardHeader>
          <CardContent>
            <BackgroundControls theme={theme} onThemeChange={updateTheme} />
          </CardContent>
        </Card>
      </div>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>See how your theme settings look in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="p-6 border rounded-lg min-h-[200px] relative overflow-hidden"
            style={getBackgroundStyle()}
          >
            <div style={previewStyle} className="relative z-10">
              <h3 className="text-xl mb-2">Sample Heading</h3>
              <p className="mb-4">
                This is a sample paragraph to demonstrate how your font and styling choices will appear. 
                You can see the selected font family ({theme.font}), size ({theme.fontSize}px), weight, 
                decoration, and color applied here.
              </p>
              <p className="mb-2">
                Background: {selectedScheme?.name || 'Default'} with {theme.opacity}% opacity
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Settings Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Current Settings</CardTitle>
          <CardDescription>Summary of your current theme configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Font:</span>
              <p className="text-muted-foreground">{theme.font}</p>
            </div>
            <div>
              <span className="font-medium">Size:</span>
              <p className="text-muted-foreground">{theme.fontSize}px</p>
            </div>
            <div>
              <span className="font-medium">Color:</span>
              <p className="text-muted-foreground">{theme.fontColor}</p>
            </div>
            <div>
              <span className="font-medium">Background:</span>
              <p className="text-muted-foreground">{selectedScheme?.name || 'Default'}</p>
            </div>
            <div>
              <span className="font-medium">Mode:</span>
              <p className="text-muted-foreground capitalize">{theme.backgroundMode}</p>
            </div>
            <div>
              <span className="font-medium">Opacity:</span>
              <p className="text-muted-foreground">{theme.opacity}%</p>
            </div>
            <div>
              <span className="font-medium">Gradient:</span>
              <p className="text-muted-foreground">{theme.gradient}°</p>
            </div>
            <div>
              <span className="font-medium">Style:</span>
              <p className="text-muted-foreground">
                {theme.isBold ? 'Bold' : 'Normal'}{theme.isUnderline ? ', Underlined' : ''}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeCustomizer;
