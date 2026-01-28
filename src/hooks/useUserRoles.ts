import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'admin' | 'manager' | 'staff' | 'user';

interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
}

export function useUserRoles(userId?: string | null) {
  const resolvedUserId = userId ?? null;
  
  const {
    data: roles = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user-roles', resolvedUserId],
    queryFn: async () => {
      if (!resolvedUserId) return [];
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', resolvedUserId);
      
      if (error) throw error;
      return data as unknown as UserRole[];
    },
    enabled: !!resolvedUserId,
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
    isFetching,
    isError,
    error,
    hasRole,
    isAdmin,
    isManager,
    isStaff,
    refetch,
  };
}
