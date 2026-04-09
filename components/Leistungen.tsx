import { Home, LayoutGrid, Droplets } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FadeIn from "@/components/FadeIn";

interface Leistung {
  icon: LucideIcon;
  title: string;
  text: string;
}

const leistungen: Leistung[] = [
  {
    icon: Home,
    title: "Komplettsanierung & Renovierung",
    text: "Wir verwandeln Ihre Immobilie – von Böden über Wände bis Decken. Alles aus einer Hand, ein Ansprechpartner, ein Zeitplan. Bei Bedarf koordinieren wir Partnerfirmen für Elektrik und Sanitär.",
  },
  {
    icon: LayoutGrid,
    title: "Innenausbau & Trockenbau",
    text: "Räume neu denken und gestalten. Ob Wandvertäfelung, Deckenabhängung oder komplett neuer Grundriss – wir setzen um, was du dir vorstellst.",
  },
  {
    icon: Droplets,
    title: "Badsanierung",
    text: "Dein Bad, komplett neu. Von der Planung über Fliesen bis zum fertigen Ergebnis – wir koordinieren alle Gewerke, damit du dich um nichts kümmern musst.",
  },
];

export default function Leistungen() {
  return (
    <section id="leistungen" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 font-body text-[12px] font-medium uppercase tracking-[3px] text-accent">
            Dein Partner für Sanierung und Innenausbau
          </p>
          <h2 className="font-heading text-[36px] text-dark">
            Unsere Leistungen
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-[15px] leading-relaxed text-text">
            Wir sind für Sie unterwegs in Wiesbaden, Mainz, Hofheim am Taunus, Frankfurt am Main und Umgebung.
          </p>
        </FadeIn>

        {/* Cards Grid */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-0">
          {leistungen.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 150}>
                <div
                  className={`flex flex-col items-center text-center md:px-10 lg:px-14 ${
                    i < leistungen.length - 1
                      ? "border-b border-[#E0DDD6] pb-12 md:border-b-0 md:border-r md:pb-0"
                      : ""
                  }`}
                >
                  <div className="mb-6 flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#EEF3F1]" aria-hidden="true">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 font-heading text-[20px] text-dark">
                    {item.title}
                  </h3>
                  <p className="font-body text-[14px] leading-relaxed text-text">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
