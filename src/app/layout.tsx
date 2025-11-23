import './globals.css';
import { Navbar } from '@/components/layouts/Navbar';
import { getSessionUser } from '@/features/auth/utils/auth';
import { QueryProvider } from '@/components/layouts/QueryProvider'; // ⬅️ إضافة
import { Toaster } from '@/components/ui/Toaster';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser(); 

  return (
    <html lang="en" data-theme="light">
<body className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
  <QueryProvider>
    <Navbar />
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 transition-colors px-3">
      {children}
      <Toaster />
    </main>
  </QueryProvider>
</body>

    </html>
  );
}