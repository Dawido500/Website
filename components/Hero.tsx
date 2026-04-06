"use client";

import Image from "next/image";

export default function Hero() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="Innenausbau Projekt"
        fill
        priority
        className="hero-bg object-cover"
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/[0.45]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Subtitle */}
        <p className="mb-5 font-body text-[12px] font-medium uppercase tracking-[3px] text-white/55">
          Obitko Innenausbau
        </p>

        {/* Heading */}
        <h1
          className="max-w-3xl font-heading text-white"
          style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.15 }}
        >
          Dein Partner für
          <br />
          Sanierung und Innenausbau
        </h1>

        {/* Slogan */}
        <p
          className="mt-5 font-heading italic text-accent-light"
          style={{ fontSize: "clamp(16px, 2.5vw, 22px)" }}
        >
          Dein Zuhause in guten Händen.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#kontakt"
            onClick={(e) => scrollTo(e, "#kontakt")}
            className="rounded-[6px] bg-accent px-8 py-3.5 font-body text-sm font-medium text-white transition-all duration-300 hover:bg-accent/85"
          >
            Projekt anfragen
          </a>
          <a
            href="#referenzen"
            onClick={(e) => scrollTo(e, "#referenzen")}
            className="rounded-[6px] border border-white/30 px-8 py-3.5 font-body text-sm font-medium text-white transition-all duration-300 hover:border-white/60"
          >
            Referenzen ansehen
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="font-body text-[11px] uppercase tracking-[2px]">
          Scroll
        </span>
        <span className="block h-8 w-px bg-white/30" />
      </div>
    </section>
  );
}
