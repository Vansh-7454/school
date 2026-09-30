import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, FileQuestion } from "lucide-react";

export default function NewsEventsNotFound() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 py-32">
      <div className="max-w-md w-full text-center space-y-6 bg-white rounded-3xl p-8 sm:p-12 border border-[#0B1B3A]/10 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center mx-auto shadow-md">
          <FileQuestion className="w-8 h-8 stroke-[1.75]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
            404 Dispatches Error
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#0B1B3A]">
            Entry Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#0B1B3A]/70 font-sans leading-relaxed">
            The event, article, or announcement you requested could not be located in the
            Aurelia archives. It may have been archived or rescheduled.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/news-events"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B1B3A] text-white hover:bg-[#C9A24B] hover:text-[#0B1B3A] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to News & Events</span>
          </Link>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FAF8F5] text-[#0B1B3A] hover:bg-[#0B1B3A]/5 font-semibold text-xs transition-colors"
          >
            <Compass className="w-4 h-4 text-[#C9A24B]" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
