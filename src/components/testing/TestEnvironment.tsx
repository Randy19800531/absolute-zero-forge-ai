import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Database, Globe, Shield, Monitor } from 'lucide-react';

interface EnvironmentConfig {
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'maintenance';
  type: 'dev' | 'uat' | 'prod';
}

const TestEnvironment = () => {
  const [environments, setEnvironments] = useState<EnvironmentConfig[]>([
    {
      name: 'Development',
      url: 'https://dev.example.com',
      status: 'active',
      type: 'dev'
    },
    {
      name: 'User Acceptance Testing',
      url: 'https://uat.example.com',
      status: 'active',
      type: 'uat'
    },
    {
      name: 'Production',
      url: 'https://example.com',
      status: 'inactive',
      type: 'prod'
    }
  ]);

  const [newEnv, setNewEnv] = useState({
    name: '',
    url: '',
    type: 'dev' as 'dev' | 'uat' | 'prod'
  });

  const [globalSettings, setGlobalSettings] = useState({
    parallelExecution: true,
    retryOnFailure: true,
    captureScreenshots: true,
    detailedLogging: true,
    timeoutDuration: 30,
    maxRetries: 3
  });

  const addEnvironment = () => {
    if (newEnv.name && newEnv.url) {
      setEnvironments([...environments, {
        ...newEnv,
        status: 'inactive' as const
      }]);
      setNewEnv({ name: '', url: '', type: 'dev' });
    }
  };

  const toggleEnvironmentStatus = (index: number) => {
    const updated = [...environments];
    updated[index].status = updated[index].status === 'active' ? 'inactive' : 'active';
    setEnvironments(updated);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dev': return <Settings className="h-4 w-4" />;
      case 'uat': return <Monitor className="h-4 w-4" />;
      case 'prod': return <Shield className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="environments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="environments">Test Environments</TabsTrigger>
          <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
          <TabsTrigger value="execution-settings">Execution Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="environments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Environment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Environment */}
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Add New Environment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="env-name">Environment Name</Label>
                      <Input
                        id="env-name"
                        value={newEnv.name}
                        onChange={(e) => setNewEnv({...newEnv, name: e.target.value})}
                        placeholder="e.g., Staging"
                      />
                    </div>
                    <div>
                      <Label htmlFor="env-url">Base URL</Label>
                      <Input
                        id="env-url"
                        value={newEnv.url}
                        onChange={(e) => setNewEnv({...newEnv, url: e.target.value})}
                        placeholder="https://staging.example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="env-type">Environment Type</Label>
                      <Select value={newEnv.type} onValueChange={(value: 'dev' | 'uat' | 'prod') => setNewEnv({...newEnv, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dev">Development</SelectItem>
                          <SelectItem value="uat">UAT</SelectItem>
                          <SelectItem value="prod">Production</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button onClick={addEnvironment} className="w-full">
                        Add Environment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Environments */}
              <div className="space-y-3">
                {environments.map((env, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(env.type)}
                          <div>
                            <h4 className="font-medium">{env.name}</h4>
                            <p className="text-sm text-gray-600">{env.url}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(env.status)}>
                            {env.status}
                          </Badge>
                          <Switch
                            checked={env.status === 'active'}
                            onCheckedChange={() => toggleEnvironmentStatus(index)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Test Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-dashed">
                  <CardContent className="p-4 text-center">
                    <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h4 className="font-medium mb-2">Database Connections</h4>
                    <p className="text-sm text-gray-600 mb-4">Connect to test databases for data-driven testing</p>
                    <Button variant="outline" className="w-full">
                      Configure Database
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="p-4 text-center">
                    <Settings className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h4 className="font-medium mb-2">API Endpoints</h4>
                    <p className="text-sm text-gray-600 mb-4">Set up API endpoints for integration testing</p>
                    <Button variant="outline" className="w-full">
                      Configure APIs
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">AI-Generated Test Data</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Let AI generate realistic test data based on your schema and requirements.
                  </p>
                  <div className="flex gap-2">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Generate Test Data
                    </Button>
                    <Button variant="outline">
                      Import Existing Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="execution-settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-orange-600" />
                Global Execution Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Parallel Test Execution</Label>
                      <p className="text-sm text-gray-600">Run multiple tests simultaneously</p>
                    </div>
                    <Switch
                      checked={globalSettings.parallelExecution}
                      onCheckedChange={(checked) => setGlobalSettings({...globalSettings, parallelExecution: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Retry on Failure</Label>
                      <p className="text-sm text-gray-600">Automatically retry failed tests</p>
                    </div>
                    <Switch
                      checked={globalSettings.retryOnFailure}
                      onCheckedChange={(checked) => setGlobalSettings({...globalSettings, retryOnFailure: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Capture Screenshots</Label>
                      <p className="text-sm text-gray-600">Take screenshots on test failures</p>
                    </div>
                    <Switch
                      checked={globalSettings.captureScreenshots}
                      onCheckedChange={(checked) => setGlobalSettings({...globalSettings, captureScreenshots: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Detailed Logging</Label>
                      <p className="text-sm text-gray-600">Enable comprehensive test logs</p>
                    </div>
                    <Switch
                      checked={globalSettings.detailedLogging}
                      onCheckedChange={(checked) => setGlobalSettings({...globalSettings, detailedLogging: checked})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timeout">Default Timeout (seconds)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={globalSettings.timeoutDuration}
                      onChange={(e) => setGlobalSettings({...globalSettings, timeoutDuration: parseInt(e.target.value)})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="retries">Maximum Retries</Label>
                    <Input
                      id="retries"
                      type="number"
                      value={globalSettings.maxRetries}
                      onChange={(e) => setGlobalSettings({...globalSettings, maxRetries: parseInt(e.target.value)})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="browser">Default Browser</Label>
                    <Select defaultValue="chrome">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chrome">Chrome</SelectItem>
                        <SelectItem value="firefox">Firefox</SelectItem>
                        <SelectItem value="safari">Safari</SelectItem>
                        <SelectItem value="edge">Edge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="viewport">Default Viewport</Label>
                    <Select defaultValue="1920x1080">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1920x1080">Desktop (1920x1080)</SelectItem>
                        <SelectItem value="1366x768">Laptop (1366x768)</SelectItem>
                        <SelectItem value="768x1024">Tablet (768x1024)</SelectItem>
                        <SelectItem value="375x667">Mobile (375x667)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full">
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestEnvironment;
