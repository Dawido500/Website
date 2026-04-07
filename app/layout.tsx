import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://o-innenausbau.de"),
  title: {
    default: "Obitko Innenausbau | Renovierung & Sanierung in Wiesbaden",
    template: "%s | Obitko Innenausbau",
  },
  description:
    "Ihr Meisterbetrieb für Renovierung, Sanierung & Innenausbau in Wiesbaden und Rhein-Main. Badsanierung, Komplettsanierung, Trockenbau & Bodenverlegung. Kostenlose Beratung ✓ Festpreisgarantie ✓",
  keywords: [
    "Renovierung Wiesbaden",
    "Sanierung Wiesbaden",
    "Innenausbau Wiesbaden",
    "Badsanierung Wiesbaden",
    "Komplettsanierung Rhein-Main",
    "Trockenbau Wiesbaden",
    "Bodenverlegung Wiesbaden",
    "Handwerker Wiesbaden",
    "Wohnung sanieren Wiesbaden",
    "Bad renovieren Wiesbaden",
    "Innenausbau Mainz",
    "Renovierung Frankfurt",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Obitko Innenausbau | Renovierung & Sanierung in Wiesbaden",
    description:
      "Meisterbetrieb für Renovierung, Sanierung & Innenausbau in Wiesbaden und Rhein-Main. Badsanierung, Komplettsanierung, Trockenbau & mehr.",
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
                { "@type": "City", name: "Frankfurt am Main" },
                { "@type": "City", name: "Taunusstein" },
                { "@type": "City", name: "Bad Schwalbach" },
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
