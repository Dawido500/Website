import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ReferenzenSlider from "@/components/ReferenzenSlider";
import { prisma } from "@/lib/prisma";

const placeholders: { id: string; titel: string; kategorie: string; stadt: string | null; titelbild: string | null }[] = [
  { id: "1", titel: "Altbau-Komplettsanierung", kategorie: "Sanierung", stadt: "München", titelbild: null },
  { id: "2", titel: "Dachgeschoss-Ausbau", kategorie: "Innenausbau", stadt: "Augsburg", titelbild: null },
  { id: "3", titel: "Badezimmer im Bestand", kategorie: "Badsanierung", stadt: "Starnberg", titelbild: null },
  { id: "4", titel: "Büro-Umbau Altstadt", kategorie: "Trockenbau", stadt: "München", titelbild: null },
];

export default async function ReferenzenTeaser() {
  let projekte = placeholders;

  try {
    const data = await prisma.referenz.findMany({
      where: { veroeffentlicht: true },
      orderBy: { reihenfolge: "asc" },
      take: 6,
      select: { id: true, titel: true, kategorie: true, stadt: true, titelbild: true },
    });
    if (data.length > 0) projekte = data;
  } catch {
    // keep placeholders
  }

  return (
    <section id="referenzen" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 font-body text-[12px] font-medium uppercase tracking-[3px] text-accent">
              Referenzen
            </p>
            <h2 className="font-heading text-[32px] text-dark">
              Unsere Projekte
            </h2>
          </div>
          <Link
            href="/referenzen"
            className="hidden font-body text-sm font-medium text-accent transition-colors hover:text-accent/70 sm:block"
          >
            Alle Projekte ansehen&ensp;&rarr;
          </Link>
        </FadeIn>

        <ReferenzenSlider projekte={projekte} />
      </div>
    </section>
  );
}
