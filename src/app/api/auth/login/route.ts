// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS } from '@/lib/constants';

async function setAuthCookie(user: { name: string; email: string }) {
  // هنا يمكن استخدام مكتبة مثل 'next-auth' أو 'iron-session'
  // لكن للتبسيط، سنقوم بمحاكاة منطق المصادقة
  // في بيئة الإنتاج، يجب أن تكون هذه عملية تعيين ملف تعريف ارتباط آمن (Secure, HttpOnly)
  // كود المصادقة الفعلي سيكون معقدًا، لذا نستخدم منطق بسيط:
  const token = btoa(JSON.stringify(user));
  return `auth_token=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}`; // 7 أيام
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const user = { name: 'Admin User', email: ADMIN_CREDENTIALS.email };
    
    // إنشاء ملف تعريف ارتباط لتعيين الجلسة
    const cookie = await setAuthCookie(user);

    const response = NextResponse.json({ message: 'Login successful', user }, { status: 200 });
    
    // إرسال ملف تعريف الارتباط في رأس الاستجابة
    response.headers.set('Set-Cookie', cookie);
    
    return response;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}