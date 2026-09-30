import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Home,
} from "lucide-react";
import { getEventBySlug, getRelatedEvents, STATIC_EVENTS } from "@/lib/data";
import { AddToCalendarButton, ShareLinkButton } from "@/components/sections/news-events";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return STATIC_EVENTS.map((e) => ({
    slug: e.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const evt = await getEventBySlug(slug);

  if (!evt) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: evt.title,
    description: evt.summary || evt.description,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const evt = await getEventBySlug(slug);

  if (!evt) {
    notFound();
  }

  const relatedEvents = await getRelatedEvents(slug, 3);
  const evtDate = new Date(evt.date);

  // Determine prev and next events
  const currentIndex = STATIC_EVENTS.findIndex((e) => e.slug === slug);
  const prevEvent = currentIndex > 0 ? STATIC_EVENTS[currentIndex - 1] : null;
  const nextEvent =
    currentIndex >= 0 && currentIndex < STATIC_EVENTS.length - 1
      ? STATIC_EVENTS[currentIndex + 1]
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": evt.title,
    "description": evt.summary || evt.description,
    "startDate": evt.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": evt.location || "Aurelia Campus Grounds",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "45 Kensington Palace Gardens",
        "addressLocality": "London",
        "postalCode": "W8 4QP",
        "addressCountry": "GB",
      },
    },
    "organizer": {
      "@type": "EducationalOrganization",
      "name": "Aurelia International School",
      "url": "https://aurelia-international.edu",
    },
  };

  return (
    <main className="min-h-screen bg-[#FBF6EA] pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 text-xs text-[#0B1B3A]/60 mb-8 flex-wrap"
        >
          <Link href="/" className="hover:text-[#C9A24B] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C9A24B]" />
          <Link href="/news-events" className="hover:text-[#C9A24B] transition-colors">
            News & Events
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C9A24B]" />
          <Link href="/news-events?tab=events" className="hover:text-[#C9A24B] transition-colors">
            Events
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C9A24B]" />
          <span className="text-[#0B1B3A] font-semibold truncate max-w-xs">
            {evt.title}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/news-events?tab=events"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/70 hover:text-[#C9A24B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Events</span>
          </Link>
        </div>

        {/* Main Event Article Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0B1B3A]/10 shadow-xl space-y-8">
          {/* Header Block */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-[#0B1B3A] text-[#C9A24B] text-xs font-bold uppercase tracking-wider">
                {evt.category}
              </span>
              {evt.featured && (
                <span className="px-3 py-1 rounded-full bg-[#C9A24B] text-[#0B1B3A] text-xs font-bold uppercase tracking-wider">
                  Featured Event
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B1B3A] tracking-tight leading-tight">
              {evt.title}
            </h1>

            <p className="text-base sm:text-lg text-[#0B1B3A]/70 font-sans leading-relaxed">
              {evt.summary}
            </p>
          </div>

          {/* Key Facts Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-[#FAF8F5] border border-[#0B1B3A]/10 text-xs text-[#0B1B3A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <span className="font-semibold text-[#0B1B3A]/50 uppercase tracking-wider block text-[10px]">
                  Date
                </span>
                <span className="font-bold text-sm">
                  {evtDate.toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <span className="font-semibold text-[#0B1B3A]/50 uppercase tracking-wider block text-[10px]">
                  Time
                </span>
                <span className="font-bold text-sm">{evt.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <span className="font-semibold text-[#0B1B3A]/50 uppercase tracking-wider block text-[10px]">
                  Location
                </span>
                <span className="font-bold text-sm">{evt.location}</span>
              </div>
            </div>
          </div>

          {/* Action Row: Add to Calendar & Share Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#0B1B3A]/10">
            <AddToCalendarButton
              title={evt.title}
              description={evt.description}
              location={evt.location}
              startDate={evt.date}
              time={evt.time}
            />

            <ShareLinkButton title={evt.title} />
          </div>

          {/* Long Description Body */}
          <div className="prose prose-lg text-[#0B1B3A]/80 font-sans leading-relaxed space-y-5">
            <p className="text-base sm:text-lg leading-relaxed">
              {evt.longDescription || evt.description}
            </p>
            <p className="text-sm text-[#0B1B3A]/70 leading-relaxed">
              For security and catering accommodations, all visiting guests, parents, and alumni
              must register their attendance in advance. Visitor passes will be issued upon arrival
              at the West Gate Security Lodge.
            </p>
          </div>
        </div>

        {/* Previous / Next Event Navigation */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevEvent ? (
            <Link
              href={`/news-events/events/${prevEvent.slug}`}
              className="p-5 rounded-2xl bg-white border border-[#0B1B3A]/10 hover:border-[#C9A24B] transition-all flex items-center gap-3 group"
            >
              <ArrowLeft className="w-4 h-4 text-[#C9A24B] group-hover:-translate-x-1 transition-transform" />
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-[#0B1B3A]/40 block">
                  Previous Event
                </span>
                <span className="font-serif font-bold text-sm text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors truncate block">
                  {prevEvent.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextEvent && (
            <Link
              href={`/news-events/events/${nextEvent.slug}`}
              className="p-5 rounded-2xl bg-white border border-[#0B1B3A]/10 hover:border-[#C9A24B] transition-all flex items-center justify-end text-right gap-3 group sm:col-start-2"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-[#0B1B3A]/40 block">
                  Next Event
                </span>
                <span className="font-serif font-bold text-sm text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors truncate block">
                  {nextEvent.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C9A24B] group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="mt-16 space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#0B1B3A]">
              Other Upcoming Gatherings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedEvents.map((rel: { slug: string; category?: string; title: string; date?: string | Date }) => (
                <Link
                  key={rel.slug}
                  href={`/news-events/events/${rel.slug}`}
                  className="bg-white rounded-2xl p-5 border border-[#0B1B3A]/10 hover:border-[#C9A24B] transition-all hover:shadow-md group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#C9A24B] block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="pt-3 border-t border-[#0B1B3A]/5 text-xs text-[#0B1B3A]/60 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>
                      {rel.date
                        ? new Date(rel.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Upcoming"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
