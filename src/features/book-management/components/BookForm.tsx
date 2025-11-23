'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, BookFormData, bookCategories } from '@/lib/validators/bookSchema';
import { Book } from '@/types/book';

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: BookFormData) => void;
  isLoading?: boolean;
}

export function BookForm({ initialData, onSubmit, isLoading }: BookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          price: initialData.price,
          category: initialData.category as any,
          thumbnail: initialData.thumbnail,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl transition-colors">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title *
        </label>
        <input
          {...register('title')}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                     rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          placeholder="Enter book title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Description *
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                     rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          placeholder="Enter book description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
        )}
      </div>

      {/* Price & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price ($) *
          </label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          >
            <option value="">Select a category</option>
            {bookCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* Thumbnail URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Thumbnail URL *
        </label>
        <input
          {...register('thumbnail')}
          type="url"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                     rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          placeholder="https://images.unsplash.com/..."
        />
        {errors.thumbnail && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.thumbnail.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg 
                   hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Book' : 'Create Book'}
      </button>
    </form>
  );
}
