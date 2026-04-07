import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Obitko Innenausbau | Renovierung & Sanierung in Wiesbaden, Mainz, Hofheim & Frankfurt",
  description:
    "Obitko Innenausbau – Ihr Meisterbetrieb für Renovierung, Komplettsanierung, Badsanierung, Trockenbau & Bodenverlegung in Wiesbaden, Mainz, Hofheim am Taunus, Frankfurt am Main & Umgebung. Jetzt kostenlos beraten lassen!",
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
