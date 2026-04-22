import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin-auth";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/firebase/session";

export async function POST(request: Request) {
  const { idToken } = (await request.json()) as { idToken?: string };
  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
  }

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_SECONDS * 1000,
    });
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: SESSION_COOKIE,
      value: sessionCookie,
      maxAge: SESSION_MAX_AGE_SECONDS,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return response;
}
