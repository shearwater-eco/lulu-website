import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

export interface TimeEntry {
  id: string;
  task_id: string | null;
  project_id: string | null;
  user_id: string;
  description: string | null;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  billable: boolean;
  hourly_rate: number | null;
  invoiced: boolean;
  invoice_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface TimeEntryInsert {
  task_id?: string;
  project_id?: string;
  description?: string;
  start_time: string;
  end_time?: string;
  duration_minutes?: number;
  billable?: boolean;
  hourly_rate?: number;
}

export function useTimeEntries(projectId?: string, userId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: timeEntries = [], isLoading, error } = useQuery({
    queryKey: ['time-entries', projectId, userId],
    queryFn: async () => {
      let query = supabase
        .from('time_entries')
        .select('*')
        .order('start_time', { ascending: false });

      if (projectId) {
        query = query.eq('project_id', projectId);
      }
      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as TimeEntry[];
    },
    enabled: !!user,
  });

  const createTimeEntry = useMutation({
    mutationFn: async (entry: TimeEntryInsert) => {
      const { data, error } = await supabase
        .from('time_entries')
        .insert({ ...entry, user_id: user?.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['time-entries'] });
      toast.success('Time entry created');
    },
    onError: (error: Error) => {
      toast.error('Failed to create time entry: ' + error.message);
    },
  });

  const updateTimeEntry = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TimeEntry> & { id: string }) => {
      const { data, error } = await supabase
        .from('time_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['time-entries'] });
      toast.success('Time entry updated');
    },
    onError: (error: Error) => {
      toast.error('Failed to update time entry: ' + error.message);
    },
  });

  const deleteTimeEntry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('time_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['time-entries'] });
      toast.success('Time entry deleted');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete time entry: ' + error.message);
    },
  });

  // Calculate totals
  const totalMinutes = timeEntries.reduce((acc, entry) => acc + (entry.duration_minutes || 0), 0);
  const billableMinutes = timeEntries
    .filter(e => e.billable)
    .reduce((acc, entry) => acc + (entry.duration_minutes || 0), 0);
  const totalBillable = timeEntries
    .filter(e => e.billable && e.hourly_rate)
    .reduce((acc, entry) => acc + ((entry.duration_minutes || 0) / 60) * (entry.hourly_rate || 0), 0);

  return {
    timeEntries,
    isLoading,
    error,
    createTimeEntry,
    updateTimeEntry,
    deleteTimeEntry,
    totalMinutes,
    billableMinutes,
    totalBillable,
  };
}

// Hook for active timer
export function useTimer() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Check for active timer on mount
  useEffect(() => {
    const checkActiveTimer = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .eq('user_id', user.id)
        .is('end_time', null)
        .order('start_time', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setActiveEntry(data as TimeEntry);
        const startTime = new Date(data.start_time).getTime();
        const now = Date.now();
        setElapsedSeconds(Math.floor((now - startTime) / 1000));
      }
    };

    checkActiveTimer();
  }, [user]);

  // Update elapsed time every second
  useEffect(() => {
    if (!activeEntry) return;

    const interval = setInterval(() => {
      const startTime = new Date(activeEntry.start_time).getTime();
      const now = Date.now();
      setElapsedSeconds(Math.floor((now - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeEntry]);

  const startTimer = useCallback(async (options: {
    projectId?: string;
    taskId?: string;
    description?: string;
    hourlyRate?: number;
    billable?: boolean;
  } = {}) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('time_entries')
      .insert({
        user_id: user.id,
        project_id: options.projectId,
        task_id: options.taskId,
        description: options.description,
        start_time: new Date().toISOString(),
        hourly_rate: options.hourlyRate,
        billable: options.billable ?? true,
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to start timer: ' + error.message);
      return;
    }

    setActiveEntry(data as TimeEntry);
    setElapsedSeconds(0);
    toast.success('Timer started');
    queryClient.invalidateQueries({ queryKey: ['time-entries'] });
  }, [user, queryClient]);

  const stopTimer = useCallback(async () => {
    if (!activeEntry) return;

    const endTime = new Date();
    const startTime = new Date(activeEntry.start_time);
    const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);

    const { error } = await supabase
      .from('time_entries')
      .update({
        end_time: endTime.toISOString(),
        duration_minutes: durationMinutes,
      })
      .eq('id', activeEntry.id);

    if (error) {
      toast.error('Failed to stop timer: ' + error.message);
      return;
    }

    setActiveEntry(null);
    setElapsedSeconds(0);
    toast.success(`Timer stopped: ${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`);
    queryClient.invalidateQueries({ queryKey: ['time-entries'] });
  }, [activeEntry, queryClient]);

  const formatElapsedTime = useCallback(() => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [elapsedSeconds]);

  return {
    activeEntry,
    elapsedSeconds,
    isRunning: !!activeEntry,
    startTimer,
    stopTimer,
    formatElapsedTime,
  };
}
