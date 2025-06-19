
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
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session') || crypto.randomUUID();

  // Authenticate user
  const authResult = await authenticateUser(req, url);
  if (!authResult.success) {
    return new Response(JSON.stringify({
      error: authResult.error,
      details: authResult.details
    }), { 
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  console.log(`✅ User authenticated: ${authResult.user.email}`);

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
    console.log('=== AUTHENTICATION START ===');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('Environment check:', {
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      supabaseUrl: supabaseUrl?.substring(0, 30) + '...'
    });
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase environment variables');
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

    console.log('Token extraction:', {
      source: tokenSource,
      hasToken: !!token,
      tokenLength: token?.length || 0,
      method: req.method
    });

    if (!token) {
      console.error('❌ No authentication token found in header or query params');
      return {
        success: false,
        error: "No authentication token provided",
        details: "Please log in and try again"
      };
    }

    // Enhanced token logging
    console.log(`🔑 Authenticating with token from ${tokenSource}: ${token.substring(0, 10)}...${token.substring(token.length - 10)} (length: ${token.length})`);

    // Decode JWT payload for debugging (be careful with sensitive data)
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        console.log('JWT payload preview:', {
          iss: payload.iss,
          sub: payload.sub,
          exp: payload.exp,
          expDate: new Date(payload.exp * 1000).toISOString(),
          isExpired: Date.now() / 1000 > payload.exp,
          sessionId: payload.session_id // Log the session_id claim
        });
        
        // Check if token is expired
        if (Date.now() / 1000 > payload.exp) {
          console.error('❌ Token is expired');
          return {
            success: false,
            error: "Token expired",
            details: "Please log out and log back in to refresh your session"
          };
        }
      }
    } catch (e) {
      console.warn('⚠️ Could not decode JWT payload:', e.message);
    }

    console.log('🔍 Verifying token with Supabase...');

    // Verify the token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error("❌ Token verification failed:", {
        message: error.message,
        status: error.status,
        code: error.name
      });
      
      // Handle specific session_id error
      if (error.message?.includes('session_id claim in JWT does not exist') || 
          error.message?.includes('Session from session_id claim')) {
        return {
          success: false,
          error: "Session expired or invalid",
          details: "Your session has expired. Please log out completely and log back in to get a fresh session."
        };
      }
      
      return {
        success: false,
        error: "Invalid or expired token",
        details: "Please log out and log back in"
      };
    }
    
    if (!user) {
      console.error("❌ No user returned from token verification");
      return {
        success: false,
        error: "Invalid or expired token",
        details: "Please log out and log back in"
      };
    }

    console.log('✅ Token verification successful:', {
      userId: user.id,
      email: user.email,
      lastSignIn: user.last_sign_in_at
    });

    return {
      success: true,
      user: user
    };
  } catch (error) {
    console.error("❌ Authentication error:", {
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
  // Use the custom API key name from Supabase secrets
  const OPENAI_API_KEY = Deno.env.get('Absolute-0.AI-Conversational API Key');
  
  // Comprehensive API key validation
  console.log(`=== API Key Validation for session ${sessionId} ===`);
  console.log(`Environment variables available:`, Object.keys(Deno.env.toObject()));
  console.log(`Absolute-0.AI-Conversational API Key exists:`, !!OPENAI_API_KEY);
  
  if (!OPENAI_API_KEY) {
    console.error("❌ Absolute-0.AI-Conversational API Key not found in environment");
    return new Response(JSON.stringify({
      error: "OpenAI API key not configured in Supabase secrets",
      details: "Please add 'Absolute-0.AI-Conversational API Key' to your Supabase project secrets",
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
    console.error("❌ Invalid API key format - must start with 'sk-'");
    return new Response(JSON.stringify({
      error: "Invalid OpenAI API key format",
      details: "API key must start with 'sk-'",
      debug: {
        keyPrefix: OPENAI_API_KEY.substring(0, 5),
        keyLength: OPENAI_API_KEY.length
      }
    }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  console.log(`✅ Valid API key found - length: ${OPENAI_API_KEY.length}, prefix: ${OPENAI_API_KEY.substring(0, 10)}...`);

  let openaiWs: WebSocket | null = null;
  let isConnected = false;
  
  const stream = new ReadableStream({
    start(controller) {
      console.log(`🚀 Starting SSE connection for session ${sessionId}`);
      
      // Send initial connection event
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({
        type: "connection_established",
        sessionId: sessionId,
        timestamp: new Date().toISOString()
      })}\n\n`));

      // Connect to OpenAI Realtime API
      const connectToOpenAI = () => {
        const openaiUrl = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17";
        console.log(`🔗 Connecting to OpenAI: ${openaiUrl}`);
        console.log(`🔑 Using API key: ${OPENAI_API_KEY.substring(0, 10)}...${OPENAI_API_KEY.substring(OPENAI_API_KEY.length - 4)}`);
        
        try {
          openaiWs = new WebSocket(openaiUrl, {
            headers: {
              "Authorization": `Bearer ${OPENAI_API_KEY}`,
              "OpenAI-Beta": "realtime=v1"
            }
          });

          openaiWs.addEventListener("open", () => {
            console.log("✅ OpenAI WebSocket connected successfully");
            isConnected = true;
            activeConnections.set(sessionId, openaiWs!);
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: "openai_connected",
              message: "Successfully connected to OpenAI Realtime API",
              timestamp: new Date().toISOString()
            })}\n\n`));
          });

          openaiWs.addEventListener("message", (event) => {
            try {
              const data = JSON.parse(event.data);
              console.log(`📨 Received from OpenAI:`, data.type);
              
              // Handle session.created event
              if (data.type === 'session.created') {
                console.log("🎯 Session created, sending session update");
                const sessionUpdate = {
                  type: "session.update",
                  session: {
                    modalities: ["text", "audio"],
                    instructions: "You are a helpful AI assistant. Be conversational, friendly, and engaging. Keep responses concise but informative.",
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
              console.error("❌ Error parsing OpenAI message:", error);
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                type: "error",
                error: { message: "Error processing OpenAI message", details: error.message }
              })}\n\n`));
            }
          });

          openaiWs.addEventListener("error", (error) => {
            console.error("❌ OpenAI WebSocket error:", error);
            isConnected = false;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: "error",
              error: { 
                message: "OpenAI WebSocket connection failed",
                details: "Check if API key has Realtime API access"
              }
            })}\n\n`));
          });

          openaiWs.addEventListener("close", (event) => {
            console.log(`🔌 OpenAI WebSocket closed - Code: ${event.code}, Reason: ${event.reason}`);
            isConnected = false;
            activeConnections.delete(sessionId);
            
            // Handle specific close codes
            if (event.code === 4001) {
              console.error("❌ API Key Authentication Failed (4001)");
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                type: "error",
                error: { 
                  message: "API Key Authentication Failed",
                  details: "The OpenAI API key is invalid or expired. Please check your key in Supabase secrets."
                }
              })}\n\n`));
            } else if (event.code === 4009) {
              console.error("❌ Insufficient API Key Permissions (4009)");
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                type: "error",
                error: { 
                  message: "Insufficient API Key Permissions", 
                  details: "Your API key doesn't have access to the Realtime API. Please upgrade your OpenAI plan."
                }
              })}\n\n`));
            } else if (event.code !== 1000 && event.code !== 1001) {
              console.log(`🔄 Attempting reconnection in 2 seconds...`);
              setTimeout(connectToOpenAI, 2000);
            } else {
              controller.close();
            }
          });

        } catch (error) {
          console.error("❌ Failed to create OpenAI WebSocket:", error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: "error",
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
      console.log(`🛑 SSE connection cancelled for session ${sessionId}`);
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
    console.log(`📤 Sending message for session ${sessionId}:`, data.type);
    
    const openaiWs = activeConnections.get(sessionId);
    if (openaiWs && openaiWs.readyState === WebSocket.OPEN) {
      openaiWs.send(JSON.stringify(data));
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      console.warn(`⚠️ OpenAI WebSocket not ready for session ${sessionId}`);
      return new Response(JSON.stringify({ error: "Connection not ready" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error("❌ Error processing message send:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
