
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

// Function to generate PayFast signature
function generateSignature(data: Record<string, string>, passphrase: string) {
  // Create parameter string
  const paramString = Object.keys(data)
    .filter(key => data[key] !== '' && key !== 'signature')
    .sort()
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join('&');
  
  // Add passphrase if provided
  const stringToHash = passphrase ? `${paramString}&passphrase=${encodeURIComponent(passphrase)}` : paramString;
  
  // Generate MD5 hash
  const encoder = new TextEncoder();
  const data_bytes = encoder.encode(stringToHash);
  return crypto.subtle.digest('MD5', data_bytes).then(hashBuffer => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const payfastMerchantId = Deno.env.get("PAYFAST_MERCHANT_ID");
    const payfastMerchantKey = Deno.env.get("PAYFAST_MERCHANT_KEY");
    const payfastPassphrase = Deno.env.get("PAYFAST_PASSPHRASE");
    
    if (!payfastMerchantId || !payfastMerchantKey || !payfastPassphrase) {
      throw new Error("PayFast credentials are not configured");
    }
    logStep("PayFast credentials verified");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { plan } = await req.json();
    if (!plan) throw new Error("Plan is required");
    logStep("Plan received", { plan });

    // Plan pricing configuration
    const planConfig = {
      professional: { amount: "79.00", name: "Professional Plan" },
      enterprise: { amount: "199.00", name: "Enterprise Plan" }
    };

    const selectedPlan = planConfig[plan as keyof typeof planConfig];
    if (!selectedPlan) throw new Error("Invalid plan selected");
    logStep("Plan configuration", selectedPlan);

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    // Generate unique payment ID
    const paymentId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // PayFast payment data
    const paymentData = {
      merchant_id: payfastMerchantId,
      merchant_key: payfastMerchantKey,
      return_url: `${origin}/?subscription=success`,
      cancel_url: `${origin}/?subscription=cancelled`,
      notify_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/payfast-webhook`,
      name_first: user.email.split('@')[0],
      email_address: user.email,
      m_payment_id: paymentId,
      amount: selectedPlan.amount,
      item_name: selectedPlan.name,
      item_description: `Monthly subscription to ${selectedPlan.name}`,
      subscription_type: "1", // Subscription
      billing_date: new Date().toISOString().split('T')[0],
      recurring_amount: selectedPlan.amount,
      frequency: "3", // Monthly
      cycles: "0" // Indefinite
    };

    // Generate signature
    const signature = await generateSignature(paymentData, payfastPassphrase);
    paymentData.signature = signature;
    
    logStep("PayFast payment data prepared", { paymentId, amount: selectedPlan.amount });

    // Create HTML form for PayFast redirect
    const formFields = Object.entries(paymentData)
      .map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`)
      .join('\n');
    
    const redirectForm = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Redirecting to PayFast...</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 20px auto; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <h2>Redirecting to PayFast...</h2>
        <div class="spinner"></div>
        <p>Please wait while we redirect you to complete your payment.</p>
        <form id="payfast-form" action="https://www.payfast.co.za/eng/process" method="post">
          ${formFields}
        </form>
        <script>
          setTimeout(function() {
            document.getElementById('payfast-form').submit();
          }, 1000);
        </script>
      </body>
      </html>
    `;

    return new Response(redirectForm, {
      headers: { ...corsHeaders, "Content-Type": "text/html" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
