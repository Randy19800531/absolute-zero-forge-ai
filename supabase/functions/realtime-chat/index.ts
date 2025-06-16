
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
  if (!OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not found in environment");
    return new Response("OpenAI API key not configured", { 
      status: 500,
      headers: corsHeaders 
    });
  }

  let openaiWs: WebSocket | null = null;
  
  const stream = new ReadableStream({
    start(controller) {
      console.log(`Starting SSE connection for session ${sessionId}`);
      
      // Send initial connection event
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({
        type: "connection_established",
        sessionId: sessionId
      })}\n\n`));

      // Connect to OpenAI Realtime API
      const openaiUrl = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17";
      console.log("Connecting to OpenAI Realtime API...");
      
      try {
        openaiWs = new WebSocket(openaiUrl, {
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "OpenAI-Beta": "realtime=v1"
          }
        });

        openaiWs.addEventListener("open", () => {
          console.log("Connected to OpenAI Realtime API successfully");
          activeConnections.set(sessionId, openaiWs!);
          
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({
            type: "openai_connected",
            message: "Connected to OpenAI Realtime API"
          })}\n\n`));
        });

        openaiWs.addEventListener("message", (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("Received from OpenAI:", data.type);
            
            // Handle session.created event - send session update
            if (data.type === 'session.created') {
              console.log("Session created, sending session update");
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
            
            // Forward all messages to client via SSE
            controller.enqueue(new TextEncoder().encode(`data: ${event.data}\n\n`));
          } catch (error) {
            console.error("Error processing OpenAI message:", error);
          }
        });

        openaiWs.addEventListener("error", (error) => {
          console.error("OpenAI WebSocket error:", error);
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({
            type: "error",
            error: { message: "OpenAI connection error" }
          })}\n\n`));
        });

        openaiWs.addEventListener("close", (event) => {
          console.log("OpenAI WebSocket closed:", event.code, event.reason);
          activeConnections.delete(sessionId);
          controller.close();
        });
      } catch (error) {
        console.error("Error creating OpenAI WebSocket:", error);
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({
          type: "error",
          error: { message: "Failed to connect to OpenAI" }
        })}\n\n`));
        controller.close();
      }
    },
    
    cancel() {
      console.log(`SSE connection cancelled for session ${sessionId}`);
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
    console.log("Received message for session", sessionId, ":", data.type);
    
    const openaiWs = activeConnections.get(sessionId);
    if (openaiWs && openaiWs.readyState === WebSocket.OPEN) {
      openaiWs.send(JSON.stringify(data));
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      console.warn("OpenAI WebSocket not ready for session", sessionId);
      return new Response(JSON.stringify({ error: "Connection not ready" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error("Error processing message:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
