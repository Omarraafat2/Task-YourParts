// src/app/login/page.tsx
'use client';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { useEffect } from 'react';
import { showToast } from '@/lib/toast';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get('loggedOut');

  useEffect(() => {
    if (loggedOut === 'true') {
      showToast.success('Logged out successfully! 👋');
    }
  }, [loggedOut]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors">
      <LoginForm />
    </div>
  );
}