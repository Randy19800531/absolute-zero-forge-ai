
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import SuperUserGuard from '@/components/layout/SuperUserGuard';
import TwoFactorAuth from '@/components/admin/TwoFactorAuth';
import PricingControl from '@/components/admin/PricingControl';
import UserManagement from '@/components/admin/UserManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, ArrowLeft, Settings, Users, DollarSign, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';

const Admin = () => {
  const navigate = useNavigate();
  const { role } = useUserRole();

  return (
    <SuperUserGuard>
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
                      <Shield className="h-8 w-8 text-red-500" />
                      Admin Panel
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                      Superuser management and security controls
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        role === 'superuser' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {role}
                      </span>
                    </p>
                  </div>
                </div>

                <Tabs defaultValue="security" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="security" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="pricing" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Pricing
                    </TabsTrigger>
                    <TabsTrigger value="users" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Users
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="security">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <TwoFactorAuth />
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">SOC 2 Compliance</span>
                              <span className="text-green-600 font-medium">✓ Active</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">ISO 27001</span>
                              <span className="text-green-600 font-medium">✓ Active</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">GDPR Compliance</span>
                              <span className="text-green-600 font-medium">✓ Active</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">End-to-End Encryption</span>
                              <span className="text-green-600 font-medium">✓ Active</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <PricingControl />
                      <Card>
                        <CardHeader>
                          <CardTitle>Pricing Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              Control access to premium features for different user groups:
                            </p>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Students and educational institutions
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Non-profit organizations
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Underprivileged communities
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Commercial users (when pricing enabled)
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="users">
                    <UserManagement />
                  </TabsContent>

                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Application Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500">Advanced application settings coming soon...</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </SuperUserGuard>
  );
};

export default Admin;
