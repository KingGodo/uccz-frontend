"use client";

/**
 * UCCZ Blog Page — app/(public)/blog/page.tsx
 *
 * Real blog posts from live uccz.org.
 * Features:
 * - Hero header with brand color
 * - Category filter tabs (All, Faith, Love, Humility, Giving, etc.)
 * - Search input
 * - Featured post (first/largest)
 * - Responsive card grid
 * - Framer Motion stagger animations
 * - App download banner (from live site)
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, BookOpen, Eye } from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_D  = "rgb(40, 52, 76)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Real blog posts from live uccz.org ────────────────────────────────────
const POSTS = [
  {
    slug:     "the-love-that-perseveres",
    category: "Love",
    title:    "The Love that Perseveres",
    excerpt:  "Love is not mere sentiment, but a commitment to sacrifice for the good of others. As we abide in God's love, we are empowered to love even those who wrong us, to forgive those who hurt us, and to keep loving even when it is difficult.",
    date:     "Jan 23, 2019",
    views:    501,
    featured: true,
  },
  {
    slug:     "cultivating-a-humble-spirit",
    category: "Humility",
    title:    "Cultivating a Humble Spirit",
    excerpt:  "Humility is a rare and precious virtue in our self-focused culture. Yet Scripture commands us to clothe ourselves with humility. A humble spirit acknowledges our total dependence on God and our need for His grace.",
    date:     "Jan 23, 2019",
    views:    501,
    featured: false,
  },
  {
    slug:     "faith-in-the-midst-of-uncertainty",
    category: "Faith",
    title:    "Faith in the Midst of Uncertainty",
    excerpt:  "In a world filled with anxiety and unanswered questions, faith calls us to trust in God's sovereign plan. True faith rests not in our own understanding, but in the character of a loving and all-powerful God.",
    date:     "Jan 23, 2019",
    views:    501,
    featured: false,
  },
  {
    slug:     "giving-as-an-act-of-worship",
    category: "Giving",
    title:    "Giving as an Act of Worship",
    excerpt:  "Giving is not just a religious duty, but a profound act of worship that aligns our hearts with God's heart. As we freely offer back to God a portion of what He has first given us, we express gratitude, trust, and surrender.",
    date:     "Jan 23, 2019",
    views:    501,
    featured: false,
  },
  {
    slug:     "investing-in-eternal-dividends",
    category: "Stewardship",
    title:    "Investing in Eternal Dividends",
    excerpt:  "Our financial resources are not our own, but a stewardship entrusted to us by God. When we give to advance the Gospel and serve the poor, we are making investments that will pay eternal dividends.",
    date:     "Jan 23, 2019",
    views:    5,
    featured: false,
  },
  {
    slug:     "generosity-in-a-world-of-scarcity",
    category: "Generosity",
    title:    "Generosity in a World of Scarcity",
    excerpt:  "In a culture that idolizes wealth and self-sufficiency, Christians are called to a radical generosity modeled after our lavishly giving God. Generous giving reflects the gospel truth that we are recipients of God's boundless grace.",
    date:     "Jan 23, 2019",
    views:    5,
    featured: false,
  },
  {
    slug:     "the-joyful-duty-of-tithing",
    category: "Tithe",
    title:    "The Joyful Duty of Tithing",
    excerpt:  "Tithing is not merely an obligation, but a privilege that allows us to honor God and participate in His work. Through faithful giving, we demonstrate our trust in His provision and store up treasures in heaven.",
    date:     "Jan 23, 2019",
    views:    5,
    featured: false,
  },
];

// Derive unique categories
const CATEGORIES = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// ── Category pill ──────────────────────────────────────────────────────────
function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-full text-[12.5px] font-semibold transition-all duration-200 whitespace-nowrap active:scale-[0.97]"
      style={{
        fontFamily:      "'Source Sans 3', sans-serif",
        backgroundColor: active ? BRAND : "rgba(54,69,99,0.06)",
        color:           active ? "white" : BRAND,
      }}
    >
      {label}
    </button>
  );
}

// ── Featured post card ─────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: typeof POSTS[0] }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-[0_12px_48px_rgba(54,69,99,0.13)] hover:border-transparent cursor-pointer"
        variants={cardVariant}
      >
        {/* Colored top band */}
        <div
          className="h-[3px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          style={{ backgroundColor: BRAND }}
          aria-hidden="true"
        />

        <div className="p-8 md:p-10">
          {/* Featured label + category */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
              style={{ backgroundColor: BRAND, color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Featured
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
              style={{ backgroundColor: BRAND_BG, color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-[26px] md:text-[32px] font-bold text-slate-900 leading-[1.15] tracking-[-0.01em] group-hover:text-[rgb(54,69,99)] transition-colors duration-200"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p
            className="mt-4 text-[14.5px] text-slate-500 leading-[1.8] max-w-2xl"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span
                className="text-[12px] text-slate-400"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-slate-400" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                <Eye size={12} aria-hidden="true" />
                {post.views}
              </span>
            </div>
            <span
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-200 group-hover:gap-2.5"
              style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Read Article
              <ArrowRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// ── Regular blog card ──────────────────────────────────────────────────────
function BlogCard({ post }: { post: typeof POSTS[0] }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        className="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-[0_8px_40px_rgba(54,69,99,0.11)] cursor-pointer"
        variants={cardVariant}
        layout
      >
        {/* Brand top line on hover */}
        <div
          className="h-[3px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shrink-0"
          style={{ backgroundColor: BRAND }}
          aria-hidden="true"
        />

        <div className="flex flex-col flex-1 p-6">
          {/* Category */}
          <span
            className="self-start text-[10.5px] font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: BRAND_BG, color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h3
            className="text-[17px] font-bold text-slate-900 leading-snug group-hover:text-[rgb(54,69,99)] transition-colors duration-200"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className="mt-3 text-[13px] text-slate-500 leading-[1.8] flex-1 line-clamp-3"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11.5px] text-slate-400" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-[11.5px] text-slate-400" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                <Eye size={11} aria-hidden="true" />
                {post.views}
              </span>
            </div>
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: BRAND }}
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery,    setSearchQuery]    = useState("");

  // Filter posts by category + search
  const filtered = useMemo(() => {
    return POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featured    = filtered.find((p) => p.featured);
  const regularPosts = filtered.filter((p) => !p.featured || activeCategory !== "All" || searchQuery);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Page header ── */}
      <div
        className="relative overflow-hidden text-white py-20 px-6"
        style={{ backgroundColor: BRAND }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-[0.06] bg-white pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full opacity-[0.05] bg-white pointer-events-none" aria-hidden="true" />

        <motion.div
          className="relative max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.p
            className="text-[10.5px] tracking-[0.28em] uppercase text-white/50 mb-3"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            News &amp; Devotions
          </motion.p>

          <motion.h1
            className="text-[38px] sm:text-[48px] font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            UCCZ
            <span className="italic opacity-80"> Blog</span>
          </motion.h1>

          <motion.p
            className="mt-3 text-[14px] text-white/60 max-w-lg leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Reflections on faith, scripture, and the Christian life from the
            United Church of Christ in Zimbabwe.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Filters bar ── */}
      <div className="sticky top-[96px] z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[220px] shrink-0">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[36px] pl-8 pr-3 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-700 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              aria-label="Search blog posts"
            />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <BookOpen size={40} className="mx-auto mb-4 text-slate-300" />
            <p
              className="text-[16px] font-semibold text-slate-500"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              No posts found
            </p>
            <p
              className="text-[13px] text-slate-400 mt-2"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Try a different category or search term.
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >

            {/* Featured post — only shown on "All" with no search */}
            {featured && activeCategory === "All" && !searchQuery && (
              <div className="mb-8">
                <FeaturedCard post={featured} />
              </div>
            )}

            {/* Grid of regular posts */}
            {regularPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {regularPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            {/* Show featured in grid too when filtering */}
            {filtered.length > 0 && (activeCategory !== "All" || searchQuery) && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
}