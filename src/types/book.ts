export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  author: string;
  category: string;
  thumbnail: string;
  authorId: string;
}

export interface BooksApiResponse {
  data: Book[];
  totalPages: number;
  currentPage: number;
  totalBooks: number;
}
