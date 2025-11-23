import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { ProfileFormData } from '@/lib/validators/profileSchema';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/toast';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Get profile
  const profile = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await fetch('/api/profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
  });

  // Update profile
  const updateProfile = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Logout failed');
      return response.json();
    },
    onSuccess: () => {
      // امسح كل الـ cache
      queryClient.clear();
      
      showToast.success('Logged out successfully! 👋');
      router.push('/login');
      router.refresh();
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });

  return {
    profile,
    updateProfile,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};