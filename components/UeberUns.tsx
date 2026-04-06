import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function UeberUns() {
  return (
    <section id="ueber-uns" className="bg-warm py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="/images/team.jpg"
                alt="Das Team von Obitko Innenausbau bei der Arbeit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={200}>
            <div>
              <p className="mb-3 font-body text-[12px] font-medium uppercase tracking-[3px] text-accent">
                Über uns
              </p>

              <h2 className="font-heading text-[32px] leading-tight text-dark">
                Familienbetrieb in dritter Generation.
              </h2>

              <p className="mt-6 font-body text-[16px] leading-relaxed text-anthrazit">
                Handwerk hat bei uns Tradition. Drei Generationen, ein gemeinsamer
                Nenner: der Anspruch, Dinge richtig zu machen.
              </p>

              <p className="mt-4 font-body text-[15px] leading-relaxed text-anthrazit">
                Was uns wichtig ist: Wir arbeiten so, wie wir es für unser eigenes
                Zuhause tun würden. Persönlich, sorgfältig und ohne Kompromisse
                bei der Qualität.
              </p>

              <p className="mt-6 font-heading text-[16px] italic text-accent">
                – Familie Obitko
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
