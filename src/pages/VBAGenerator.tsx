
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import VBARequirementsForm from '@/components/vba/VBARequirementsForm';
import VBACodeOutput from '@/components/vba/VBACodeOutput';
import VBATemplateLibrary from '@/components/vba/VBATemplateLibrary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Code, FileSpreadsheet, Zap, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VBAGenerator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [requirements, setRequirements] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Code className="h-8 w-8 text-green-500" />
                  VBA Code Generator
                </h1>
                <p className="text-gray-600">
                  AI-powered Excel macro generation with intelligent code optimization
                </p>
              </div>
            </div>

            <Tabs defaultValue="generator" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="generator" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Generator
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generator" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <VBARequirementsForm 
                    onRequirementsChange={setRequirements}
                    onCodeGenerated={setGeneratedCode}
                  />
                  <VBACodeOutput 
                    code={generatedCode}
                    requirements={requirements}
                  />
                </div>
              </TabsContent>

              <TabsContent value="templates">
                <VBATemplateLibrary onTemplateSelect={setRequirements} />
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Generation History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Your VBA generation history will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VBAGenerator;
