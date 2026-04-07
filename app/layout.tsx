import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://o-innenausbau.de"),
  title: {
    default: "Obitko Innenausbau | Sanierung & Renovierung Wiesbaden",
    template: "%s | Obitko Innenausbau",
  },
  description:
    "Dein Partner für Sanierung & Innenausbau in Mainz, Wiesbaden und Umgebung. Renovierung & Trockenbau – Dein Zuhause in guten Händen. ✓ Jetzt anfragen!",
  keywords: [
    "Renovierung Wiesbaden",
    "Sanierung Wiesbaden",
    "Innenausbau Wiesbaden",
    "Badsanierung Wiesbaden",
    "Handwerker Wiesbaden",
    "Renovierung Mainz",
    "Sanierung Mainz",
    "Badsanierung Mainz",
    "Innenausbau Mainz",
    "Renovierung Hofheim am Taunus",
    "Sanierung Hofheim",
    "Innenausbau Hofheim",
    "Renovierung Frankfurt am Main",
    "Sanierung Frankfurt",
    "Badsanierung Frankfurt",
    "Komplettsanierung Rhein-Main",
    "Trockenbau Wiesbaden",
    "Bodenverlegung Wiesbaden",
    "Wohnung sanieren Wiesbaden",
    "Bad renovieren Mainz",
    "Handwerker Mainz",
    "Handwerker Hofheim",
    "Handwerker Frankfurt",
    "Renovierung Taunusstein",
    "Renovierung Kelkheim",
    "Renovierung Eppstein",
    "Renovierung Kriftel",
    "Renovierung Bad Soden",
    "Innenausbau Rhein-Main-Gebiet",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Obitko Innenausbau | Sanierung & Renovierung Wiesbaden",
    description:
      "Dein Partner für Sanierung & Innenausbau in Mainz, Wiesbaden und Umgebung. Renovierung & Trockenbau – Dein Zuhause in guten Händen. ✓ Jetzt anfragen!",
    type: "website",
    locale: "de_DE",
    siteName: "Obitko Innenausbau",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Obitko Innenausbau – Renovierung & Sanierung in Wiesbaden",
      },
    ],
  },
  alternates: {
    canonical: "https://o-innenausbau.de",
  },
};

const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL || "/umami/script.js";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="font-body antialiased">
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeImprovement",
              name: "Obitko Innenausbau",
              url: "https://o-innenausbau.de",
              telephone: "+491774219653",
              email: "info@o-innenausbau.de",
              image: "https://o-innenausbau.de/images/hero.jpg",
              description:
                "Meisterbetrieb für Renovierung, Sanierung & Innenausbau in Wiesbaden und Rhein-Main.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Wiesbaden",
                addressRegion: "Hessen",
                addressCountry: "DE",
              },
              areaServed: [
                { "@type": "City", name: "Wiesbaden" },
                { "@type": "City", name: "Mainz" },
                { "@type": "City", name: "Hofheim am Taunus" },
                { "@type": "City", name: "Frankfurt am Main" },
                { "@type": "City", name: "Taunusstein" },
                { "@type": "City", name: "Kelkheim" },
                { "@type": "City", name: "Eppstein" },
                { "@type": "City", name: "Kriftel" },
                { "@type": "City", name: "Bad Soden am Taunus" },
                { "@type": "City", name: "Hattersheim" },
                { "@type": "City", name: "Flörsheim" },
                { "@type": "City", name: "Hochheim am Main" },
                { "@type": "City", name: "Rüsselsheim" },
                { "@type": "City", name: "Ingelheim" },
                { "@type": "City", name: "Bingen" },
              ],
              serviceType: [
                "Renovierung",
                "Komplettsanierung",
                "Badsanierung",
                "Innenausbau",
                "Trockenbau",
                "Bodenverlegung",
              ],
              priceRange: "$$",
            }),
          }}
        />
        {children}
        {umamiId && (
          <Script
            src={umamiUrl}
            data-website-id={umamiId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
