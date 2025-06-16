
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VBARequirementsForm from '@/components/vba/VBARequirementsForm';
import VBACodeOutput from '@/components/vba/VBACodeOutput';
import VBATemplateLibrary from '@/components/vba/VBATemplateLibrary';
import VBAAdvancedOptions from '@/components/vba/VBAAdvancedOptions';

const VBAGenerator = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold">VBA Code Generator</h1>
                <p className="text-muted-foreground mt-2">
                  Generate Excel VBA macros automatically using AI-powered code generation
                </p>
              </div>

              <Tabs defaultValue="generate" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="generate">Generate Code</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="generate" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>VBA Requirements</CardTitle>
                      <CardDescription>
                        Describe what you want your VBA macro to do
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VBARequirementsForm />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="templates" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>VBA Template Library</CardTitle>
                      <CardDescription>
                        Choose from pre-built VBA templates for common tasks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VBATemplateLibrary />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="output" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Generated VBA Code</CardTitle>
                      <CardDescription>
                        Review and copy your generated VBA code
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VBACodeOutput />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Options</CardTitle>
                      <CardDescription>
                        Configure advanced settings for VBA code generation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VBAAdvancedOptions />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default VBAGenerator;
