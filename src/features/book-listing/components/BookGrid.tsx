// src/features/book-listing/components/BookGrid.tsx
import { ReactNode } from 'react';

interface BookGridProps {
  children: ReactNode;
}

export function BookGrid({ children }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  );
}