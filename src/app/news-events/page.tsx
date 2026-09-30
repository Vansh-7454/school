import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { NewsEventsTabContainer } from "@/components/sections/news-events";
import { InstitutionalCtaSection } from "@/components/ui/InstitutionalCtaSection";
import { getEvents, getArticles, getNotices } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Explore upcoming campus events, academic symposiums, student journalism articles, and official administrative notices from Aurelia International School.",
  keywords: [
    "Aurelia School Events",
    "School Calendar London",
    "Student News",
    "Official Notices",
    "Academic Symposium",
  ],
};

interface NewsEventsPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function NewsEventsPage({ searchParams }: NewsEventsPageProps) {
  const resolvedParams = await searchParams;
  const initialTab = resolvedParams.tab || "events";

  // Fetch events, articles, and notices concurrently
  const [eventsData, articlesData, noticesData] = await Promise.all([
    getEvents({ timeFilter: "all", limit: 30 }),
    getArticles({ limit: 30 }),
    getNotices({ limit: 30 }),
  ]);

  return (
    <main className="min-h-screen bg-[#FBF6EA]">
      {/* PageHero with swinging school bell and pinned notes */}
      <PageHero
        eyebrow="Chronicle & Calendar"
        title="Dispatches, Fixtures &"
        titleAccent="Campus Dialogue"
        description="Stay informed with upcoming academic symposiums, international regattas, student journalism, and official collegiate circulars."
        breadcrumbs={[{ label: "News & Events" }]}
        decorationType="news-events"
        nextTone="cream"
      />

      {/* Tab Switcher & Dynamic Tab Content */}
      <NewsEventsTabContainer
        initialEvents={eventsData.events}
        featuredEvent={eventsData.featuredEvent}
        initialArticles={articlesData.articles}
        featuredArticle={articlesData.featuredArticle}
        initialNotices={noticesData.notices}
        initialTab={initialTab}
      />

      {/* Reusable Final Institutional CTA */}
      <InstitutionalCtaSection
        eyebrow="Campus Dialogue"
        title="Stay Connected With Our"
        titleAccent="Collegiate Community"
        description="Receive our termly scholastic gazette, join public symposium lectures, or consult with our administrative secretariat."
        primaryAction={{
          label: "Subscribe to Gazette",
          href: "/contact#contact-form",
        }}
        secondaryAction={{
          label: "Admissions Calendar",
          href: "/admissions",
        }}
        fromTone="cream"
        showTopCurve={true}
      />
    </main>
  );
}
