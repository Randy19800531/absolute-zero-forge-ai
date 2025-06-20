
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Absolute0AIDiagnostics } from './utils/diagnostics';

const SystemStatusIndicator = () => {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    try {
      const results = await Absolute0AIDiagnostics.runFullDiagnostic();
      setDiagnostics(results);
    } catch (error) {
      console.error('Diagnostic error:', error);
      setDiagnostics({
        overall: false,
        error: error instanceof Error ? error.message : 'Diagnostic failed',
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusBadge = (success: boolean) => {
    return (
      <Badge variant={success ? 'default' : 'destructive'} className={success ? 'bg-green-100 text-green-800' : ''}>
        {success ? 'Operational' : 'Error'}
      </Badge>
    );
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            Absolute-0.AI System Status
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={runDiagnostics}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Checking...' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {diagnostics ? (
          <>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.overall)}
                <span className="font-medium">Overall System Health</span>
              </div>
              {getStatusBadge(diagnostics.overall)}
            </div>

            {diagnostics.supabase && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {getStatusIcon(diagnostics.supabase.success)}
                  <span className="font-medium">Supabase Connection</span>
                </div>
                {getStatusBadge(diagnostics.supabase.success)}
              </div>
            )}

            {diagnostics.realtimeChat && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {getStatusIcon(diagnostics.realtimeChat.success)}
                  <span className="font-medium">Realtime Chat Function</span>
                </div>
                {getStatusBadge(diagnostics.realtimeChat.success)}
              </div>
            )}

            {diagnostics.apiKey && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {getStatusIcon(diagnostics.apiKey.success)}
                  <span className="font-medium">API Key Configuration</span>
                </div>
                {getStatusBadge(diagnostics.apiKey.success)}
              </div>
            )}

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Last Check:</strong> {new Date(diagnostics.timestamp).toLocaleString()}
              </p>
              {diagnostics.overall ? (
                <p className="text-sm text-green-800 mt-1">
                  ✅ All Absolute-0.AI systems are operational and ready for voice chat
                </p>
              ) : (
                <p className="text-sm text-red-800 mt-1">
                  ❌ Some systems require attention. Check the edge function logs for details.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-2" />
            <p className="text-gray-600">Running system diagnostics...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemStatusIndicator;
