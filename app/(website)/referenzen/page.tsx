import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Referenzen – Renovierung & Sanierung Projekte in Wiesbaden",
  description:
    "Sehen Sie unsere abgeschlossenen Projekte: Komplettsanierungen, Badsanierungen, Trockenbau & Innenausbau in Wiesbaden und Rhein-Main. Vorher-Nachher-Bilder.",
  alternates: {
    canonical: "https://o-innenausbau.de/referenzen",
  },
};

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ReferenzenGrid from "@/components/ReferenzenGrid";
import { prisma } from "@/lib/prisma";

const placeholders: { id: string; titel: string; kategorie: string; stadt: string | null; jahr: number | null; titelbild: string | null }[] = [
  { id: "1", titel: "Altbau-Komplettsanierung", kategorie: "Komplettsanierung", stadt: "München", jahr: 2024, titelbild: null },
  { id: "2", titel: "Dachgeschoss-Ausbau", kategorie: "Innenausbau", stadt: "Augsburg", jahr: 2024, titelbild: null },
  { id: "3", titel: "Badezimmer im Bestand", kategorie: "Badsanierung", stadt: "Starnberg", jahr: 2023, titelbild: null },
  { id: "4", titel: "Büro-Umbau Altstadt", kategorie: "Innenausbau", stadt: "München", jahr: 2023, titelbild: null },
  { id: "5", titel: "Familienbad Neubau", kategorie: "Badsanierung", stadt: "Freising", jahr: 2023, titelbild: null },
  { id: "6", titel: "Kernsanierung Reihenhaus", kategorie: "Komplettsanierung", stadt: "Dachau", jahr: 2022, titelbild: null },
];

export default async function ReferenzenPage() {
  let projekte = placeholders;

  try {
    const data = await prisma.referenz.findMany({
      where: { veroeffentlicht: true },
      orderBy: { reihenfolge: "asc" },
      select: { id: true, titel: true, kategorie: true, stadt: true, jahr: true, titelbild: true },
    });
    if (data.length > 0) projekte = data;
  } catch {
    // keep placeholders
  }

  return (
    <section className="bg-white pb-24 pt-40 lg:pb-32 lg:pt-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Link
          href="/#referenzen"
          className="mb-10 inline-flex items-center gap-2 font-body text-sm text-text transition-colors hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          Zurück zur Startseite
        </Link>

        <div className="mb-12">
          <p className="mb-3 font-body text-[12px] font-medium uppercase tracking-[3px] text-accent">
            Referenzen
          </p>
          <h1 className="font-heading text-[36px] text-dark">
            Unsere Projekte
          </h1>
        </div>

        <ReferenzenGrid projekte={projekte} />
      </div>
    </section>
  );
}
