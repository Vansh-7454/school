import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Home,
} from "lucide-react";
import { getArticleBySlug, getRelatedArticles, STATIC_ARTICLES } from "@/lib/data";
import { ShareLinkButton, ReadingProgressBar } from "@/components/sections/news-events";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return STATIC_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const art = await getArticleBySlug(slug);

  if (!art) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: art.title,
    description: art.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const art = await getArticleBySlug(slug);

  if (!art) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(slug, 3);
  const pubDate = new Date(art.publishedAt);

  // Determine prev and next articles
  const currentIndex = STATIC_ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? STATIC_ARTICLES[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < STATIC_ARTICLES.length - 1
      ? STATIC_ARTICLES[currentIndex + 1]
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": art.title,
    "description": art.excerpt,
    "image": art.imageUrl,
    "datePublished": art.publishedAt,
    "author": {
      "@type": "Person",
      "name": art.author || "Faculty Dean",
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Aurelia International School",
      "url": "https://aurelia-international.edu",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://aurelia-international.edu/news-events/news/${slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-[#FBF6EA] pt-28 pb-24 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
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
          <Link href="/news-events?tab=news" className="hover:text-[#C9A24B] transition-colors">
            News
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C9A24B]" />
          <span className="text-[#0B1B3A] font-semibold truncate max-w-xs">
            {art.title}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/news-events?tab=news"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/70 hover:text-[#C9A24B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-8 sm:p-14 border border-[#0B1B3A]/10 shadow-xl space-y-10">
          {/* Header */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-[#0B1B3A] text-[#C9A24B] text-xs font-bold uppercase tracking-wider">
                {art.category}
              </span>
              <span className="text-xs text-[#0B1B3A]/50 font-sans flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>{art.readTime || "4 min read"}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B1B3A] tracking-tight leading-tight">
              {art.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#0B1B3A]/70 font-serif italic leading-relaxed border-l-2 border-[#C9A24B] pl-5">
              {art.excerpt}
            </p>

            {/* Author byline and share */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#0B1B3A]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center font-bold text-sm">
                  {art.author.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0B1B3A] block">
                    {art.author}
                  </span>
                  <span className="text-xs text-[#0B1B3A]/50">
                    Published on{" "}
                    {pubDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <ShareLinkButton title={art.title} />
            </div>
          </div>

          {/* Article Body with Serif Drop Cap */}
          <div className="max-w-prose mx-auto font-sans text-base sm:text-lg text-[#0B1B3A]/85 leading-relaxed space-y-6">
            {art.body.map((paragraph: string, idx: number) => {
              if (idx === 0) {
                const firstChar = paragraph.charAt(0);
                const restOfParagraph = paragraph.slice(1);
                return (
                  <p key={idx} className="leading-relaxed">
                    <span className="float-left text-5xl sm:text-6xl font-serif font-bold text-[#0B1B3A] leading-none pr-3 pt-1">
                      {firstChar}
                    </span>
                    {restOfParagraph}
                  </p>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Article Footer */}
          <div className="pt-8 border-t border-[#0B1B3A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0B1B3A]/60">
            <span>Official Journal of Aurelia International School</span>
            <ShareLinkButton title={art.title} />
          </div>
        </article>

        {/* Previous / Next Article Navigation */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/news-events/news/${prevArticle.slug}`}
              className="p-5 rounded-2xl bg-white border border-[#0B1B3A]/10 hover:border-[#C9A24B] transition-all flex items-center gap-3 group"
            >
              <ArrowLeft className="w-4 h-4 text-[#C9A24B] group-hover:-translate-x-1 transition-transform" />
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-[#0B1B3A]/40 block">
                  Previous Dispatch
                </span>
                <span className="font-serif font-bold text-sm text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors truncate block">
                  {prevArticle.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle && (
            <Link
              href={`/news-events/news/${nextArticle.slug}`}
              className="p-5 rounded-2xl bg-white border border-[#0B1B3A]/10 hover:border-[#C9A24B] transition-all flex items-center justify-end text-right gap-3 group sm:col-start-2"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-[#0B1B3A]/40 block">
                  Next Dispatch
                </span>
                <span className="font-serif font-bold text-sm text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors truncate block">
                  {nextArticle.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C9A24B] group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#0B1B3A]">
              Further Perspectives & Features
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel: { slug: string; category?: string; title: string; readTime?: string; publishedAt?: string | Date }) => (
                <Link
                  key={rel.slug}
                  href={`/news-events/news/${rel.slug}`}
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
                  <div className="pt-3 border-t border-[#0B1B3A]/5 text-xs text-[#0B1B3A]/60 flex items-center justify-between">
                    <span>{rel.readTime || "4 min read"}</span>
                    <span>
                      {rel.publishedAt
                        ? new Date(rel.publishedAt).toLocaleDateString("en-GB", {
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
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
