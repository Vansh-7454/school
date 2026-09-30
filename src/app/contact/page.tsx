import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import {
  ContactCardsSection,
  ContactFormSection,
  LocationMapSection,
  ContactFaqStrip,
} from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact Our Secretariat",
  description:
    "Contact Aurelia International School in Kensington, London. Reach our Admissions Office, view working hours, submit a confidential message, or explore campus transit directions.",
  keywords: [
    "Aurelia International School Contact",
    "Admissions Office Kensington",
    "Campus Tour Booking",
    "School Address London",
    "Enquiries",
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EA]">
      {/* Animated PageHero with flying paper planes and envelope */}
      <PageHero
        title="Connect With Our Admissions & Secretariat"
        eyebrow="Direct Correspondence"
        description="Whether planning an individual campus tour, requesting syllabi, or connecting with faculty leadership, our team is at your disposal."
        breadcrumb="Contact"
        decorationType="contact"
        nextTone="cream"
      />

      {/* 3 Department Contact Cards with Copy to Clipboard & Working Hours */}
      <ContactCardsSection />

      {/* Stylised Vector SVG Map & Detailed Transit Directions */}
      <LocationMapSection />

      {/* Visitor FAQ Strip & Admissions Next Steps */}
      <ContactFaqStrip />

      {/* Direct Contact Form with Zod Validation and MongoDB ContactMessage integration */}
      <ContactFormSection />
    </main>
  );
}
