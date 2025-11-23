'use client';

import { useQuery } from '@tanstack/react-query';
import { BookForm } from '@/features/book-management/components/BookForm';
import { useBookActions } from '@/features/book-management/hooks/useBookActions';
import { LoadingErrorState } from '@/components/common/LoadingErrorState';
import { BookFormData } from '@/lib/validators/bookSchema';
import { Book } from '@/types/book';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

type EditBookPageParams = {
  id: string;
};
export default function EditBookPage({
  params,
}: {
  params: EditBookPageParams | Promise<EditBookPageParams>;
}) {
  const unwrappedParams = use(params as Promise<EditBookPageParams>);
  const { id } = unwrappedParams;  const { updateBook } = useBookActions();
  const currentUserId = "1";

  const { data: book, isLoading, isError } = useQuery<Book>({
    queryKey: ['book', id],
    queryFn: async () => {
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) throw new Error('Book not found');
      return response.json();
    },
  });

  const handleSubmit = (data: BookFormData) => {
    updateBook.mutate({ id, data });
  };

  if (isLoading) {
    return <LoadingErrorState status="loading" message="Loading book..." />;
  }

  if (isError || !book) {
    return <LoadingErrorState status="error" message="Book not found" />;
  }

  // Check if user is the author
  if (book.authorId !== currentUserId) {
    return (
      <div className="py-4 max-w-4xl mx-auto transition-colors duration-200">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-300 text-lg font-medium">
            You don't have permission to edit this book
          </p>
          <Link href="/my-books" className="text-indigo-600 hover:underline mt-4 inline-block">
            Go to My Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-4xl mx-auto transition-colors duration-200">
      <Link
        href={`/book/${id}`}
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Book Details
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-100 dark:border-gray-700 transition-colors">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Edit Book</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Update the details of your book</p>

        <BookForm
          initialData={book}
          onSubmit={handleSubmit}
          isLoading={updateBook.isPending}
        />

        {updateBook.isError && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
            <p className="text-red-600 dark:text-red-300">{updateBook.error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
