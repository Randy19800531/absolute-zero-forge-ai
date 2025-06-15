
-- Add missing PayFast customer ID column to subscribers table
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS payfast_customer_id text;
