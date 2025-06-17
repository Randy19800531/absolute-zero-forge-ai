
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DatabaseIntegrationManager from '@/components/database/DatabaseIntegrationManager';
import GitWorkflowIntegration from '@/components/git/GitWorkflowIntegration';
import DesignSystemIntegration from '@/components/design/DesignSystemIntegration';
import EnhancedSecurityScanning from '@/components/security/EnhancedSecurityScanning';

const Integrations = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Integrations</h1>
                <p className="text-muted-foreground mt-2">
                  Connect and manage external services and APIs
                </p>
              </div>

              <Tabs defaultValue="database" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="git">Git & CI/CD</TabsTrigger>
                  <TabsTrigger value="design">Design Systems</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="database" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Database Integrations</CardTitle>
                      <CardDescription>
                        Connect to external databases and manage data sources
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DatabaseIntegrationManager />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="git" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Git & CI/CD Integrations</CardTitle>
                      <CardDescription>
                        Integrate with Git repositories and deployment pipelines
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <GitWorkflowIntegration />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="design" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Design System Integrations</CardTitle>
                      <CardDescription>
                        Connect with design tools and component libraries
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DesignSystemIntegration />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security & Compliance</CardTitle>
                      <CardDescription>
                        Security scanning and compliance integrations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <EnhancedSecurityScanning />
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

export default Integrations;
