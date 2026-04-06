"use client";

import { useState, FormEvent } from "react";
import { Phone, Mail } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function Kontakt() {
  const [form, setForm] = useState({
    name: "",
    telefon: "",
    email: "",
    nachricht: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setForm({ name: "", telefon: "", email: "", nachricht: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="bg-warm py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — Info */}
          <FadeIn>
            <div>
              <p className="mb-3 font-body text-[12px] font-medium uppercase tracking-[3px] text-accent">
                Kontakt
              </p>
              <h2 className="font-heading text-[32px] leading-tight text-dark">
                Lass uns über dein
                <br />
                Projekt sprechen.
              </h2>
              <p className="mt-5 font-body text-[15px] leading-relaxed text-text">
                Schreib uns eine Nachricht oder ruf direkt an. Wir melden uns
                innerhalb von 24&nbsp;Stunden.
              </p>

              <ul className="mt-10 space-y-5" aria-label="Kontaktinformationen">
                <li>
                  <a
                    href="tel:+491774219653"
                    className="flex items-center gap-4 font-body text-[15px] text-anthrazit transition-colors hover:text-accent"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#EEF3F1]" aria-hidden="true">
                      <Phone className="h-[18px] w-[18px] text-accent" strokeWidth={1.5} />
                    </span>
                    +49 177 4219653
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@o-innenausbau.de"
                    className="flex items-center gap-4 font-body text-[15px] text-anthrazit transition-colors hover:text-accent"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#EEF3F1]" aria-hidden="true">
                      <Mail className="h-[18px] w-[18px] text-accent" strokeWidth={1.5} />
                    </span>
                    info@o-innenausbau.de
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/oinnenausbau"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 font-body text-[15px] text-anthrazit transition-colors hover:text-accent"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#EEF3F1]" aria-hidden="true">
                      <svg className="h-[18px] w-[18px] text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                      </svg>
                    </span>
                    @oinnenausbau
                  </a>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Right — Form */}
          <FadeIn delay={200}>
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Kontaktformular">
              <input
                type="text"
                placeholder="Name *"
                required
                aria-label="Name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full rounded-lg border border-[#E0DDD6] bg-transparent px-4 py-3.5 font-body text-[15px] text-dark outline-none transition-colors placeholder:text-text/40 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
              />
              <input
                type="tel"
                placeholder="Telefon"
                aria-label="Telefon"
                value={form.telefon}
                onChange={(e) => update("telefon", e.target.value)}
                className="w-full rounded-lg border border-[#E0DDD6] bg-transparent px-4 py-3.5 font-body text-[15px] text-dark outline-none transition-colors placeholder:text-text/40 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
              />
              <input
                type="email"
                placeholder="E-Mail *"
                required
                aria-label="E-Mail"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-lg border border-[#E0DDD6] bg-transparent px-4 py-3.5 font-body text-[15px] text-dark outline-none transition-colors placeholder:text-text/40 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
              />
              <textarea
                placeholder="Nachricht *"
                required
                rows={4}
                aria-label="Nachricht"
                value={form.nachricht}
                onChange={(e) => update("nachricht", e.target.value)}
                className="w-full resize-none rounded-lg border border-[#E0DDD6] bg-transparent px-4 py-3.5 font-body text-[15px] text-dark outline-none transition-colors placeholder:text-text/40 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-accent py-3.5 font-body text-[15px] font-medium text-white transition-all hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 disabled:opacity-60"
              >
                {status === "loading" ? "Wird gesendet …" : "Kontakt aufnehmen"}
              </button>

              {status === "success" && (
                <p className="font-body text-sm text-accent" role="status">
                  Vielen Dank! Wir melden uns bei dir.
                </p>
              )}
              {status === "error" && (
                <p className="font-body text-sm text-red-600" role="alert">
                  Etwas ist schiefgelaufen. Bitte versuche es erneut.
                </p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
