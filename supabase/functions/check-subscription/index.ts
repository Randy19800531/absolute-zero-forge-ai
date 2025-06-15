
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use the service role key to perform writes (upsert) in Supabase
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    // Get the PayFast credentials from environment variables
    const payfastMerchantId = Deno.env.get("PAYFAST_MERCHANT_ID");
    const payfastMerchantKey = Deno.env.get("PAYFAST_MERCHANT_KEY");
    const payfastPassphrase = Deno.env.get("PAYFAST_PASSPHRASE");
    
    if (!payfastMerchantId || !payfastMerchantKey || !payfastPassphrase) {
      throw new Error("PayFast credentials are not configured. Please check PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, and PAYFAST_PASSPHRASE environment variables.");
    }
    
    logStep("PayFast credentials verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }
    const user = userData.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Check for existing subscription in our database
    const { data: subscriptionData, error: subscriptionError } = await supabaseClient
      .from("subscribers")
      .select("*")
      .eq("email", user.email)
      .maybeSingle();

    if (subscriptionError) {
      logStep("Error querying subscriptions", { error: subscriptionError });
      throw new Error(`Database error: ${subscriptionError.message}`);
    }

    if (!subscriptionData) {
      logStep("No subscription found, updating unsubscribed state");
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        payfast_customer_id: null,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check if subscription is still active (not expired)
    const hasActiveSub = subscriptionData.subscribed && 
      subscriptionData.subscription_end && 
      new Date(subscriptionData.subscription_end) > new Date();

    logStep("Subscription status checked", { 
      subscribed: hasActiveSub, 
      tier: subscriptionData.subscription_tier,
      endDate: subscriptionData.subscription_end 
    });

    // Update subscription status if it has expired
    if (subscriptionData.subscribed && !hasActiveSub) {
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        payfast_customer_id: subscriptionData.payfast_customer_id,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      
      logStep("Subscription expired, updated to inactive");
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_tier: subscriptionData.subscription_tier,
      subscription_end: subscriptionData.subscription_end
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
