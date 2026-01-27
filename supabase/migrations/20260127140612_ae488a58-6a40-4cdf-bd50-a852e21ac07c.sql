-- Subscription & Billing Module

-- Subscription plans/tiers
CREATE TABLE public.subscription_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'recurring', -- recurring, one_time, usage_based, product_box
  billing_period TEXT DEFAULT 'monthly', -- monthly, quarterly, yearly, weekly
  price NUMERIC NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'GBP',
  features JSONB DEFAULT '[]'::jsonb, -- Array of feature strings
  limits JSONB DEFAULT '{}'::jsonb, -- Usage limits if applicable
  is_active BOOLEAN DEFAULT true,
  is_public BOOLEAN DEFAULT true, -- Show on public pricing page
  sort_order INTEGER DEFAULT 0,
  trial_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Plan add-ons
CREATE TABLE public.plan_addons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID REFERENCES public.subscription_plans(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  billing_period TEXT DEFAULT 'monthly',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Promo codes
CREATE TABLE public.promo_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_type TEXT NOT NULL DEFAULT 'percentage', -- percentage, fixed_amount
  discount_value NUMERIC NOT NULL,
  min_order_value NUMERIC DEFAULT 0,
  max_uses INTEGER, -- null = unlimited
  uses_count INTEGER DEFAULT 0,
  applies_to TEXT DEFAULT 'all', -- all, specific_plans, first_order
  applicable_plan_ids UUID[] DEFAULT '{}',
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Customer subscriptions
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id),
  status TEXT NOT NULL DEFAULT 'pending', -- pending, active, paused, cancelled, expired, trial
  billing_cycle_start DATE,
  billing_cycle_end DATE,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  promo_code_id UUID REFERENCES public.promo_codes(id),
  external_subscription_id TEXT, -- For payment gateway reference
  payment_method TEXT, -- card, bank_transfer, direct_debit
  auto_renew BOOLEAN DEFAULT true,
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Subscription add-ons (which add-ons customer has)
CREATE TABLE public.subscription_addons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  addon_id UUID NOT NULL REFERENCES public.plan_addons(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Invoices
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.customers(id),
  subscription_id UUID REFERENCES public.subscriptions(id),
  status TEXT NOT NULL DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled, refunded
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  paid_date DATE,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  tax_rate NUMERIC DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'GBP',
  promo_code_id UUID REFERENCES public.promo_codes(id),
  billing_address JSONB,
  payment_method TEXT,
  payment_reference TEXT, -- External payment gateway reference
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Invoice line items
CREATE TABLE public.invoice_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  discount_percent NUMERIC DEFAULT 0,
  tax_rate NUMERIC DEFAULT 0,
  line_total NUMERIC NOT NULL DEFAULT 0,
  product_id UUID REFERENCES public.products(id),
  plan_id UUID REFERENCES public.subscription_plans(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Payment records
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES public.invoices(id),
  subscription_id UUID REFERENCES public.subscriptions(id),
  customer_id UUID NOT NULL REFERENCES public.customers(id),
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'GBP',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed, refunded
  payment_method TEXT,
  payment_gateway TEXT, -- wonderful_payments, manual, bank_transfer
  gateway_transaction_id TEXT,
  gateway_response JSONB,
  refund_amount NUMERIC DEFAULT 0,
  refunded_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Support tickets
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.customers(id),
  subscription_id UUID REFERENCES public.subscriptions(id),
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'open', -- open, in_progress, waiting_on_customer, resolved, closed
  priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
  category TEXT, -- billing, subscription, technical, general
  assigned_to UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ticket messages/replies
CREATE TABLE public.ticket_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false, -- Internal notes not visible to customer
  sender_type TEXT NOT NULL DEFAULT 'staff', -- staff, customer
  sender_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Subscription plans - public can view active public plans
CREATE POLICY "Anyone can view public plans" ON public.subscription_plans
  FOR SELECT USING (is_active = true AND is_public = true);
CREATE POLICY "Admin/Manager can manage plans" ON public.subscription_plans
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Plan addons
CREATE POLICY "Anyone can view active addons" ON public.plan_addons
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admin/Manager can manage addons" ON public.plan_addons
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Promo codes - staff can view, admin can manage
CREATE POLICY "Staff can view promo codes" ON public.promo_codes
  FOR SELECT USING (has_role(auth.uid(), 'staff'));
CREATE POLICY "Admin/Manager can manage promo codes" ON public.promo_codes
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Subscriptions
CREATE POLICY "Admin/Manager can manage subscriptions" ON public.subscriptions
  FOR ALL USING (is_admin_or_manager(auth.uid()));
CREATE POLICY "Staff can view subscriptions" ON public.subscriptions
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- Subscription addons
CREATE POLICY "Admin/Manager can manage subscription addons" ON public.subscription_addons
  FOR ALL USING (is_admin_or_manager(auth.uid()));
CREATE POLICY "Staff can view subscription addons" ON public.subscription_addons
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- Invoices
CREATE POLICY "Admin/Manager can manage invoices" ON public.invoices
  FOR ALL USING (is_admin_or_manager(auth.uid()));
CREATE POLICY "Staff can view invoices" ON public.invoices
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- Invoice items
CREATE POLICY "Admin/Manager can manage invoice items" ON public.invoice_items
  FOR ALL USING (is_admin_or_manager(auth.uid()));
CREATE POLICY "Staff can view invoice items" ON public.invoice_items
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- Payments
CREATE POLICY "Admin/Manager can manage payments" ON public.payments
  FOR ALL USING (is_admin_or_manager(auth.uid()));
CREATE POLICY "Staff can view payments" ON public.payments
  FOR SELECT USING (has_role(auth.uid(), 'staff'));

-- Support tickets
CREATE POLICY "Admin/Manager can manage tickets" ON public.support_tickets
  FOR ALL USING (is_admin_or_manager(auth.uid()));
CREATE POLICY "Staff can view and update tickets" ON public.support_tickets
  FOR ALL USING (has_role(auth.uid(), 'staff'));

-- Ticket messages
CREATE POLICY "Admin/Manager can manage messages" ON public.ticket_messages
  FOR ALL USING (is_admin_or_manager(auth.uid()));
CREATE POLICY "Staff can view and create messages" ON public.ticket_messages
  FOR ALL USING (has_role(auth.uid(), 'staff'));

-- Triggers
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON public.subscription_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_plan_addons_updated_at BEFORE UPDATE ON public.plan_addons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_promo_codes_updated_at BEFORE UPDATE ON public.promo_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Invoice number generator
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM public.invoices;
  new_number := 'INV-' || TO_CHAR(CURRENT_DATE, 'YYYYMM') || '-' || LPAD(counter::TEXT, 4, '0');
  RETURN new_number;
END;
$$;

-- Ticket number generator
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM public.support_tickets;
  new_number := 'TKT-' || LPAD(counter::TEXT, 6, '0');
  RETURN new_number;
END;
$$;

-- Indexes
CREATE INDEX idx_subscriptions_customer ON public.subscriptions(customer_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_invoices_customer ON public.invoices(customer_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_payments_customer ON public.payments(customer_id);
CREATE INDEX idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX idx_support_tickets_customer ON public.support_tickets(customer_id);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_ticket_messages_ticket ON public.ticket_messages(ticket_id);