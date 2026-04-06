"use client";

/**
 * UCCZ News & Events Section — components/sections/news.tsx
 *
 * Improvements:
 * - Framer Motion scroll-triggered animations via useInView
 * - Brand color rgb(54, 69, 99) replaces undefined text-secondary
 * - Libre Baskerville headings + Source Sans 3 body
 * - Date badge + category tag per card (matches live uccz.org blog style)
 * - "Read More" link with animated arrow
 * - "View All" CTA in section header
 * - Richer card layout: category → title → desc → footer with date + link
 * - key={item.title} instead of key={i}
 */

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── News data (from live uccz.org + expanded) ─────────────────────────────
const NEWS = [
  {
    category: "Conference",
    title:    "National Annual Conference",
    desc:     "A nationwide gathering focused on unity, leadership development, and spiritual renewal across all three regional Conferences of the UCCZ.",
    date:     "Aug 10 – 12, 2025",
    href:     "/events",
  },
  {
    category: "Youth",
    title:    "Youth Fellowship Expansion",
    desc:     "Strengthening CYF structures to empower the next generation of church leaders through training, mentorship, and regional fellowship gatherings.",
    date:     "Jul 5 – 7, 2025",
    href:     "/events",
  },
  {
    category: "Outreach",
    title:    "Community Outreach Programs",
    desc:     "Serving vulnerable communities through coordinated missions, medical outreach, and social support initiatives led by UCCZ volunteers.",
    date:     "Jun 21, 2025",
    href:     "/blog",
  },
];

// ── Variants ──────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// ── Component ─────────────────────────────────────────────────────────────
export default function NewsSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-28 bg-white border-t border-slate-100 overflow-hidden"
      aria-labelledby="news-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header row ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <div className="max-w-xl">
            <motion.p
              className="text-[11px] uppercase tracking-[0.25em] font-semibold"
              style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
              variants={fadeUp}
            >
              News &amp; Events
            </motion.p>

            <motion.h2
              id="news-heading"
              className="mt-3 text-[32px] md:text-[38px] font-bold text-slate-900 leading-[1.15] tracking-[-0.01em]"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              variants={fadeUp}
            >
              Church Updates &amp;
              <span className="italic" style={{ color: BRAND }}>
                {" "}Activities
              </span>
            </motion.h2>
          </div>

          {/* View all link */}
          <motion.div variants={fadeUp}>
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold transition-colors duration-200 whitespace-nowrap"
              style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              View All Events
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          className="mt-14 grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {NEWS.map((item) => (
            <motion.article
              key={item.title}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-[0_8px_40px_rgba(54,69,99,0.11)]"
              variants={cardVariant}
            >
              {/* Top brand accent bar */}
              <div
                className="h-[3px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: BRAND }}
                aria-hidden="true"
              />

              <div className="flex flex-col flex-1 p-7">

                {/* Category tag */}
                <div className="mb-5">
                  <span
                    className="inline-block text-[10.5px] font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: BRAND_BG,
                      color:           BRAND,
                      fontFamily:      "'Source Sans 3', sans-serif",
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-[17px] font-bold text-slate-900 leading-snug group-hover:text-[rgb(54,69,99)] transition-colors duration-200"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="mt-3 text-[13.5px] text-slate-500 leading-[1.8] flex-1"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {item.desc}
                </p>

                {/* Footer — date + read more */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span
                    className="flex items-center gap-1.5 text-[11.5px] text-slate-400"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <CalendarDays size={12} aria-hidden="true" />
                    {item.date}
                  </span>

                  <Link
                    href={item.href}
                    className="group/link inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors duration-200"
                    style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                    aria-label={`Read more about ${item.title}`}
                  >
                    Read More
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>

              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}