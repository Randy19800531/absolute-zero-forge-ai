
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, upgrade, connection',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

serve(async (req) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Check for WebSocket upgrade
  const upgrade = req.headers.get("upgrade") || "";
  if (upgrade.toLowerCase() !== "websocket") {
    console.log("Request is not a WebSocket upgrade");
    return new Response("Expected Upgrade: websocket", { 
      status: 426,
      headers: corsHeaders 
    });
  }

  try {
    const { socket, response } = Deno.upgradeWebSocket(req);
    let openaiWs: WebSocket | null = null;

    socket.addEventListener("open", () => {
      console.log("Client connected to realtime chat");
      
      // Get OpenAI API key
      const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
      if (!OPENAI_API_KEY) {
        console.error("OPENAI_API_KEY not found in environment");
        socket.send(JSON.stringify({
          type: "error",
          error: { message: "OpenAI API key not configured" }
        }));
        socket.close();
        return;
      }
      
      // Connect to OpenAI Realtime API
      const openaiUrl = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17";
      console.log("Connecting to OpenAI Realtime API...");
      
      openaiWs = new WebSocket(openaiUrl, {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "realtime=v1"
        }
      });

      openaiWs.addEventListener("open", () => {
        console.log("Connected to OpenAI Realtime API successfully");
        socket.send(JSON.stringify({
          type: "connection_established",
          message: "Connected to OpenAI Realtime API"
        }));
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
          
          // Forward all messages to client
          socket.send(event.data);
        } catch (error) {
          console.error("Error processing OpenAI message:", error);
        }
      });

      openaiWs.addEventListener("error", (error) => {
        console.error("OpenAI WebSocket error:", error);
        socket.send(JSON.stringify({
          type: "error",
          error: { message: "OpenAI connection error" }
        }));
      });

      openaiWs.addEventListener("close", (event) => {
        console.log("OpenAI WebSocket closed:", event.code, event.reason);
        socket.close();
      });
    });

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received from client:", data.type);
        
        // Forward client messages to OpenAI
        if (openaiWs && openaiWs.readyState === WebSocket.OPEN) {
          openaiWs.send(event.data);
        } else {
          console.warn("OpenAI WebSocket not ready, dropping message");
        }
      } catch (error) {
        console.error("Error processing client message:", error);
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("Client disconnected:", event.code, event.reason);
      if (openaiWs) {
        openaiWs.close();
      }
    });

    socket.addEventListener("error", (error) => {
      console.error("Client WebSocket error:", error);
      if (openaiWs) {
        openaiWs.close();
      }
    });

    return response;
  } catch (error) {
    console.error("Error setting up WebSocket:", error);
    return new Response("WebSocket setup failed", { 
      status: 500,
      headers: corsHeaders 
    });
  }
});
