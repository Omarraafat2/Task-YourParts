import { NextRequest, NextResponse } from 'next/server';
import { books } from '../../_data';

// GET - Get single book
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  
  return NextResponse.json(book);
}

// PUT - Update book
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const currentUserId = "1"; // من الـ session
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  
  // Check if user is the author
  if (books[bookIndex].authorId !== currentUserId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  const body = await request.json();
  books[bookIndex] = {
    ...books[bookIndex],
    ...body,
    id: id, // Keep same ID
    authorId: currentUserId, // Keep same author
  };
  
  return NextResponse.json(books[bookIndex]);
}

// DELETE - Delete book
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const currentUserId = "1";
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  
  if (books[bookIndex].authorId !== currentUserId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  books.splice(bookIndex, 1);
  return NextResponse.json({ success: true });
}
