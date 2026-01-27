-- Create clients table for billing
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  address TEXT,
  default_hourly_rate NUMERIC DEFAULT 0,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'on_hold', 'cancelled')),
  color TEXT DEFAULT '#3B82F6',
  start_date DATE,
  due_date DATE,
  hourly_rate NUMERIC,
  budget_hours NUMERIC,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create project_members table
CREATE TABLE public.project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'member', 'viewer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Create task_labels table
CREATE TABLE public.task_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6B7280',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  parent_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assignee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  start_date DATE,
  due_date DATE,
  estimated_hours NUMERIC,
  position INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create task_label_assignments table
CREATE TABLE public.task_label_assignments (
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  label_id UUID NOT NULL REFERENCES public.task_labels(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, label_id)
);

-- Create time_entries table
CREATE TABLE public.time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER,
  billable BOOLEAN DEFAULT true,
  hourly_rate NUMERIC,
  invoiced BOOLEAN DEFAULT false,
  invoice_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_label_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

-- Create helper function to check project membership
CREATE OR REPLACE FUNCTION public.is_project_member(_user_id UUID, _project_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.project_members
    WHERE user_id = _user_id AND project_id = _project_id
  ) OR EXISTS (
    SELECT 1 FROM public.projects
    WHERE id = _project_id AND created_by = _user_id
  )
$$;

-- Clients policies (admin/manager only)
CREATE POLICY "Admin/Manager can manage clients" ON public.clients
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view clients" ON public.clients
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- Projects policies
CREATE POLICY "Admin/Manager can manage all projects" ON public.projects
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view projects they're members of" ON public.projects
  FOR SELECT USING (
    has_role(auth.uid(), 'staff') AND 
    (created_by = auth.uid() OR is_project_member(auth.uid(), id))
  );

CREATE POLICY "Staff can create projects" ON public.projects
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can update their projects" ON public.projects
  FOR UPDATE USING (
    has_role(auth.uid(), 'staff') AND 
    (created_by = auth.uid() OR is_project_member(auth.uid(), id))
  );

-- Project members policies
CREATE POLICY "Admin/Manager can manage project members" ON public.project_members
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Project members can view members" ON public.project_members
  FOR SELECT USING (is_project_member(auth.uid(), project_id));

-- Task labels policies
CREATE POLICY "Anyone can view labels" ON public.task_labels
  FOR SELECT USING (true);

CREATE POLICY "Admin/Manager can manage labels" ON public.task_labels
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Tasks policies
CREATE POLICY "Admin/Manager can manage all tasks" ON public.tasks
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view project tasks" ON public.tasks
  FOR SELECT USING (
    has_role(auth.uid(), 'staff') AND 
    (project_id IS NULL OR is_project_member(auth.uid(), project_id) OR created_by = auth.uid())
  );

CREATE POLICY "Staff can create tasks" ON public.tasks
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can update assigned/created tasks" ON public.tasks
  FOR UPDATE USING (
    has_role(auth.uid(), 'staff') AND 
    (assignee_id = auth.uid() OR created_by = auth.uid() OR is_project_member(auth.uid(), project_id))
  );

CREATE POLICY "Staff can delete their tasks" ON public.tasks
  FOR DELETE USING (
    has_role(auth.uid(), 'staff') AND created_by = auth.uid()
  );

-- Task label assignments policies
CREATE POLICY "View label assignments" ON public.task_label_assignments
  FOR SELECT USING (true);

CREATE POLICY "Staff can manage label assignments" ON public.task_label_assignments
  FOR ALL USING (has_role(auth.uid(), 'staff'));

-- Time entries policies
CREATE POLICY "Admin/Manager can manage all time entries" ON public.time_entries
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Users can view their time entries" ON public.time_entries
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their time entries" ON public.time_entries
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their time entries" ON public.time_entries
  FOR UPDATE USING (user_id = auth.uid() AND invoiced = false);

CREATE POLICY "Users can delete their uninvoiced time entries" ON public.time_entries
  FOR DELETE USING (user_id = auth.uid() AND invoiced = false);

-- Create triggers for updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_time_entries_updated_at BEFORE UPDATE ON public.time_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_projects_client_id ON public.projects(client_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_project_members_user_id ON public.project_members(user_id);
CREATE INDEX idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX idx_tasks_assignee_id ON public.tasks(assignee_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX idx_time_entries_user_id ON public.time_entries(user_id);
CREATE INDEX idx_time_entries_project_id ON public.time_entries(project_id);
CREATE INDEX idx_time_entries_task_id ON public.time_entries(task_id);
CREATE INDEX idx_time_entries_start_time ON public.time_entries(start_time);