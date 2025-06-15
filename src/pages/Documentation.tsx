
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OverviewTab from '@/components/documentation/OverviewTab';
import FeaturesTab from '@/components/documentation/FeaturesTab';
import SecurityTab from '@/components/documentation/SecurityTab';
import UserManualTab from '@/components/documentation/UserManualTab';
import APIDocsTab from '@/components/documentation/APIDocsTab';

const Documentation = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
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
                    <BookOpen className="h-8 w-8 text-blue-500" />
                    Documentation
                  </h1>
                  <p className="text-gray-600">
                    Comprehensive guides, security policies, and feature documentation
                  </p>
                </div>
              </div>

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="user-manual">User Manual</TabsTrigger>
                  <TabsTrigger value="api-docs">API Docs</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <OverviewTab />
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  <FeaturesTab />
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <SecurityTab />
                </TabsContent>

                <TabsContent value="user-manual" className="space-y-6">
                  <UserManualTab />
                </TabsContent>

                <TabsContent value="api-docs" className="space-y-6">
                  <APIDocsTab />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Documentation;
