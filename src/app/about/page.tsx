import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import {
  OurStorySection,
  VisionMissionSection,
  CoreValuesSection,
  AboutTimelineSection,
  LeadershipSection,
  AboutNumbersStrip,
} from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Our School",
  description:
    "Explore our 28-year heritage of curiosity, leadership governance, core values, and historic 45-acre collegiate estate in London.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Heritage & Ethos"
        title="A Tradition of"
        titleAccent="Curiosity & Honour"
        description="Founded in 1998, fostering intellectual daring and moral clarity across our 45-acre collegiate estate in London."
        breadcrumbs={[{ label: "About Us" }]}
        decorationType="about"
      />
      <OurStorySection />
      <VisionMissionSection />
      <CoreValuesSection />
      <AboutTimelineSection />
      <LeadershipSection />
      <AboutNumbersStrip />
    </>
  );
}
