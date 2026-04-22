import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";
import { adminAuth } from "./admin-auth";
import { SESSION_COOKIE } from "./session-cookie";

export { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "./session-cookie";

export async function getCurrentUser(): Promise<DecodedIdToken | null> {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  try {
    return await adminAuth.verifySessionCookie(cookie, true);
  } catch {
    return null;
  }
}
