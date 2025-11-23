import { useQuery } from '@tanstack/react-query';
import { BooksApiResponse } from '@/types/book';

interface BooksQueryParams {
    page: number;
    limit: number;
    search: string;
    category?: string;
    sortBy: string;
    endpoint?: 'books' | 'my-books';
}

const fetchBooks = async (params: BooksQueryParams): Promise<BooksApiResponse> => {
    const { endpoint = 'books', ...queryParams } = params;
    
    const queryString = new URLSearchParams(
        Object.entries(queryParams).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== '') {
                acc[key] = value.toString();
            }
            return acc;
        }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`/api/${endpoint}?${queryString}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
    }
    return response.json();
};

export const useBooksQuery = (params: BooksQueryParams) => {
    const endpoint = params.endpoint || 'books';
    
    return useQuery({
        queryKey: [endpoint, params],
        queryFn: () => fetchBooks(params),
    });
};

export const useMyBooksQuery = (
    params: Omit<BooksQueryParams, 'category' | 'endpoint'>
) => {
    return useBooksQuery({
        ...params,
        endpoint: 'my-books',
    });
};
