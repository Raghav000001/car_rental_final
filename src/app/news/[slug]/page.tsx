import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ScrollReveal from "@/components/ScrollReveal";
import { articles, getArticleBySlug, getRelatedArticles, categories } from "@/app/news/articles";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found - Rohit Tour & Travel" };

  return {
    title: `${article.title} - Rohit Tour & Travel News`,
    description: article.excerpt,
  };
}

function formatBody(text: string) {
  if (text.startsWith("**") && text.includes("**")) {
    const end = text.indexOf("**", 2);
    const bold = text.slice(2, end);
    const rest = text.slice(end + 2);
    return (
      <p className="text-white text-base md:text-lg font-bold leading-relaxed mb-5">
        {rest ? (
          <>
            <span className="text-primary">{bold}</span>
            {rest}
          </>
        ) : (
          <span className="text-primary">{bold}</span>
        )}
      </p>
    );
  }
  return (
    <p className="text-body text-base md:text-lg leading-relaxed mb-5">
      {text}
    </p>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const categoryLabel =
    categories.find((c) => c.id === article.category)?.label ||
    article.category;
  const related = getRelatedArticles(article.id, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* ───────── Hero ───────── */}
        <section className="relative pt-36 pb-12 lg:pt-44 lg:pb-16 overflow-hidden bg-secondary">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-bg-dark" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-[120px] animate-pulse" />

          <div className="relative max-w-4xl mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-body hover:text-primary text-sm font-bold transition-colors duration-300 mb-8"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to News
              </Link>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.15em]">
                  {categoryLabel}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-body">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-body">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-body">
                  <User className="w-3.5 h-3.5 text-primary" />
                  {article.author}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                {article.title}
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-body text-base md:text-lg leading-relaxed max-w-2xl">
                {article.excerpt}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────── Featured Image ───────── */}
        <section className="relative -mt-16 pb-12 lg:pb-16">
          <div className="max-w-5xl mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden aspect-[21/9] lg:aspect-[2.8/1] shadow-premium">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────── Article Content ───────── */}
        <section className="relative pb-16 lg:pb-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 lg:px-8">
            <div className="glass rounded-3xl p-6 md:p-10 lg:p-14">
              {article.body.map((paragraph, i) => (
                <ScrollReveal key={i}>{formatBody(paragraph)}</ScrollReveal>
              ))}

              {/* ───────── Author Card ───────── */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-body/60 uppercase tracking-widest font-bold mb-0.5">
                      Written by
                    </p>
                    <p className="text-white font-bold text-base">
                      {article.author}
                    </p>
                    <p className="text-body/60 text-xs">
                      Rohit Tour & Travel
                    </p>
                  </div>
                </div>
              </div>

              {/* ───────── Share ───────── */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-body/60 font-bold uppercase tracking-widest">
                  Share this article
                </p>
                <div className="flex gap-2">
                  {["Facebook", "Twitter", "LinkedIn"].map((s) => (
                    <span
                      key={s}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-body hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer uppercase tracking-wider"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Related Articles ───────── */}
        {related.length > 0 && (
          <section className="relative pb-16 lg:pb-24">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
              <ScrollReveal>
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      Related{" "}
                      <span className="text-gradient-primary">Articles</span>
                    </h2>
                    <p className="text-body text-sm mt-1">
                      Continue reading from our blog
                    </p>
                  </div>
                  <Link
                    href="/news"
                    className="hidden sm:inline-flex items-center gap-2 text-primary text-sm font-bold hover:text-white transition-colors duration-300"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {related.map((rel, i) => (
                  <Link href={`/news/${rel.id}`} key={rel.id}>
                    <ScrollReveal delay={i * 0.1}>
                      <article className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 cursor-pointer h-full flex flex-col">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={rel.image}
                            alt={rel.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/90 text-[9px] font-bold uppercase tracking-[0.15em]">
                              {categories.find((c) => c.id === rel.category)
                                ?.label || rel.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-5">
                          <div className="flex items-center gap-2 text-[11px] text-body/70 mb-2">
                            <Calendar className="w-3 h-3" />
                            {rel.date}
                            <span className="w-1 h-1 rounded-full bg-body/30" />
                            <Clock className="w-3 h-3" />
                            {rel.readTime}
                          </div>
                          <h3 className="text-sm font-bold text-white leading-[1.3] group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {rel.title}
                          </h3>
                        </div>
                      </article>
                    </ScrollReveal>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Newsletter
          title="Never Miss a Story"
          subtitle="Get the latest travel tips, destination guides, and company updates delivered to your inbox every week."
          benefitLabel="Weekly Digest"
        />
      </main>
      <Footer />
    </>
  );
}
