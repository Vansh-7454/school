"use client";

import React from "react";
import { InstitutionalCtaSection } from "@/components/ui/InstitutionalCtaSection";

export function GalleryVisitCta() {
  return (
    <InstitutionalCtaSection
      eyebrow="Experience Kensington In Person"
      title="Visit Our Historic"
      titleAccent="Collegiate Campus"
      description="Pictures reveal only a glimpse. Join an individual morning tour, explore our laboratories, and meet our scholars in person."
      primaryAction={{
        label: "Book Campus Tour",
        href: "/admissions",
      }}
      secondaryAction={{
        label: "Contact Secretariat",
        href: "/contact",
      }}
      fromTone="cream"
      showTopCurve={true}
    />
  );
}
