// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });

  // ✅ امسح الـ cookie
  response.cookies.delete('auth_token');

  return response;
}