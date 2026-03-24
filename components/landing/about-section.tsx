"use client";

/**
 * UCCZ About Section — components/sections/about.tsx
 *
 * Improvements over original:
 * - Replaces `style jsx` + CSS animation with Framer Motion (consistent with hero)
 * - Scroll-triggered animation using useInView — animates when section enters viewport
 * - Brand color rgb(54, 69, 99) applied throughout
 * - Libre Baskerville for headings, Source Sans 3 for body
 * - Richer image treatment: floating stat card + brand accent block
 * - Values grid upgraded with brand icon accents and hover states
 * - "Find Out More" CTA added (matches live site)
 * - Full historical content from live uccz.org added
 */

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, Users, Heart, ShieldCheck } from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Values data ───────────────────────────────────────────────────────────
const VALUES = [
  {
    icon:  <BookOpen size={16} />,
    title: "Faith",
    desc:  "Rooted in Christ and guided by Scripture in all we do.",
  },
  {
    icon:  <Users size={16} />,
    title: "Unity",
    desc:  "Building strong, connected communities across Zimbabwe.",
  },
  {
    icon:  <Heart size={16} />,
    title: "Service",
    desc:  "Serving others with love, compassion and sacrifice.",
  },
  {
    icon:  <ShieldCheck size={16} />,
    title: "Integrity",
    desc:  "Living with honesty, transparency and accountability.",
  },
];

// ── Animation variants ────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show:   {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

// ── Component ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  const ref    = useRef<HTMLElement>(null);
  // Triggers when 25% of the section is in the viewport — fires once
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      className="bg-slate-50 py-24 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* ═══════════════════════════════
            LEFT — Image with decorations
        ═══════════════════════════════ */}
        <motion.div
          className="relative w-full h-[460px]"
          variants={fadeLeft}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Brand accent block behind image */}
          <div
            className="absolute -top-4 -left-4 h-32 w-32 rounded-2xl"
            style={{ backgroundColor: BRAND_BG }}
            aria-hidden="true"
          />

          {/* Main image */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(54,69,99,0.12)]">
            <Image
              src="/hero.jpg"
              alt="UCCZ Community gathering"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Floating stat card */}
          <motion.div
            className="absolute -bottom-6 -right-4 bg-white rounded-xl shadow-[0_8px_32px_rgba(54,69,99,0.12)] px-5 py-4 z-10"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          >
            <p
              className="text-[28px] font-bold leading-none"
              style={{ color: BRAND, fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              130+
            </p>
            <p
              className="text-[11px] text-slate-400 mt-1 tracking-wide"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Years of faithful service
            </p>
          </motion.div>

          {/* Small brand accent dot */}
          <div
            className="absolute top-6 -right-2 h-5 w-5 rounded-full"
            style={{ backgroundColor: BRAND, opacity: 0.15 }}
            aria-hidden="true"
          />
        </motion.div>

        {/* ═══════════════════════════════
            RIGHT — Content
        ═══════════════════════════════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Section label */}
          <motion.p
            className="text-[11px] uppercase tracking-[0.25em] mb-4 font-semibold"
            style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            About Us
          </motion.p>

          {/* Heading */}
          <motion.h2
            id="about-heading"
            className="text-[32px] md:text-[38px] font-bold text-slate-900 leading-[1.15] tracking-[-0.01em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            Working Towards the
            <span className="italic" style={{ color: BRAND }}>
              {" "}Betterment
            </span>{" "}
            of Communities and Beyond
          </motion.h2>

          {/* Scripture pull-quote */}
          <motion.p
            className="mt-5 text-[13px] italic text-slate-500 border-l-[3px] pl-4 py-1"
            style={{
              borderColor: BRAND,
              fontFamily:  "'Libre Baskerville', Georgia, serif",
            }}
            variants={fadeUp}
          >
            &ldquo;Carry each other&rsquo;s burdens, and in this way you will
            fulfill the law of Christ.&rdquo; &mdash; Galatians 6:2
          </motion.p>

          {/* Body copy — from live uccz.org */}
          <motion.p
            className="mt-6 text-[14.5px] text-slate-600 leading-[1.8]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            The United Church of Christ in Zimbabwe was established on{" "}
            <strong className="text-slate-800 font-semibold">
              19 October 1893
            </strong>{" "}
            at Mount Selinda Mission through the American Board of Commissioners
            for Foreign Missions. The first church congregation was started in
            1897, and the Mount Selinda church building was built in 1919.
          </motion.p>

          <motion.p
            className="mt-4 text-[14.5px] text-slate-600 leading-[1.8]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Today, UCCZ unites believers across three Conferences and five
            Spiritual Councils — empowering individuals and families to live
            meaningful lives rooted in faith, unity, and service.
          </motion.p>

          {/* Values grid */}
          <motion.div
            className="mt-8 grid grid-cols-2 gap-3"
            variants={containerVariants}
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-transparent hover:shadow-[0_4px_24px_rgba(54,69,99,0.10)] cursor-default"
                variants={cardVariant}
              >
                {/* Icon */}
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg mb-3 transition-colors duration-200"
                  style={{ backgroundColor: BRAND_BG, color: BRAND }}
                  aria-hidden="true"
                >
                  {v.icon}
                </span>
                <p
                  className="text-[13px] font-semibold text-slate-900"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {v.title}
                </p>
                <p
                  className="text-[12px] text-slate-500 mt-1 leading-relaxed"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div className="mt-8" variants={fadeUp}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-[13.5px] font-semibold transition-all duration-200"
              style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Find Out More
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}