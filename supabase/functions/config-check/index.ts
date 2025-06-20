
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

serve(async (req) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if Absolute-0.AI API key is configured
    const ABSOLUTE_0_AI_API_KEY = Deno.env.get('ABSOLUTE_0_AI_CONVERSATIONAL_API_KEY');
    
    console.log('=== Absolute-0.AI Configuration Check ===');
    console.log(`API Key exists: ${!!ABSOLUTE_0_AI_API_KEY}`);
    console.log(`API Key length: ${ABSOLUTE_0_AI_API_KEY?.length || 0}`);
    console.log(`API Key format valid: ${ABSOLUTE_0_AI_API_KEY?.startsWith('sk-') || false}`);
    
    const isConfigured = !!(ABSOLUTE_0_AI_API_KEY && ABSOLUTE_0_AI_API_KEY.startsWith('sk-'));
    
    return new Response(JSON.stringify({
      configured: isConfigured,
      keyName: 'ABSOLUTE_0_AI_CONVERSATIONAL_API_KEY',
      keyLength: ABSOLUTE_0_AI_API_KEY?.length || 0,
      validFormat: ABSOLUTE_0_AI_API_KEY?.startsWith('sk-') || false,
      timestamp: new Date().toISOString(),
      system: 'Absolute-0.AI'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Configuration check error:', error);
    return new Response(JSON.stringify({
      configured: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      system: 'Absolute-0.AI'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
