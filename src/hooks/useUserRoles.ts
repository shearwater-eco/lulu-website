import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

type AppRole = 'admin' | 'manager' | 'staff' | 'user';

interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
}

export function useUserRoles() {
  const { user } = useAuth();
  
  const { data: roles = [], isLoading, refetch } = useQuery({
    queryKey: ['user-roles', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as unknown as UserRole[];
    },
    enabled: !!user?.id,
  });

  const hasRole = (role: AppRole): boolean => {
    return roles.some(r => r.role === role);
  };

  const isAdmin = hasRole('admin');
  const isManager = hasRole('manager') || isAdmin;
  const isStaff = hasRole('staff') || isManager;

  return {
    roles,
    isLoading,
    hasRole,
    isAdmin,
    isManager,
    isStaff,
    refetch,
  };
}
