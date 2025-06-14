
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTheme } from './useTheme';
import FontSelector from './FontSelector';
import FontStyleControls from './FontStyleControls';
import BackgroundControls from './BackgroundControls';

const ThemeCustomizer = () => {
  const { theme, updateTheme, resetTheme } = useTheme();

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
          <div className="p-6 border rounded-lg bg-gray-50">
            <div style={previewStyle}>
              <h3 className="text-xl mb-2">Sample Heading</h3>
              <p className="mb-4">
                This is a sample paragraph to demonstrate how your font and styling choices will appear. 
                You can see the selected font family, size, weight, decoration, and color applied here.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeCustomizer;
