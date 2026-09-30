"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Pin,
  ChevronDown,
  Paperclip,
  FileText,
  Download,
} from "lucide-react";
import type { INotice } from "@/models";

interface NoticesTabContentProps {
  initialNotices: Array<Partial<INotice> & { _id: string; slug: string }>;
}

export function NoticesTabContent({ initialNotices }: NoticesTabContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openNoticeId, setOpenNoticeId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const toggleNotice = (id: string) => {
    setOpenNoticeId(openNoticeId === id ? null : id);
  };

  // Filter notices (important always pinned first)
  const filteredNotices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const result = initialNotices.filter((n) => {
      if (q) {
        const titleMatch = n.title?.toLowerCase().includes(q);
        const bodyMatch = n.body?.toLowerCase().includes(q);
        const catMatch = n.category?.toLowerCase().includes(q);
        if (!titleMatch && !bodyMatch && !catMatch) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      if (a.important && !b.important) return -1;
      if (!a.important && b.important) return 1;
      return new Date(b.date!).getTime() - new Date(a.date!).getTime();
    });

    return result;
  }, [initialNotices, searchQuery]);

  const displayedNotices = filteredNotices.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNotices.length;

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#0B1B3A]/10 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1B3A]">
          <Pin className="w-4 h-4 text-[#C9A24B]" />
          <span>Official Institutional Announcements & Circulars</span>
        </div>

        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0B1B3A]/40">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(8);
            }}
            placeholder="Search circulars, notices..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#0B1B3A]/10 text-xs text-[#0B1B3A] placeholder-[#0B1B3A]/40 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B]"
          />
        </div>
      </div>

      {/* Notices Accordion List */}
      {displayedNotices.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#0B1B3A]/10 space-y-2">
          <p className="font-serif text-xl font-bold text-[#0B1B3A]">
            No circulars match your search
          </p>
          <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans">
            Please check your keywords or clear the search input.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedNotices.map((notice) => {
            const isOpen = openNoticeId === notice._id;
            const isImportant = notice.important;

            return (
              <div
                key={notice._id || notice.slug}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isImportant
                    ? "bg-amber-50/40 border-[#C9A24B]/50 shadow-xs"
                    : "bg-white border-[#0B1B3A]/10 hover:border-[#0B1B3A]/25"
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleNotice(notice._id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
                    {/* Important Gold Pin Indicator */}
                    {isImportant ? (
                      <div className="w-8 h-8 rounded-full bg-[#C9A24B]/20 text-[#C9A24B] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                        <Pin className="w-4 h-4 fill-[#C9A24B]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#0B1B3A]/5 text-[#0B1B3A]/50 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                        <FileText className="w-4 h-4" />
                      </div>
                    )}

                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {isImportant && (
                          <span className="px-2 py-0.5 rounded-md bg-[#C9A24B] text-[#0B1B3A] text-[9px] font-bold uppercase tracking-wider">
                            Priority
                          </span>
                        )}
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A24B]">
                          {notice.category}
                        </span>
                        <span className="text-[11px] text-[#0B1B3A]/40 font-sans">
                          {new Date(notice.date!).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#0B1B3A] leading-snug">
                        {notice.title}
                      </h4>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isOpen
                        ? "bg-[#C9A24B] text-[#0B1B3A]"
                        : "bg-[#0B1B3A]/5 text-[#0B1B3A]/60"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </motion.div>
                </button>

                {/* Accordion Expandable Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-[#0B1B3A]/80 font-sans border-t border-[#0B1B3A]/5 space-y-4">
                        <p className="leading-relaxed whitespace-pre-line">
                          {notice.body}
                        </p>

                        {/* Optional Attachment Label Download */}
                        {notice.attachmentLabel && (
                          <div className="pt-2">
                            <a
                              href={`/downloads/${notice.attachmentLabel}`}
                              download
                              onClick={(e) => {
                                e.preventDefault();
                                alert(`Downloading official dispatch: ${notice.attachmentLabel}`);
                              }}
                              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#C9A24B]/40 hover:border-[#C9A24B] text-xs font-semibold text-[#0B1B3A] shadow-xs transition-colors"
                            >
                              <Paperclip className="w-3.5 h-3.5 text-[#C9A24B]" />
                              <span>{notice.attachmentLabel}</span>
                              <Download className="w-3 h-3 text-[#0B1B3A]/40 ml-1" />
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0B1B3A] text-white hover:bg-[#C9A24B] hover:text-[#0B1B3A] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm group cursor-pointer"
          >
            <span>Load More Notices</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
