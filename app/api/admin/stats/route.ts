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
  };

  const qs = `startAt=${startAt}&endAt=${endAt}`;
  const base = `${UMAMI_API}/api/websites/${WEBSITE_ID}`;

  try {
    // Umami v3 API: stats returns flat values, metrics uses type= with
    // valid types: referrer, browser, os, device, country, entry, exit, title, language, screen, event
    // Note: "url" and "page" are NOT valid in v3 — use "entry" for top pages
    const [statsRes, pageviewsRes, hourlyRes, pagesRes, referrersRes, browsersRes, devicesRes, countriesRes, osRes, activeRes] =
      await Promise.all([
        fetch(`${base}/stats?${qs}`, { headers }),
        fetch(`${base}/pageviews?${qs}&unit=${period === "24h" ? "hour" : "day"}`, { headers }),
        // Always fetch hourly data for the "Besucherzeit" chart
        fetch(`${base}/pageviews?${qs}&unit=hour`, { headers }),
        fetch(`${base}/metrics?${qs}&type=entry`, { headers }),
        fetch(`${base}/metrics?${qs}&type=referrer`, { headers }),
        fetch(`${base}/metrics?${qs}&type=browser`, { headers }),
        fetch(`${base}/metrics?${qs}&type=device`, { headers }),
        fetch(`${base}/metrics?${qs}&type=country`, { headers }),
        fetch(`${base}/metrics?${qs}&type=os`, { headers }),
        fetch(`${base}/active`, { headers }),
      ]);

    const [stats, pageviews, hourlyRaw, pages, referrers, browsers, devices, countries, os, active] =
      await Promise.all([
        statsRes.ok ? statsRes.json() : { pageviews: 0, visitors: 0, visits: 0, bounces: 0, totaltime: 0 },
        pageviewsRes.ok ? pageviewsRes.json() : { pageviews: [], sessions: [] },
        hourlyRes.ok ? hourlyRes.json() : { pageviews: [], sessions: [] },
        pagesRes.ok ? pagesRes.json() : [],
        referrersRes.ok ? referrersRes.json() : [],
        browsersRes.ok ? browsersRes.json() : [],
        devicesRes.ok ? devicesRes.json() : [],
        countriesRes.ok ? countriesRes.json() : [],
        osRes.ok ? osRes.json() : [],
        activeRes.ok ? activeRes.json() : { visitors: 0 },
      ]);

    // Aggregate hourly data into hours-of-day (0-23)
    const hourlyAgg: number[] = new Array(24).fill(0);
    for (const entry of (hourlyRaw as { pageviews: { x: string; y: number }[] }).pageviews) {
      const hour = new Date(entry.x).getHours();
      hourlyAgg[hour] += entry.y;
    }
    const hourlyByTime = hourlyAgg.map((y, h) => ({ x: `${h}:00`, y }));

    return NextResponse.json({
      stats,
      active,
      pageviews,
      hourlyByTime,
      pages: (pages as { x: string; y: number }[]).slice(0, 10),
      referrers: (referrers as { x: string; y: number }[]).slice(0, 10),
      browsers: (browsers as { x: string; y: number }[]).slice(0, 5),
      devices: (devices as { x: string; y: number }[]).slice(0, 5),
      countries: (countries as { x: string; y: number }[]).slice(0, 10),
      os: (os as { x: string; y: number }[]).slice(0, 5),
    });
  } catch (e) {
    console.error("Stats API error:", e);
    return NextResponse.json(
      { error: "Fehler beim Abrufen der Statistiken" },
      { status: 500 }
    );
  }
}
