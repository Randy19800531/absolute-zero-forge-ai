
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import RestrictedModuleWrapper from '@/components/auth/RestrictedModuleWrapper';
import LLMProviders from '@/components/llm/LLMProviders';

const LLMConfig = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <RestrictedModuleWrapper
                moduleName="LLM Configuration"
                moduleDescription="Configure AI language model providers and API keys. Admin access is required to view and modify these sensitive settings."
                requiredRole="admin"
              >
                <LLMProviders />
              </RestrictedModuleWrapper>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default LLMConfig;
