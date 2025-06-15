
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Download } from 'lucide-react';

interface CodeOutputProps {
  generatedCode: string;
  downloadCode: () => void;
}

const CodeOutput = ({ generatedCode, downloadCode }: CodeOutputProps) => {
  if (!generatedCode) return null;

  return (
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
  );
};

export default CodeOutput;
