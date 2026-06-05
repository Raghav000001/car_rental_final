"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Calendar,
  ArrowRight,
  Search,
  Clock,
  User,
  ChevronRight,
  Tag,
} from "lucide-react";
import { articles, categories } from "@/app/news/articles";

const ITEMS_PER_PAGE = 6;

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = useMemo(() => {
    let result =
      activeCategory === "all"
        ? articles
        : articles.filter((a) => a.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const featured = filtered.find((a) => a.featured);
  const regular = filtered.filter((a) => a.id !== featured?.id);
  const visibleArticles = regular.slice(0, visibleCount);
  const hasMore = visibleCount < regular.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <>
      {/* ───────── Featured Article ───────── */}
      {featured && (
        <section className="relative overflow-hidden pb-8 lg:pb-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <Link href={`/news/${featured.id}`} className="group relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center glass rounded-3xl p-6 md:p-8 lg:p-10 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[400px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.15em]">
                      Featured
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/90 text-[10px] font-bold uppercase tracking-[0.15em]">
                      {categories.find((c) => c.id === featured.category)
                        ?.label || featured.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-body">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {featured.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {featured.author}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight group-hover:text-primary transition-colors duration-300">
                    {featured.title}
                  </h2>

                  <p className="text-body text-sm md:text-base leading-relaxed">
                    {featured.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-primary text-sm font-bold group-hover:text-white transition-colors duration-300 group/link">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ───────── Filters + Search ───────── */}
      <section className="relative overflow-hidden pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-10">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-primary text-white shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)]"
                        : "bg-white/5 text-body border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body/60 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-body/50 outline-none focus:border-primary/60 transition-all duration-300"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* ───────── Article Grid ───────── */}
          <AnimatePresence mode="wait">
            {visibleArticles.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {visibleArticles.map((article, i) => (
                  <Link
                    href={`/news/${article.id}`}
                    key={article.id}
                    className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 cursor-pointer flex flex-col"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: (i % 6) * 0.06, duration: 0.5 }}
                      className="flex flex-col flex-1"
                    >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/90 text-[9px] font-bold uppercase tracking-[0.15em] flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5 text-primary" />
                          {categories.find((c) => c.id === article.category)
                            ?.label || article.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-5 lg:p-6">
                      <div className="flex items-center gap-3 text-[11px] text-body/70 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-body/30" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      <h3 className="text-base lg:text-lg font-bold text-white leading-[1.3] mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-body text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <span className="text-[11px] text-body/60 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.author}
                        </span>
                        <span className="text-primary text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                          Read More
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
                  <Search className="w-8 h-8 text-body/40" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No articles found
                </h3>
                <p className="text-body text-sm max-w-md mx-auto">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ───────── Load More ───────── */}
          {hasMore && (
            <ScrollReveal>
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-primary hover:border-primary text-white font-bold text-sm uppercase tracking-[0.15em] rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Load More Articles
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>
          )}

          {/* ───────── Counter ───────── */}
          <ScrollReveal>
            <div className="text-center mt-8">
              <p className="text-body/60 text-xs">
                Showing{" "}
                <span className="text-white font-bold">
                  {visibleArticles.length}
                </span>{" "}
                of{" "}
                <span className="text-white font-bold">{regular.length}</span>{" "}
                articles
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
