"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => {
        if (r.ok) router.replace("/admin/dashboard");
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Ungültige Anmeldedaten");
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-warm px-6">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
          {/* Logo */}
          <p className="mb-8 text-center font-heading text-xl font-bold tracking-[0.25em] text-dark">
            OBITKO
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Benutzername"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-[#E0DDD6] bg-transparent px-4 py-3.5 font-body text-[15px] text-dark outline-none transition-colors placeholder:text-text/40 focus:border-accent"
            />
            <input
              type="password"
              placeholder="Passwort"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#E0DDD6] bg-transparent px-4 py-3.5 font-body text-[15px] text-dark outline-none transition-colors placeholder:text-text/40 focus:border-accent"
            />

            {error && (
              <p className="font-body text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-accent py-3.5 font-body text-[15px] font-medium text-white transition-all hover:bg-accent/90 disabled:opacity-60"
            >
              {loading ? "Prüfe …" : "Anmelden"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center font-body text-xs text-text/40">
          Admin-Bereich · Obitko Innenausbau
        </p>
      </div>
    </section>
  );
}
