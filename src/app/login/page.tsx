// src/app/login/page.tsx
import { LoginForm } from '@/features/auth/components/LoginForm';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/features/auth/utils/auth';

export default async function LoginPage() {
  const user = await getSessionUser(); 

  // إذا كان المستخدم مصادقًا، قم بتحويله
  if (user) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <LoginForm />
    </div>
  );
}