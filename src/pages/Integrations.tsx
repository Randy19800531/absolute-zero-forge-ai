
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Plus, Settings, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Integrations = () => {
  const navigate = useNavigate();

  const integrations = [
    { id: 1, name: 'Slack', description: 'Team communication', status: 'Connected', category: 'Communication' },
    { id: 2, name: 'Google Drive', description: 'File storage and sharing', status: 'Connected', category: 'Storage' },
    { id: 3, name: 'Stripe', description: 'Payment processing', status: 'Pending', category: 'Payment' },
    { id: 4, name: 'Zapier', description: 'Workflow automation', status: 'Available', category: 'Automation' },
    { id: 5, name: 'GitHub', description: 'Code repository', status: 'Connected', category: 'Development' },
    { id: 6, name: 'Trello', description: 'Project management', status: 'Available', category: 'Productivity' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Plus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getButtonText = (status: string) => {
    switch (status) {
      case 'Connected': return 'Configure';
      case 'Pending': return 'Complete Setup';
      default: return 'Connect';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
                  <p className="text-gray-600">Connect your favorite tools and services</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Integrations
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{integrations.length}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Connected</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {integrations.filter(i => i.status === 'Connected').length}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available</CardTitle>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {integrations.filter(i => i.status === 'Available').length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Available Integrations</CardTitle>
                  <CardDescription>Connect and manage your integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {integrations.map((integration) => (
                      <div key={integration.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(integration.status)}
                            <div>
                              <h3 className="font-semibold">{integration.name}</h3>
                              <p className="text-sm text-gray-600">{integration.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {integration.category}
                          </Badge>
                          <Badge className={getStatusColor(integration.status)}>
                            {integration.status}
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <Button 
                            variant={integration.status === 'Connected' ? 'outline' : 'default'} 
                            size="sm" 
                            className="w-full"
                          >
                            {integration.status === 'Connected' && <Settings className="h-4 w-4 mr-1" />}
                            {getButtonText(integration.status)}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Integrations;
