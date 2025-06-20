
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Settings, 
  Zap,
  Shield,
  Globe,
  Server,
  Activity
} from 'lucide-react';
import { SupabaseHealthService, ComprehensiveHealthReport } from '@/services/SupabaseHealthService';
import { useToast } from '@/hooks/use-toast';

const SupabaseSetupAssistant = () => {
  const { toast } = useToast();
  const [healthReport, setHealthReport] = useState<ComprehensiveHealthReport | null>(null);
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [isAutoFixing, setIsAutoFixing] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<string | null>(null);

  const runHealthCheck = async () => {
    setIsRunningCheck(true);
    try {
      const report = await SupabaseHealthService.runComprehensiveHealthCheck();
      setHealthReport(report);
      setLastCheckTime(new Date().toLocaleString());
      
      toast({
        title: "Health Check Complete",
        description: report.summary,
        variant: report.overall === 'error' ? 'destructive' : 'default'
      });
    } catch (error) {
      toast({
        title: "Health Check Failed",
        description: "Unable to complete comprehensive health check",
        variant: "destructive"
      });
    } finally {
      setIsRunningCheck(false);
    }
  };

  const runAutoFix = async () => {
    setIsAutoFixing(true);
    try {
      const fixes = await SupabaseHealthService.fixCommonIssues();
      
      if (fixes.length > 0) {
        toast({
          title: "Auto-Fix Applied",
          description: `Applied ${fixes.length} automatic fix(es)`,
        });
        
        // Re-run health check after fixes
        setTimeout(() => runHealthCheck(), 2000);
      } else {
        toast({
          title: "No Auto-Fixes Available",
          description: "Manual intervention may be required",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Auto-Fix Failed",
        description: "Unable to apply automatic fixes",
        variant: "destructive"
      });
    } finally {
      setIsAutoFixing(false);
    }
  };

  const getStatusIcon = (status: 'healthy' | 'warning' | 'error') => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: 'healthy' | 'warning' | 'error') => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
    }
  };

  const getComponentIcon = (component: string) => {
    switch (component.toLowerCase()) {
      case 'database connection':
        return <Database className="h-4 w-4" />;
      case 'authentication':
        return <Shield className="h-4 w-4" />;
      case 'edge functions':
        return <Zap className="h-4 w-4" />;
      case 'api configuration':
        return <Globe className="h-4 w-4" />;
      case 'real-time features':
        return <Activity className="h-4 w-4" />;
      case 'storage configuration':
        return <Server className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const calculateHealthScore = () => {
    if (!healthReport) return 0;
    
    const totalChecks = healthReport.checks.length;
    const healthyChecks = healthReport.checks.filter(c => c.status === 'healthy').length;
    const warningChecks = healthReport.checks.filter(c => c.status === 'warning').length;
    
    return Math.round(((healthyChecks + warningChecks * 0.5) / totalChecks) * 100);
  };

  useEffect(() => {
    // Run initial health check
    runHealthCheck();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg text-white">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-indigo-900">Supabase Setup & Health Assistant</h2>
              <p className="text-indigo-700 text-sm mt-1">
                DataMaster Chen - Complete Supabase Configuration & Diagnostics Expert
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              onClick={runHealthCheck}
              disabled={isRunningCheck}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isRunningCheck ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Activity className="h-4 w-4 mr-2" />
              )}
              {isRunningCheck ? 'Running Diagnostics...' : 'Run Full Health Check'}
            </Button>
            
            {healthReport && healthReport.overall !== 'healthy' && (
              <Button 
                onClick={runAutoFix}
                disabled={isAutoFixing}
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                {isAutoFixing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                {isAutoFixing ? 'Applying Fixes...' : 'Auto-Fix Issues'}
              </Button>
            )}

            {lastCheckTime && (
              <span className="text-sm text-gray-500">
                Last check: {lastCheckTime}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Health Overview */}
      {healthReport && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>System Health Overview</span>
              <Badge className={getStatusColor(healthReport.overall)}>
                {healthReport.overall.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Health Score</span>
                  <span className="font-medium">{calculateHealthScore()}%</span>
                </div>
                <Progress value={calculateHealthScore()} className="h-3" />
              </div>
              {getStatusIcon(healthReport.overall)}
            </div>
            
            <p className="text-gray-700">{healthReport.summary}</p>
            
            {healthReport.recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 mb-2">Recommendations:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {healthReport.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Detailed Results */}
      {healthReport && (
        <Tabs defaultValue="components" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="components">Component Status</TabsTrigger>
            <TabsTrigger value="details">Detailed Results</TabsTrigger>
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {healthReport.checks.map((check, index) => (
                <Card key={index} className="border-l-4 border-l-gray-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getComponentIcon(check.component)}
                        <h4 className="font-medium text-sm">{check.component}</h4>
                      </div>
                      {getStatusIcon(check.status)}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{check.message}</p>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(check.status)}`}>
                      {check.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {healthReport.checks.map((check, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      {getComponentIcon(check.component)}
                      {check.component}
                    </div>
                    <Badge className={getStatusColor(check.status)}>
                      {check.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-700">{check.message}</p>
                  {check.details && (
                    <div className="bg-gray-50 rounded p-3">
                      <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                        {JSON.stringify(check.details, null, 2)}
                      </pre>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Checked at: {new Date(check.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="setup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supabase Setup Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <h3>Quick Setup Checklist</h3>
                  <ul className="space-y-2">
                    <li>✅ Supabase project created and configured</li>
                    <li>✅ Database tables and policies set up</li>
                    <li>✅ Authentication providers configured</li>
                    <li>✅ Edge functions deployed</li>
                    <li>✅ Environment variables set</li>
                    <li>✅ Real-time features enabled</li>
                  </ul>
                  
                  <h3>Common Issues & Solutions</h3>
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <h4 className="font-medium text-red-900">Database Connection Errors</h4>
                      <p className="text-sm text-red-800">Check your project URL and API keys in the environment configuration.</p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <h4 className="font-medium text-yellow-900">Authentication Issues</h4>
                      <p className="text-sm text-yellow-800">Verify auth providers are configured and redirect URLs are set correctly.</p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <h4 className="font-medium text-blue-900">Edge Function Problems</h4>
                      <p className="text-sm text-blue-800">Ensure functions are deployed and environment secrets are configured.</p>
                    </div>
                  </div>
                  
                  <h3>Performance Optimization</h3>
                  <ul className="space-y-1">
                    <li>• Enable connection pooling for high-traffic applications</li>
                    <li>• Use appropriate database indexes for query optimization</li>
                    <li>• Implement proper Row Level Security policies</li>
                    <li>• Monitor and optimize edge function performance</li>
                    <li>• Configure CDN for static assets</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SupabaseSetupAssistant;
