import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Company {
  id: string;
  name: string;
  industry: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  employee_count: string | null;
  annual_revenue: number | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Contact {
  id: string;
  company_id: string | null;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  job_title: string | null;
  department: string | null;
  linkedin_url: string | null;
  lead_score: number;
  lead_status: string;
  lead_source: string | null;
  notes: string | null;
  is_active: boolean;
  owner_id: string | null;
  created_at: string;
  company?: Company;
}

export interface Pipeline {
  id: string;
  name: string;
  type: string;
  description: string | null;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  stages?: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  pipeline_id: string;
  name: string;
  position: number;
  probability: number;
  color: string;
  is_won: boolean;
  is_lost: boolean;
}

export interface Deal {
  id: string;
  pipeline_id: string;
  stage_id: string;
  contact_id: string | null;
  company_id: string | null;
  name: string;
  value: number;
  currency: string;
  expected_close_date: string | null;
  actual_close_date: string | null;
  probability: number | null;
  owner_id: string | null;
  notes: string | null;
  lost_reason: string | null;
  position: number;
  created_at: string;
  contact?: Contact;
  company?: Company;
  stage?: PipelineStage;
}

export interface DealActivity {
  id: string;
  deal_id: string;
  type: string;
  subject: string | null;
  description: string | null;
  due_date: string | null;
  completed_at: string | null;
  created_by: string | null;
  created_at: string;
}

// Companies Hook
export function useCompanies() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');
      if (error) throw error;
      return data as Company[];
    },
    enabled: !!user,
  });

  const createCompany = useMutation({
    mutationFn: async (company: Partial<Company>) => {
      const { data, error } = await supabase
        .from('companies')
        .insert({
          name: company.name!,
          industry: company.industry,
          website: company.website,
          phone: company.phone,
          email: company.email,
          address: company.address,
          city: company.city,
          country: company.country,
          employee_count: company.employee_count,
          annual_revenue: company.annual_revenue,
          notes: company.notes,
          is_active: company.is_active ?? true,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Company created');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateCompany = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Company> & { id: string }) => {
      const { data, error } = await supabase
        .from('companies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Company updated');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteCompany = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('companies').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Company deleted');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { companies, isLoading, createCompany, updateCompany, deleteCompany };
}

// Contacts Hook
export function useContacts() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*, company:companies(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Contact[];
    },
    enabled: !!user,
  });

  const createContact = useMutation({
    mutationFn: async (contact: Partial<Contact>) => {
      const { data, error } = await supabase
        .from('contacts')
        .insert({
          first_name: contact.first_name!,
          last_name: contact.last_name,
          company_id: contact.company_id,
          email: contact.email,
          phone: contact.phone,
          job_title: contact.job_title,
          department: contact.department,
          linkedin_url: contact.linkedin_url,
          lead_status: contact.lead_status ?? 'new',
          lead_source: contact.lead_source,
          notes: contact.notes,
          is_active: contact.is_active ?? true,
          owner_id: user?.id,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact created');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateContact = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Contact> & { id: string }) => {
      const { data, error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact updated');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteContact = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact deleted');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { contacts, isLoading, createContact, updateContact, deleteContact };
}

// Pipelines Hook
export function usePipelines() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: pipelines = [], isLoading } = useQuery({
    queryKey: ['pipelines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_pipelines')
        .select('*, stages:pipeline_stages(*)')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return (data as Pipeline[]).map(p => ({
        ...p,
        stages: p.stages?.sort((a, b) => a.position - b.position),
      }));
    },
    enabled: !!user,
  });

  const createPipeline = useMutation({
    mutationFn: async (pipeline: Partial<Pipeline>) => {
      const { data, error } = await supabase
        .from('sales_pipelines')
        .insert({
          name: pipeline.name!,
          type: pipeline.type ?? 'custom',
          description: pipeline.description,
          is_default: pipeline.is_default ?? false,
          is_active: pipeline.is_active ?? true,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipelines'] });
      toast.success('Pipeline created');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { pipelines, isLoading, createPipeline };
}

// Deals Hook
export function useDeals(pipelineId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: deals = [], isLoading } = useQuery({
    queryKey: ['deals', pipelineId],
    queryFn: async () => {
      let query = supabase
        .from('deals')
        .select('*, contact:contacts(*), company:companies(*), stage:pipeline_stages(*)')
        .order('position');
      
      if (pipelineId) {
        query = query.eq('pipeline_id', pipelineId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Deal[];
    },
    enabled: !!user,
  });

  const createDeal = useMutation({
    mutationFn: async (deal: Partial<Deal>) => {
      const { data, error } = await supabase
        .from('deals')
        .insert({
          name: deal.name!,
          pipeline_id: deal.pipeline_id!,
          stage_id: deal.stage_id!,
          contact_id: deal.contact_id,
          company_id: deal.company_id,
          value: deal.value ?? 0,
          currency: deal.currency ?? 'GBP',
          expected_close_date: deal.expected_close_date,
          notes: deal.notes,
          owner_id: user?.id,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      toast.success('Deal created');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateDeal = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Deal> & { id: string }) => {
      const { data, error } = await supabase
        .from('deals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteDeal = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('deals').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      toast.success('Deal deleted');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const moveDeal = useMutation({
    mutationFn: async ({ dealId, stageId, position }: { dealId: string; stageId: string; position: number }) => {
      const { error } = await supabase
        .from('deals')
        .update({ stage_id: stageId, position })
        .eq('id', dealId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { deals, isLoading, createDeal, updateDeal, deleteDeal, moveDeal };
}

// Deal Activities Hook
export function useDealActivities(dealId: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['deal-activities', dealId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deal_activities')
        .select('*')
        .eq('deal_id', dealId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as DealActivity[];
    },
    enabled: !!user && !!dealId,
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Partial<DealActivity>) => {
      const { data, error } = await supabase
        .from('deal_activities')
        .insert({
          deal_id: dealId,
          type: activity.type!,
          subject: activity.subject,
          description: activity.description,
          due_date: activity.due_date,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deal-activities', dealId] });
      toast.success('Activity added');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { activities, isLoading, createActivity };
}
