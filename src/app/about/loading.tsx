import React from "react";

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="h-72 rounded-3xl skeleton-shimmer border border-[#C9A24B]/15 w-full flex flex-col justify-end p-8 space-y-4">
          <div className="h-4 w-32 skeleton-shimmer rounded bg-[#C9A24B]/20" />
          <div className="h-12 w-96 skeleton-shimmer rounded-xl" />
          <div className="h-4 w-2/3 skeleton-shimmer rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80 rounded-2xl bg-white border border-[#C9A24B]/15 p-8 skeleton-shimmer" />
          <div className="h-80 rounded-2xl bg-white border border-[#C9A24B]/15 p-8 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}
