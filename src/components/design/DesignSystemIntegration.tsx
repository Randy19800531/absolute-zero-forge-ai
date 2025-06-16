
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Palette, Code, Globe, Shield, Upload, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DesignToken {
  name: string;
  value: string;
  category: 'color' | 'typography' | 'spacing' | 'component';
  scope: 'global' | 'component' | 'theme';
}

interface ComplianceRequirement {
  jurisdiction: string;
  coverage: number;
  automatedControls: number;
  manualProcesses: number;
  gdpCoverage: string;
  language: string;
  script: string;
  culturalAdaptations: string[];
}

const DesignSystemIntegration = () => {
  const { toast } = useToast();
  const [designTokens, setDesignTokens] = useState<DesignToken[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<string>('');
  const [complianceMatrix, setComplianceMatrix] = useState<ComplianceRequirement[]>([]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  useEffect(() => {
    initializeComplianceMatrix();
    loadDefaultTokens();
  }, []);

  const initializeComplianceMatrix = () => {
    const matrix: ComplianceRequirement[] = [
      {
        jurisdiction: 'GDPR (EU)',
        coverage: 100,
        automatedControls: 90,
        manualProcesses: 10,
        gdpCoverage: '$17.1T',
        language: 'Multi-language EU',
        script: 'Latin',
        culturalAdaptations: ['GDPR adequacy decision monitoring', 'Multi-language EU regulation support', 'European Payment Services Directive compliance']
      },
      {
        jurisdiction: 'UK GDPR',
        coverage: 100,
        automatedControls: 90,
        manualProcesses: 10,
        gdpCoverage: '$3.1T',
        language: 'English',
        script: 'Latin',
        culturalAdaptations: ['Brexit transition considerations', 'UK-specific data protection requirements']
      },
      {
        jurisdiction: 'CCPA/CPRA (US)',
        coverage: 100,
        automatedControls: 85,
        manualProcesses: 15,
        gdpCoverage: '$3.6T',
        language: 'English/Spanish',
        script: 'Latin',
        culturalAdaptations: ['California-specific privacy rights', 'Multi-state compliance framework']
      },
      {
        jurisdiction: 'PIPL (China)',
        coverage: 95,
        automatedControls: 80,
        manualProcesses: 20,
        gdpCoverage: '$17.9T',
        language: 'Chinese (Simplified)',
        script: 'Chinese',
        culturalAdaptations: ['Social credit system integration', 'Chinese encryption standards (SM2, SM3, SM4)', 'Integration with Chinese payment systems']
      },
      {
        jurisdiction: 'APPI (Japan)',
        coverage: 95,
        automatedControls: 80,
        manualProcesses: 20,
        gdpCoverage: '$4.3T',
        language: 'Japanese',
        script: 'Japanese',
        culturalAdaptations: ['Japanese business culture considerations', 'Integration with Japanese payment systems']
      },
      {
        jurisdiction: 'DPDP (India)',
        coverage: 90,
        automatedControls: 75,
        manualProcesses: 25,
        gdpCoverage: '$3.7T',
        language: 'Hindi/English',
        script: 'Devanagari/Latin',
        culturalAdaptations: ['Multi-script support', 'Aadhaar identity system integration', 'UPI payment system support', 'Regional data localization']
      },
      {
        jurisdiction: 'LGPD (Brazil)',
        coverage: 95,
        automatedControls: 80,
        manualProcesses: 20,
        gdpCoverage: '$2.1T',
        language: 'Portuguese',
        script: 'Latin',
        culturalAdaptations: ['Brazilian regulatory framework', 'Local data processing requirements']
      }
    ];
    setComplianceMatrix(matrix);
  };

  const loadDefaultTokens = () => {
    const defaultTokens: DesignToken[] = [
      { name: 'primary-color', value: '#3B82F6', category: 'color', scope: 'global' },
      { name: 'secondary-color', value: '#10B981', category: 'color', scope: 'global' },
      { name: 'danger-color', value: '#EF4444', category: 'color', scope: 'global' },
      { name: 'warning-color', value: '#F59E0B', category: 'color', scope: 'global' },
      { name: 'font-family-primary', value: 'Inter, system-ui, sans-serif', category: 'typography', scope: 'global' },
      { name: 'font-size-base', value: '16px', category: 'typography', scope: 'global' },
      { name: 'spacing-unit', value: '8px', category: 'spacing', scope: 'global' },
      { name: 'border-radius-base', value: '8px', category: 'component', scope: 'global' }
    ];
    setDesignTokens(defaultTokens);
  };

  const handleFrameworkSync = async () => {
    if (!selectedFramework) {
      toast({
        title: "Framework Required",
        description: "Please select a design framework to sync with.",
        variant: "destructive"
      });
      return;
    }

    setSyncStatus('syncing');
    
    try {
      // Simulate framework sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSyncStatus('success');
      toast({
        title: "Design System Synced",
        description: `Successfully synced with ${selectedFramework} design system.`
      });
    } catch (error) {
      setSyncStatus('error');
      toast({
        title: "Sync Failed",
        description: "Failed to sync with design system. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTokenImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const tokens = JSON.parse(e.target?.result as string);
            setDesignTokens([...designTokens, ...tokens]);
            toast({
              title: "Tokens Imported",
              description: `Successfully imported ${tokens.length} design tokens.`
            });
          } catch (error) {
            toast({
              title: "Import Failed",
              description: "Invalid token file format.",
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleTokenExport = () => {
    const dataStr = JSON.stringify(designTokens, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design-tokens.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const calculateOverallCompliance = () => {
    const totalCoverage = complianceMatrix.reduce((sum, req) => sum + req.coverage, 0);
    return Math.round(totalCoverage / complianceMatrix.length);
  };

  const calculateAutomationRate = () => {
    const totalAutomation = complianceMatrix.reduce((sum, req) => sum + req.automatedControls, 0);
    return Math.round(totalAutomation / complianceMatrix.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enterprise Design System Integration</h2>
          <p className="text-gray-600">Integrate with your enterprise design system and ensure global compliance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleTokenImport} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Tokens
          </Button>
          <Button onClick={handleTokenExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Tokens
          </Button>
        </div>
      </div>

      <Tabs defaultValue="design-system" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="design-system">Design System</TabsTrigger>
          <TabsTrigger value="compliance">Global Compliance</TabsTrigger>
          <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
          <TabsTrigger value="frameworks">Framework Sync</TabsTrigger>
        </TabsList>

        <TabsContent value="design-system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Design System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="framework">Framework</Label>
                  <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select design framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="material-ui">Material-UI</SelectItem>
                      <SelectItem value="ant-design">Ant Design</SelectItem>
                      <SelectItem value="chakra-ui">Chakra UI</SelectItem>
                      <SelectItem value="mantine">Mantine</SelectItem>
                      <SelectItem value="carbon">IBM Carbon</SelectItem>
                      <SelectItem value="fluent">Microsoft Fluent UI</SelectItem>
                      <SelectItem value="custom">Custom Design System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sync-status">Sync Status</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={syncStatus === 'success' ? 'default' : syncStatus === 'error' ? 'destructive' : 'secondary'}>
                      {syncStatus === 'idle' ? 'Not Synced' : 
                       syncStatus === 'syncing' ? 'Syncing...' :
                       syncStatus === 'success' ? 'Synced' : 'Error'}
                    </Badge>
                    <Button onClick={handleFrameworkSync} disabled={syncStatus === 'syncing'}>
                      Sync Framework
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{designTokens.length}</div>
                  <div className="text-sm text-gray-600">Design Tokens</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-gray-600">Component Libraries</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600">Theme Variants</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">98%</div>
                  <div className="text-sm text-gray-600">Consistency Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global Compliance Coverage Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">47</div>
                  <div className="text-sm text-blue-700">Jurisdictions Covered</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{calculateAutomationRate()}%</div>
                  <div className="text-sm text-green-700">Average Automation</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">$89.7T</div>
                  <div className="text-sm text-purple-700">GDP Coverage</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">2.95B</div>
                  <div className="text-sm text-orange-700">People Covered</div>
                </div>
              </div>

              <div className="space-y-4">
                {complianceMatrix.map((req, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{req.jurisdiction}</h4>
                          <p className="text-sm text-gray-600">{req.language} • {req.gdpCoverage}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge>{req.coverage}% Coverage</Badge>
                          <Badge variant="outline">{req.automatedControls}% Automated</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Automated Controls</span>
                          <span>{req.automatedControls}%</span>
                        </div>
                        <Progress value={req.automatedControls} className="h-2" />
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-2">Cultural Adaptations:</h5>
                        <div className="flex flex-wrap gap-1">
                          {req.culturalAdaptations.map((adaptation, adaptIndex) => (
                            <Badge key={adaptIndex} variant="secondary" className="text-xs">
                              {adaptation}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Design Tokens Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {designTokens.map((token, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded border" style={{
                        backgroundColor: token.category === 'color' ? token.value : '#f3f4f6'
                      }}></div>
                      <div>
                        <div className="font-medium">{token.name}</div>
                        <div className="text-sm text-gray-600">{token.value}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{token.category}</Badge>
                      <Badge variant="secondary">{token.scope}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Framework Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">Supported Frameworks</h4>
                  {[
                    { name: 'Material-UI', status: 'active', version: '5.x' },
                    { name: 'Ant Design', status: 'active', version: '5.x' },
                    { name: 'Chakra UI', status: 'active', version: '2.x' },
                    { name: 'Mantine', status: 'active', version: '7.x' },
                    { name: 'IBM Carbon', status: 'beta', version: '11.x' },
                    { name: 'Microsoft Fluent UI', status: 'beta', version: '9.x' }
                  ].map((framework, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{framework.name}</div>
                        <div className="text-sm text-gray-600">Version {framework.version}</div>
                      </div>
                      <Badge variant={framework.status === 'active' ? 'default' : 'secondary'}>
                        {framework.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Integration Features</h4>
                  <div className="space-y-2">
                    {[
                      'Automatic theme generation',
                      'Component mapping',
                      'Token synchronization',
                      'Brand asset integration',
                      'Custom component creation',
                      'Real-time preview'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignSystemIntegration;
