import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Chrome from "@/components/Chrome";
import Providers from "@/components/Providers";
import { BRAND } from "@/lib/brand";
import "./globals.css";

/* Display — large elegant serif. Light weights only; NEOYO never sets
   a heavy serif. Self-hosted at build time, so no runtime font request. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/* Body — a quiet sans that never competes with the serif. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neoyo.com"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    "NEOYO. A house built in Lagos. Made to order, jewelry and accessories, cut once and corrected for years.",
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.voice,
    siteName: BRAND.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  /* Bone White in light, Espresso in dark — the browser chrome joins the
     page instead of framing it. */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2ECDE" },
    { media: "(prefers-color-scheme: dark)", color: "#2B1B12" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <a className="u-skip" href="#main">
          Skip to content
        </a>
        {/* Bag and currency are read from localStorage on the client, so
            they wrap the whole tree — the chrome shows a bag count and
            every page shows a price. */}
        <Providers>
          <Chrome />
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
