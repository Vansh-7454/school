import React from "react";

export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-48 rounded skeleton-shimmer" />

        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-32 rounded-full skeleton-shimmer bg-[#C9A24B]/20" />
          <div className="h-12 w-full max-w-2xl rounded-xl skeleton-shimmer" />
          <div className="h-4 w-64 rounded skeleton-shimmer" />
        </div>

        {/* Featured Image skeleton */}
        <div className="h-96 w-full rounded-3xl skeleton-shimmer border border-[#C9A24B]/15 shadow-subtle" />

        {/* Content paragraphs skeleton */}
        <div className="space-y-4 pt-4">
          <div className="h-4 w-full rounded skeleton-shimmer" />
          <div className="h-4 w-full rounded skeleton-shimmer" />
          <div className="h-4 w-5/6 rounded skeleton-shimmer" />
          <div className="h-4 w-4/5 rounded skeleton-shimmer" />
          <div className="h-32 w-full rounded-2xl skeleton-shimmer bg-[#0B1B3A]/5 my-6" />
          <div className="h-4 w-full rounded skeleton-shimmer" />
          <div className="h-4 w-3/4 rounded skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}
