import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "@/styles/globals.css";
import { SITE_CONFIG } from "@/lib/site";
import { BoutiqueProviders } from "@/components/layout/BoutiqueProviders";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.fullName} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.fullName}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_CONFIG.fullName,
    title: `${SITE_CONFIG.fullName} — Heritage in 3D`,
    description: SITE_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.fullName,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.contact.email,
    telephone: SITE_CONFIG.contact.phone,
    sameAs: [SITE_CONFIG.social.instagramUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.addressLine1,
      addressLocality: "Mumbai",
      addressRegion: "MH",
      postalCode: "400001",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en-IN" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main-content" className="sr-only">
          Skip to main content
        </a>
        <IntroLoader />
        <AnnouncementBar />
        <Header />
        <SearchOverlay />
        <CartDrawer />
        <BoutiqueProviders>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </BoutiqueProviders>
        <WhatsAppButton />
      </body>
    </html>
  );
}
