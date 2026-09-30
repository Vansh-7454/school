"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import type { IArticle } from "@/models";

interface NewsTabContentProps {
  initialArticles: Array<Partial<IArticle> & { _id: string; slug: string }>;
  featuredArticle?: (Partial<IArticle> & { _id: string; slug: string }) | null;
}

const CATEGORIES = [
  "All",
  "Achievements",
  "Campus News",
  "Announcements",
  "Student Voices",
] as const;

export function NewsTabContent({
  initialArticles,
  featuredArticle,
}: NewsTabContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Filter articles
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialArticles.filter((art) => {
      if (activeCategory !== "All" && art.category !== activeCategory) {
        return false;
      }
      if (q) {
        const titleMatch = art.title?.toLowerCase().includes(q);
        const excerptMatch = art.excerpt?.toLowerCase().includes(q);
        const authorMatch = art.author?.toLowerCase().includes(q);
        if (!titleMatch && !excerptMatch && !authorMatch) return false;
      }
      return true;
    });
  }, [initialArticles, activeCategory, searchQuery]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <div className="space-y-12">
      {/* Featured Article Card (shown when no active search) */}
      {!searchQuery && featuredArticle && (
        <div className="bg-[#0B1B3A] rounded-3xl p-8 sm:p-10 text-white border-2 border-[#C9A24B]/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#C9A24B] text-[#0B1B3A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Journalism</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider">
                  {featuredArticle.category}
                </span>
                <span className="text-xs text-white/60">
                  {featuredArticle.readTime || "4 min read"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                <Link
                  href={`/news-events/news/${featuredArticle.slug}`}
                  className="hover:text-[#C9A24B] transition-colors"
                >
                  {featuredArticle.title}
                </Link>
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans max-w-2xl">
                {featuredArticle.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/70 pt-2 font-sans">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>{featuredArticle.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>
                    {new Date(featuredArticle.publishedAt!).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href={`/news-events/news/${featuredArticle.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#C9A24B] text-[#0B1B3A] font-bold text-xs uppercase tracking-wider hover:bg-[#d8b35c] transition-all duration-300 shadow-md group"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-white border border-[#0B1B3A]/10 shadow-sm">
        {/* Category Chips - horizontally scrollable row on mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(6);
                }}
                className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 snap-start whitespace-nowrap cursor-pointer flex items-center justify-center ${
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

        {/* Search Input - full width on mobile */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0B1B3A]/40">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(6);
            }}
            placeholder="Search articles, topics..."
            className="w-full h-11 min-h-[44px] pl-9 pr-4 rounded-xl bg-[#FAF8F5] border border-[#0B1B3A]/10 text-base sm:text-xs text-[#0B1B3A] placeholder-[#0B1B3A]/40 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B]"
          />
        </div>
      </div>

      {/* Grid of Articles */}
      {displayedArticles.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#0B1B3A]/10 space-y-2">
          <p className="font-serif text-xl font-bold text-[#0B1B3A]">
            No articles match your criteria
          </p>
          <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans">
            Try adjusting your search query or selecting a different category.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {displayedArticles.map((art) => (
              <motion.article
                key={art._id || art.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#0B1B3A]/10 hover:border-[#C9A24B] transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#C9A24B] border border-[#0B1B3A]/5">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-[#0B1B3A]/45 font-sans">
                      {art.readTime || "4 min read"}
                    </span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-[#0B1B3A] mb-2 group-hover:text-[#C9A24B] transition-colors line-clamp-2">
                    <Link href={`/news-events/news/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h4>

                  <p className="text-xs sm:text-sm text-[#0B1B3A]/70 leading-relaxed font-sans line-clamp-3 mb-6">
                    {art.excerpt}
                  </p>
                </div>

                {/* Author, Date, and Read Link */}
                <div className="pt-4 border-t border-[#0B1B3A]/5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#0B1B3A]/60 font-sans">
                    <span className="truncate max-w-[160px] font-medium text-[#0B1B3A]">
                      {art.author}
                    </span>
                    <span>
                      {new Date(art.publishedAt!).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <Link
                    href={`/news-events/news/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
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
            <span>Load More Articles</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
