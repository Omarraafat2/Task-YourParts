import { cookies } from "next/headers";
import { User } from "@/types/user";

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = cookies();   // ← NOT async  
  const cookie = (await cookieStore).get("auth_token");

  if (!cookie) return null;

  try {
    const decoded = Buffer.from(cookie.value, "base64").toString("utf8");
    return JSON.parse(decoded) as User;
  } catch {
    return null;
  }
}
