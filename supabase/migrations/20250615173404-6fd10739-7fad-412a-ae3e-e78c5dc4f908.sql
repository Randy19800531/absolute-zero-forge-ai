
-- Create tasks table for task management
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  assignee_id UUID REFERENCES auth.users,
  sprint_id UUID REFERENCES public.sprints,
  project_id UUID NOT NULL REFERENCES public.projects,
  estimated_hours INTEGER,
  actual_hours INTEGER DEFAULT 0,
  story_points INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL REFERENCES auth.users
);

-- Enable RLS for tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks (basic access for now)
CREATE POLICY "Allow all operations on tasks" ON public.tasks FOR ALL USING (true);

-- Enable realtime for tasks
ALTER TABLE public.tasks REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;

-- Enable realtime for sprints (if not already enabled)
ALTER TABLE public.sprints REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sprints;
