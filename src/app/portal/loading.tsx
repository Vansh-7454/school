import React from "react";
import { Loader2 } from "lucide-react";

export default function PortalLoading() {
  return (
    <div className="space-y-6">
      {/* Top Banner Skeleton */}
      <div className="h-44 rounded-3xl skeleton-shimmer border border-[#C9A24B]/15 w-full flex flex-col justify-end p-8 space-y-3">
        <div className="h-4 w-32 skeleton-shimmer rounded bg-[#C9A24B]/20" />
        <div className="h-8 w-64 skeleton-shimmer rounded-lg" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-white border border-[#C9A24B]/20 p-6 space-y-3 shadow-subtle">
            <div className="h-4 w-1/3 skeleton-shimmer rounded" />
            <div className="h-8 w-2/3 skeleton-shimmer rounded-lg" />
          </div>
        ))}
      </div>

      {/* Large Table/List Skeleton */}
      <div className="h-80 rounded-3xl bg-white border border-[#C9A24B]/20 p-8 space-y-4 shadow-subtle">
        <div className="h-6 w-1/4 skeleton-shimmer rounded" />
        <div className="h-4 w-full skeleton-shimmer rounded" />
        <div className="h-4 w-full skeleton-shimmer rounded" />
        <div className="h-4 w-3/4 skeleton-shimmer rounded" />
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-[#0B1B3A]/60 pt-4">
        <Loader2 className="w-4 h-4 animate-spin text-[#C9A24B]" />
        <span className="font-serif tracking-wide">Loading Aurelia Portal environment...</span>
      </div>
    </div>
  );
}
