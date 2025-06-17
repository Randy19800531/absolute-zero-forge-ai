
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, XCircle, Scan, Clock, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityScan {
  id: string;
  type: 'dependency' | 'code' | 'infrastructure' | 'secrets';
  status: 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  findings: SecurityFinding[];
}

interface SecurityFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  file?: string;
  line?: number;
  recommendation: string;
}

const EnhancedSecurityScanning = () => {
  const { toast } = useToast();
  const [scans, setScans] = useState<SecurityScan[]>([
    {
      id: '1',
      type: 'dependency',
      status: 'completed',
      startedAt: '2024-01-15T10:30:00Z',
      completedAt: '2024-01-15T10:35:00Z',
      findings: [
        {
          id: '1',
          severity: 'high',
          title: 'Vulnerable Package: lodash@4.17.15',
          description: 'Prototype Pollution vulnerability in lodash',
          recommendation: 'Update to lodash@4.17.21 or later'
        },
        {
          id: '2',
          severity: 'medium',
          title: 'Outdated Package: react@17.0.2',
          description: 'React version has known security issues',
          recommendation: 'Update to React 18.x'
        }
      ]
    },
    {
      id: '2',
      type: 'code',
      status: 'running',
      startedAt: '2024-01-15T10:40:00Z',
      findings: []
    }
  ]);

  const [scanProgress, setScanProgress] = useState(45);

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: 'destructive',
      high: 'destructive',
      medium: 'secondary',
      low: 'outline'
    } as const;

    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };

    return (
      <Badge variant={variants[severity as keyof typeof variants]} className={colors[severity as keyof typeof colors]}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getScanIcon = (type: string) => {
    switch (type) {
      case 'dependency':
        return <Shield className="h-4 w-4" />;
      case 'code':
        return <FileText className="h-4 w-4" />;
      case 'infrastructure':
        return <Shield className="h-4 w-4" />;
      case 'secrets':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Scan className="h-4 w-4" />;
    }
  };

  const handleStartScan = (type: SecurityScan['type']) => {
    const newScan: SecurityScan = {
      id: Date.now().toString(),
      type,
      status: 'running',
      startedAt: new Date().toISOString(),
      findings: []
    };

    setScans(prev => [newScan, ...prev]);

    // Simulate scan completion
    setTimeout(() => {
      setScans(prev => prev.map(scan => 
        scan.id === newScan.id 
          ? { 
              ...scan, 
              status: 'completed', 
              completedAt: new Date().toISOString(),
              findings: type === 'dependency' ? [
                {
                  id: Date.now().toString(),
                  severity: 'medium',
                  title: 'New vulnerability detected',
                  description: 'Sample vulnerability found in dependencies',
                  recommendation: 'Update the affected package'
                }
              ] : []
            }
          : scan
      ));
    }, 3000);

    toast({
      title: "Security Scan Started",
      description: `${type} scan has been initiated`,
    });
  };

  const getSeverityCount = (severity: string) => {
    return scans.reduce((count, scan) => 
      count + scan.findings.filter(finding => finding.severity === severity).length, 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{getSeverityCount('critical')}</div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{getSeverityCount('high')}</div>
            <div className="text-sm text-muted-foreground">High</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{getSeverityCount('medium')}</div>
            <div className="text-sm text-muted-foreground">Medium</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{getSeverityCount('low')}</div>
            <div className="text-sm text-muted-foreground">Low</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Security Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => handleStartScan('dependency')} className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Dependencies
            </Button>
            <Button onClick={() => handleStartScan('code')} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Code Analysis
            </Button>
            <Button onClick={() => handleStartScan('infrastructure')} className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Infrastructure
            </Button>
            <Button onClick={() => handleStartScan('secrets')} className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Secrets
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Scans */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Scans</h3>
        <div className="space-y-4">
          {scans.map((scan) => (
            <Card key={scan.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getScanIcon(scan.type)}
                    <div>
                      <h4 className="font-semibold capitalize">{scan.type} Scan</h4>
                      <p className="text-sm text-muted-foreground">
                        Started: {new Date(scan.startedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(scan.status)}
                    <Badge variant={scan.status === 'completed' ? 'default' : 'secondary'}>
                      {scan.status}
                    </Badge>
                  </div>
                </div>

                {scan.status === 'running' && (
                  <div className="mb-4">
                    <Progress value={scanProgress} className="mb-2" />
                    <p className="text-sm text-muted-foreground">Scanning... {scanProgress}%</p>
                  </div>
                )}

                {scan.findings.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-medium">Findings ({scan.findings.length})</h5>
                    {scan.findings.map((finding) => (
                      <div key={finding.id} className="border rounded p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h6 className="font-medium">{finding.title}</h6>
                          {getSeverityBadge(finding.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
                        <p className="text-sm font-medium">Recommendation: {finding.recommendation}</p>
                        {finding.file && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {finding.file}:{finding.line}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {scan.status === 'completed' && scan.findings.length === 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">No security issues found</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">OWASP Top 10</span>
              </div>
              <p className="text-sm text-muted-foreground">All checks passed</p>
            </div>
            
            <div className="p-4 border rounded">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">CWE Standards</span>
              </div>
              <p className="text-sm text-muted-foreground">2 issues require attention</p>
            </div>
            
            <div className="p-4 border rounded">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">GDPR Compliance</span>
              </div>
              <p className="text-sm text-muted-foreground">Data handling compliant</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSecurityScanning;
