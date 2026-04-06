import Image from "next/image";
import Link from "next/link";

interface Referenz {
  id: string;
  titel: string;
  kategorie: string;
  stadt: string | null;
  jahr: number | null;
  titelbild: string | null;
}

export default function ReferenzenGrid({ projekte }: { projekte: Referenz[] }) {
  return (
    <>
      {projekte.length === 0 ? (
        <p className="py-20 text-center font-body text-[15px] text-text">
          Noch keine Projekte vorhanden.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projekte.map((p) => (
            <Link key={p.id} href={`/referenzen/${p.id}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-[10px] bg-[#E0DDD6]">
                {p.titelbild ? (
                  <Image
                    src={p.titelbild}
                    alt={p.titel}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-body text-sm text-text/30">Bild</span>
                  </div>
                )}
              </div>
              <div className="rounded-b-[10px] border border-t-0 border-[#E0DDD6] bg-white px-5 py-4">
                <p className="font-body text-[11px] font-medium uppercase tracking-[2px] text-accent">
                  {p.kategorie}
                </p>
                <h2 className="mt-1.5 font-heading text-[18px] leading-snug text-dark">
                  {p.titel}
                </h2>
                <p className="mt-1 font-body text-[13px] text-text">
                  {p.stadt}
                  {p.jahr ? ` · ${p.jahr}` : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
