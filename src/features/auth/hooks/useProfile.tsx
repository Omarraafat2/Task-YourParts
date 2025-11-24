// src/features/auth/hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { ProfileFormData } from '@/lib/validators/profileSchema';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/toast';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const profile = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await fetch('/api/profile', {
        credentials: 'include',
        // ✅ مهم: disable cache للـ fetch
        cache: 'no-store'
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
    retry: false,
    // ✅ اعمل refetch لما اليوزر يرجع للتاب
    refetchOnWindowFocus: true,
    // ✅ اعمل refetch لما يعمل mount
    refetchOnMount: 'always',
    // ✅ ميحفظش الـ data في الـ cache لفترة طويلة
    staleTime: 0,
  });

  const updateProfile = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      showToast.success('Profile updated successfully! 👤');
      router.push('/profile');
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Logout failed');
      return response.json();
    },
    onSuccess: async () => {
      // ✅ امسح كل الـ cache
      queryClient.clear();
      
      showToast.success('Logged out successfully! 👋');
      
      // ✅ استخدم router.push (client-side navigation)
      router.push('/login');
      
      // ✅ اعمل refresh للـ server components
      router.refresh();
    },
    onError: (error: Error) => {
      showToast.error(error.message);
      router.push('/login');
    },
  });

  return {
    profile,
    updateProfile,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};