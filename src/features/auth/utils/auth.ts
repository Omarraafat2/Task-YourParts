// src/features/auth/utils/auth.ts
import { cookies } from 'next/headers';
import { User } from '@/types/user'; 

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = cookies();
  const token =  (await cookieStore).get('auth_token')?.value;

  if (!token) {
    return null;
  }

  try {
    const userString = atob(token);
    const user = JSON.parse(userString) as User;
    return user;
  } catch (error) {
    // إذا كان التوكن غير صالح
    return null;
  }
}