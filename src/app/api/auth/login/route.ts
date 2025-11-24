// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS } from '@/lib/constants';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const user = { 
      name: 'Admin User', 
      email: ADMIN_CREDENTIALS.email,
      role: 'admin' 
    };
    
    const token = btoa(JSON.stringify(user));

    const response = NextResponse.json({ 
      message: 'Login successful', 
      user 
    }, { status: 200 });
    
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return response;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}