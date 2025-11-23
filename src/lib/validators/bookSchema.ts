import { z } from 'zod';

export const bookCategories = ['Technology', 'Science', 'History', 'Fantasy', 'Biography'] as const;

export const bookSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  price: z.number()
    .min(0, 'Price must be positive')
    .max(1000, 'Price must be less than 1000'),
  category: z.enum(['Technology', 'Science', 'History', 'Fantasy', 'Biography']),
  thumbnail: z.string()
    .url('Please enter a valid image URL')
    .min(1, 'Thumbnail is required'),
});

export type BookFormData = z.infer<typeof bookSchema>;
