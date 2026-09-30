"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Newspaper, BellRing } from "lucide-react";
import { EventsTabContent } from "./EventsTabContent";
import { NewsTabContent } from "./NewsTabContent";
import { NoticesTabContent } from "./NoticesTabContent";
import type { IEvent, IArticle, INotice } from "@/models";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

interface NewsEventsTabContainerProps {
  initialEvents: Array<Partial<IEvent> & { _id: string; slug: string }>;
  featuredEvent?: (Partial<IEvent> & { _id: string; slug: string }) | null;
  initialArticles: Array<Partial<IArticle> & { _id: string; slug: string }>;
  featuredArticle?: (Partial<IArticle> & { _id: string; slug: string }) | null;
  initialNotices: Array<Partial<INotice> & { _id: string; slug: string }>;
  initialTab?: string;
}

const TABS = [
  { id: "events", label: "Events & Calendar", icon: CalendarDays },
  { id: "news", label: "News & Features", icon: Newspaper },
  { id: "notices", label: "Official Circulars", icon: BellRing },
] as const;

type TabId = "events" | "news" | "notices";

export function NewsEventsTabContainer({
  initialEvents,
  featuredEvent,
  initialArticles,
  featuredArticle,
  initialNotices,
  initialTab = "events",
}: NewsEventsTabContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlTab = searchParams.get("tab") as TabId | null;
  const [activeTab, setActiveTab] = useState<TabId>(
    urlTab && ["events", "news", "notices"].includes(urlTab) ? urlTab : (initialTab as TabId)
  );

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.replace(`/news-events?${params.toString()}`, { scroll: false });
  };

  return (
    <Section tone="cream" className="py-16 md:py-24 min-h-screen">
      <Container>
        {/* Tab Switcher Header (Horizontal scroll with snap on mobile) */}
        <div className="flex items-center justify-start sm:justify-center mb-8 sm:mb-16 overflow-x-auto pb-2 scrollbar-none snap-x px-2 -mx-2 sm:mx-0">
          <div className="inline-flex items-center p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-white border border-[#0B1B3A]/10 shadow-sm relative shrink-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative min-h-[44px] px-3.5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer z-10 whitespace-nowrap snap-start shrink-0 ${
                    isActive ? "text-[#0B1B3A]" : "text-[#0B1B3A]/60 hover:text-[#0B1B3A]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#C9A24B]" : "text-[#0B1B3A]/40"}`} />
                  <span>{tab.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#FAF8F5] border border-[#C9A24B]/40 rounded-xl shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Tab Content Switch */}
        <AnimatePresence mode="wait">
          {activeTab === "events" && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <EventsTabContent
                initialEvents={initialEvents}
                featuredEvent={featuredEvent}
              />
            </motion.div>
          )}

          {activeTab === "news" && (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <NewsTabContent
                initialArticles={initialArticles}
                featuredArticle={featuredArticle}
              />
            </motion.div>
          )}

          {activeTab === "notices" && (
            <motion.div
              key="notices"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <NoticesTabContent initialNotices={initialNotices} />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
