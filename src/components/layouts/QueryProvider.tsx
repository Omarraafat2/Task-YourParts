// src/components/layouts/QueryProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, FC, ReactNode } from 'react';

interface QueryProviderProps {
    children: ReactNode;
}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 دقائق
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools is optional but recommended for debugging */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};