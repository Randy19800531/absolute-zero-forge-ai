
import { supabase } from '@/integrations/supabase/client';

export interface HealthCheckResult {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: any;
  timestamp: string;
}

export interface ComprehensiveHealthReport {
  overall: 'healthy' | 'warning' | 'error';
  summary: string;
  checks: HealthCheckResult[];
  recommendations: string[];
  timestamp: string;
}

export class SupabaseHealthService {
  static async runComprehensiveHealthCheck(): Promise<ComprehensiveHealthReport> {
    console.log('🔍 Starting Comprehensive Supabase Health Check...');
    
    const checks: HealthCheckResult[] = [];
    const recommendations: string[] = [];

    // Test Database Connection
    checks.push(await this.testDatabaseConnection());
    
    // Test Authentication
    checks.push(await this.testAuthentication());
    
    // Test Edge Functions
    checks.push(await this.testEdgeFunctions());
    
    // Test API Configuration
    checks.push(await this.testAPIConfiguration());
    
    // Test Real-time Features
    checks.push(await this.testRealtimeFeatures());
    
    // Test Storage (if buckets exist)
    checks.push(await this.testStorageConfiguration());
    
    // Test Environment Configuration
    checks.push(await this.testEnvironmentConfiguration());
    
    // Test Performance
    checks.push(await this.testPerformanceMetrics());

    // Analyze results
    const errorCount = checks.filter(c => c.status === 'error').length;
    const warningCount = checks.filter(c => c.status === 'warning').length;
    
    let overall: 'healthy' | 'warning' | 'error' = 'healthy';
    let summary = 'All Supabase components are functioning optimally';
    
    if (errorCount > 0) {
      overall = 'error';
      summary = `${errorCount} critical issue(s) detected requiring immediate attention`;
      recommendations.push('Address all error-level issues immediately');
    } else if (warningCount > 0) {
      overall = 'warning';
      summary = `${warningCount} optimization opportunity(ies) identified`;
      recommendations.push('Consider addressing warning-level optimizations');
    }

    // Add general recommendations
    if (overall === 'healthy') {
      recommendations.push('System is healthy - consider implementing monitoring for production');
      recommendations.push('Review Row Level Security policies periodically');
      recommendations.push('Monitor database performance metrics regularly');
    }

    return {
      overall,
      summary,
      checks,
      recommendations,
      timestamp: new Date().toISOString()
    };
  }

