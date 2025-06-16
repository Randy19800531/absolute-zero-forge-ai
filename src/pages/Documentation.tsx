
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from '@/components/documentation/OverviewTab';
import FeaturesTab from '@/components/documentation/FeaturesTab';
import APIDocsTab from '@/components/documentation/APIDocsTab';
import UserManualTab from '@/components/documentation/UserManualTab';
import SecurityTab from '@/components/documentation/SecurityTab';

const Documentation = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Documentation</h1>
                <p className="text-muted-foreground mt-2">
                  Complete guide to using the Absolute-0.AI platform
                </p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="user-manual">User Manual</TabsTrigger>
                  <TabsTrigger value="api">API Docs</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Overview</CardTitle>
                      <CardDescription>
                        Get started with the Absolute-0.AI platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <OverviewTab />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature Documentation</CardTitle>
                      <CardDescription>
                        Detailed documentation for all platform features
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FeaturesTab />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="user-manual" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Manual</CardTitle>
                      <CardDescription>
                        Step-by-step instructions for common tasks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <UserManualTab />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="api" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Documentation</CardTitle>
                      <CardDescription>
                        Complete API reference and examples
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <APIDocsTab />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security & Compliance</CardTitle>
                      <CardDescription>
                        Security features and compliance information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SecurityTab />
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

export default Documentation;
