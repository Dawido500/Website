export const dynamic = "force-dynamic";

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
