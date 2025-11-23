import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookFormData } from '@/lib/validators/bookSchema';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/toast';

export const useBookActions = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Create Book
  const createBook = useMutation({
    mutationFn: async (data: BookFormData) => {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create book');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-books'] });
            showToast.success('Book created successfully! 📚');

      router.push('/my-books');
    },
  });

  // Update Book
  const updateBook = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BookFormData }) => {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update book');
      }
      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['my-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['book',variables.id] });
      showToast.success('Book updated successfully! ✏️');

      router.back();
    },
  });

  // Delete Book
  const deleteBook = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete book');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
            showToast.success('Book deleted successfully! 🗑️');

    },
  });

  return {
    createBook,
    updateBook,
    deleteBook,
  };
};