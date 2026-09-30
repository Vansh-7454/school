import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import {
  LearningJourneySection,
  CurriculumHighlightsSection,
  AcademicFacilitiesSection,
  CoCurricularSection,
  TeachingApproachSection,
} from "@/components/sections/academics";

export const metadata: Metadata = {
  title: "Academics & IB Curriculum",
  description:
    "Explore our rigorous dual-pathway Cambridge IGCSE and International Baccalaureate (IB) Diploma programmes, scientific research labs, and holistic co-curricular societies.",
  keywords: [
    "Aurelia International School Academics",
    "IB Diploma School",
    "Cambridge IGCSE",
    "Robotics & STEM Labs",
    "Co-Curricular Clubs",
  ],
};

export default function AcademicsPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EA]">
      {/* Animated PageHero with floating geometric elements */}
      <PageHero
        title="Scholastic Rigour & Intellectual Exploration"
        eyebrow="Academic Excellence"
        description="Fostering analytical discipline, experimental inquiry, and humanistic empathy through world-class Cambridge and International Baccalaureate curricula."
        breadcrumb="Academics"
        decorationType="academics"
      />

      {/* 4-Stage Learning Journey Interactive Stepper */}
      <LearningJourneySection />

      {/* 6 Curriculum Highlights Grid */}
      <CurriculumHighlightsSection />

      {/* Facilities Bento Grid */}
      <AcademicFacilitiesSection />

      {/* Filterable Co-Curricular Clubs Grid */}
      <CoCurricularSection />

      {/* Tripartite Teaching Approach (Learn, Apply, Reflect) & Admissions CTA */}
      <TeachingApproachSection />
    </main>
  );
}
