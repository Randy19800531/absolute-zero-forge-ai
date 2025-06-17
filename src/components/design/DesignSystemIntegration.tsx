
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Palette, Figma, Component, Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DesignToken {
  name: string;
  value: string;
  type: 'color' | 'spacing' | 'typography' | 'border-radius';
  category: string;
}

interface DesignSystem {
  id: string;
  name: string;
  source: 'figma' | 'sketch' | 'local';
  status: 'synced' | 'outdated' | 'error';
  lastSync?: string;
  tokensCount: number;
}

const DesignSystemIntegration = () => {
  const { toast } = useToast();
  const [designSystems, setDesignSystems] = useState<DesignSystem[]>([
    {
      id: '1',
      name: 'Company Design System',
      source: 'figma',
      status: 'synced',
      lastSync: '2024-01-15T10:30:00Z',
      tokensCount: 156
    }
  ]);

  const [designTokens] = useState<DesignToken[]>([
    { name: 'primary-500', value: '#3b82f6', type: 'color', category: 'Brand Colors' },
    { name: 'gray-100', value: '#f3f4f6', type: 'color', category: 'Neutral Colors' },
    { name: 'spacing-4', value: '1rem', type: 'spacing', category: 'Spacing' },
    { name: 'text-lg', value: '1.125rem', type: 'typography', category: 'Typography' },
    { name: 'rounded-md', value: '0.375rem', type: 'border-radius', category: 'Border Radius' }
  ]);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'figma':
        return <Figma className="h-4 w-4" />;
      default:
        return <Component className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      synced: 'default',
      outdated: 'secondary',
      error: 'destructive'
    } as const;

    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const handleSync = (id: string) => {
    setDesignSystems(prev => prev.map(system => 
      system.id === id 
        ? { ...system, status: 'synced', lastSync: new Date().toISOString() }
        : system
    ));

    toast({
      title: "Design System Synced",
      description: "Design tokens have been updated successfully",
    });
  };

  const handleExportTokens = () => {
    const tokens = {
      version: "1.0.0",
      tokens: designTokens.reduce((acc, token) => {
        acc[token.name] = {
          value: token.value,
          type: token.type,
          category: token.category
        };
        return acc;
      }, {} as any)
    };

    const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-tokens.json';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Tokens Exported",
      description: "Design tokens have been exported successfully",
    });
  };

  const getTokenPreview = (token: DesignToken) => {
    switch (token.type) {
      case 'color':
        return (
          <div 
            className="w-4 h-4 rounded border"
            style={{ backgroundColor: token.value }}
          />
        );
      case 'spacing':
        return (
          <div 
            className="bg-blue-200 h-2 border"
            style={{ width: token.value }}
          />
        );
      default:
        return <span className="text-xs text-muted-foreground">{token.value}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Design Systems */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Connected Design Systems</h3>
          <Button className="flex items-center gap-2">
            <Component className="h-4 w-4" />
            Connect System
          </Button>
        </div>
        
        <div className="grid gap-4">
          {designSystems.map((system) => (
            <Card key={system.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getSourceIcon(system.source)}
                    <div>
                      <h4 className="font-semibold">{system.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {system.tokensCount} tokens • {system.source}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(system.status)}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSync(system.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Sync
                    </Button>
                  </div>
                </div>
                
                {system.lastSync && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Last sync: {new Date(system.lastSync).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Design Tokens */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Design Tokens</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportTokens}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-1" />
              Import
            </Button>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {designTokens.map((token, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-3">
                    {getTokenPreview(token)}
                    <div>
                      <p className="font-mono text-sm">{token.name}</p>
                      <p className="text-xs text-muted-foreground">{token.category}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-mono text-sm">{token.value}</p>
                    <p className="text-xs text-muted-foreground">{token.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Figma Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Figma className="h-5 w-5" />
            Figma Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="figma-token">Personal Access Token</Label>
            <Input
              id="figma-token"
              type="password"
              placeholder="Enter your Figma personal access token"
            />
          </div>
          
          <div>
            <Label htmlFor="figma-file">File Key</Label>
            <Input
              id="figma-file"
              placeholder="Enter Figma file key"
            />
          </div>
          
          <div className="flex gap-2">
            <Button>Connect Figma</Button>
            <Button variant="outline">Test Connection</Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Generate CSS custom properties and Tailwind configuration from your design tokens.
          </p>
          
          <div className="flex gap-2">
            <Button>Generate CSS</Button>
            <Button variant="outline">Generate Tailwind Config</Button>
            <Button variant="outline">Generate Sass Variables</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesignSystemIntegration;
