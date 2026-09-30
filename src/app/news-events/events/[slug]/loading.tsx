import React from "react";

export default function EventDetailLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-48 rounded skeleton-shimmer" />

        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-36 rounded-full skeleton-shimmer bg-[#C9A24B]/20" />
          <div className="h-12 w-full max-w-2xl rounded-xl skeleton-shimmer" />
          <div className="flex gap-4">
            <div className="h-5 w-40 rounded skeleton-shimmer" />
            <div className="h-5 w-32 rounded skeleton-shimmer" />
          </div>
        </div>

        {/* Featured Image skeleton */}
        <div className="h-96 w-full rounded-3xl skeleton-shimmer border border-[#C9A24B]/15 shadow-subtle" />

        {/* Event Key Details Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-white border border-[#C9A24B]/20">
          <div className="h-14 rounded-xl skeleton-shimmer" />
          <div className="h-14 rounded-xl skeleton-shimmer" />
          <div className="h-14 rounded-xl skeleton-shimmer" />
        </div>

        {/* Description paragraphs */}
        <div className="space-y-4 pt-2">
          <div className="h-4 w-full rounded skeleton-shimmer" />
          <div className="h-4 w-full rounded skeleton-shimmer" />
          <div className="h-4 w-4/5 rounded skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}
