import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import {
  AdmissionProcessStepper,
  EligibilityTable,
  FeeStructureSection,
  ImportantDatesSection,
  AdmissionsFaqSection,
  FullEnquiryForm,
} from "@/components/sections/admissions";

export const metadata: Metadata = {
  title: "Admissions & Entry",
  description:
    "Apply for entry to Aurelia International School. Explore our 4-step admission process, grade eligibility criteria, transparent fee structures, and submit your digital enquiry.",
  keywords: [
    "Aurelia International School Admissions",
    "School Fees",
    "Application Process",
    "Admissions Criteria",
    "Campus Tour",
  ],
};

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EA]">
      {/* Animated PageHero with self-drawing path and milestone dots */}
      <PageHero
        title="Join a Community of Curiosity & Conviction"
        eyebrow="Admissions 2026 / 2027"
        description="Discover our holistic assessment ethos, transparent fee schedules, and how we welcome scholars from Early Years to the International Baccalaureate."
        breadcrumb="Admissions"
        decorationType="admissions"
        nextTone="cream"
      />

      {/* 4-Step Horizontal Admission Stepper */}
      <AdmissionProcessStepper />

      {/* Responsive Eligibility & Age Criteria Table */}
      <EligibilityTable />

      {/* 3 Fee Structure Cards with Demo Disclaimer */}
      <FeeStructureSection />

      {/* Compact Important Dates Calendar List */}
      <ImportantDatesSection />

      {/* 8-Question Animated FAQ Accordion */}
      <AdmissionsFaqSection />

      {/* Full Admissions Enquiry Form with MongoDB integration */}
      <FullEnquiryForm />
    </main>
  );
}
