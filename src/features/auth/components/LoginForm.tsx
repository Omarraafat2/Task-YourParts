'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { loginSchema, type LoginFormData } from '@/lib/validators/authSchema';
import { useState } from 'react';
import { showToast } from '@/lib/toast';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
          credentials: 'include',   

      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.message || 'Invalid credentials.');
        return;
      }
      showToast.success('Welcome back! 👋');

   router.replace('/');
router.refresh();
    } catch {
      setError('Unexpected error occurred.');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto  p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
        Welcome Back 👋
      </h2>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
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

        <Button type="submit" className="w-full h-11" isLoading={isSubmitting}>
          {isSubmitting ? 'Logging In...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
