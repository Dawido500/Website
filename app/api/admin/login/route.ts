import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const correctUser = process.env.ADMIN_USERNAME ?? "";
  const correctPass = process.env.ADMIN_PASSWORD ?? "";

  if (!username || !password || username !== correctUser || password !== correctPass) {
    return NextResponse.json({ error: "Ungültige Anmeldedaten" }, { status: 401 });
  }

  const token = generateToken();

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin-token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}
