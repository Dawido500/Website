import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://o-innenausbau.de";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/referenzen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Dynamic referenz pages
  let referenzPages: MetadataRoute.Sitemap = [];
  try {
    const referenzen = await prisma.referenz.findMany({
      where: { veroeffentlicht: true },
      select: { id: true, erstelltAm: true },
    });
    referenzPages = referenzen.map((r) => ({
      url: `${baseUrl}/referenzen/${r.id}`,
      lastModified: r.erstelltAm,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB not available
  }

  return [...staticPages, ...referenzPages];
}
