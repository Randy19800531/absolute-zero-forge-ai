
-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('user', 'admin', 'superuser');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create 2FA secrets table
CREATE TABLE public.two_factor_auth (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  secret TEXT NOT NULL,
  backup_codes TEXT[] DEFAULT '{}',
  is_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create app settings table for pricing control
CREATE TABLE public.app_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default pricing setting
INSERT INTO public.app_settings (setting_key, setting_value) 
VALUES ('pricing_enabled', '{"enabled": true}');

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.two_factor_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to check if user is admin or superuser
CREATE OR REPLACE FUNCTION public.is_admin_or_superuser(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'superuser')
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Superusers can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'superuser'));

CREATE POLICY "Superusers can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'superuser'));

-- RLS Policies for two_factor_auth
CREATE POLICY "Users can manage their own 2FA" ON public.two_factor_auth
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for app_settings
CREATE POLICY "Anyone can view app settings" ON public.app_settings
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify app settings" ON public.app_settings
  FOR ALL USING (public.is_admin_or_superuser(auth.uid()));

-- Insert the two superusers (you'll need to replace these email addresses)
-- First, we'll create a function to assign roles safely
CREATE OR REPLACE FUNCTION public.assign_superuser_role(_email TEXT)
RETURNS VOID
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
DECLARE
  _user_id UUID;
BEGIN
  -- Get user ID from email
  SELECT id INTO _user_id 
  FROM auth.users 
  WHERE email = _email;
  
  IF _user_id IS NOT NULL THEN
    -- Insert or update role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'superuser')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- You'll need to call this function with the actual email addresses after users sign up
-- Example: SELECT public.assign_superuser_role('admin1@example.com');
-- Example: SELECT public.assign_superuser_role('admin2@example.com');
