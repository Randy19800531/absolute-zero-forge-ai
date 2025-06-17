
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

async function handleSSEConnection(sessionId: string) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
  
  // Comprehensive API key validation
  console.log(`=== API Key Validation for session ${sessionId} ===`);
  console.log(`Environment variables available:`, Object.keys(Deno.env.toObject()));
  console.log(`OPENAI_API_KEY exists:`, !!OPENAI_API_KEY);
  
  if (!OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not found in environment");
    return new Response(JSON.stringify({
      error: "OpenAI API key not configured in Supabase secrets",
      details: "Please add OPENAI_API_KEY to your Supabase project secrets",
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
    console.error("❌ Invalid OPENAI_API_KEY format - must start with 'sk-'");
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
