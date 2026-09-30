import dynamic from "next/dynamic";
import { Hero } from "@/components/hero/Hero";
import {
  AboutSnippet,
  StatsBand,
  ProgramsSection,
  WhyChooseSection,
  AdmissionCtaSection,
} from "@/components/sections";

// Dynamic imports for below-the-fold and client-heavy interactive sections
const DayTimelineSection = dynamic(
  () => import("@/components/sections/DayTimelineSection").then((m) => m.DayTimelineSection),
  {
    loading: () => <div className="h-96 skeleton-shimmer-navy w-full" />,
  }
);

const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((m) => m.TestimonialsSection),
  {
    loading: () => <div className="h-80 skeleton-shimmer w-full" />,
  }
);

const EventsNoticesSection = dynamic(
  () => import("@/components/sections/EventsNoticesSection").then((m) => m.EventsNoticesSection),
  {
    loading: () => <div className="h-96 skeleton-shimmer w-full" />,
  }
);

const GalleryPreviewSection = dynamic(
  () => import("@/components/sections/GalleryPreviewSection").then((m) => m.GalleryPreviewSection),
  {
    loading: () => <div className="h-96 skeleton-shimmer w-full" />,
  }
);

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Aurelia International School",
    "url": "https://aurelia-international.edu",
    "logo": "https://aurelia-international.edu/icon",
    "description":
      "A premier British and International Baccalaureate (IB) World School in London offering an exceptional education for students aged 3 to 18.",
    "foundingDate": "1894",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "45 Kensington Palace Gardens",
      "addressLocality": "London",
      "postalCode": "W8 4QP",
      "addressCountry": "GB",
    },
    "telephone": "+44 20 7946 0912",
    "email": "admissions@aurelia-international.edu",
    "sameAs": [
      "https://facebook.com/AureliaInternationalSchool",
      "https://twitter.com/AureliaSchool",
      "https://linkedin.com/school/aurelia-international",
      "https://instagram.com/aureliaschool",
    ],
  };

  return (
    <>
      {/* EducationalOrganization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section (Full-bleed cinematic day-cycle) */}
      <Hero />

      {/* 1. About snippet (cream bg) */}
      <AboutSnippet />

      {/* 2. Stats band (navy bg) */}
      <StatsBand />

      {/* 3. Programs (cream bg) */}
      <ProgramsSection />

      {/* 4. Why choose Aurelia (white bg) */}
      <WhyChooseSection />

      {/* 5. Day-in-school timeline (navy bg) - dynamically loaded */}
      <DayTimelineSection />

      {/* 6. Testimonials (cream bg) - dynamically loaded */}
      <TestimonialsSection />

      {/* 7. Upcoming events and notices (white bg) - dynamically loaded */}
      <EventsNoticesSection />

      {/* 8. Gallery preview (cream bg) - dynamically loaded */}
      <GalleryPreviewSection />

      {/* 9. Admission CTA (navy bg with gold accent) */}
      <AdmissionCtaSection />
    </>
  );
}
