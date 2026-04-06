"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  bilder: string[];
  titel: string;
}

export default function ReferenzGalerie({ bilder, titel }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const prev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + bilder.length) % bilder.length : null));
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % bilder.length : null));

  return (
    <>
      {/* Gallery */}
      <div className="mt-12 columns-1 gap-3 sm:columns-2">
        {bilder.map((src, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="mb-3 block w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src={src}
              alt={`${titel} – Bild ${i + 1}`}
              width={800}
              height={1000}
              className="h-auto w-full transition-transform duration-300 hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, 480px"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Schließen"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Prev */}
          {bilder.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-5 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={bilder[lightbox]}
              alt={`${titel} – Bild ${lightbox + 1}`}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          {bilder.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-5 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
            </button>
          )}

          {/* Counter */}
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-sm text-white/60">
            {lightbox + 1} / {bilder.length}
          </span>
        </div>
      )}
    </>
  );
}
