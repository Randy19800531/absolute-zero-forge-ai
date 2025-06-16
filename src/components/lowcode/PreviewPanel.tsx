
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  Play,
  RefreshCw,
  Maximize2,
  AlertTriangle
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
  const [isArtifactMode, setIsArtifactMode] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const createArtifactPreview = () => {
    if (!generatedCode) return '';

    // Create a complete HTML document with the React component
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Generated App Preview</title>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
            .error { color: red; padding: 20px; background: #fee; border: 1px solid #fcc; margin: 10px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            try {
              // Extract the component code and convert imports
              let componentCode = \`${generatedCode.replace(/`/g, '\\`')}\`;
              
              // Replace shadcn imports with placeholder components
              componentCode = componentCode.replace(/import.*from.*@\/components\/ui.*$/gm, '');
              componentCode = componentCode.replace(/import.*from.*@\/.*$/gm, '');
              
              // Create mock components for common UI elements
              const Card = ({ children, className = '' }) => 
                React.createElement('div', { className: \`border rounded-lg shadow-sm \${className}\` }, children);
              
              const CardHeader = ({ children, className = '' }) => 
                React.createElement('div', { className: \`p-6 pb-4 \${className}\` }, children);
              
              const CardTitle = ({ children, className = '' }) => 
                React.createElement('h3', { className: \`text-lg font-semibold \${className}\` }, children);
              
              const CardContent = ({ children, className = '' }) => 
                React.createElement('div', { className: \`p-6 pt-0 \${className}\` }, children);
              
              const Button = ({ children, className = '', onClick, ...props }) => 
                React.createElement('button', { 
                  className: \`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 \${className}\`,
                  onClick, ...props 
                }, children);
              
              const Input = ({ className = '', ...props }) => 
                React.createElement('input', { 
                  className: \`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 \${className}\`,
                  ...props 
                });

              // Execute the component code
              eval(\`
                \${componentCode}
                
                // Find the default export component
                const componentNames = Object.keys(window).filter(key => 
                  typeof window[key] === 'function' && 
                  key.includes('App') || key.includes('Component') || key.includes('Generated')
                );
                
                const ComponentToRender = window[componentNames[componentNames.length - 1]] || 
                  (() => React.createElement('div', { className: 'p-8 text-center' }, 
                    React.createElement('h2', { className: 'text-xl font-bold mb-4' }, 'Generated Component'),
                    React.createElement('p', { className: 'text-gray-600' }, 'Component rendered successfully!')
                  ));
                
                ReactDOM.render(React.createElement(ComponentToRender), document.getElementById('root'));
              \`);
              
            } catch (error) {
              console.error('Preview error:', error);
              document.getElementById('root').innerHTML = \`
                <div class="error">
                  <h3>Preview Error</h3>
                  <p>Unable to render the generated component. This is likely due to complex imports or dependencies.</p>
                  <details>
                    <summary>Error Details</summary>
                    <pre>\${error.message}</pre>
                  </details>
                </div>
              \`;
            }
          </script>
        </body>
      </html>
    `;

    return htmlContent;
  };

  const refreshPreview = () => {
    setIsRefreshing(true);
    setPreviewError(null);
    
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = 'about:blank';
        setTimeout(() => {
          if (iframeRef.current) {
            const htmlContent = createArtifactPreview();
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            iframeRef.current.src = url;
          }
          setIsRefreshing(false);
        }, 100);
      } else {
        setIsRefreshing(false);
      }
    }, 500);
  };

  useEffect(() => {
    if (isArtifactMode && generatedCode && iframeRef.current) {
      refreshPreview();
    }
  }, [isArtifactMode, generatedCode]);

  const getPreviewDimensions = () => {
    switch (activeView) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Preview
            {isArtifactMode && (
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="h-3 w-3 mr-1" />
                Artifact Mode
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {generatedCode && (
              <Button
                variant={isArtifactMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsArtifactMode(!isArtifactMode)}
              >
                <Play className="h-4 w-4 mr-1" />
                {isArtifactMode ? 'Static' : 'Live'}
              </Button>
            )}
            {isArtifactMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={refreshPreview}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            )}
            <div className="flex items-center gap-1">
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
        </div>
      </CardHeader>
      <CardContent>
        <div className={`border rounded-lg overflow-hidden ${getPreviewDimensions()}`}>
          {generatedCode ? (
            isArtifactMode ? (
              <div className="relative">
                <iframe
                  ref={iframeRef}
                  className="w-full min-h-96 border-0"
                  title="Live Preview"
                  sandbox="allow-scripts"
                  onError={() => setPreviewError('Failed to load preview')}
                />
                {previewError && (
                  <div className="absolute inset-0 bg-red-50 border border-red-200 rounded flex items-center justify-center">
                    <div className="text-center text-red-700">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-medium">Preview Error</p>
                      <p className="text-sm">{previewError}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white min-h-96 p-4">
                <div className="text-center text-gray-500 py-12">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <p className="text-lg font-medium">Generated App Preview</p>
                  <p className="text-sm mb-4">Switch to Live mode to see interactive preview</p>
                  <Button 
                    onClick={() => setIsArtifactMode(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Enable Live Preview
                  </Button>
                </div>
              </div>
            )
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
