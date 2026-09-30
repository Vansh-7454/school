"use client";

import React, { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global critical error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-[100svh] bg-[#0B1B3A] text-white flex items-center justify-center p-5 sm:p-6 font-sans">
        <div className="max-w-md w-full text-center bg-white/5 border border-[#C9A24B]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#C9A24B]/15 border border-[#C9A24B]/40 flex items-center justify-center mx-auto text-[#C9A24B] text-2xl font-serif font-bold">
            A
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-semibold text-white">
              Aurelia International School
            </h1>
            <p className="text-sm text-white/70">
              A critical application error occurred. Please refresh or try again.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C9A24B] text-[#0B1B3A] font-semibold text-sm hover:brightness-105 transition-all shadow-md cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try again</span>
          </button>
        </div>
      </body>
    </html>
  );
}