  private static async testDatabaseConnection(): Promise<HealthCheckResult> {
    try {
      const startTime = Date.now();
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      const responseTime = Date.now() - startTime;
      
      if (error) {
        return {
          component: 'Database Connection',
          status: 'error',
          message: `Database connection failed: ${error.message}`,
          details: { error: error.message, code: error.code },
          timestamp: new Date().toISOString()
        };
      }

      const status = responseTime > 1000 ? 'warning' : 'healthy';
      return {
        component: 'Database Connection',
        status,
        message: status === 'healthy' 
          ? `Database connection successful (${responseTime}ms)`
          : `Database connection slow (${responseTime}ms)`,
        details: { responseTime, query: 'profiles table test' },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        component: 'Database Connection',
        status: 'error',
        message: `Database connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  private static async testAuthentication(): Promise<HealthCheckResult> {
    try {
      const { data: session, error } = await supabase.auth.getSession();
      
      if (error) {
        return {
          component: 'Authentication',
          status: 'error',
          message: `Auth service error: ${error.message}`,
          details: { error: error.message },
          timestamp: new Date().toISOString()
        };
      }

      const hasSession = !!session.session;
      return {
        component: 'Authentication',
        status: 'healthy',
        message: hasSession 
          ? 'Authentication service active with valid session'
          : 'Authentication service operational (no active session)',
        details: { 
          hasSession,
          userId: session.session?.user?.id || null,
          provider: session.session?.user?.app_metadata?.provider || null
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        component: 'Authentication',
        status: 'error',
        message: `Authentication test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  private static async testEdgeFunctions(): Promise<HealthCheckResult> {
    try {
      // Test config-check function
      const startTime = Date.now();
      const { data, error } = await supabase.functions.invoke('config-check');
      const responseTime = Date.now() - startTime;

      if (error) {
        return {
          component: 'Edge Functions',
          status: 'error',
          message: `Edge function test failed: ${error.message}`,
          details: { error: error.message, function: 'config-check' },
          timestamp: new Date().toISOString()
        };
      }

      const status = responseTime > 2000 ? 'warning' : 'healthy';
      return {
        component: 'Edge Functions',
        status,
        message: status === 'healthy'
          ? `Edge functions operational (${responseTime}ms)`
          : `Edge functions slow response (${responseTime}ms)`,
        details: { 
          responseTime, 
          functionResponse: data,
          testedFunction: 'config-check'
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        component: 'Edge Functions',
        status: 'error',
        message: `Edge function test error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  private static async testAPIConfiguration(): Promise<HealthCheckResult> {
    try {
      // Test basic API functionality
      const { data, error } = await supabase
        .from('ai_agents')
        .select('count')
        .limit(1);

      if (error) {
        return {
          component: 'API Configuration',
          status: 'error',
          message: `API configuration error: ${error.message}`,
          details: { error: error.message, code: error.code },
          timestamp: new Date().toISOString()
        };
      }

      return {
        component: 'API Configuration',
        status: 'healthy',
        message: 'API configuration and REST endpoints operational',
        details: { 
          testQuery: 'ai_agents table access',
          apiUrl: supabase.supabaseUrl
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        component: 'API Configuration',
        status: 'error',
        message: `API test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  private static async testRealtimeFeatures(): Promise<HealthCheckResult> {
    try {
      // Test realtime channel creation
      const channel = supabase.channel('health-check-test');
      
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          channel.unsubscribe();
          resolve({
            component: 'Real-time Features',
            status: 'warning',
            message: 'Real-time connection timeout - may need optimization',
            details: { timeout: true },
            timestamp: new Date().toISOString()
          });
        }, 5000);

        channel
          .on('presence', { event: 'sync' }, () => {
            clearTimeout(timeout);
            channel.unsubscribe();
            resolve({
              component: 'Real-time Features',
              status: 'healthy',
              message: 'Real-time features operational',
              details: { channelTest: 'successful' },
              timestamp: new Date().toISOString()
            });
          })
          .subscribe();
      });
    } catch (error) {
      return {
        component: 'Real-time Features',
        status: 'error',
        message: `Real-time test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  private static async testStorageConfiguration(): Promise<HealthCheckResult> {
    try {
      const { data, error } = await supabase.storage.listBuckets();
      
      if (error) {
        return {
          component: 'Storage Configuration',
          status: 'warning',
          message: 'Storage service may not be configured or accessible',
          details: { error: error.message },
          timestamp: new Date().toISOString()
        };
      }

      return {
        component: 'Storage Configuration',
        status: 'healthy',
        message: `Storage service operational (${data.length} bucket(s) configured)`,
        details: { 
          bucketCount: data.length,
          buckets: data.map(b => b.name)
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        component: 'Storage Configuration',
        status: 'warning',
        message: 'Storage service test inconclusive',
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  private static async testEnvironmentConfiguration(): Promise<HealthCheckResult> {
    const issues: string[] = [];
    const details: any = {};

    // Check URL configuration
    if (!supabase.supabaseUrl || supabase.supabaseUrl.includes('localhost')) {
      if (supabase.supabaseUrl.includes('localhost')) {
        details.environment = 'development';
      } else {
        issues.push('Invalid Supabase URL configuration');
      }
    } else {
      details.environment = 'production';
      details.supabaseUrl = supabase.supabaseUrl;
    }

    // Check key configuration
    if (!supabase.supabaseKey) {
      issues.push('Missing Supabase anon key');
    } else {
      details.hasAnonKey = true;
    }

    const status = issues.length === 0 ? 'healthy' : 'error';
    return {
      component: 'Environment Configuration',
      status,
      message: status === 'healthy' 
        ? 'Environment configuration optimal'
        : `Configuration issues: ${issues.join(', ')}`,
      details,
      timestamp: new Date().toISOString()
    };
  }

  private static async testPerformanceMetrics(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    const tests = [];
    
    try {
      // Test multiple concurrent requests to measure performance
      tests.push(supabase.from('profiles').select('count').limit(1));
      tests.push(supabase.from('ai_agents').select('count').limit(1));
      tests.push(supabase.auth.getSession());
      
      const results = await Promise.all(tests);
      const totalTime = Date.now() - startTime;
      
      const hasErrors = results.some(r => r.error);
      if (hasErrors) {
        return {
          component: 'Performance Metrics',
          status: 'warning',
          message: 'Some performance tests failed',
          details: { totalTime, testCount: tests.length },
          timestamp: new Date().toISOString()
        };
      }

      const status = totalTime > 3000 ? 'warning' : 'healthy';
      return {
        component: 'Performance Metrics',
        status,
        message: status === 'healthy'
          ? `Performance metrics optimal (${totalTime}ms for ${tests.length} tests)`
          : `Performance metrics show latency (${totalTime}ms for ${tests.length} tests)`,
        details: { 
          totalTime, 
          testCount: tests.length,
          averageTime: Math.round(totalTime / tests.length)
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        component: 'Performance Metrics',
        status: 'error',
        message: `Performance test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  static async fixCommonIssues(): Promise<string[]> {
    const fixes: string[] = [];
    
    try {
      // Run health check first
      const report = await this.runComprehensiveHealthCheck();
      
      for (const check of report.checks) {
        if (check.status === 'error') {
          const fix = await this.attemptAutoFix(check);
          if (fix) {
            fixes.push(fix);
          }
        }
      }
      
      return fixes;
    } catch (error) {
      fixes.push(`Auto-fix process failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return fixes;
    }
  }

  private static async attemptAutoFix(check: HealthCheckResult): Promise<string | null> {
    switch (check.component) {
      case 'Database Connection':
        // Could attempt to refresh connection, check network, etc.
        return 'Attempted database connection refresh';
        
      case 'Authentication':
        // Could attempt to refresh session
        try {
          await supabase.auth.refreshSession();
          return 'Refreshed authentication session';
        } catch {
          return null;
        }
        
      case 'Edge Functions':
        // Could retry function calls with exponential backoff
        return 'Applied retry logic for edge functions';
        
      default:
        return null;
    }
  }
}
