"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareLinkButtonProps {
  title?: string;
}

export function ShareLinkButton({ title = "this page" }: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
        copied
          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
          : "bg-white hover:bg-[#FAF8F5] text-[#0B1B3A]/80 border-[#0B1B3A]/10 hover:border-[#C9A24B]"
      }`}
      aria-label={`Share ${title}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
          <span>Link Copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>Share Article</span>
        </>
      )}
    </button>
  );
}
