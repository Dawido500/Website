import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Projekte", href: "#referenzen" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1 — Logo & Tagline */}
          <div>
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/logo-haus.svg"
                alt="Obitko Logo"
                width={64}
                height={64}
                className="h-[92px] w-[92px]"
              />
              <Image
                src="/logo-schrift.svg"
                alt="Obitko Innenausbau"
                width={240}
                height={64}
                className="h-[92px] w-auto"
              />
            </Link>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="mb-4 font-body text-xs font-medium uppercase tracking-widest text-white/40">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="mb-4 font-body text-xs font-medium uppercase tracking-widest text-white/40">
              Kontakt
            </h3>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <a
                  href="tel:+491774219653"
                  className="transition-colors hover:text-white"
                >
                  +49 177 4219653
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@o-innenausbau.de"
                  className="transition-colors hover:text-white"
                >
                  info@o-innenausbau.de
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/oinnenausbau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                  @oinnenausbau
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + Bottom Row */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-xs text-white/40">
            &copy; {year} Obitko Innenausbau. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link
              href="/impressum"
              className="font-body text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="font-body text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
