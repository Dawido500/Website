import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <section className="bg-white pb-24 pt-40 lg:pb-32 lg:pt-48">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <p className="mb-3 font-body text-[12px] font-medium uppercase tracking-[3px] text-accent">
          Rechtliches
        </p>
        <h1 className="font-heading text-[36px] text-dark">Impressum</h1>

        <div className="mt-10 space-y-6 font-body text-[15px] leading-relaxed text-text">
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              Obitko Innenausbau
              <br />
              Dawid Obitko
              <br />
              Eichenstraße 45
              <br />
              55246 Mainz Kostheim
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              Kontakt
            </h2>
            <p>
              E-Mail:{" "}
              <a href="mailto:info@o-innenausbau.de" className="text-accent hover:underline">
                info@o-innenausbau.de
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Dawid Obitko
              <br />
              Eichenstraße 45
              <br />
              55246 Mainz Kostheim
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              Verbraucherstreitbeilegung/Universalschlichtungsstelle
            </h2>
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
