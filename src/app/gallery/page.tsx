import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid, GalleryVisitCta } from "@/components/sections/gallery";
import { getGalleryItems } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Campus & Arts Gallery",
  description:
    "Explore our 24 visual archives spanning competitive sports, fine arts ateliers, robotics laboratories, and historic Kensington collegiate campus moments.",
  keywords: [
    "Aurelia International School Gallery",
    "Campus Photography",
    "Student Art",
    "Sports Regatta",
    "STEM Laboratory",
  ],
};

interface GalleryPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const resolvedParams = await searchParams;
  const initialCategory = resolvedParams.category || "All";

  // Fetch items from DB (or fallback)
  const { items } = await getGalleryItems({ limit: 48 });

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* PageHero with Floating Polaroid Frames */}
      <PageHero
        eyebrow="Visual Archives"
        title="A Tapestry of"
        titleAccent="Scholarly Life"
        description="Explore student triumphs, architectural landmarks, artistic masterworks, and moments of discovery across our historic Kensington estate."
        breadcrumbs={[{ label: "Gallery" }]}
        decorationType="gallery"
        nextTone="cream"
      />

      {/* Interactive Filterable Masonry Grid with Lightbox */}
      <GalleryGrid initialItems={items} initialCategory={initialCategory} />

      {/* Campus Visit CTA */}
      <GalleryVisitCta />
    </main>
  );
}
