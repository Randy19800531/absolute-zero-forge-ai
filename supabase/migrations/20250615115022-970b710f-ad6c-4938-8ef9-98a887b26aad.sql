
-- Create test cases table
CREATE TABLE public.test_cases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'functional',
  steps JSONB DEFAULT '[]'::jsonb,
  conditions JSONB DEFAULT '{}'::jsonb,
  data_sources JSONB DEFAULT '{}'::jsonb,
  assertions JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users,
  version INTEGER DEFAULT 1
);

-- Create test case versions table for git-like tracking
CREATE TABLE public.test_case_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_case_id UUID REFERENCES public.test_cases NOT NULL,
  version_number INTEGER NOT NULL,
  commit_message TEXT,
  changes JSONB,
  steps JSONB DEFAULT '[]'::jsonb,
  conditions JSONB DEFAULT '{}'::jsonb,
  data_sources JSONB DEFAULT '{}'::jsonb,
  assertions JSONB DEFAULT '[]'::jsonb,
  author_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create test runs table
CREATE TABLE public.test_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_case_id UUID REFERENCES public.test_cases NOT NULL,
  environment TEXT NOT NULL DEFAULT 'dev' CHECK (environment IN ('dev', 'uat', 'prod')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'passed', 'failed', 'cancelled')),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  expected_output TEXT,
  actual_output TEXT,
  evidence_links JSONB DEFAULT '[]'::jsonb,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  triggered_by TEXT DEFAULT 'manual',
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create test schedules table
CREATE TABLE public.test_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_case_id UUID REFERENCES public.test_cases NOT NULL,
  name TEXT NOT NULL,
  cron_expression TEXT,
  environment TEXT NOT NULL DEFAULT 'dev' CHECK (environment IN ('dev', 'uat', 'prod')),
  is_active BOOLEAN DEFAULT true,
  notification_settings JSONB DEFAULT '{}'::jsonb,
  retry_policy JSONB DEFAULT '{"max_retries": 3, "delay_minutes": 5}'::jsonb,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create test sign-offs table
CREATE TABLE public.test_sign_offs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_run_id UUID REFERENCES public.test_runs NOT NULL,
  reviewer_id UUID REFERENCES auth.users NOT NULL,
  role TEXT NOT NULL,
  signed_off BOOLEAN DEFAULT false,
  comments TEXT,
  signed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create step library table for prebuilt blocks
CREATE TABLE public.step_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('click', 'type', 'assert', 'wait', 'navigate', 'select', 'hover')),
  description TEXT,
  parameters JSONB DEFAULT '{}'::jsonb,
  icon TEXT,
  is_custom BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_case_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_sign_offs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.step_library ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for test_cases
CREATE POLICY "Users can view their own test cases" ON public.test_cases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own test cases" ON public.test_cases FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own test cases" ON public.test_cases FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own test cases" ON public.test_cases FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for test_case_versions
CREATE POLICY "Users can view versions of their test cases" ON public.test_case_versions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.test_cases WHERE id = test_case_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create versions for their test cases" ON public.test_case_versions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.test_cases WHERE id = test_case_id AND user_id = auth.uid())
);

-- Create RLS policies for test_runs
CREATE POLICY "Users can view their own test runs" ON public.test_runs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own test runs" ON public.test_runs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own test runs" ON public.test_runs FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for test_schedules
CREATE POLICY "Users can view their own test schedules" ON public.test_schedules FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own test schedules" ON public.test_schedules FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own test schedules" ON public.test_schedules FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own test schedules" ON public.test_schedules FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for test_sign_offs
CREATE POLICY "Users can view sign-offs for their test runs" ON public.test_sign_offs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.test_runs WHERE id = test_run_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create sign-offs" ON public.test_sign_offs FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update their own sign-offs" ON public.test_sign_offs FOR UPDATE USING (auth.uid() = reviewer_id);

-- Create RLS policies for step_library
CREATE POLICY "Users can view all public steps and their own custom steps" ON public.step_library FOR SELECT USING (
  is_custom = false OR user_id = auth.uid()
);
CREATE POLICY "Users can create their own custom steps" ON public.step_library FOR INSERT WITH CHECK (
  (is_custom = true AND auth.uid() = user_id) OR is_custom = false
);
CREATE POLICY "Users can update their own custom steps" ON public.step_library FOR UPDATE USING (
  is_custom = true AND auth.uid() = user_id
);

-- Insert default step library items
INSERT INTO public.step_library (name, type, description, parameters, icon, is_custom) VALUES
('Click Element', 'click', 'Click on a specified element', '{"selector": "", "wait_time": 1000}', 'MousePointer', false),
('Type Text', 'type', 'Type text into an input field', '{"selector": "", "text": "", "clear_first": true}', 'Type', false),
('Assert Text', 'assert', 'Verify that element contains expected text', '{"selector": "", "expected_text": "", "comparison": "contains"}', 'CheckCircle', false),
('Wait', 'wait', 'Wait for specified time or condition', '{"duration": 2000, "condition": "time"}', 'Clock', false),
('Navigate', 'navigate', 'Navigate to a URL', '{"url": "", "wait_for_load": true}', 'Navigation', false),
('Select Option', 'select', 'Select an option from dropdown', '{"selector": "", "option": "", "by": "text"}', 'ChevronDown', false),
('Hover Element', 'hover', 'Hover over an element', '{"selector": "", "duration": 1000}', 'Hand', false);

-- Create function to increment version number
CREATE OR REPLACE FUNCTION increment_test_case_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version = COALESCE((
    SELECT MAX(version) + 1 
    FROM public.test_cases 
    WHERE id = NEW.id
  ), 1);
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for version increment
CREATE TRIGGER test_case_version_trigger
  BEFORE UPDATE ON public.test_cases
  FOR EACH ROW
  EXECUTE FUNCTION increment_test_case_version();
