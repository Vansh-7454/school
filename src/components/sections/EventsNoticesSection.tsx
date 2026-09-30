import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Bell, Tag } from "lucide-react";
import connectToDatabase from "@/lib/db";
import { Event } from "@/models/Event";
import { Notice } from "@/models/Notice";
import { fallbackEvents, fallbackNotices, SampleEvent, SampleNotice } from "@/data/staticEventsNotices";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

async function getEventsAndNotices(): Promise<{ events: SampleEvent[]; notices: SampleNotice[] }> {
  try {
    await connectToDatabase();
    // Fetch 3 upcoming events sorted by date ascending
    const eventsPromise = Event.find({ date: { $gte: new Date(Date.now() - 86400000) } })
      .sort({ date: 1 })
      .limit(3)
      .lean();

    // Fetch 4 latest notices sorted by date descending
    const noticesPromise = Notice.find()
      .sort({ date: -1 })
      .limit(4)
      .lean();

    const [events, notices] = await Promise.all([eventsPromise, noticesPromise]);

    return {
      events: events && events.length > 0 ? JSON.parse(JSON.stringify(events)) : fallbackEvents,
      notices: notices && notices.length > 0 ? JSON.parse(JSON.stringify(notices)) : fallbackNotices,
    };
  } catch {
    // Graceful fallback to static data so page never crashes
    return {
      events: fallbackEvents,
      notices: fallbackNotices,
    };
  }
}

export async function EventsNoticesSection() {
  const { events, notices } = await getEventsAndNotices();

  return (
    <Section id="events-notices" tone="white">
      {/* Section Header with Action Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div className="space-y-3">
          <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#916C28] uppercase block">
            School Community
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#0B1B3A] leading-tight">
            Upcoming Events &amp; <br className="hidden sm:inline" />
            <span className="gold-gradient-text">Official Notices</span>
          </h2>
          <p className="text-base sm:text-lg text-[#0B1B3A]/75 font-normal max-w-2xl">
            Stay informed with academic dates, cultural fixtures, and vital administrative circulars.
          </p>
        </div>

        <Link href="/news-events">
          <Button variant="secondary" className="shrink-0">
            <span>View All Calendar Events</span>
            <ArrowRight strokeWidth={1.75} className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* 2-Column Split: Events (7 cols) + Notices (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        {/* Left Column: 3 Upcoming Event Cards */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar strokeWidth={1.75} className="w-4 h-4 text-[#916C28]" />
            <h3 className="font-serif text-xl font-medium text-[#0B1B3A]">
              Next Upcoming Events
            </h3>
          </div>

          {events.map((evt: SampleEvent, idx: number) => {
            const eventDate = new Date(evt.date);
            const dayStr = eventDate.toLocaleDateString("en-GB", { day: "2-digit" });
            const monthStr = eventDate.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();

            return (
              <Card
                key={evt._id || idx}
                variant="light"
                className="group p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6"
              >
                {/* Distinct Date Badge */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#0B1B3A] text-[#FBF6EA] flex flex-col items-center justify-center shrink-0 border border-[#C9A24B]/40 shadow-md group-hover:scale-105 group-hover:bg-[#07122A] transition-all">
                  <span className="font-serif text-2xl font-bold text-[#DFBE72] leading-none">
                    {dayStr}
                  </span>
                  <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-[#FBF6EA]/90 mt-1">
                    {monthStr}
                  </span>
                </div>

                {/* Event Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#C9A24B]/15 text-[#916C28] border border-[#C9A24B]/30">
                      {evt.category || "Campus Life"}
                    </span>
                    {evt.time && (
                      <span className="inline-flex items-center gap-1 text-xs text-[#0B1B3A]/70 font-medium">
                        <Clock strokeWidth={1.75} className="w-3 h-3 text-[#916C28]" />
                        <span>{evt.time}</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-lg sm:text-xl font-medium text-[#0B1B3A] group-hover:text-[#916C28] transition-colors leading-snug">
                    {evt.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#0B1B3A]/75 mt-1.5 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-[#0B1B3A]/70 font-medium mt-3">
                    <MapPin strokeWidth={1.75} className="w-3.5 h-3.5 text-[#916C28] shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right Column: 4 Latest Notices as Compact List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell strokeWidth={1.75} className="w-4 h-4 text-[#916C28]" />
            <h3 className="font-serif text-xl font-medium text-[#0B1B3A]">
              Official Notices
            </h3>
          </div>

          <Card variant="light" className="p-6 divide-y divide-[#C9A24B]/15">
            {notices.map((notice: SampleNotice, idx: number) => {
              const noticeDate = new Date(notice.date);
              const formattedDate = noticeDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div key={notice._id || idx} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex items-center justify-between gap-3 text-[11px]">
                    <span className="font-sans font-semibold uppercase tracking-wider text-[#916C28] flex items-center gap-1">
                      <Tag strokeWidth={1.75} className="w-3 h-3 text-[#916C28]" />
                      {notice.category}
                    </span>
                    <span className="text-[#0B1B3A]/50 font-medium">{formattedDate}</span>
                  </div>

                  <h5 className="font-serif text-base sm:text-lg font-medium text-[#0B1B3A] hover:text-[#916C28] transition-colors cursor-pointer leading-snug">
                    {notice.title}
                  </h5>

                  <p className="text-xs text-[#0B1B3A]/75 line-clamp-2 leading-relaxed">
                    {notice.body}
                  </p>
                </div>
              );
            })}
          </Card>

          {/* Quick Link Card to Portal Notices */}
          <div className="p-4 rounded-[20px] bg-[#0B1B3A] text-[#FBF6EA] flex items-center justify-between gap-4 border border-[#C9A24B]/30 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#DFBE72] shrink-0">
                <Bell strokeWidth={1.75} className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-medium text-[#FBF6EA]">Parent &amp; Scholar Portal Notices</p>
                <p className="text-[#FBF6EA]/60">Log in to view internal circulars</p>
              </div>
            </div>
            <Link href="/portal">
              <Button variant="primary" className="h-9 px-4 text-xs">
                Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default EventsNoticesSection;
