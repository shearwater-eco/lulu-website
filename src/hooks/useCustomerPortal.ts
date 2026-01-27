import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function useCustomerProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['customer-profile', user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });
}

export function useCustomerSubscriptions() {
  const { data: customer } = useCustomerProfile();

  return useQuery({
    queryKey: ['customer-subscriptions', customer?.id],
    enabled: !!customer?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          plan:subscription_plans(*),
          addons:subscription_addons(*, addon:plan_addons(*))
        `)
        .eq('customer_id', customer!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useCustomerInvoices() {
  const { data: customer } = useCustomerProfile();

  return useQuery({
    queryKey: ['customer-invoices', customer?.id],
    enabled: !!customer?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          items:invoice_items(*)
        `)
        .eq('customer_id', customer!.id)
        .order('issue_date', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useCustomerTickets() {
  const { data: customer } = useCustomerProfile();

  return useQuery({
    queryKey: ['customer-tickets', customer?.id],
    enabled: !!customer?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('customer_id', customer!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useTicketMessages(ticketId: string | null) {
  return useQuery({
    queryKey: ['ticket-messages', ticketId],
    enabled: !!ticketId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ticket_messages')
        .select('*')
        .eq('ticket_id', ticketId!)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  const { data: customer } = useCustomerProfile();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: {
      subject: string;
      description: string;
      category?: string;
      priority?: string;
      subscription_id?: string;
    }) => {
      // Generate ticket number
      const { data: ticketNumber } = await supabase.rpc('generate_ticket_number');

      const { data: ticket, error } = await supabase
        .from('support_tickets')
        .insert({
          ticket_number: ticketNumber,
          customer_id: customer!.id,
          created_by: user!.id,
          subject: data.subject,
          description: data.description,
          category: data.category || null,
          priority: data.priority || 'medium',
          subscription_id: data.subscription_id || null,
          status: 'open',
        })
        .select()
        .single();

      if (error) throw error;
      return ticket;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-tickets'] });
      toast.success('Support ticket created');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create ticket');
    },
  });
}

export function useAddTicketMessage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: { ticketId: string; message: string }) => {
      const { error } = await supabase.from('ticket_messages').insert({
        ticket_id: data.ticketId,
        sender_id: user!.id,
        message: data.message,
        is_internal: false,
      });

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ticket-messages', variables.ticketId] });
      toast.success('Message sent');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send message');
    },
  });
}
