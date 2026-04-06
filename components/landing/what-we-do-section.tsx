"use client";

/**
 * UCCZ What We Do Section — components/sections/what-we-do.tsx
 *
 * Expanded from a plain text block into a full content section:
 * - Three pillars (Worship, Discipleship, Outreach) with icons
 * - Live site stats: 2000+ Members, 65+ Churches Planted
 * - UCCZ Spiritual Councils paragraph (from live uccz.org)
 * - Framer Motion scroll-triggered animations
 * - Brand color + correct fonts throughout
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Church, BookMarked, Globe } from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Pillars ───────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon:  <Church size={22} />,
    title: "Worship",
    desc:  "Gathering as one body to honour God through prayer, praise, and the sacraments — Sunday by Sunday, in every UCCZ congregation.",
  },
  {
    icon:  <BookMarked size={22} />,
    title: "Discipleship",
    desc:  "Equipping believers to grow in faith through Bible teaching, Spiritual Councils, Sunday School, and mentorship across all ages.",
  },
  {
    icon:  <Globe size={22} />,
    title: "Outreach",
    desc:  "Serving communities through medical care, education, evangelism, and holistic development — bringing hope beyond the church walls.",
  },
];

// ── Stats (from live uccz.org) ────────────────────────────────────────────
const STATS = [
  { value: "2,000+", label: "Members"         },
  { value: "65+",    label: "Churches Planted" },
  { value: "3",      label: "Conferences"      },
  { value: "5",      label: "Spiritual Councils"},
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

const pillarVariant = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const statVariant = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ── Component ─────────────────────────────────────────────────────────────
export default function WhatWeDoSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="py-28 bg-slate-50 border-t border-slate-100 overflow-hidden"
      aria-labelledby="whatwedo-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header — centred ── */}
        <motion.div
          className="max-w-2xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.p
            className="text-[11px] uppercase tracking-[0.25em] font-semibold"
            style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            What We Do
          </motion.p>

          <motion.h2
            id="whatwedo-heading"
            className="mt-4 text-[32px] md:text-[38px] font-bold text-slate-900 leading-[1.15] tracking-[-0.01em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            Nurturing Faith.{" "}
            <span className="italic" style={{ color: BRAND }}>
              Strengthening
            </span>{" "}
            Communities.
          </motion.h2>

          <motion.p
            className="mt-5 text-[14.5px] text-slate-500 leading-[1.85]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            The UCCZ practices faith in action through Spiritual Councils and
            Conferences — serving believers across Eastern, Northern, and
            Western Zimbabwe through worship, discipleship, and outreach.
          </motion.p>
        </motion.div>

        {/* ── Three pillars ── */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.title}
              className="group relative bg-white rounded-2xl border border-slate-200 p-8 transition-all duration-300 hover:border-transparent hover:shadow-[0_8px_40px_rgba(54,69,99,0.10)] cursor-default overflow-hidden"
              variants={pillarVariant}
            >
              {/* Icon */}
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-6 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: BRAND_BG, color: BRAND }}
                aria-hidden="true"
              >
                {pillar.icon}
              </div>

              {/* Title */}
              <h3
                className="text-[17px] font-bold text-slate-900"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {pillar.title}
              </h3>

              {/* Desc */}
              <p
                className="mt-3 text-[13.5px] text-slate-500 leading-[1.8]"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {pillar.desc}
              </p>

              {/* Brand line grows on hover */}
              <div
                className="absolute bottom-0 left-8 right-8 h-[2.5px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: BRAND }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          className="mt-16 rounded-2xl px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{ backgroundColor: BRAND }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center"
              variants={statVariant}
            >
              {/* Separator above first stat only */}
              {i === 0 && (
                <div
                  className="h-[2px] w-8 mb-4 rounded-full bg-white/30"
                  aria-hidden="true"
                />
              )}

              <p
                className="text-[34px] font-bold text-white leading-none"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {stat.value}
              </p>
              <p
                className="mt-2 text-[11px] tracking-[0.18em] uppercase text-white/60"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── UCCZ Councils paragraph (from live uccz.org) ── */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.p
            className="text-[14.5px] text-slate-500 leading-[1.9]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Prior to 1998, the UCCZ operated as a single Conference. The Synod
            then established three regional Conferences — Eastern (35 churches),
            Northern (20 churches), and Western (11 churches) — alongside five
            Spiritual Councils:{" "}
            <span className="text-slate-700 font-semibold">
              Junior Sunday School, Christian Youth Fellowship (CYF), Ruwadzano,
              Volunteers,
            </span>{" "}
            and{" "}
            <span className="text-slate-700 font-semibold">
              Christian Men&rsquo;s Fellowship.
            </span>
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}