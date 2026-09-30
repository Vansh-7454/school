import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { ToastProvider } from "@/components/ui/Toast";
import { FirstLoadIntro } from "@/components/ui/FirstLoadIntro";
import { BackToTop } from "@/components/ui/BackToTop";
import { auth } from "@/auth";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1B3A",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aurelia-international.edu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aurelia International School | Nurturing Minds, Inspiring Excellence",
    template: "%s | Aurelia International School",
  },
  description:
    "A premier British and International Baccalaureate (IB) World School in London offering an exceptional education for students aged 3 to 18.",
  keywords: [
    "Aurelia International School",
    "IB World School",
    "Cambridge International",
    "Boarding School London",
    "Independent School London",
    "Sixth Form College",
    "British International Education",
  ],
  authors: [{ name: "Aurelia International School" }],
  creator: "Aurelia International School",
  publisher: "Aurelia International School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Aurelia International School",
    title: "Aurelia International School | Nurturing Minds, Inspiring Excellence",
    description:
      "A premier British and International Baccalaureate (IB) World School in London offering an exceptional education for students aged 3 to 18.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelia International School | Nurturing Minds, Inspiring Excellence",
    description:
      "A premier British and International Baccalaureate (IB) World School in London offering an exceptional education for students aged 3 to 18.",
    creator: "@AureliaSchool",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-[100svh] bg-[#FDFBF7] text-[#0B1B3A] antialiased selection:bg-gold-500/30 selection:text-navy-950 flex flex-col">
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2.5 focus:bg-[#C9A24B] focus:text-[#0B1B3A] focus:font-semibold focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-[#0B1B3A]"
        >
          Skip to main content
        </a>

        <ToastProvider>
          <FirstLoadIntro />
          <SmoothScrollProvider>
            <Navbar session={session} />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <BackToTop />
          </SmoothScrollProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
