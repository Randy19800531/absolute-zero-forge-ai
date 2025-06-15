
-- Update subscribers table to use PayFast instead of Stripe
ALTER TABLE public.subscribers 
DROP COLUMN IF EXISTS stripe_customer_id;

-- Ensure payfast_customer_id column exists
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS payfast_customer_id text;
