import React from "react";

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Banner Skeleton */}
        <div className="h-64 rounded-3xl skeleton-shimmer border border-[#C9A24B]/10 w-full flex flex-col justify-end p-8 space-y-3">
          <div className="h-4 w-32 skeleton-shimmer rounded bg-[#C9A24B]/20" />
          <div className="h-10 w-72 skeleton-shimmer rounded-lg" />
          <div className="h-4 w-96 skeleton-shimmer rounded" />
        </div>

        {/* Filter bar Skeleton */}
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 rounded-full skeleton-shimmer border border-[#C9A24B]/15" />
          ))}
        </div>

        {/* Masonry Grid Skeletons */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-2xl skeleton-shimmer border border-[#C9A24B]/15 w-full break-inside-avoid shadow-subtle ${
                i % 3 === 0 ? "h-80" : i % 2 === 0 ? "h-64" : "h-72"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
