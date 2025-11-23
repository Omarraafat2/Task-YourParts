import { NextRequest, NextResponse } from "next/server";

// المسارات العامة (يمكن للضيف الوصول لها)
const PUBLIC_PATHS = ["/login"];

// API Paths المتعلقة بالـ Auth
const AUTH_API_PATHS = ["/api/auth/login", "/api/auth/logout"];

/**
 * التحقق من المصادقة من الكوكيز
 */
function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("auth_token")?.value;
  if (!token) return false;

  try {
    atob(token); // mock verification
    return true;
  } catch {
    return false;
  }
}

/**
 * @proxy — بديل middleware في Next.js 15+
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authenticated = isAuthenticated(request);
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isAuthApi = AUTH_API_PATHS.includes(pathname);

  // ⛔ السماح بمرور API الخاصة بالأوث (مهمة جداً)
  if (isAuthApi) return NextResponse.next();

  // 🔁 لو المستخدم logged in وحاول يدخل /login → نرجّعه على الكتب
  if (authenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔐 لو المستخدم مش logged in وحاول يدخل صفحة محمية → نرجّعه للـ login
  if (!authenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ كل شيء تمام → نسمح له يكمل
  return NextResponse.next();
}

/**
 * @matcher — لتحديد الصفحات التي ينطبق عليها الـ proxy
 */
export const config = {
  matcher: [
    "/books/:path*",
    "/my-books/:path*",
    "/profile/:path*",
    "/book/:path*",
    "/", // لو عاوز الهوم تكون محمية
    "/login", // مهم يتحط هنا
    "/api/:path*", // لو محتاج تمرير API حماية
  ],
};
