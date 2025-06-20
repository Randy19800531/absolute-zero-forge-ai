
// Updated diagnostics to use correct endpoint
export class Absolute0AIDiagnostics {
  static async checkSupabaseConnection(): Promise<{ success: boolean; details: any }> {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Test basic Supabase connection
      const { data, error } = await supabase.auth.getSession();
      
      return {
        success: !error,
        details: {
          connected: !error,
          hasSession: !!data.session,
          error: error?.message,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        details: {
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown connection error',
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  static async checkRealtimeChatFunction(): Promise<{ success: boolean; details: any }> {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Test the realtime-chat function with a ping
      const { data, error } = await supabase.functions.invoke('realtime-chat', {
        body: { type: 'ping', message: 'Absolute-0.AI diagnostic test' }
      });

      return {
        success: !error,
        details: {
          functionAvailable: !error,
          responseData: data,
          error: error?.message,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        details: {
          functionAvailable: false,
          error: error instanceof Error ? error.message : 'Function test failed',
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  static async checkAPIKeyConfiguration(): Promise<{ success: boolean; details: any }> {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Use the config-check function to verify API key
      const { data, error } = await supabase.functions.invoke('config-check');

      if (!error && data?.configured) {
        return {
          success: true,
          details: {
            apiKeyConfigured: data.configured,
            keyName: 'ABSOLUTE_0_AI_CONVERSATIONAL_API_KEY',
            validFormat: data.validFormat,
            keyLength: data.keyLength,
            timestamp: new Date().toISOString()
          }
        };
      }

      return {
        success: false,
        details: {
          apiKeyConfigured: false,
          error: error?.message || 'Configuration check failed',
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        details: {
          apiKeyConfigured: false,
          error: error instanceof Error ? error.message : 'Config check error',
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  static async runFullDiagnostic(): Promise<{
    overall: boolean;
    supabase: any;
    realtimeChat: any;
    apiKey: any;
    timestamp: string;
  }> {
    console.log('🔍 Running Absolute-0.AI Full System Diagnostic...');
    
    const [supabaseCheck, realtimeChatCheck, apiKeyCheck] = await Promise.all([
      this.checkSupabaseConnection(),
      this.checkRealtimeChatFunction(),
      this.checkAPIKeyConfiguration()
    ]);

    const overall = supabaseCheck.success && realtimeChatCheck.success && apiKeyCheck.success;

    console.log('📊 Absolute-0.AI Diagnostic Results:', {
      overall,
      supabase: supabaseCheck,
      realtimeChat: realtimeChatCheck,
      apiKey: apiKeyCheck
    });

    return {
      overall,
      supabase: supabaseCheck,
      realtimeChat: realtimeChatCheck,
      apiKey: apiKeyCheck,
      timestamp: new Date().toISOString()
    };
  }
}
