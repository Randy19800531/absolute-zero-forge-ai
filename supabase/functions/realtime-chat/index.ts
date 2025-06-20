
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Store active OpenAI WebSocket connections
const activeConnections = new Map<string, WebSocket>();

serve(async (req) => {
  console.log(`[${new Date().toISOString()}] Absolute-0.AI ${req.method} ${req.url}`);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session') || crypto.randomUUID();

  // Handle ping requests for diagnostics
  if (req.method === 'POST') {
    try {
      const data = await req.json();
      if (data.type === 'ping') {
        console.log('✅ Absolute-0.AI ping received:', data.message);
        return new Response(JSON.stringify({
          success: true,
          message: 'Absolute-0.AI realtime-chat function is operational',
          timestamp: new Date().toISOString(),
          system: 'Absolute-0.AI'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    } catch (error) {
      console.log('Non-ping POST request, proceeding with normal flow');
    }
  }

  // Authenticate user
  const authResult = await authenticateUser(req, url);
  if (!authResult.success) {
    return new Response(JSON.stringify({
      error: authResult.error,
      details: authResult.details,
      system: 'Absolute-0.AI'
    }), { 
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  console.log(`✅ Absolute-0.AI User authenticated: ${authResult.user.email}`);

  // GET request - establish SSE connection for receiving messages
  if (req.method === 'GET') {
    return handleSSEConnection(sessionId);
  }

  // POST request - send message to OpenAI
  if (req.method === 'POST') {
    return handleMessageSend(sessionId, req);
  }

  return new Response("Method not allowed", { 
    status: 405,
    headers: corsHeaders 
  });
});

async function authenticateUser(req: Request, url: URL) {
  try {
    console.log('=== ABSOLUTE-0.AI AUTHENTICATION START ===');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('Absolute-0.AI Environment check:', {
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      supabaseUrl: supabaseUrl?.substring(0, 30) + '...'
    });
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Absolute-0.AI Missing Supabase environment variables');
      return {
        success: false,
        error: "Supabase configuration missing",
        details: "Server configuration error"
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Try to get token from Authorization header first (for POST requests)
    let token = req.headers.get('Authorization')?.replace('Bearer ', '');
    let tokenSource = 'header';
    
    // If no token in header, try query parameter (for SSE GET requests)
    if (!token) {
      token = url.searchParams.get('token');
      tokenSource = 'query';
    }

    console.log('Absolute-0.AI Token extraction:', {
      source: tokenSource,
      hasToken: !!token,
      tokenLength: token?.length || 0,
      method: req.method
    });

    if (!token) {
      console.error('❌ Absolute-0.AI No authentication token found');
      return {
        success: false,
        error: "No authentication token provided",
        details: "Please log in and try again"
      };
    }

    console.log(`🔑 Absolute-0.AI Authenticating with token from ${tokenSource}`);

    // Verify the token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error("❌ Absolute-0.AI Token verification failed:", {
        message: error.message,
        status: error.status,
        code: error.name
      });
      
      return {
        success: false,
        error: "Invalid or expired token",
        details: "Please log out and log back in"
      };
    }
    
    if (!user) {
      console.error("❌ Absolute-0.AI No user returned from token verification");
      return {
        success: false,
        error: "Invalid or expired token",
        details: "Please log out and log back in"
      };
    }

    console.log('✅ Absolute-0.AI Token verification successful:', {
      userId: user.id,
      email: user.email,
      lastSignIn: user.last_sign_in_at
    });

    return {
      success: true,
      user: user
    };
  } catch (error) {
    console.error("❌ Absolute-0.AI Authentication error:", {
      message: error.message,
      stack: error.stack
    });
    return {
      success: false,
      error: "Authentication failed",
      details: error.message
    };
  }
}

async function handleSSEConnection(sessionId: string) {
  // Use the correct Absolute-0.AI API key from Supabase secrets
  const OPENAI_API_KEY = Deno.env.get('ABSOLUTE_0_AI_CONVERSATIONAL_API_KEY');
  
  // Comprehensive API key validation
  console.log(`=== ABSOLUTE-0.AI API Key Validation for session ${sessionId} ===`);
  console.log(`Environment variables available:`, Object.keys(Deno.env.toObject()));
  console.log(`ABSOLUTE_0_AI_CONVERSATIONAL_API_KEY exists:`, !!OPENAI_API_KEY);
  
  if (!OPENAI_API_KEY) {
    console.error("❌ ABSOLUTE_0_AI_CONVERSATIONAL_API_KEY not found in environment");
    return new Response(JSON.stringify({
      error: "Absolute-0.AI OpenAI API key not configured in Supabase secrets",
      details: "Please add 'ABSOLUTE_0_AI_CONVERSATIONAL_API_KEY' to your Supabase project secrets",
      system: "Absolute-0.AI",
      debug: {
        availableSecrets: Object.keys(Deno.env.toObject()).filter(key => key.includes('API') || key.includes('KEY'))
      }
    }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Validate API key format
  if (!OPENAI_API_KEY.startsWith('sk-')) {
    console.error("❌ Absolute-0.AI Invalid API key format - must start with 'sk-'");
    return new Response(JSON.stringify({
      error: "Invalid Absolute-0.AI OpenAI API key format",
      details: "API key must start with 'sk-'",
      system: "Absolute-0.AI",
      debug: {
        keyPrefix: OPENAI_API_KEY.substring(0, 5),
        keyLength: OPENAI_API_KEY.length
      }
    }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  console.log(`✅ Absolute-0.AI Valid API key found - length: ${OPENAI_API_KEY.length}, prefix: ${OPENAI_API_KEY.substring(0, 10)}...`);

  let openaiWs: WebSocket | null = null;
  let isConnected = false;
  
  const stream = new ReadableStream({
    start(controller) {
      console.log(`🚀 Absolute-0.AI Starting SSE connection for session ${sessionId}`);
      
      // Send initial connection event
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({
        type: "connection_established",
        sessionId: sessionId,
        system: "Absolute-0.AI",
        timestamp: new Date().toISOString()
      })}\n\n`));

      // Connect to OpenAI Realtime API
      const connectToOpenAI = () => {
        const openaiUrl = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17";
        console.log(`🔗 Absolute-0.AI Connecting to OpenAI: ${openaiUrl}`);
        console.log(`🔑 Using Absolute-0.AI API key: ${OPENAI_API_KEY.substring(0, 10)}...${OPENAI_API_KEY.substring(OPENAI_API_KEY.length - 4)}`);
        
        try {
          openaiWs = new WebSocket(openaiUrl, {
            headers: {
              "Authorization": `Bearer ${OPENAI_API_KEY}`,
              "OpenAI-Beta": "realtime=v1"
            }
          });

          openaiWs.addEventListener("open", () => {
            console.log("✅ Absolute-0.AI OpenAI WebSocket connected successfully");
            isConnected = true;
            activeConnections.set(sessionId, openaiWs!);
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: "openai_connected",
              message: "Successfully connected to OpenAI Realtime API via Absolute-0.AI",
              system: "Absolute-0.AI",
              timestamp: new Date().toISOString()
            })}\n\n`));
          });

          openaiWs.addEventListener("message", (event) => {
            try {
              const data = JSON.parse(event.data);
              console.log(`📨 Absolute-0.AI Received from OpenAI:`, data.type);
              
              // Handle session.created event
              if (data.type === 'session.created') {
                console.log("🎯 Absolute-0.AI Session created, sending session update");
                const sessionUpdate = {
                  type: "session.update",
                  session: {
                    modalities: ["text", "audio"],
                    instructions: "You are a helpful AI assistant for Absolute-0.AI. Be conversational, friendly, and engaging. Keep responses concise but informative.",
                    voice: "alloy",
                    input_audio_format: "pcm16",
                    output_audio_format: "pcm16",
                    input_audio_transcription: {
                      model: "whisper-1"
                    },
                    turn_detection: {
                      type: "server_vad",
                      threshold: 0.5,
                      prefix_padding_ms: 300,
                      silence_duration_ms: 1000
                    },
                    temperature: 0.8,
                    max_response_output_tokens: "inf"
                  }
                };
                openaiWs?.send(JSON.stringify(sessionUpdate));
              }
              
              // Forward all messages to client
              controller.enqueue(encoder.encode(`data: ${event.data}\n\n`));
            } catch (error) {
              console.error("❌ Absolute-0.AI Error parsing OpenAI message:", error);
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                type: "error",
                system: "Absolute-0.AI",
                error: { message: "Error processing OpenAI message", details: error.message }
              })}\n\n`));
            }
          });

          openaiWs.addEventListener("error", (error) => {
            console.error("❌ Absolute-0.AI OpenAI WebSocket error:", error);
            isConnected = false;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: "error",
              system: "Absolute-0.AI",
              error: { 
                message: "OpenAI WebSocket connection failed",
                details: "Check if API key has Realtime API access"
              }
            })}\n\n`));
          });

          openaiWs.addEventListener("close", (event) => {
            console.log(`🔌 Absolute-0.AI OpenAI WebSocket closed - Code: ${event.code}, Reason: ${event.reason}`);
            isConnected = false;
            activeConnections.delete(sessionId);
            
            // Handle specific close codes
            if (event.code === 4001) {
              console.error("❌ Absolute-0.AI API Key Authentication Failed (4001)");
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                type: "error",
                system: "Absolute-0.AI",
                error: { 
                  message: "API Key Authentication Failed",
                  details: "The Absolute-0.AI OpenAI API key is invalid or expired. Please check your key in Supabase secrets."
                }
              })}\n\n`));
            } else if (event.code === 4009) {
              console.error("❌ Absolute-0.AI Insufficient API Key Permissions (4009)");
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                type: "error",
                system: "Absolute-0.AI",
                error: { 
                  message: "Insufficient API Key Permissions", 
                  details: "Your Absolute-0.AI API key doesn't have access to the Realtime API. Please upgrade your OpenAI plan."
                }
              })}\n\n`));
            } else if (event.code !== 1000 && event.code !== 1001) {
              console.log(`🔄 Absolute-0.AI Attempting reconnection in 2 seconds...`);
              setTimeout(connectToOpenAI, 2000);
            } else {
              controller.close();
            }
          });

        } catch (error) {
          console.error("❌ Absolute-0.AI Failed to create OpenAI WebSocket:", error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: "error",
            system: "Absolute-0.AI",
            error: { 
              message: "Failed to initialize OpenAI connection",
              details: error.message
            }
          })}\n\n`));
        }
      };

      // Start the connection
      connectToOpenAI();
    },
    
    cancel() {
      console.log(`🛑 Absolute-0.AI SSE connection cancelled for session ${sessionId}`);
      const ws = activeConnections.get(sessionId);
      if (ws) {
        ws.close();
        activeConnections.delete(sessionId);
      }
    }
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

async function handleMessageSend(sessionId: string, req: Request) {
  try {
    const data = await req.json();
    console.log(`📤 Absolute-0.AI Sending message for session ${sessionId}:`, data.type);
    
    const openaiWs = activeConnections.get(sessionId);
    if (openaiWs && openaiWs.readyState === WebSocket.OPEN) {
      openaiWs.send(JSON.stringify(data));
      return new Response(JSON.stringify({ 
        success: true, 
        system: "Absolute-0.AI" 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      console.warn(`⚠️ Absolute-0.AI OpenAI WebSocket not ready for session ${sessionId}`);
      return new Response(JSON.stringify({ 
        error: "Connection not ready", 
        system: "Absolute-0.AI" 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error("❌ Absolute-0.AI Error processing message send:", error);
    return new Response(JSON.stringify({ 
      error: error.message, 
      system: "Absolute-0.AI" 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
