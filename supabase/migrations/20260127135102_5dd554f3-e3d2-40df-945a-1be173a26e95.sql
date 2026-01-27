-- CRM & Sales Pipeline Module

-- Companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  employee_count TEXT,
  annual_revenue NUMERIC,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contacts table
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  job_title TEXT,
  department TEXT,
  linkedin_url TEXT,
  lead_score INTEGER DEFAULT 0,
  lead_status TEXT DEFAULT 'new',
  lead_source TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  owner_id UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Sales pipelines (B2B, E-commerce, Wholesale, Retail, Custom)
CREATE TABLE public.sales_pipelines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'custom', -- b2b, ecommerce, wholesale, retail, custom
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Pipeline stages
CREATE TABLE public.pipeline_stages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pipeline_id UUID NOT NULL REFERENCES public.sales_pipelines(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  probability INTEGER DEFAULT 0, -- Win probability percentage
  color TEXT DEFAULT '#6B7280',
  is_won BOOLEAN DEFAULT false,
  is_lost BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Deals
CREATE TABLE public.deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pipeline_id UUID NOT NULL REFERENCES public.sales_pipelines(id),
  stage_id UUID NOT NULL REFERENCES public.pipeline_stages(id),
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  value NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'GBP',
  expected_close_date DATE,
  actual_close_date DATE,
  probability INTEGER,
  owner_id UUID REFERENCES auth.users(id),
  notes TEXT,
  lost_reason TEXT,
  position INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Deal activities (calls, emails, meetings, notes)
CREATE TABLE public.deal_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- call, email, meeting, note, task
  subject TEXT,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Lead scoring rules
CREATE TABLE public.lead_scoring_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  field TEXT NOT NULL, -- Which field to check
  operator TEXT NOT NULL, -- equals, contains, greater_than, etc.
  value TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_scoring_rules ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Admin/Manager can manage companies" ON public.companies
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view companies" ON public.companies
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- RLS Policies for contacts
CREATE POLICY "Admin/Manager can manage contacts" ON public.contacts
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view contacts" ON public.contacts
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can manage owned contacts" ON public.contacts
  FOR ALL USING (has_role(auth.uid(), 'staff') AND owner_id = auth.uid());

-- RLS Policies for pipelines
CREATE POLICY "Admin/Manager can manage pipelines" ON public.sales_pipelines
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view pipelines" ON public.sales_pipelines
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- RLS Policies for stages
CREATE POLICY "Admin/Manager can manage stages" ON public.pipeline_stages
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view stages" ON public.pipeline_stages
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- RLS Policies for deals
CREATE POLICY "Admin/Manager can manage deals" ON public.deals
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view deals" ON public.deals
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can manage owned deals" ON public.deals
  FOR ALL USING (has_role(auth.uid(), 'staff') AND owner_id = auth.uid());

-- RLS Policies for activities
CREATE POLICY "Admin/Manager can manage activities" ON public.deal_activities
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view activities" ON public.deal_activities
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can create activities" ON public.deal_activities
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'staff'));

-- RLS Policies for scoring rules
CREATE POLICY "Admin/Manager can manage scoring rules" ON public.lead_scoring_rules
  FOR ALL USING (is_admin_or_manager(auth.uid()));

CREATE POLICY "Staff can view scoring rules" ON public.lead_scoring_rules
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- Updated_at triggers
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sales_pipelines_updated_at BEFORE UPDATE ON public.sales_pipelines
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pipeline_stages_updated_at BEFORE UPDATE ON public.pipeline_stages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_deal_activities_updated_at BEFORE UPDATE ON public.deal_activities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lead_scoring_rules_updated_at BEFORE UPDATE ON public.lead_scoring_rules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_contacts_company ON public.contacts(company_id);
CREATE INDEX idx_contacts_owner ON public.contacts(owner_id);
CREATE INDEX idx_contacts_lead_status ON public.contacts(lead_status);
CREATE INDEX idx_deals_pipeline ON public.deals(pipeline_id);
CREATE INDEX idx_deals_stage ON public.deals(stage_id);
CREATE INDEX idx_deals_owner ON public.deals(owner_id);
CREATE INDEX idx_deal_activities_deal ON public.deal_activities(deal_id);
CREATE INDEX idx_pipeline_stages_pipeline ON public.pipeline_stages(pipeline_id);

