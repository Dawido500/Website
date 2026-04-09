import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Obitko Innenausbau | Sanierung & Renovierung Wiesbaden",
  description:
    "Dein Partner für Sanierung & Innenausbau in Mainz, Wiesbaden und Umgebung. Renovierung & Trockenbau – Dein Zuhause in guten Händen. ✓ Jetzt anfragen!",
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
      <ReferenzenTeaser />
      <UeberUns />
      <Kontakt />
    </main>
  );
}
