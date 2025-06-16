
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, XCircle, Scan, Code, Database, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityVulnerability {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'code' | 'dependency' | 'infrastructure' | 'data';
  title: string;
  description: string;
  impact: string;
  remediation: string;
  cve?: string;
  cvss?: number;
}

interface ComplianceCheck {
  standard: string;
  requirement: string;
  status: 'compliant' | 'non-compliant' | 'partial';
  automated: boolean;
  lastChecked: string;
}

interface SecurityMetric {
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
}

const EnhancedSecurityScanning = () => {
  const { toast } = useToast();
  const [vulnerabilities, setVulnerabilities] = useState<SecurityVulnerability[]>([]);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([]);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'completed' | 'error'>('idle');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    initializeSecurityData();
  }, []);

  const initializeSecurityData = () => {
    // Initialize sample vulnerabilities
    const sampleVulnerabilities: SecurityVulnerability[] = [
      {
        id: '1',
        severity: 'high',
        category: 'dependency',
        title: 'Outdated React Version',
        description: 'Using React version with known security vulnerabilities',
        impact: 'Potential XSS attacks through component vulnerabilities',
        remediation: 'Update React to latest stable version (18.3.1)',
        cve: 'CVE-2023-0001',
        cvss: 7.5
      },
      {
        id: '2',
        severity: 'medium',
        category: 'code',
        title: 'Unvalidated User Input',
        description: 'User input not properly sanitized in search functionality',
        impact: 'Possible injection attacks',
        remediation: 'Implement input validation and sanitization',
        cvss: 5.4
      },
      {
        id: '3',
        severity: 'critical',
        category: 'infrastructure',
        title: 'Exposed API Keys',
        description: 'API keys found in client-side code',
        impact: 'Unauthorized access to external services',
        remediation: 'Move API keys to secure server-side environment',
        cvss: 9.1
      }
    ];
    setVulnerabilities(sampleVulnerabilities);

    // Initialize compliance checks
    const sampleCompliance: ComplianceCheck[] = [
      {
        standard: 'SOC 2 Type II',
        requirement: 'Access Control Management',
        status: 'compliant',
        automated: true,
        lastChecked: '2024-01-15T10:30:00Z'
      },
      {
        standard: 'ISO 27001',
        requirement: 'Information Security Risk Management',
        status: 'partial',
        automated: false,
        lastChecked: '2024-01-14T15:45:00Z'
      },
      {
        standard: 'GDPR',
        requirement: 'Data Protection by Design',
        status: 'compliant',
        automated: true,
        lastChecked: '2024-01-15T09:15:00Z'
      },
      {
        standard: 'PCI DSS',
        requirement: 'Secure Payment Processing',
        status: 'non-compliant',
        automated: true,
        lastChecked: '2024-01-15T11:00:00Z'
      }
    ];
    setComplianceChecks(sampleCompliance);

    // Initialize security metrics
    const sampleMetrics: SecurityMetric[] = [
      { name: 'Security Score', value: 87, target: 95, trend: 'up' },
      { name: 'Vulnerability Count', value: 3, target: 0, trend: 'down' },
      { name: 'Compliance Rate', value: 75, target: 100, trend: 'stable' },
      { name: 'Patch Coverage', value: 92, target: 100, trend: 'up' }
    ];
    setSecurityMetrics(sampleMetrics);
  };

  const startSecurityScan = async () => {
    setScanStatus('scanning');
    setScanProgress(0);

    try {
      // Simulate progressive scanning
      const scanSteps = [
        { step: 'Code Analysis', duration: 2000 },
        { step: 'Dependency Check', duration: 1500 },
        { step: 'Infrastructure Scan', duration: 2500 },
        { step: 'Compliance Verification', duration: 1000 }
      ];

      for (let i = 0; i < scanSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, scanSteps[i].duration));
        setScanProgress(((i + 1) / scanSteps.length) * 100);
      }

      setScanStatus('completed');
      toast({
        title: "Security Scan Completed",
        description: "Found 3 vulnerabilities requiring attention."
      });
    } catch (error) {
      setScanStatus('error');
      toast({
        title: "Scan Failed",
        description: "Security scan encountered an error. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'non-compliant': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'partial': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical').length;
  const highVulns = vulnerabilities.filter(v => v.severity === 'high').length;
  const complianceRate = (complianceChecks.filter(c => c.status === 'compliant').length / complianceChecks.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Security Scanning</h2>
          <p className="text-gray-600">Automated vulnerability detection and compliance monitoring</p>
        </div>
        <Button onClick={startSecurityScan} disabled={scanStatus === 'scanning'}>
          <Scan className="h-4 w-4 mr-2" />
          {scanStatus === 'scanning' ? 'Scanning...' : 'Start Security Scan'}
        </Button>
      </div>

      {scanStatus === 'scanning' && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-lg font-medium mb-2">Security Scan in Progress</div>
              <Progress value={scanProgress} className="mb-2" />
              <p className="text-sm text-gray-600">{scanProgress}% Complete</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Security Score</p>
                <p className="text-2xl font-bold text-green-600">87/100</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Issues</p>
                <p className="text-2xl font-bold text-red-600">{criticalVulns}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-orange-600">{highVulns}</p>
              </div>
              <XCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Compliance Rate</p>
                <p className="text-2xl font-bold text-blue-600">{Math.round(complianceRate)}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vulnerabilities" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="metrics">Security Metrics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Security Vulnerabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vulnerabilities.map((vuln) => (
                <Card key={vuln.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{vuln.title}</h4>
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity.toUpperCase()}
                        </Badge>
                        {vuln.cvss && (
                          <Badge variant="outline">CVSS: {vuln.cvss}</Badge>
                        )}
                      </div>
                      <Badge variant="secondary">{vuln.category}</Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{vuln.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-sm">Impact:</span>
                        <span className="text-sm text-gray-600 ml-2">{vuln.impact}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Remediation:</span>
                        <span className="text-sm text-gray-600 ml-2">{vuln.remediation}</span>
                      </div>
                      {vuln.cve && (
                        <div>
                          <span className="font-medium text-sm">CVE:</span>
                          <span className="text-sm text-gray-600 ml-2">{vuln.cve}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getComplianceIcon(check.status)}
                    <div>
                      <div className="font-medium">{check.standard}</div>
                      <div className="text-sm text-gray-600">{check.requirement}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={check.automated ? 'default' : 'secondary'}>
                      {check.automated ? 'Automated' : 'Manual'}
                    </Badge>
                    <Badge variant={
                      check.status === 'compliant' ? 'default' :
                      check.status === 'non-compliant' ? 'destructive' : 'secondary'
                    }>
                      {check.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Security Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{metric.value}</span>
                      <span className="text-xs text-gray-500">/ {metric.target}</span>
                      <Badge variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'destructive' : 'secondary'}>
                        {metric.trend}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={(metric.value / metric.target) * 100} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Security Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Code className="h-4 w-4 mr-2" />
                  Generate Vulnerability Report
                </Button>
                <Button variant="outline" className="justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Compliance Assessment Report
                </Button>
                <Button variant="outline" className="justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Security Metrics Dashboard
                </Button>
                <Button variant="outline" className="justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Executive Security Summary
                </Button>
              </div>
              
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Security reports are generated automatically and can be scheduled for regular delivery to stakeholders.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSecurityScanning;
