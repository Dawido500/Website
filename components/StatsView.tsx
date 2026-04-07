"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Eye,
  Users,
  Clock,
  MousePointerClick,
  ArrowUpRight,
} from "lucide-react";

/* ───── Types ───── */

interface StatsData {
  stats: {
    pageviews: number;
    visitors: number;
    visits: number;
    bounces: number;
    totaltime: number;
  };
  active: {
    visitors: number;
  };
  pageviews: {
    pageviews: { x: string; y: number }[];
    sessions: { x: string; y: number }[];
  };
  pages: { x: string; y: number }[];
  referrers: { x: string; y: number }[];
  browsers: { x: string; y: number }[];
  devices: { x: string; y: number }[];
}

type Period = "24h" | "7d" | "30d" | "90d";

const PERIOD_LABELS: Record<Period, string> = {
  "24h": "24 Stunden",
  "7d": "7 Tage",
  "30d": "30 Tage",
  "90d": "90 Tage",
};

/* ───── Stat Card ───── */

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: typeof Eye;
}) {
  return (
    <div className="rounded-xl border border-[#E0DDD6] bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
          <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-body text-[11px] uppercase tracking-wider text-text/50">
            {label}
          </p>
          <p className="font-heading text-xl text-dark">{value}</p>
        </div>
      </div>
    </div>
  );
}

/* ───── Mini Bar Chart ───── */

function BarChart({
  data,
  label,
}: {
  data: { x: string; y: number }[];
  label: string;
}) {
  const max = Math.max(...data.map((d) => d.y), 1);

  return (
    <div className="rounded-xl border border-[#E0DDD6] bg-white p-5">
      <h3 className="mb-4 font-body text-xs font-medium uppercase tracking-wider text-text/50">
        {label}
      </h3>
      <div className="flex items-end gap-[2px]" style={{ height: 120 }}>
        {data.map((d, i) => (
          <div
            key={i}
            className="group relative flex-1"
            style={{ height: "100%" }}
          >
            <div
              className="absolute bottom-0 w-full rounded-t bg-accent/70 transition-colors group-hover:bg-accent"
              style={{
                height: `${Math.max((d.y / max) * 100, 2)}%`,
              }}
            />
            {/* Tooltip */}
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-dark px-2 py-1 font-body text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {d.y}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── Metric Table ───── */

function MetricTable({
  title,
  data,
  icon: Icon,
}: {
  title: string;
  data: { x: string; y: number }[];
  icon: typeof Eye;
}) {
  const total = data.reduce((sum, d) => sum + d.y, 0) || 1;

  return (
    <div className="rounded-xl border border-[#E0DDD6] bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-text/40" strokeWidth={1.5} />
        <h3 className="font-body text-xs font-medium uppercase tracking-wider text-text/50">
          {title}
        </h3>
      </div>
      {data.length === 0 ? (
        <p className="font-body text-sm text-text/40">Keine Daten</p>
      ) : (
        <div className="space-y-2">
          {data.map((d, i) => (
            <div key={i}>
              <div className="flex items-center justify-between font-body text-sm">
                <span className="truncate text-dark">
                  {d.x || "(Direkt)"}
                </span>
                <span className="ml-2 flex-shrink-0 text-text/60">{d.y}</span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-warm">
                <div
                  className="h-full rounded-full bg-accent/40"
                  style={{ width: `${(d.y / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───── Main Component ───── */

export default function StatsView() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>("30d");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/stats?period=${period}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Fehler");
      }
      setData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    }
    setLoading(false);
  }, [period]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-body text-sm text-red-600">{error}</p>
        <button
          onClick={load}
          className="mt-3 font-body text-sm text-accent underline"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  if (!data) return null;

  const { stats, active, pageviews, pages, referrers, browsers, devices } = data;
  const avgTime = stats.visits
    ? Math.round(stats.totaltime / stats.visits)
    : 0;
  const bounceRate = stats.visits
    ? Math.round((stats.bounces / stats.visits) * 100)
    : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-[24px] text-dark">Statistiken</h1>
        <div className="flex gap-1 rounded-lg bg-warm p-1">
          {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-md px-3 py-1.5 font-body text-xs font-medium transition-colors ${
                period === p
                  ? "bg-white text-dark shadow-sm"
                  : "text-text/60 hover:text-dark"
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Seitenaufrufe"
          value={stats.pageviews.toLocaleString("de-DE")}
          icon={Eye}
        />
        <StatCard
          label="Besucher"
          value={stats.visitors.toLocaleString("de-DE")}
          icon={Users}
        />
        <StatCard
          label="Gerade online"
          value={active.visitors}
          icon={Users}
        />
        <StatCard
          label="Absprungrate"
          value={`${bounceRate}%`}
          icon={MousePointerClick}
        />
        <StatCard
          label="Verweildauer"
          value={`${Math.floor(avgTime / 60)}m ${avgTime % 60}s`}
          icon={Clock}
        />
      </div>

      {/* Pageviews Chart */}
      <div className="mb-6">
        <BarChart data={pageviews.pageviews} label="Seitenaufrufe" />
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <MetricTable title="Top Seiten" data={pages} icon={Eye} />
        <MetricTable
          title="Herkunft"
          data={referrers}
          icon={ArrowUpRight}
        />
        <MetricTable title="Browser" data={browsers} icon={MousePointerClick} />
        <MetricTable title="Geräte" data={devices} icon={Users} />
      </div>
    </div>
  );
}
