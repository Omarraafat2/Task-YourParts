import { NextRequest, NextResponse } from 'next/server';
import { books } from '../_data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';
  const sortBy = searchParams.get('sortBy') || 'title_asc';

  // 1. Filter by search
  let filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Filter by category
  if (category !== 'All') {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }

  // 3. Sort
  filteredBooks.sort((a, b) => {
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
  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedBooks,
    totalPages,
    currentPage: page,
    totalBooks,
  });
}




export async function POST(request: NextRequest) {
  const currentUserId = "1"; // من الـ session
  const body = await request.json();
  
  const newBook = {
    id: Date.now().toString(),
    ...body,
    author: "Admin User", // من الـ session
    authorId: currentUserId,
  };
  
  books.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}

