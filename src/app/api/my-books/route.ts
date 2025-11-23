import { NextRequest, NextResponse } from 'next/server';
import { books } from '../_data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '8');
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'title_asc';
  
  // محاكاة الحصول على المستخدم الحالي (في التطبيق الحقيقي يأتي من Session/JWT)
  const currentUserId = "1"; // Admin User

  // 1. Filter by current user's books only
  let myBooks = books.filter(book => book.authorId === currentUserId);

  // 2. Filter by search
  if (search) {
    myBooks = myBooks.filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 3. Sort
  myBooks.sort((a, b) => {
    switch (sortBy) {
      case 'title_asc':
        return a.title.localeCompare(b.title);
      case 'title_desc':
        return b.title.localeCompare(a.title);
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // 4. Pagination
  const totalBooks = myBooks.length;
  const totalPages = Math.ceil(totalBooks / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBooks = myBooks.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedBooks,
    totalPages,
    currentPage: page,
    totalBooks,
  });
}
