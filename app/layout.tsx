import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://obitko.de"),
  title: "Obitko Innenausbau – Dein Partner für Sanierung und Innenausbau",
  description:
    "Familienbetrieb in dritter Generation. Komplettsanierung, Innenausbau & Badsanierung im Rhein-Main-Gebiet. Persönlich, sorgfältig, ohne Kompromisse.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Obitko Innenausbau – Dein Partner für Sanierung und Innenausbau",
    description:
      "Familienbetrieb in dritter Generation. Komplettsanierung, Innenausbau & Badsanierung im Rhein-Main-Gebiet.",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Obitko Innenausbau",
      },
    ],
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
