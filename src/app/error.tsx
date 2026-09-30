"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, ShieldAlert } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client error for diagnostics
    console.error("Unhandled client error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[100svh] bg-[#0B1B3A] text-white flex items-center justify-center p-5 sm:p-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C9A24B]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center bg-white/5 border border-[#C9A24B]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-xl space-y-6">
        {/* Crest Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-[#C9A24B]/10 border border-[#C9A24B]/40 flex items-center justify-center mx-auto text-[#C9A24B]">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold">
            System Interruption
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Something went unexpectedly wrong
          </h1>
          <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed pt-1">
            Our academic portal or page encountered a transient issue. You may safely retry the action or return to the main Aurelia campus portal.
          </p>
          {error?.digest && (
            <p className="text-xs font-mono text-white/40 pt-1">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#DFBE72] via-[#C9A24B] to-[#B38B38] text-[#0B1B3A] font-medium text-sm hover:brightness-105 active:scale-95 transition-all shadow-gold cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-medium transition-all"
          >
            <Home className="w-4 h-4 text-gold-400" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
