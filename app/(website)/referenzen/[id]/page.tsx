import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ReferenzGalerie from "@/components/ReferenzGalerie";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const referenz = await prisma.referenz.findUnique({ where: { id } });

  if (!referenz) {
    return { title: "Projekt nicht gefunden" };
  }

  const title = `${referenz.titel}${referenz.stadt ? ` in ${referenz.stadt}` : ""} – Referenz`;
  const description = referenz.beschreibung
    ? referenz.beschreibung.substring(0, 155)
    : `${referenz.kategorie}${referenz.stadt ? ` in ${referenz.stadt}` : ""} – Obitko Innenausbau. Professionelle ${referenz.kategorie} vom Meisterbetrieb.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: referenz.titelbild ? [{ url: referenz.titelbild }] : undefined,
    },
  };
}

export default async function ReferenzDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const referenz = await prisma.referenz.findUnique({
    where: { id },
  });

  if (!referenz || !referenz.veroeffentlicht) {
    notFound();
  }

  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Back link */}
        <Link
          href="/referenzen"
          className="mb-10 inline-flex items-center gap-2 font-body text-sm text-text transition-colors hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          Alle Projekte
        </Link>

        {/* Header */}
        <p className="mb-3 font-body text-[12px] font-medium uppercase tracking-[3px] text-accent">
          {referenz.kategorie}
        </p>
        <h1 className="font-heading text-[36px] leading-tight text-dark lg:text-[48px]">
          {referenz.titel}
        </h1>
        <div className="mt-3 flex gap-4 font-body text-[14px] text-text">
          {referenz.stadt && <span>{referenz.stadt}</span>}
          {referenz.jahr && <span>{referenz.jahr}</span>}
        </div>

        {/* Description */}
        {referenz.beschreibung && (
          <p className="mt-8 max-w-2xl font-body text-[15px] leading-relaxed text-anthrazit">
            {referenz.beschreibung}
          </p>
        )}

        {/* Gallery */}
        {referenz.bilder.length > 0 && (
          <ReferenzGalerie bilder={referenz.bilder} titel={referenz.titel} />
        )}

        {/* Single titelbild fallback */}
        {referenz.bilder.length === 0 && referenz.titelbild && (
          <div className="mt-12 overflow-hidden rounded-xl bg-[#E0DDD6]">
            <Image
              src={referenz.titelbild}
              alt={referenz.titel}
              width={960}
              height={720}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 960px"
              priority
            />
          </div>
        )}

        {/* Bottom navigation */}
        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Link
            href="/referenzen"
            className="inline-flex items-center gap-2 font-body text-sm text-text transition-colors hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            Alle Projekte
          </Link>
          <Link
            href="/#kontakt"
            className="rounded bg-accent px-6 py-2.5 font-body text-sm font-medium text-white transition-all hover:bg-accent/90"
          >
            Projekt anfragen
          </Link>
        </div>
      </div>
    </main>
  );
}
