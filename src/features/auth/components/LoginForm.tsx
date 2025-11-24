// src/features/auth/components/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { loginSchema, type LoginFormData } from '@/lib/validators/authSchema';
import { useState } from 'react';
import { showToast } from '@/lib/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Invalid credentials');
        showToast.error(result.message || 'Login failed');
        setIsLoading(false);
        return;
      }
      
      // ✅ الحل السحري: حدّث الـ cache وخلي React Query يعمل refetch
      queryClient.setQueryData(['profile'], result.user);
      
      // ✅ أو استخدم invalidateQueries عشان يعمل refetch تلقائي
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      
      showToast.success('Welcome back! 👋');

      // ✅ استخدم router.push (client-side navigation)
      router.push('/');
      
      // ✅ اعمل refresh للـ server components
      router.refresh();
      
    } catch (err) {
      setError('Unexpected error occurred');
      showToast.error('Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
        Welcome Back 👋
      </h2>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="admin@books.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="admin123"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button 
          type="submit" 
          className="w-full h-11" 
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Logging In...' : 'Login'}
        </Button>
      </form>

    </div>
  );
}