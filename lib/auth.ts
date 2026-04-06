import { createHash } from "crypto";
import { NextRequest } from "next/server";

export function generateToken(): string {
  const username = process.env.ADMIN_USERNAME ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  const salt = process.env.ADMIN_TOKEN_SALT ?? "obitko-static-salt";
  return createHash("sha256").update(username + password + salt).digest("hex");
}

export function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get("admin-token")?.value;
  return token === generateToken();
}
