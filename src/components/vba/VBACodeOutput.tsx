
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, FileSpreadsheet, Play } from 'lucide-react';

interface VBACodeOutputProps {
  code: string;
  requirements: any;
}

const VBACodeOutput = ({ code, requirements }: VBACodeOutputProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Copied!",
        description: "VBA code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy code to clipboard",
        variant: "destructive",
      });
    }
  };

  const exportToExcel = async () => {
    setIsExporting(true);
    try {
      // Simulate Excel file generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a download link for demonstration
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${requirements?.projectName || 'macro'}.vba`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Complete",
        description: "VBA code exported successfully",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export VBA code",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Generated VBA Code
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!code}>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToExcel}
              disabled={!code || isExporting}
            >
              <Download className="h-4 w-4 mr-1" />
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {code ? (
          <div className="space-y-4">
            <Textarea
              value={code}
              readOnly
              className="min-h-[400px] font-mono text-sm"
              placeholder="Generated VBA code will appear here..."
            />
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Usage Instructions:</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Copy the generated VBA code</li>
                <li>Open Excel and press Alt + F11 to open VBA editor</li>
                <li>Insert a new module (Insert → Module)</li>
                <li>Paste the code into the module</li>
                <li>Close VBA editor and run the macro (Alt + F8)</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Fill out the requirements form to generate VBA code</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VBACodeOutput;
