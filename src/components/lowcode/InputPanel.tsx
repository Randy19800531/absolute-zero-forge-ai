
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Wand2, 
  Code, 
  FileText,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

interface InputPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  uploadedImage: string | null;
  isGenerating: boolean;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  generateFromPrompt: () => void;
  generateFromImage: () => void;
}

const InputPanel = ({
  prompt,
  setPrompt,
  uploadedImage,
  isGenerating,
  handleImageUpload,
  generateFromPrompt,
  generateFromImage,
}: InputPanelProps) => {
  return (
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
  );
};

export default InputPanel;
