import { Book } from "@/types/book";

export const ADMIN_CREDENTIALS = {
  email: 'admin@books.com',
  password: 'admin123',
};

export const BOOK_CATEGORIES = [
  'Technology', 
  'Science', 
  'History', 
  'Fantasy', 
  'Biography'
] as const;


export const ADMIN_USER_ID = 'user-admin-123'; 

// بيانات وهمية للكتب (Book[])
export const MOCK_BOOKS: Book[] = [
  { id: 'b1', title: 'The Future of AI', description: '...', price: 35.99, thumbnail: '/assets/1.jpg', author: 'Admin User', category: 'Technology', authorId: ADMIN_USER_ID },
  { id: 'b2', title: 'Cosmic Wonders', description: '...', price: 45.00, thumbnail: '/assets/2.jpg', author: 'Carl Sagan', category: 'Science', authorId: 'u2' },
  { id: 'b3', title: 'The Great War', description: '...', price: 22.50, thumbnail: '/assets/3.jpg', author: 'Historian John', category: 'History', authorId: 'u3' },
  { id: 'b4', title: 'Shadows of Eldoria', description: '...', price: 19.99, thumbnail: '/assets/4.jpg', author: 'Admin User', category: 'Fantasy', authorId: ADMIN_USER_ID },
  { id: 'b5', title: 'Learning React Query', description: '...', price: 55.00, thumbnail: '/assets/5.jpg', author: 'Tech Guy', category: 'Technology', authorId: 'u4' },
  { id: 'b6', title: 'History of Egypt', description: '...', price: 30.00, thumbnail: '/assets/6.jpg', author: 'Dr. Zahi', category: 'History', authorId: 'u5' },
  { id: 'b7', title: 'Star Trek Guide', description: '...', price: 15.00, thumbnail: '/assets/7.jpg', author: 'Sci-Fi Fan', category: 'Science', authorId: 'u6' },
  { id: 'b8', title: 'Cyber Security Basics', description: '...', price: 60.00, thumbnail: '/assets/8.jpg', author: 'Admin User', category: 'Technology', authorId: ADMIN_USER_ID },
  { id: 'b9', title: 'Bio-Engineering', description: '...', price: 40.00, thumbnail: '/assets/9.jpg', author: 'A. Smith', category: 'Science', authorId: 'u7' },
  { id: 'b10', title: 'The Last Dragon', description: '...', price: 12.00, thumbnail: '/assets/10.jpg', author: 'E. George', category: 'Fantasy', authorId: 'u8' },
];