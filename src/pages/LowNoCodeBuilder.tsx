
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Wand2, 
  Eye, 
  Code, 
  Download, 
  Layers,
  Smartphone,
  Monitor,
  Tablet,
  Image as ImageIcon,
  FileText,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LowNoCodeBuilder = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast({
          title: "Image Uploaded",
          description: "Image ready for code generation",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateFromPrompt = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your app",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI code generation
    setTimeout(() => {
      const sampleCode = `import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GeneratedApp = () => {
  const [data, setData] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              ${prompt || 'Generated App'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Enter data..."
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <Button className="w-full">
                Process Data
              </Button>
            </div>
            <div className="text-center text-gray-600">
              Generated from: "${prompt}"
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneratedApp;`;

      setGeneratedCode(sampleCode);
      setIsGenerating(false);
      toast({
        title: "Code Generated!",
        description: "Your app has been created successfully",
      });
    }, 2000);
  };

  const generateFromImage = async () => {
    if (!uploadedImage) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI image-to-code generation
    setTimeout(() => {
      const sampleCode = `import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ImageGeneratedApp = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <img 
                src="${uploadedImage}" 
                alt="Reference design"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Generated from Image</h2>
              <p className="text-gray-600">
                This component was automatically generated from your uploaded design.
              </p>
              <Button className="w-full">
                Interact with Design
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneratedApp;`;

      setGeneratedCode(sampleCode);
      setIsGenerating(false);
      toast({
        title: "Code Generated from Image!",
        description: "Your design has been converted to React code",
      });
    }, 3000);
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-component.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Layers className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Low-No Code Builder</h1>
                  <p className="text-gray-600">Generate React applications from text prompts or images</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-6">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered
                </Badge>
                <Badge variant="outline">Visual to Code</Badge>
                <Badge variant="outline">Responsive Design</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Create Your App
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="prompt" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="prompt" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Text Prompt
                      </TabsTrigger>
                      <TabsTrigger value="image" className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Upload Image
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="prompt" className="space-y-4">
                      <div>
                        <Label htmlFor="prompt">Describe your app</Label>
                        <Textarea
                          id="prompt"
                          placeholder="e.g., Create a modern dashboard with user analytics, dark theme, and responsive cards..."
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          rows={6}
                        />
                      </div>
                      <Button 
                        onClick={generateFromPrompt} 
                        disabled={isGenerating}
                        className="w-full"
                      >
                        {isGenerating ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate App
                          </>
                        )}
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="image" className="space-y-4">
                      <div>
                        <Label htmlFor="image-upload">Upload design or mockup</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          {uploadedImage ? (
                            <div className="space-y-4">
                              <img 
                                src={uploadedImage} 
                                alt="Uploaded design" 
                                className="max-w-full h-48 object-contain mx-auto rounded-lg"
                              />
                              <p className="text-sm text-gray-600">Image uploaded successfully</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                              <div>
                                <p className="text-gray-600">Drop your image here or click to browse</p>
                                <p className="text-sm text-gray-500">Supports PNG, JPG, SVG</p>
                              </div>
                            </div>
                          )}
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-4"
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={generateFromImage} 
                        disabled={isGenerating}
                        className="w-full"
                      >
                        {isGenerating ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing Image...
                          </>
                        ) : (
                          <>
                            <Code className="h-4 w-4 mr-2" />
                            Convert to Code
                          </>
                        )}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Preview Panel */}
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
            </div>

            {/* Generated Code */}
            {generatedCode && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Generated Code
                    </CardTitle>
                    <Button onClick={downloadCode} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generatedCode}</code>
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LowNoCodeBuilder;
