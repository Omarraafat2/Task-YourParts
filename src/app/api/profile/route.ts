import { NextRequest, NextResponse } from 'next/server';
import { users } from '../_users';

// GET - Get current user profile
export async function GET(request: NextRequest) {
  const currentUserId = "1"; // من الـ session
  const user = users.find(u => u.id === currentUserId);
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  
  return NextResponse.json(user);
}

// PUT - Update profile
export async function PUT(request: NextRequest) {
  const currentUserId = "1";
  const userIndex = users.findIndex(u => u.id === currentUserId);
  
  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  
  const body = await request.json();
  
  // Only allow name and email updates
  users[userIndex] = {
    ...users[userIndex],
    name: body.name || users[userIndex].name,
    email: body.email || users[userIndex].email,
  };
  
  return NextResponse.json(users[userIndex]);
}

