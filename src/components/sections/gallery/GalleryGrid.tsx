"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, Filter, ChevronDown } from "lucide-react";
import { GalleryArtwork } from "@/components/ui/GalleryArtwork";
import { GalleryLightbox } from "./GalleryLightbox";
import type { IGalleryItem } from "@/models";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

interface GalleryGridProps {
  initialItems: Array<Partial<IGalleryItem> & { _id: string }>;
  initialCategory?: string;
}

const CATEGORIES = ["All", "Sports", "Arts", "Science", "Campus", "Events"] as const;

export function GalleryGrid({ initialItems, initialCategory = "All" }: GalleryGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read active category from URL or fallback to initialCategory
  const urlCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState<string>(
    urlCategory && (CATEGORIES as readonly string[]).includes(urlCategory) ? urlCategory : initialCategory
  );

  // Pagination state (12 per batch)
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Lightbox selection
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Handle category change and sync to URL query string without page reload
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(12); // reset batch
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/gallery${query}`, { scroll: false });
  };

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return initialItems;
    return initialItems.filter((item) => item.category === activeCategory);
  }, [initialItems, activeCategory]);

  // Paginated visible slice
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  // Lightbox handlers
  const handleOpenLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < displayedItems.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <Section tone="cream" className="py-16 md:py-24 min-h-screen">
      <Container>
        {/* Sticky Filter Bar */}
        <div className="sticky top-20 sm:top-24 z-30 mb-8 sm:mb-12 py-2.5 sm:py-3 px-3 sm:px-4 rounded-[20px] bg-white/95 backdrop-blur-md border border-[#0B1B3A]/10 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-2 text-xs font-semibold text-[#0B1B3A]/60">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#C9A24B] stroke-[1.75]" />
              <span>Filter:</span>
            </div>
            <span className="sm:hidden text-[10px] text-[#0B1B3A]/50 font-sans">
              {displayedItems.length} of {filteredItems.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all relative whitespace-nowrap snap-start cursor-pointer flex items-center justify-center shrink-0 ${
                    isActive
                      ? "bg-[#0B1B3A] text-white shadow-sm"
                      : "bg-[#FAF8F5] text-[#0B1B3A]/70 hover:text-[#0B1B3A] hover:bg-white border border-[#0B1B3A]/5"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="galleryFilterBubble"
                      className="absolute inset-0 rounded-full border border-[#C9A24B] pointer-events-none"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:block text-[11px] text-[#0B1B3A]/50 font-sans">
            Showing <strong className="text-[#0B1B3A]">{displayedItems.length}</strong> of{" "}
            <strong>{filteredItems.length}</strong> items
          </div>
        </div>

        {/* Masonry Columns Grid: 2 columns on phones, 3 on tablet, 4 on desktop */}
        <motion.div
          layout
          className="columns-2 md:columns-3 xl:columns-4 gap-3 sm:gap-6 space-y-3 sm:space-y-6"
        >
          <AnimatePresence>
            {displayedItems.map((item, index) => {
              // Determine aspect ratio class
              const aspectClass =
                item.aspect === "portrait"
                  ? "aspect-[3/4]"
                  : item.aspect === "square"
                  ? "aspect-square"
                  : "aspect-[4/3]";

              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => handleOpenLightbox(index)}
                >
                  <div
                    className={`relative w-full ${aspectClass} rounded-[24px] overflow-hidden bg-[#0B1B3A] border border-[#0B1B3A]/10 shadow-sm group-hover:shadow-xl group-hover:border-[#C9A24B]/50 transition-all duration-300`}
                  >
                    {/* Artwork Rendered via SVG */}
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                      <GalleryArtwork
                        variant={item.artVariant || "regatta"}
                        title={item.title || "Scholastic Scene"}
                      />
                    </div>

                    {/* Hover Overlay with Gold Tint, Title, Category Tag, & Zoom Icon */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/95 via-[#0B1B3A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white">
                      {/* Top row: Category tag + Zoom Icon */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C9A24B] text-[#0B1B3A]">
                          {item.category}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                          <ZoomIn className="w-4 h-4 stroke-[1.75]" />
                        </div>
                      </div>

                      {/* Bottom Info */}
                      <div>
                        <h4 className="text-base font-serif font-bold text-white mb-1 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-white/70 line-clamp-2 font-sans">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#0B1B3A] text-[#FBF6EA] hover:bg-[#162A56] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span>Load More Archives</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform stroke-[1.75]" />
            </button>
          </div>
        )}
      </Container>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <GalleryLightbox
          item={displayedItems[selectedIndex] || null}
          onClose={handleCloseLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < displayedItems.length - 1}
        />
      )}
    </Section>
  );
}
