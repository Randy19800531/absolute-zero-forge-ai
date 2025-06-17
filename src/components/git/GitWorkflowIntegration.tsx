
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Github, GitlabIcon, Settings, Play, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GitIntegration {
  id: string;
  name: string;
  provider: 'github' | 'gitlab' | 'bitbucket';
  repository: string;
  branch: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync?: string;
  webhookUrl?: string;
}

interface Pipeline {
  id: string;
  name: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  branch: string;
  commit: string;
  startedAt: string;
  duration?: number;
}

const GitWorkflowIntegration = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<GitIntegration[]>([
    {
      id: '1',
      name: 'Main Repository',
      provider: 'github',
      repository: 'company/main-app',
      branch: 'main',
      status: 'connected',
      lastSync: '2024-01-15T10:30:00Z',
      webhookUrl: 'https://api.company.com/webhooks/git'
    }
  ]);

  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: '1',
      name: 'Build & Test',
      status: 'success',
      branch: 'main',
      commit: 'abc123f',
      startedAt: '2024-01-15T10:30:00Z',
      duration: 120
    },
    {
      id: '2',
      name: 'Deploy to Staging',
      status: 'running',
      branch: 'develop',
      commit: 'def456a',
      startedAt: '2024-01-15T10:45:00Z'
    }
  ]);

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'gitlab':
        return <GitlabIcon className="h-4 w-4" />;
      default:
        return <GitBranch className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: 'default',
      disconnected: 'secondary',
      syncing: 'secondary',
      running: 'secondary',
      success: 'default',
      failed: 'destructive',
      pending: 'secondary'
    } as const;

    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const handleSync = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, status: 'syncing', lastSync: new Date().toISOString() }
        : integration
    ));

    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: 'connected' }
          : integration
      ));
    }, 2000);

    toast({
      title: "Sync Started",
      description: "Repository sync has been initiated",
    });
  };

  const handleRunPipeline = () => {
    const newPipeline: Pipeline = {
      id: Date.now().toString(),
      name: 'Manual Build',
      status: 'running',
      branch: 'main',
      commit: 'xyz789b',
      startedAt: new Date().toISOString()
    };

    setPipelines(prev => [newPipeline, ...prev]);

    toast({
      title: "Pipeline Started",
      description: "Build pipeline has been triggered",
    });
  };

  return (
    <div className="space-y-6">
      {/* Git Integrations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Git Repositories</h3>
        <div className="grid gap-4">
          {integrations.map((integration) => (
            <Card key={integration.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getProviderIcon(integration.provider)}
                    <div>
                      <h4 className="font-semibold">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {integration.repository} • {integration.branch}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(integration.status)}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSync(integration.id)}
                      disabled={integration.status === 'syncing'}
                    >
                      <GitBranch className="h-4 w-4 mr-1" />
                      Sync
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {integration.lastSync && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Last sync: {new Date(integration.lastSync).toLocaleString()}
                  </p>
                )}
                
                {integration.webhookUrl && (
                  <p className="text-xs text-muted-foreground">
                    Webhook: {integration.webhookUrl}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CI/CD Pipelines */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">CI/CD Pipelines</h3>
          <Button onClick={handleRunPipeline} className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Run Pipeline
          </Button>
        </div>
        
        <div className="grid gap-4">
          {pipelines.map((pipeline) => (
            <Card key={pipeline.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4" />
                    <div>
                      <h4 className="font-semibold">{pipeline.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {pipeline.branch} • {pipeline.commit}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(pipeline.status)}
                    
                    {pipeline.duration && (
                      <span className="text-sm text-muted-foreground">
                        {pipeline.duration}s
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Started: {new Date(pipeline.startedAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              value="https://api.company.com/webhooks/git"
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div>
            <Label htmlFor="webhook-secret">Webhook Secret</Label>
            <Input
              id="webhook-secret"
              type="password"
              placeholder="Enter webhook secret"
            />
          </div>
          
          <div className="flex gap-2">
            <Button>Update Webhook</Button>
            <Button variant="outline">Test Webhook</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitWorkflowIntegration;
