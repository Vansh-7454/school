import React from "react";

export default function NewsEventsLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Skeleton */}
        <div className="h-64 rounded-3xl skeleton-shimmer border border-[#C9A24B]/10 w-full flex flex-col justify-end p-8 space-y-3">
          <div className="h-4 w-32 skeleton-shimmer rounded bg-[#C9A24B]/20" />
          <div className="h-10 w-80 skeleton-shimmer rounded-lg" />
          <div className="h-4 w-96 skeleton-shimmer rounded" />
        </div>

        {/* Tab Switcher Skeleton */}
        <div className="h-14 rounded-2xl skeleton-shimmer border border-[#C9A24B]/20 w-full max-w-md mx-auto" />

        {/* Featured Card Skeleton */}
        <div className="h-72 rounded-3xl skeleton-shimmer border border-[#C9A24B]/15 w-full p-8 flex flex-col justify-end space-y-4">
          <div className="h-5 w-28 skeleton-shimmer rounded-full bg-[#C9A24B]/20" />
          <div className="h-8 w-2/3 skeleton-shimmer rounded-lg" />
          <div className="h-4 w-1/2 skeleton-shimmer rounded" />
        </div>

        {/* Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl skeleton-shimmer border border-[#C9A24B]/15 p-6 flex flex-col justify-between">
              <div className="h-40 w-full rounded-xl skeleton-shimmer mb-4" />
              <div className="h-5 w-3/4 rounded skeleton-shimmer" />
              <div className="h-4 w-1/2 rounded skeleton-shimmer mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
