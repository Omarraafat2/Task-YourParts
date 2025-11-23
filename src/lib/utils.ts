// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// هذه هي الدالة الأساسية لدمج كلاسات TailwindCSS بأمان
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ⚠️ ستحتاج إلى تثبيت هذه الحزم:
// npm install clsx tailwind-merge