// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS } from '@/lib/constants';

async function setAuthCookie(user: { name: string; email: string }) {
  const token = btoa(JSON.stringify(user));
  const isProduction = process.env.NODE_ENV === 'production';
  const maxAge = 60 * 60 * 24 * 7; // 7 أيام

  let cookie = `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;

  if (isProduction) {
    cookie += '; Secure'; 
  }
  
  return cookie;
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const user = { name: 'Admin User', email: ADMIN_CREDENTIALS.email };
    
    const cookie = await setAuthCookie(user);

    const response = NextResponse.json({ message: 'Login successful', user }, { status: 200 });
    
    response.headers.set('Set-Cookie', cookie);
    
   
    
    return response;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}