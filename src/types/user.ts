// src/types/user.ts

/**
 * تعريف نوع بيانات المستخدم بناءً على المعلومات التي نحتاجها.
 * يُستخدم هذا النوع لتخزين بيانات المستخدم في الجلسة.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}


// يمكن إضافة تعريف للبيانات التي يتم إرسالها للـ API
export interface LoginResponse {
    message: string;
    user: User;
}
