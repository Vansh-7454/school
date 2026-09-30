"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import type { IEvent } from "@/models";

interface EventsTabContentProps {
  initialEvents: Array<Partial<IEvent> & { _id: string; slug: string }>;
  featuredEvent?: (Partial<IEvent> & { _id: string; slug: string }) | null;
}

const CATEGORIES = ["All", "Academic", "Sports", "Cultural", "Community"] as const;
const REFERENCE_DATE = new Date("2026-09-29T12:00:00Z");

export function EventsTabContent({
  initialEvents,
  featuredEvent,
}: EventsTabContentProps) {
  const [timeFilter, setTimeFilter] = useState<"upcoming" | "past">("upcoming");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const result = initialEvents.filter((evt) => {
      const isPast = new Date(evt.date!) < REFERENCE_DATE;
      if (timeFilter === "upcoming" && isPast) return false;
      if (timeFilter === "past" && !isPast) return false;
      if (activeCategory !== "All" && evt.category !== activeCategory) return false;
      return true;
    });

    // Sort upcoming by nearest date first (ascending), past by newest first (descending)
    if (timeFilter === "upcoming") {
      result.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
    } else {
      result.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
    }

    return result;
  }, [initialEvents, timeFilter, activeCategory]);

  const displayedEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEvents.length;

  return (
    <div className="space-y-12">
      {/* Featured Event Card (only displayed when on 'upcoming' view) */}
      {timeFilter === "upcoming" && featuredEvent && (
        <div className="bg-[#0B1B3A] rounded-3xl p-8 sm:p-10 text-white border-2 border-[#C9A24B]/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#C9A24B] text-[#0B1B3A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Flagship Event</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider">
                  {featuredEvent.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                <Link
                  href={`/news-events/events/${featuredEvent.slug}`}
                  className="hover:text-[#C9A24B] transition-colors"
                >
                  {featuredEvent.title}
                </Link>
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans max-w-2xl">
                {featuredEvent.summary || featuredEvent.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/80 pt-2 font-sans">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C9A24B]" />
                  <span>
                    {new Date(featuredEvent.date!).toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A24B]" />
                  <span>{featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A24B]" />
                  <span>{featuredEvent.location}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href={`/news-events/events/${featuredEvent.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#C9A24B] text-[#0B1B3A] font-bold text-xs uppercase tracking-wider hover:bg-[#d8b35c] transition-all duration-300 shadow-md group"
              >
                <span>Event Details & RSVP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Toggle Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#0B1B3A]/10 shadow-sm">
        {/* Category Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-[#0B1B3A] text-white"
                    : "bg-[#FAF8F5] text-[#0B1B3A]/70 hover:bg-white hover:text-[#0B1B3A] border border-[#0B1B3A]/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Upcoming vs Past Toggle */}
        <div className="flex items-center rounded-xl bg-[#FAF8F5] p-1 border border-[#0B1B3A]/10 self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              setTimeFilter("upcoming");
              setVisibleCount(6);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              timeFilter === "upcoming"
                ? "bg-[#0B1B3A] text-[#C9A24B] shadow-xs"
                : "text-[#0B1B3A]/60 hover:text-[#0B1B3A]"
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => {
              setTimeFilter("past");
              setVisibleCount(6);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              timeFilter === "past"
                ? "bg-[#0B1B3A] text-[#C9A24B] shadow-xs"
                : "text-[#0B1B3A]/60 hover:text-[#0B1B3A]"
            }`}
          >
            Past Archives
          </button>
        </div>
      </div>

      {/* Grid of Event Cards */}
      {displayedEvents.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#0B1B3A]/10 space-y-2">
          <p className="font-serif text-xl font-bold text-[#0B1B3A]">
            No {timeFilter} events found
          </p>
          <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans">
            Try adjusting your category filter to view other campus activities.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {displayedEvents.map((evt) => {
              const evtDate = new Date(evt.date!);
              const isPast = evtDate < REFERENCE_DATE;

              return (
                <motion.div
                  key={evt._id || evt.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#0B1B3A]/10 hover:border-[#C9A24B] transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Date Badge & Status */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      {/* Date Badge */}
                      <div className="w-14 h-14 rounded-2xl bg-[#0B1B3A] text-white flex flex-col items-center justify-center border border-[#C9A24B]/30 group-hover:bg-[#C9A24B] group-hover:text-[#0B1B3A] transition-colors duration-300">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 leading-none">
                          {evtDate.toLocaleDateString("en-GB", { month: "short" })}
                        </span>
                        <span className="text-xl font-serif font-bold leading-none mt-0.5">
                          {evtDate.getDate()}
                        </span>
                      </div>

                      {/* Status & Category Pills */}
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                            isPast
                              ? "bg-[#0B1B3A]/10 text-[#0B1B3A]/60"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isPast ? "Concluded" : "Upcoming"}
                        </span>
                        <span className="text-[11px] font-semibold text-[#C9A24B] uppercase tracking-wider">
                          {evt.category}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xl font-serif font-bold text-[#0B1B3A] mb-2 group-hover:text-[#C9A24B] transition-colors line-clamp-2">
                      <Link href={`/news-events/events/${evt.slug}`}>
                        {evt.title}
                      </Link>
                    </h4>

                    <p className="text-xs sm:text-sm text-[#0B1B3A]/70 leading-relaxed font-sans line-clamp-3 mb-6">
                      {evt.summary || evt.description}
                    </p>
                  </div>

                  {/* Card Meta & Link */}
                  <div className="pt-4 border-t border-[#0B1B3A]/5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#0B1B3A]/60 font-sans">
                      <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#0B1B3A]/60 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                      <span className="truncate">{evt.location}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/news-events/events/${evt.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0B1B3A] text-white hover:bg-[#C9A24B] hover:text-[#0B1B3A] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm group cursor-pointer"
          >
            <span>Load More Events</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
