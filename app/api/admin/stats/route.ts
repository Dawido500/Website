import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

const UMAMI_API = process.env.UMAMI_API_URL || "http://umami:3000";
const UMAMI_USER = process.env.UMAMI_USERNAME || "admin";
const UMAMI_PASS = process.env.UMAMI_PASSWORD || "umami";
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";

async function getUmamiToken(): Promise<string | null> {
  try {
    const res = await fetch(`${UMAMI_API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: UMAMI_USER, password: UMAMI_PASS }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.token;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const token = await getUmamiToken();
  if (!token) {
    return NextResponse.json(
      { error: "Umami nicht erreichbar" },
      { status: 502 }
    );
  }

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "30d";

  // Calculate date range
  const now = new Date();
  let startAt: number;
  switch (period) {
    case "24h":
      startAt = now.getTime() - 24 * 60 * 60 * 1000;
      break;
    case "7d":
      startAt = now.getTime() - 7 * 24 * 60 * 60 * 1000;
      break;
    case "30d":
      startAt = now.getTime() - 30 * 24 * 60 * 60 * 1000;
      break;
    case "90d":
      startAt = now.getTime() - 90 * 24 * 60 * 60 * 1000;
      break;
    default:
      startAt = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  }
  const endAt = now.getTime();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const qs = `startAt=${startAt}&endAt=${endAt}`;

  try {
    const [statsRes, pageviewsRes, pagesRes, referrersRes, browsersRes, devicesRes] =
      await Promise.all([
        fetch(`${UMAMI_API}/api/websites/${WEBSITE_ID}/stats?${qs}`, { headers }),
        fetch(
          `${UMAMI_API}/api/websites/${WEBSITE_ID}/pageviews?${qs}&unit=${
            period === "24h" ? "hour" : "day"
          }`,
          { headers }
        ),
        fetch(
          `${UMAMI_API}/api/websites/${WEBSITE_ID}/metrics?${qs}&type=url`,
          { headers }
        ),
        fetch(
          `${UMAMI_API}/api/websites/${WEBSITE_ID}/metrics?${qs}&type=referrer`,
          { headers }
        ),
        fetch(
          `${UMAMI_API}/api/websites/${WEBSITE_ID}/metrics?${qs}&type=browser`,
          { headers }
        ),
        fetch(
          `${UMAMI_API}/api/websites/${WEBSITE_ID}/metrics?${qs}&type=device`,
          { headers }
        ),
      ]);

    const [stats, pageviews, pages, referrers, browsers, devices] =
      await Promise.all([
        statsRes.json(),
        pageviewsRes.json(),
        pagesRes.json(),
        referrersRes.json(),
        browsersRes.json(),
        devicesRes.json(),
      ]);

    return NextResponse.json({
      stats,
      pageviews,
      pages: (pages as { x: string; y: number }[]).slice(0, 10),
      referrers: (referrers as { x: string; y: number }[]).slice(0, 10),
      browsers: (browsers as { x: string; y: number }[]).slice(0, 5),
      devices: (devices as { x: string; y: number }[]).slice(0, 5),
    });
  } catch {
    return NextResponse.json(
      { error: "Fehler beim Abrufen der Statistiken" },
      { status: 500 }
    );
  }
}
