import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  type: string;
  billing_period: string;
  price: number;
  currency: string;
  features: string[];
  limits: Record<string, any>;
  is_active: boolean;
  is_public: boolean;
  sort_order: number;
  trial_days: number;
  created_at: string;
  addons?: PlanAddon[];
}

export interface PlanAddon {
  id: string;
  plan_id: string | null;
  name: string;
  description: string | null;
  price: number;
  billing_period: string;
  is_active: boolean;
}

export interface PromoCode {
  id: string;
  code: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  min_order_value: number;
  max_uses: number | null;
  uses_count: number;
  applies_to: string;
  applicable_plan_ids: string[];
  valid_from: string;
  valid_until: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  customer_id: string;
  plan_id: string;
  status: string;
  billing_cycle_start: string | null;
  billing_cycle_end: string | null;
  trial_ends_at: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  promo_code_id: string | null;
  external_subscription_id: string | null;
  payment_method: string | null;
  auto_renew: boolean;
  notes: string | null;
  created_at: string;
  customer?: any;
  plan?: SubscriptionPlan;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  subscription_id: string | null;
  status: string;
  issue_date: string;
  due_date: string;
  paid_date: string | null;
  subtotal: number;
  discount_amount: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  billing_address: any;
  payment_method: string | null;
  payment_reference: string | null;
  notes: string | null;
  created_at: string;
  customer?: any;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  discount_percent: number;
  tax_rate: number;
  line_total: number;
}

export interface SupportTicket {
  id: string;
  ticket_number: string;
  customer_id: string | null;
  subscription_id: string | null;
  subject: string;
  description: string | null;
  status: string;
  priority: string;
  category: string | null;
  assigned_to: string | null;
  resolved_at: string | null;
  created_at: string;
  customer?: any;
  messages?: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  message: string;
  is_internal: boolean;
  sender_type: string;
  sender_id: string | null;
  created_at: string;
}

