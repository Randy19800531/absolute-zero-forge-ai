
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Monitor,
  Tablet,
  Smartphone,
  Sparkles
} from 'lucide-react';

interface PreviewPanelProps {
  generatedCode: string;
  activeView: 'desktop' | 'tablet' | 'mobile';
  setActiveView: (view: 'desktop' | 'tablet' | 'mobile') => void;
}

const PreviewPanel = ({
  generatedCode,
  activeView,
  setActiveView,
}: PreviewPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Preview
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={activeView === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === 'tablet' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`border rounded-lg overflow-hidden ${
          activeView === 'mobile' ? 'max-w-sm mx-auto' : 
          activeView === 'tablet' ? 'max-w-2xl mx-auto' : 'w-full'
        }`}>
          {generatedCode ? (
            <div className="bg-white min-h-96 p-4">
              <div className="text-center text-gray-500 py-12">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <p className="text-lg font-medium">Generated App Preview</p>
                <p className="text-sm">Your app would render here</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 min-h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-4" />
                <p>Generate an app to see preview</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewPanel;
