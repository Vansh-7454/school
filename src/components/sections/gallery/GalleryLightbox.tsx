"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { GalleryArtwork } from "@/components/ui/GalleryArtwork";
import type { IGalleryItem } from "@/models";

interface GalleryLightboxProps {
  item: (Partial<IGalleryItem> & { _id: string }) | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function GalleryLightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: GalleryLightboxProps) {
  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 50 && hasPrev) {
      onPrev();
    } else if (deltaX < -50 && hasNext) {
      onNext();
    }
    setTouchStartX(null);
  };

  // Keyboard listeners (Esc, Left, Right)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && hasNext) {
        onNext();
      }
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    if (!item) return;

    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0B1B3A]/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative z-10 w-full max-w-4xl bg-[#102042] rounded-3xl border border-[#C9A24B]/40 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92svh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button: 44px Touch Target */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#0B1B3A]/85 hover:bg-[#C9A24B] text-white hover:text-[#0B1B3A] flex items-center justify-center transition-colors border border-white/10 focus:outline-none cursor-pointer shadow-lg active:scale-95"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Left / Top: Artwork Viewport with Mobile Swipe Support */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full md:w-3/5 bg-[#081226] flex items-center justify-center min-h-[260px] sm:min-h-[300px] md:min-h-[460px] overflow-hidden select-none"
          >
            <GalleryArtwork
              variant={item.artVariant || "regatta"}
              title={item.title || "Scholastic Art"}
              className="max-h-[60vh] sm:max-h-[70vh] w-full"
            />

            {/* Navigation Buttons for Artwork (44px touch targets) */}
            {hasPrev && (
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous artwork"
                className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#0B1B3A]/85 hover:bg-[#C9A24B] text-white hover:text-[#0B1B3A] flex items-center justify-center transition-all border border-white/10 shadow-lg cursor-pointer active:scale-95 z-20"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
            )}

            {hasNext && (
              <button
                type="button"
                onClick={onNext}
                aria-label="Next artwork"
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#0B1B3A]/85 hover:bg-[#C9A24B] text-white hover:text-[#0B1B3A] flex items-center justify-center transition-all border border-white/10 shadow-lg cursor-pointer active:scale-95 z-20"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Right / Bottom: Content Information */}
          <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-white overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B]/15 text-[#C9A24B] text-xs font-semibold uppercase tracking-wider border border-[#C9A24B]/30">
                  <Tag className="w-3 h-3" />
                  <span>{item.category}</span>
                </span>
                {item.date && (
                  <span className="inline-flex items-center gap-1 text-xs text-white/50">
                    <Calendar className="w-3 h-3 text-[#C9A24B]" />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {item.title}
              </h3>

              <p className="text-sm text-white/80 leading-relaxed font-sans">
                {item.caption}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-sans">
              <span>Use arrow keys to navigate</span>
              <span>ESC to close</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
