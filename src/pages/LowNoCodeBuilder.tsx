
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import BuilderHeader from '@/components/lowcode/BuilderHeader';
import InputPanel from '@/components/lowcode/InputPanel';
import PreviewPanel from '@/components/lowcode/PreviewPanel';
import CodeOutput from '@/components/lowcode/CodeOutput';
import { useLowNoCodeBuilder } from '@/hooks/useLowNoCodeBuilder';

const LowNoCodeBuilder = () => {
  const {
    prompt,
    setPrompt,
    uploadedImage,
    generatedCode,
    isGenerating,
    activeView,
    setActiveView,
    handleImageUpload,
    generateFromPrompt,
    generateFromImage,
    downloadCode,
  } = useLowNoCodeBuilder();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <BuilderHeader />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InputPanel
                  prompt={prompt}
                  setPrompt={setPrompt}
                  uploadedImage={uploadedImage}
                  isGenerating={isGenerating}
                  handleImageUpload={handleImageUpload}
                  generateFromPrompt={generateFromPrompt}
                  generateFromImage={generateFromImage}
                />

                <PreviewPanel
                  generatedCode={generatedCode}
                  activeView={activeView}
                  setActiveView={setActiveView}
                />
              </div>

              {generatedCode && (
                <CodeOutput
                  generatedCode={generatedCode}
                  downloadCode={downloadCode}
                />
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default LowNoCodeBuilder;
