
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Wand2, Download, Trash2 } from 'lucide-react';

interface AITestParametersFormProps {
  description: string;
  setDescription: (value: string) => void;
  appType: string;
  setAppType: (value: string) => void;
  testType: string;
  setTestType: (value: string) => void;
  complexity: string;
  setComplexity: (value: string) => void;
  generating: boolean;
  onGenerateTests: () => void;
  onExportTests: () => void;
  onPurgeOldTests: () => void;
  hasGeneratedTests: boolean;
}

const AITestParametersForm = ({
  description,
  setDescription,
  appType,
  setAppType,
  testType,
  setTestType,
  complexity,
  setComplexity,
  generating,
  onGenerateTests,
  onExportTests,
  onPurgeOldTests,
  hasGeneratedTests
}: AITestParametersFormProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Test Generation Parameters
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportTests}
              disabled={!hasGeneratedTests}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Tests
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onPurgeOldTests}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="description">Application/Feature Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your application or feature that needs testing. Be as detailed as possible..."
            className="min-h-24"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="appType">Application Type</Label>
            <Select value={appType} onValueChange={setAppType}>
              <SelectTrigger>
                <SelectValue placeholder="Select app type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-app">Web Application</SelectItem>
                <SelectItem value="mobile-app">Mobile Application</SelectItem>
                <SelectItem value="api">API/Service</SelectItem>
                <SelectItem value="desktop">Desktop Application</SelectItem>
                <SelectItem value="e-commerce">E-commerce Platform</SelectItem>
                <SelectItem value="cms">Content Management System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="testType">Primary Test Focus</Label>
            <Select value={testType} onValueChange={setTestType}>
              <SelectTrigger>
                <SelectValue placeholder="Select test focus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="functional">Functional Testing</SelectItem>
                <SelectItem value="ui-ux">UI/UX Testing</SelectItem>
                <SelectItem value="performance">Performance Testing</SelectItem>
                <SelectItem value="security">Security Testing</SelectItem>
                <SelectItem value="integration">Integration Testing</SelectItem>
                <SelectItem value="accessibility">Accessibility Testing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="complexity">Test Complexity</Label>
            <Select value={complexity} onValueChange={setComplexity}>
              <SelectTrigger>
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (5-10 tests)</SelectItem>
                <SelectItem value="medium">Medium (10-20 tests)</SelectItem>
                <SelectItem value="high">Comprehensive (20+ tests)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={onGenerateTests}
          disabled={!description.trim() || generating}
          className="w-full"
        >
          {generating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating Tests with AI...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Test Cases with AI
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AITestParametersForm;