-- Insert default pipelines
INSERT INTO public.sales_pipelines (name, type, description, is_default) VALUES
  ('B2B Sales', 'b2b', 'Business-to-business sales pipeline', true),
  ('E-commerce', 'ecommerce', 'Online retail sales pipeline', false),
  ('Wholesale', 'wholesale', 'Bulk/wholesale sales pipeline', false),
  ('Retail', 'retail', 'Direct retail sales pipeline', false);

-- Insert default stages for B2B pipeline
INSERT INTO public.pipeline_stages (pipeline_id, name, position, probability, color)
SELECT id, 'Lead', 0, 10, '#6B7280' FROM public.sales_pipelines WHERE type = 'b2b'
UNION ALL
SELECT id, 'Qualified', 1, 25, '#3B82F6' FROM public.sales_pipelines WHERE type = 'b2b'
UNION ALL
SELECT id, 'Proposal', 2, 50, '#8B5CF6' FROM public.sales_pipelines WHERE type = 'b2b'
UNION ALL
SELECT id, 'Negotiation', 3, 75, '#F59E0B' FROM public.sales_pipelines WHERE type = 'b2b'
UNION ALL
SELECT id, 'Won', 4, 100, '#10B981' FROM public.sales_pipelines WHERE type = 'b2b'
UNION ALL
SELECT id, 'Lost', 5, 0, '#EF4444' FROM public.sales_pipelines WHERE type = 'b2b';

-- Update won/lost flags
UPDATE public.pipeline_stages SET is_won = true WHERE name = 'Won';
UPDATE public.pipeline_stages SET is_lost = true WHERE name = 'Lost';

-- Insert default stages for E-commerce pipeline
INSERT INTO public.pipeline_stages (pipeline_id, name, position, probability, color)
SELECT id, 'Cart Added', 0, 20, '#6B7280' FROM public.sales_pipelines WHERE type = 'ecommerce'
UNION ALL
SELECT id, 'Checkout Started', 1, 40, '#3B82F6' FROM public.sales_pipelines WHERE type = 'ecommerce'
UNION ALL
SELECT id, 'Payment Pending', 2, 70, '#F59E0B' FROM public.sales_pipelines WHERE type = 'ecommerce'
UNION ALL
SELECT id, 'Completed', 3, 100, '#10B981' FROM public.sales_pipelines WHERE type = 'ecommerce'
UNION ALL
SELECT id, 'Abandoned', 4, 0, '#EF4444' FROM public.sales_pipelines WHERE type = 'ecommerce';

-- Insert default stages for Wholesale pipeline
INSERT INTO public.pipeline_stages (pipeline_id, name, position, probability, color)
SELECT id, 'Inquiry', 0, 10, '#6B7280' FROM public.sales_pipelines WHERE type = 'wholesale'
UNION ALL
SELECT id, 'Sample Sent', 1, 30, '#3B82F6' FROM public.sales_pipelines WHERE type = 'wholesale'
UNION ALL
SELECT id, 'Quote Sent', 2, 50, '#8B5CF6' FROM public.sales_pipelines WHERE type = 'wholesale'
UNION ALL
SELECT id, 'Order Placed', 3, 80, '#F59E0B' FROM public.sales_pipelines WHERE type = 'wholesale'
UNION ALL
SELECT id, 'Fulfilled', 4, 100, '#10B981' FROM public.sales_pipelines WHERE type = 'wholesale'
UNION ALL
SELECT id, 'Cancelled', 5, 0, '#EF4444' FROM public.sales_pipelines WHERE type = 'wholesale';

-- Insert default stages for Retail pipeline
INSERT INTO public.pipeline_stages (pipeline_id, name, position, probability, color)
SELECT id, 'Interest', 0, 20, '#6B7280' FROM public.sales_pipelines WHERE type = 'retail'
UNION ALL
SELECT id, 'Demo/Trial', 1, 50, '#3B82F6' FROM public.sales_pipelines WHERE type = 'retail'
UNION ALL
SELECT id, 'Purchase', 2, 100, '#10B981' FROM public.sales_pipelines WHERE type = 'retail'
UNION ALL
SELECT id, 'Not Interested', 3, 0, '#EF4444' FROM public.sales_pipelines WHERE type = 'retail';