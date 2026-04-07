import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Obitko Innenausbau | Renovierung & Sanierung in Wiesbaden",
  description:
    "Obitko Innenausbau – Ihr Meisterbetrieb in Wiesbaden für Renovierung, Komplettsanierung, Badsanierung, Trockenbau & Bodenverlegung. Jetzt kostenlos beraten lassen!",
  alternates: {
    canonical: "https://o-innenausbau.de",
  },
};

import Hero from "@/components/Hero";
import Leistungen from "@/components/Leistungen";
import UeberUns from "@/components/UeberUns";
import ReferenzenTeaser from "@/components/ReferenzenTeaser";
import Kontakt from "@/components/Kontakt";

export default function Home() {
  return (
    <main>
      <Hero />
      <Leistungen />
      <UeberUns />
      <ReferenzenTeaser />
      <Kontakt />
    </main>
  );
}
