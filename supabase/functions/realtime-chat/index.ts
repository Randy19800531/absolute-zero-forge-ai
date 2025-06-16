
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, upgrade, connection',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const upgrade = req.headers.get("upgrade") || "";
  if (upgrade.toLowerCase() !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  let openaiWs: WebSocket | null = null;

  socket.addEventListener("open", () => {
    console.log("Client connected to realtime chat");
    
    // Connect to OpenAI Realtime API
    const openaiUrl = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17";
    openaiWs = new WebSocket(openaiUrl, {
      headers: {
        "Authorization": `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        "OpenAI-Beta": "realtime=v1"
      }
    });

    openaiWs.addEventListener("open", () => {
      console.log("Connected to OpenAI Realtime API");
    });

    openaiWs.addEventListener("message", (event) => {
      console.log("Received from OpenAI:", event.data);
      const data = JSON.parse(event.data);
      
      // Handle session.created event
      if (data.type === 'session.created') {
        console.log("Session created, sending session update");
        const sessionUpdate = {
          type: "session.update",
          session: {
            modalities: ["text", "audio"],
            instructions: "You are a helpful AI assistant. Be conversational and friendly.",
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
    });

    openaiWs.addEventListener("error", (error) => {
      console.error("OpenAI WebSocket error:", error);
      socket.send(JSON.stringify({
        type: "error",
        message: "OpenAI connection error"
      }));
    });

    openaiWs.addEventListener("close", () => {
      console.log("OpenAI WebSocket closed");
      socket.close();
    });
  });

  socket.addEventListener("message", (event) => {
    console.log("Received from client:", event.data);
    // Forward client messages to OpenAI
    if (openaiWs && openaiWs.readyState === WebSocket.OPEN) {
      openaiWs.send(event.data);
    }
  });

  socket.addEventListener("close", () => {
    console.log("Client disconnected");
    if (openaiWs) {
      openaiWs.close();
    }
  });

  socket.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
    if (openaiWs) {
      openaiWs.close();
    }
  });

  return response;
});
