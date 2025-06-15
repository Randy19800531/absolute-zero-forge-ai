
-- Create enum for agent specializations
CREATE TYPE agent_specialization AS ENUM ('design', 'development', 'testing', 'deployment');

-- Create workflow table to track multi-agent projects
CREATE TABLE public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  user_id UUID NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'failed')),
  requirements JSONB DEFAULT '{}',
  generated_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workflow_steps table to track agent contributions
CREATE TABLE public.workflow_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  agent_specialization agent_specialization NOT NULL,
  step_order INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  execution_time_ms INTEGER,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Add specialization column to existing ai_agents table
ALTER TABLE public.ai_agents 
ADD COLUMN specialization agent_specialization;

-- Create template library table
CREATE TABLE public.app_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  template_data JSONB NOT NULL,
  preview_image_url TEXT,
  is_public BOOLEAN DEFAULT true,
  created_by UUID NOT NULL,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create team collaboration table
CREATE TABLE public.team_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  invited_by UUID,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Create teams table
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add team_id to workflows for collaboration
ALTER TABLE public.workflows 
ADD COLUMN team_id UUID REFERENCES public.teams(id);

-- Enable RLS on new tables
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_memberships ENABLE ROW LEVEL SECURITY;

-- RLS policies for workflows
CREATE POLICY "Users can view their own workflows" ON public.workflows
  FOR SELECT USING (user_id = auth.uid() OR team_id IN (
    SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create workflows" ON public.workflows
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own workflows" ON public.workflows
  FOR UPDATE USING (user_id = auth.uid() OR team_id IN (
    SELECT team_id FROM public.team_memberships 
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  ));

-- RLS policies for workflow_steps
CREATE POLICY "Users can view workflow steps for their workflows" ON public.workflow_steps
  FOR SELECT USING (workflow_id IN (
    SELECT id FROM public.workflows 
    WHERE user_id = auth.uid() OR team_id IN (
      SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "System can manage workflow steps" ON public.workflow_steps
  FOR ALL USING (true);

-- RLS policies for app_templates
CREATE POLICY "Users can view public templates and their own" ON public.app_templates
  FOR SELECT USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Users can create templates" ON public.app_templates
  FOR INSERT WITH CHECK (created_by = auth.uid());

-- RLS policies for teams
CREATE POLICY "Users can view teams they belong to" ON public.teams
  FOR SELECT USING (id IN (
    SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create teams" ON public.teams
  FOR INSERT WITH CHECK (created_by = auth.uid());

-- RLS policies for team_memberships
CREATE POLICY "Users can view memberships for their teams" ON public.team_memberships
  FOR SELECT USING (user_id = auth.uid() OR team_id IN (
    SELECT team_id FROM public.team_memberships 
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  ));

CREATE POLICY "Team owners/admins can manage memberships" ON public.team_memberships
  FOR ALL USING (team_id IN (
    SELECT team_id FROM public.team_memberships 
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  ));
