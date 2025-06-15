import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileSpreadsheet, Code, Download, History, BookOpen } from 'lucide-react';
import VBARequirementsForm from '@/components/vba/VBARequirementsForm';
import VBACodeOutput from '@/components/vba/VBACodeOutput';
import VBATemplateLibrary from '@/components/vba/VBATemplateLibrary';
import { VBARequirements } from '@/components/vba/types';

const VBAGenerator = () => {
  const [currentView, setCurrentView] = useState<'generator' | 'templates' | 'history'>('generator');
  const [requirements, setRequirements] = useState<VBARequirements>({
    projectName: '',
    description: '',
    sourceRange: '',
    targetRange: '',
    transformations: [],
    formatting: [],
    errorHandling: true,
    optimization: true,
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [generationHistory, setGenerationHistory] = useState<Array<{
    id: string;
    name: string;
    code: string;
    createdAt: string;
    requirements: VBARequirements;
  }>>([]);

  const handleRequirementsChange = (newRequirements: VBARequirements) => {
    setRequirements(newRequirements);
  };

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code);
    
    // Add to history
    const historyItem = {
      id: Date.now().toString(),
      name: requirements.projectName || 'Untitled Macro',
      code,
      createdAt: new Date().toLocaleString(),
      requirements: { ...requirements }
    };
    setGenerationHistory(prev => [historyItem, ...prev]);
  };

  const handleLoadFromHistory = (historyItem: any) => {
    setRequirements(historyItem.requirements);
    setGeneratedCode(historyItem.code);
    setCurrentView('generator');
  };

  const handleTemplateSelect = (template: any) => {
    // Load template into requirements and switch to generator view
    setRequirements(prev => ({
      ...prev,
      projectName: template.name,
      description: template.description,
    }));
    setCurrentView('generator');
  };

  const stats = [
    { label: 'Macros Generated', value: generationHistory.length, icon: Code },
    { label: 'Templates Available', value: 12, icon: BookOpen },
    { label: 'Success Rate', value: '94%', icon: FileSpreadsheet },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">VBA Generator</h1>
          <p className="text-gray-600 mt-2">AI-powered Excel macro generation</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={currentView === 'generator' ? 'default' : 'outline'}
            onClick={() => setCurrentView('generator')}
            className="flex items-center gap-2"
          >
            <Code className="h-4 w-4" />
            Generator
          </Button>
          <Button 
            variant={currentView === 'templates' ? 'default' : 'outline'}
            onClick={() => setCurrentView('templates')}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Templates
          </Button>
          <Button 
            variant={currentView === 'history' ? 'default' : 'outline'}
            onClick={() => setCurrentView('history')}
            className="flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            History
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      {currentView === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VBARequirementsForm
            onRequirementsChange={handleRequirementsChange}
            onCodeGenerated={handleCodeGenerated}
          />
          <VBACodeOutput
            code={generatedCode}
            requirements={requirements}
          />
        </div>
      )}

      {currentView === 'templates' && (
        <VBATemplateLibrary onTemplateSelect={handleTemplateSelect} />
      )}

      {currentView === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Generation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {generationHistory.length === 0 ? (
              <div className="text-center py-12">
                <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No history yet</h3>
                <p className="text-gray-600 mb-4">Generate your first VBA macro to see it here</p>
                <Button onClick={() => setCurrentView('generator')}>
                  Start Generating
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {generationHistory.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <Badge variant="secondary">{item.createdAt}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.requirements.description || 'No description provided'}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleLoadFromHistory(item)}
                      >
                        Load
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(item.code);
                        }}
                      >
                        Copy Code
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VBAGenerator;
