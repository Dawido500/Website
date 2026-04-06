"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Referenz {
  id: string;
  titel: string;
  kategorie: string;
  stadt: string | null;
  titelbild: string | null;
}

export default function ReferenzenSlider({ projekte }: { projekte: Referenz[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = direction === "left" ? -420 : 420;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      {/* Slider */}
      <div
        ref={sliderRef}
        className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 lg:-mx-0 lg:px-0"
      >
        {projekte.map((p) => (
          <Link key={p.id} href={`/referenzen/${p.id}`} className="w-[400px] flex-shrink-0 snap-start">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-t-[10px] bg-[#E0DDD6]">
              {p.titelbild ? (
                <Image
                  src={p.titelbild}
                  alt={p.titel}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="400px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]">
                  <span className="font-body text-sm text-text/40">Bild</span>
                </div>
              )}
            </div>
            <div className="rounded-b-[10px] border border-t-0 border-[#E0DDD6] bg-white px-5 py-4">
              <p className="font-body text-[11px] font-medium uppercase tracking-[2px] text-accent">
                {p.kategorie}
              </p>
              <h3 className="mt-1.5 font-heading text-[18px] leading-snug text-dark">
                {p.titel}
              </h3>
              <p className="mt-1 font-body text-[13px] text-text">
                {p.stadt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom row: mobile link + arrows */}
      <div className="mt-10 flex items-center justify-between sm:justify-end">
        <Link
          href="/referenzen"
          className="font-body text-sm font-medium text-accent transition-colors hover:text-accent/70 sm:hidden"
        >
          Alle Projekte ansehen&ensp;&rarr;
        </Link>
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-anthrazit/20 text-anthrazit transition-colors hover:border-anthrazit/50"
            aria-label="Zurück scrollen"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-anthrazit/20 text-anthrazit transition-colors hover:border-anthrazit/50"
            aria-label="Weiter scrollen"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </>
  );
}
