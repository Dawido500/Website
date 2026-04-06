"use client";

import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import ReferenzFormular from "@/components/ReferenzFormular";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  Mail,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
} from "lucide-react";

/* ───── Types ───── */

interface Referenz {
  id: string;
  titel: string;
  beschreibung?: string;
  kategorie: string;
  stadt: string;
  jahr: number | null;
  titelbild: string | null;
  bilder?: string[];
  veroeffentlicht: boolean;
  reihenfolge: number;
}

interface Anfrage {
  id: string;
  name: string;
  email: string;
  telefon: string | null;
  nachricht: string;
  erstelltAm: string;
  gelesen: boolean;
}

type View = "referenzen" | "anfragen";

/* ───── Sidebar ───── */

function Sidebar({
  view,
  setView,
  unreadCount,
}: {
  view: View;
  setView: (v: View) => void;
  unreadCount: number;
}) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin");
  };

  const items: { key: View; label: string; icon: typeof LayoutGrid }[] = [
    { key: "referenzen", label: "Referenzen", icon: LayoutGrid },
    { key: "anfragen", label: "Kontaktanfragen", icon: Mail },
  ];

  return (
    <aside className="flex w-64 flex-col border-r border-[#E0DDD6] bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <span className="font-heading text-lg font-bold tracking-[0.2em] text-dark">
          OBITKO
        </span>
        <span className="ml-2 font-body text-xs text-text/50">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-4">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm transition-colors ${
              view === key
                ? "bg-accent/10 font-medium text-accent"
                : "text-text hover:bg-warm"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
            {label}
            {key === "anfragen" && unreadCount > 0 && (
              <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 font-body text-[11px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#E0DDD6] p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm text-text transition-colors hover:bg-warm"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Abmelden
        </button>
      </div>
    </aside>
  );
}

/* ───── Mobile Nav ───── */

function MobileNav({
  view,
  setView,
  unreadCount,
}: {
  view: View;
  setView: (v: View) => void;
  unreadCount: number;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 border-b border-[#E0DDD6] bg-white px-4 py-2 lg:hidden">
      <span className="mr-auto font-heading text-base font-bold tracking-[0.2em] text-dark">
        OBITKO
      </span>
      <button
        onClick={() => setView("referenzen")}
        className={`rounded-lg px-3 py-1.5 font-body text-xs font-medium ${
          view === "referenzen" ? "bg-accent/10 text-accent" : "text-text"
        }`}
      >
        Referenzen
      </button>
      <button
        onClick={() => setView("anfragen")}
        className={`relative rounded-lg px-3 py-1.5 font-body text-xs font-medium ${
          view === "anfragen" ? "bg-accent/10 text-accent" : "text-text"
        }`}
      >
        Anfragen
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </button>
      <button
        onClick={async () => {
          await fetch("/api/admin/login", { method: "DELETE" });
          router.replace("/admin");
        }}
        className="ml-2 rounded-lg p-1.5 text-text hover:bg-warm"
      >
        <LogOut className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

/* ───── Referenzen View ───── */

function ReferenzenView() {
  const [items, setItems] = useState<Referenz[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Referenz & { id: string }) | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/referenzen");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItems(data);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (r: Referenz) => {
    if (!window.confirm(`"${r.titel}" wirklich löschen?`)) return;

    await fetch(`/api/admin/referenzen/${r.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== r.id));
  };

  const handleDone = () => {
    setCreating(false);
    setEditing(null);
    load();
  };

  // Show form
  if (creating) {
    return <ReferenzFormular onDone={handleDone} />;
  }
  if (editing) {
    return <ReferenzFormular initial={editing} onDone={handleDone} />;
  }

  if (loading) {
    return <p className="p-8 font-body text-sm text-text">Laden …</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-[24px] text-dark">Referenzen</h1>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-accent/90"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Neue Referenz
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-[#E0DDD6] bg-white p-12 text-center">
          <p className="font-body text-sm text-text">
            Noch keine Referenzen vorhanden.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#E0DDD6] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E0DDD6] bg-warm/50">
                  <th className="px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text/60">
                    Bild
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text/60">
                    Titel
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text/60">
                    Kategorie
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text/60">
                    Stadt
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text/60">
                    Jahr
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text/60">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-body text-xs font-medium uppercase tracking-wider text-text/60">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-[#E0DDD6] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="relative h-10 w-14 overflow-hidden rounded bg-[#E0DDD6]">
                        {r.titelbild ? (
                          <Image
                            src={r.titelbild}
                            alt={r.titel}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-[10px] text-text/30">—</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-body text-sm font-medium text-dark">
                      {r.titel}
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-text">
                      {r.kategorie}
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-text">
                      {r.stadt}
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-text">
                      {r.jahr ?? "–"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 font-body text-xs font-medium ${
                          r.veroeffentlicht
                            ? "bg-accent/10 text-accent"
                            : "bg-warm text-text/60"
                        }`}
                      >
                        {r.veroeffentlicht ? "Ja" : "Nein"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditing(r)}
                          className="rounded-lg p-2 text-text transition-colors hover:bg-warm hover:text-dark"
                          title="Bearbeiten"
                        >
                          <Pencil className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(r)}
                          className="rounded-lg p-2 text-text transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Löschen"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───── Anfragen View ───── */

function AnfragenView() {
  const [items, setItems] = useState<Anfrage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/kontakt");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItems(data);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (id: string) => {
    await fetch(`/api/admin/kontakt/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gelesen: true }),
    });
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, gelesen: true } : a))
    );
  };

  const toggle = (a: Anfrage) => {
    if (expanded === a.id) {
      setExpanded(null);
    } else {
      setExpanded(a.id);
      if (!a.gelesen) markRead(a.id);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <p className="p-8 font-body text-sm text-text">Laden …</p>;
  }

  return (
    <div>
      <h1 className="mb-6 font-heading text-[24px] text-dark">
        Kontaktanfragen
      </h1>

      {items.length === 0 ? (
        <div className="rounded-xl border border-[#E0DDD6] bg-white p-12 text-center">
          <p className="font-body text-sm text-text">
            Noch keine Anfragen vorhanden.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((a) => (
            <div
              key={a.id}
              className={`overflow-hidden rounded-xl border bg-white transition-colors ${
                a.gelesen ? "border-[#E0DDD6]" : "border-accent/30 bg-accent/[0.02]"
              }`}
            >
              {/* Row */}
              <button
                onClick={() => toggle(a)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                {/* Unread dot */}
                <span
                  className={`h-2 w-2 flex-shrink-0 rounded-full ${
                    a.gelesen ? "bg-transparent" : "bg-accent"
                  }`}
                />

                <div className="min-w-0 flex-1">
                  <p
                    className={`font-body text-sm ${
                      a.gelesen ? "text-dark" : "font-medium text-dark"
                    }`}
                  >
                    {a.name}
                  </p>
                  <p className="truncate font-body text-xs text-text/60">
                    {a.email}
                  </p>
                </div>

                <span className="flex-shrink-0 font-body text-xs text-text/40">
                  {formatDate(a.erstelltAm)}
                </span>

                <ChevronRight
                  className={`h-4 w-4 flex-shrink-0 text-text/30 transition-transform ${
                    expanded === a.id ? "rotate-90" : ""
                  }`}
                  strokeWidth={1.5}
                />
              </button>

              {/* Expanded content */}
              {expanded === a.id && (
                <div className="border-t border-[#E0DDD6] px-5 py-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="font-body text-[11px] uppercase tracking-wider text-text/40">
                        E-Mail
                      </p>
                      <p className="font-body text-sm text-dark">{a.email}</p>
                    </div>
                    {a.telefon && (
                      <div>
                        <p className="font-body text-[11px] uppercase tracking-wider text-text/40">
                          Telefon
                        </p>
                        <p className="font-body text-sm text-dark">
                          {a.telefon}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="font-body text-[11px] uppercase tracking-wider text-text/40">
                      Nachricht
                    </p>
                    <p className="mt-1 whitespace-pre-wrap font-body text-sm leading-relaxed text-anthrazit">
                      {a.nachricht}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───── Dashboard Page ───── */

export default function DashboardPage() {
  const [view, setView] = useState<View>("referenzen");
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    async function countUnread() {
      try {
        const res = await fetch("/api/admin/kontakt");
        if (!res.ok) return;
        const data = await res.json();
        setUnread(data.filter((a: { gelesen: boolean }) => !a.gelesen).length);
      } catch {
        // ignore
      }
    }
    countUnread();
  }, [view]);

  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-warm">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar view={view} setView={setView} unreadCount={unread} />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Mobile Nav */}
          <MobileNav view={view} setView={setView} unreadCount={unread} />

          {/* Main */}
          <main className="p-6 lg:p-10">
            {view === "referenzen" && <ReferenzenView />}
            {view === "anfragen" && <AnfragenView />}
          </main>
        </div>
      </div>
    </AdminLayout>
  );
}
