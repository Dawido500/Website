"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Projekte", href: "#referenzen" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // On subpages, always show solid nav
  const solid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + href;
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 lg:gap-1">
            <Image
              src="/logo-haus.svg"
              alt="Obitko Logo"
              width={64}
              height={64}
              className="h-[68px] w-[68px] lg:h-[92px] lg:w-[92px]"
            />
            <Image
              src="/logo-schrift.svg"
              alt="Obitko Innenausbau"
              width={240}
              height={64}
              className="h-[68px] w-auto lg:h-[104px]"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-body text-sm font-medium tracking-wide transition-colors duration-300 hover:text-accent ${
                  solid ? "text-anthrazit" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={(e) => handleNavClick(e, "#kontakt")}
              className="rounded bg-accent px-5 py-2.5 font-body text-sm font-medium text-white transition-all duration-300 hover:bg-accent/90"
            >
              Projekt anfragen
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menü öffnen"
          >
            <span
              className={`block h-[2px] w-6 transition-all duration-300 ${
                mobileOpen
                  ? "translate-y-[5.5px] rotate-45 bg-dark"
                  : solid
                    ? "bg-dark"
                    : "bg-white"
              }`}
            />
            <span
              className={`block h-[2px] w-6 transition-all duration-300 ${
                mobileOpen
                  ? "opacity-0"
                  : solid
                    ? "bg-dark"
                    : "bg-white"
              }`}
            />
            <span
              className={`block h-[2px] w-6 transition-all duration-300 ${
                mobileOpen
                  ? "-translate-y-[5.5px] -rotate-45 bg-dark"
                  : solid
                    ? "bg-dark"
                    : "bg-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-2xl font-medium text-anthrazit transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={(e) => handleNavClick(e, "#kontakt")}
            className="mt-4 rounded bg-accent px-8 py-3 font-body text-base font-medium text-white transition-all hover:bg-accent/90"
          >
            Projekt anfragen
          </a>
        </div>
      </div>
    </nav>
  );
}
