'use client';

import { BookForm } from '@/features/book-management/components/BookForm';
import { useBookActions } from '@/features/book-management/hooks/useBookActions';
import { BookFormData } from '@/lib/validators/bookSchema';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewBookPage() {
  const { createBook } = useBookActions();

  const handleSubmit = (data: BookFormData) => {
    createBook.mutate(data);
  };

  return (
    <div className="py-4 max-w-4xl mx-auto transition-colors duration-200">
      {/* Back Button */}
      <Link
        href="/my-books"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to My Books
      </Link>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-100 dark:border-gray-700 transition-colors">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Add New Book
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Fill in the details to create a new book
        </p>

        {/* Form */}
        <BookForm
          onSubmit={handleSubmit}
          isLoading={createBook.isPending}
        />

        {/* Error message */}
        {createBook.isError && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
            <p className="text-red-600 dark:text-red-300">
              {createBook.error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