// Subscription Plans Hook
export function useSubscriptionPlans() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*, addons:plan_addons(*)')
        .order('sort_order');
      if (error) throw error;
      return data as SubscriptionPlan[];
    },
    enabled: !!user,
  });

  const createPlan = useMutation({
    mutationFn: async (plan: Partial<SubscriptionPlan>) => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .insert({
          name: plan.name!,
          description: plan.description,
          type: plan.type ?? 'recurring',
          billing_period: plan.billing_period ?? 'monthly',
          price: plan.price ?? 0,
          currency: plan.currency ?? 'GBP',
          features: plan.features ?? [],
          limits: plan.limits ?? {},
          is_active: plan.is_active ?? true,
          is_public: plan.is_public ?? true,
          sort_order: plan.sort_order ?? 0,
          trial_days: plan.trial_days ?? 0,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
      toast.success('Plan created');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updatePlan = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SubscriptionPlan> & { id: string }) => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
      toast.success('Plan updated');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deletePlan = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('subscription_plans').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
      toast.success('Plan deleted');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { plans, isLoading, createPlan, updatePlan, deletePlan };
}

// Promo Codes Hook
export function usePromoCodes() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: promoCodes = [], isLoading } = useQuery({
    queryKey: ['promo-codes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as PromoCode[];
    },
    enabled: !!user,
  });

  const createPromoCode = useMutation({
    mutationFn: async (promo: Partial<PromoCode>) => {
      const { data, error } = await supabase
        .from('promo_codes')
        .insert({
          code: promo.code!,
          description: promo.description,
          discount_type: promo.discount_type ?? 'percentage',
          discount_value: promo.discount_value!,
          min_order_value: promo.min_order_value ?? 0,
          max_uses: promo.max_uses,
          applies_to: promo.applies_to ?? 'all',
          applicable_plan_ids: promo.applicable_plan_ids ?? [],
          valid_from: promo.valid_from,
          valid_until: promo.valid_until,
          is_active: promo.is_active ?? true,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
      toast.success('Promo code created');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updatePromoCode = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PromoCode> & { id: string }) => {
      const { data, error } = await supabase
        .from('promo_codes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
      toast.success('Promo code updated');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deletePromoCode = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('promo_codes').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
      toast.success('Promo code deleted');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { promoCodes, isLoading, createPromoCode, updatePromoCode, deletePromoCode };
}

// Subscriptions Hook
export function useSubscriptions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*, customer:customers(*), plan:subscription_plans(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Subscription[];
    },
    enabled: !!user,
  });

  const createSubscription = useMutation({
    mutationFn: async (sub: Partial<Subscription>) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          customer_id: sub.customer_id!,
          plan_id: sub.plan_id!,
          status: sub.status ?? 'pending',
          billing_cycle_start: sub.billing_cycle_start,
          billing_cycle_end: sub.billing_cycle_end,
          trial_ends_at: sub.trial_ends_at,
          current_period_start: sub.current_period_start,
          current_period_end: sub.current_period_end,
          promo_code_id: sub.promo_code_id,
          payment_method: sub.payment_method,
          auto_renew: sub.auto_renew ?? true,
          notes: sub.notes,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      toast.success('Subscription created');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateSubscription = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Subscription> & { id: string }) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      toast.success('Subscription updated');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { subscriptions, isLoading, createSubscription, updateSubscription };
}

// Invoices Hook
export function useInvoices() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('*, customer:customers(*), items:invoice_items(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Invoice[];
    },
    enabled: !!user,
  });

  const createInvoice = useMutation({
    mutationFn: async (invoice: Partial<Invoice> & { items?: Partial<InvoiceItem>[] }) => {
      // Generate invoice number
      const { data: numData } = await supabase.rpc('generate_invoice_number');
      const invoiceNumber = numData || `INV-${Date.now()}`;

      const { data, error } = await supabase
        .from('invoices')
        .insert({
          invoice_number: invoiceNumber,
          customer_id: invoice.customer_id!,
          subscription_id: invoice.subscription_id,
          status: invoice.status ?? 'draft',
          issue_date: invoice.issue_date ?? new Date().toISOString().split('T')[0],
          due_date: invoice.due_date!,
          subtotal: invoice.subtotal ?? 0,
          discount_amount: invoice.discount_amount ?? 0,
          tax_rate: invoice.tax_rate ?? 0,
          tax_amount: invoice.tax_amount ?? 0,
          total_amount: invoice.total_amount ?? 0,
          currency: invoice.currency ?? 'GBP',
          billing_address: invoice.billing_address,
          notes: invoice.notes,
        })
        .select()
        .single();
      if (error) throw error;

      // Add line items if provided
      if (invoice.items && invoice.items.length > 0) {
        const items = invoice.items.map((item) => ({
          invoice_id: data.id,
          description: item.description!,
          quantity: item.quantity ?? 1,
          unit_price: item.unit_price ?? 0,
          discount_percent: item.discount_percent ?? 0,
          tax_rate: item.tax_rate ?? 0,
          line_total: item.line_total ?? 0,
        }));

        const { error: itemsError } = await supabase.from('invoice_items').insert(items);
        if (itemsError) throw itemsError;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice created');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateInvoice = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Invoice> & { id: string }) => {
      const { data, error } = await supabase
        .from('invoices')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice updated');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { invoices, isLoading, createInvoice, updateInvoice };
}

// Support Tickets Hook
export function useSupportTickets() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['support-tickets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*, customer:customers(*), messages:ticket_messages(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as SupportTicket[];
    },
    enabled: !!user,
  });

  const createTicket = useMutation({
    mutationFn: async (ticket: Partial<SupportTicket>) => {
      const { data: numData } = await supabase.rpc('generate_ticket_number');
      const ticketNumber = numData || `TKT-${Date.now()}`;

      const { data, error } = await supabase
        .from('support_tickets')
        .insert({
          ticket_number: ticketNumber,
          customer_id: ticket.customer_id,
          subscription_id: ticket.subscription_id,
          subject: ticket.subject!,
          description: ticket.description,
          status: ticket.status ?? 'open',
          priority: ticket.priority ?? 'medium',
          category: ticket.category,
          assigned_to: ticket.assigned_to,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
      toast.success('Ticket created');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateTicket = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SupportTicket> & { id: string }) => {
      const { data, error } = await supabase
        .from('support_tickets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
      toast.success('Ticket updated');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const addMessage = useMutation({
    mutationFn: async ({ ticketId, message, isInternal }: { ticketId: string; message: string; isInternal?: boolean }) => {
      const { data, error } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: ticketId,
          message,
          is_internal: isInternal ?? false,
          sender_type: 'staff',
          sender_id: user?.id,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
      toast.success('Message added');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { tickets, isLoading, createTicket, updateTicket, addMessage };
}
