export const dynamic = "force-dynamic";
import { LoginForm } from '@/features/auth/components/LoginForm';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/features/auth/utils/auth';

export default async function LoginPage() {
  const user = await getSessionUser(); 

  if (user) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <LoginForm />
    </div>
  );
}