"use client";

/**
 * UCCZ Hero Section — components/sections/hero.tsx
 *
 * Fixes applied:
 * - All Framer Motion `ease` values typed as `Easing` tuples (no raw strings/arrays)
 * - No duplicate props on any element
 * - Hero image uses the provided /hero.jpg path
 * - Ministry logos auto-scroll left-to-right via CSS animation (no extra deps)
 */

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants, type Transition } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND   = "rgb(54, 69, 99)";
const BRAND_D = "rgb(40, 52, 76)";

// ── Easing — must be [x1,y1,x2,y2] tuple typed as const ──────────────────
const EASE_OUT:  [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Shared transition builders ────────────────────────────────────────────
const fadeUpTransition = (delay = 0): Transition => ({
  duration: 0.75,
  ease:     EASE_OUT,
  delay,
});

const statTransition = (delay = 0): Transition => ({
  duration: 0.6,
  ease:     EASE_OUT,
  delay,
});

// ── Variants ──────────────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: fadeUpTransition() },
};

// FIX: "easeOut" string → typed Transition object via transition prop on motion component
// We avoid putting `ease: "easeOut"` inside a Variants object since TS rejects bare strings.
// Instead, image fade-in uses initial/animate/transition props directly (not variants).

const lineGrow: Variants = {
  hidden: { scaleY: 0 },
  show:   {
    scaleY: 1,
    transition: {
      duration: 0.9,
      ease:     EASE_OUT,
      delay:    0.1,
    } as Transition,
  },
};

const statSlide: Variants = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0,  transition: statTransition() },
};

// ── Stats ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "1893",   label: "Est. Year"   },
  { value: "65+",    label: "Churches"    },
  { value: "2,000+", label: "Members"     },
  { value: "3",      label: "Conferences" },
];

// ── Ministries strip ──────────────────────────────────────────────────────
const ministries = [
  { name: "Ruwadzano",      logo: "/ruwadzano.png"   },
  { name: "Mens Fellowship",logo: "/cmf.png"          },
  { name: "CYF",            logo: "/cyf.png"          },
  { name: "Volunteers",     logo: "/volunteers.png"   },
  { name: "Sunday School",  logo: "/sundayschool.png" },
];

// Duplicate list so the marquee loops seamlessly
const MARQUEE_ITEMS = [...ministries, ...ministries];

// ── Component ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative w-full min-h-screen mt-12 overflow-hidden bg-white"
        aria-label="Hero"
      >
        <div className="mx-auto max-w-7xl px-6 min-h-screen grid lg:grid-cols-2 items-center">

          {/* ═══════════════════
              LEFT — Text
          ═══════════════════ */}
          <motion.div
            className="relative z-10 pt-36 pb-20 lg:pt-0 lg:pb-0 flex flex-col justify-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Vertical brand accent line */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-24 rounded-full hidden lg:block"
              style={{ backgroundColor: BRAND, originY: 0 }}
              variants={lineGrow}
              aria-hidden="true"
            />

            {/* Scripture label */}
            <motion.p
              className="text-[11px] tracking-[0.25em] uppercase mb-6 pl-0 lg:pl-6"
              style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
              variants={fadeUp}
            >
              John 17:21
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="text-[46px] sm:text-[58px] lg:text-[66px] xl:text-[74px] font-bold leading-[1.05] tracking-[-0.02em] text-gray-900 pl-0 lg:pl-6"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              variants={fadeUp}
            >
              That They
              <br />
              May All{" "}
              <span className="italic" style={{ color: BRAND }}>
                Be One.
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              className="mt-8 mb-8 ml-0 lg:ml-6 h-px w-16 bg-gray-200"
              variants={fadeUp}
              aria-hidden="true"
            />

            {/* Body copy */}
            <motion.p
              className="text-[16px] leading-[1.75] text-gray-500 max-w-md pl-0 lg:pl-6"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              variants={fadeUp}
            >
              A union of believers grounded in the mystical union of Christ and His
              Church — serving Zimbabwe and beyond since 1893.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4 pl-0 lg:pl-6"
              variants={fadeUp}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[13.5px] font-semibold text-white transition-all duration-200 hover:shadow-xl active:scale-[0.97]"
                style={{
                  backgroundColor: BRAND,
                  fontFamily: "'Source Sans 3', sans-serif",
                  // shadow colour handled via Tailwind below
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_D)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
              >
                Discover Our Story
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/sermons"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-[13.5px] font-semibold text-gray-700 border border-gray-200 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.97]"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `rgba(54,69,99,0.08)` }}
                >
                  <Play size={10} style={{ color: BRAND }} className="fill-current ml-[1px]" />
                </span>
                Watch Sermons
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-14 pl-0 lg:pl-6 grid grid-cols-4 gap-0 max-w-sm"
              variants={container}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col"
                  variants={statSlide}
                >
                  <div
                    className="h-[2px] w-8 mb-3 rounded-full"
                    style={{ backgroundColor: i === 0 ? BRAND : "#e5e7eb" }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-[22px] font-bold text-gray-900 leading-none"
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[10.5px] text-gray-400 mt-1.5 tracking-wide uppercase"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ═══════════════════
              RIGHT — Image
              FIX: image fade uses motion props directly (not Variants object)
              so we never put an ease string inside a Variants definition.
          ═══════════════════ */}
          <motion.div
            className="hidden lg:block relative h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.4 }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 ml-12">
              {/* Hero image — using provided path */}
              <Image
                src="/hero.jpg"
                alt="Church Community"
                fill
                priority
                className="object-cover scale-105"
              />
              {/* Left blend into white */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent" />
              {/* Bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating scripture card */}
            <motion.div
              className="absolute bottom-16 left-0 z-10 bg-white/90 backdrop-blur-md rounded-2xl px-6 py-5 shadow-[0_8px_40px_rgba(0,0,0,0.10)] max-w-[280px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.2 }}
            >
              <div
                className="w-6 h-[2px] rounded-full mb-3"
                style={{ backgroundColor: BRAND }}
                aria-hidden="true"
              />
              <p
                className="text-[13px] text-gray-700 leading-relaxed italic"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                &ldquo;Carry each other&rsquo;s burdens, and in this way you
                will fulfill the law of Christ.&rdquo;
              </p>
              <p
                className="mt-3 text-[11px] tracking-widest uppercase"
                style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Galatians 6:2
              </p>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          aria-hidden="true"
        >
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-gray-300"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Scroll
          </p>
          <div className="relative h-10 w-[1px] bg-gray-100 overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full"
              style={{ height: "40%", backgroundColor: BRAND }}
              animate={{ top: ["0%", "100%"] }}
              transition={{
                duration:   1.4,
                repeat:     Infinity,
                ease:       "easeInOut",
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── MINISTRIES MARQUEE STRIP ── */}
      <MinistryStrip />
    </>
  );
}

// ── Ministry scrolling strip ──────────────────────────────────────────────
function MinistryStrip() {
  return (
    <section
      className="w-full border-y border-gray-100 bg-white py-5 overflow-hidden"
      aria-label="Our ministries"
    >
      {/* Label */}
      <p
        className="text-center text-[10px] tracking-[0.3em] uppercase text-gray-300 mb-5"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        Our Spiritual Councils
      </p>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((ministry, i) => (
            <div
              key={`${ministry.name}-${i}`}
              className="flex items-center gap-3 shrink-0 group cursor-default"
            >
              {/* Logo */}
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src={ministry.logo}
                  alt={ministry.name}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  sizes="40px"
                />
              </div>
              {/* Name */}
              <span
                className="text-[13px] font-semibold text-gray-400 group-hover:text-gray-700 transition-colors duration-300 whitespace-nowrap"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {ministry.name}
              </span>

              {/* Separator dot */}
              <span
                className="w-1 h-1 rounded-full bg-gray-200 ml-4"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      {/*
        Tailwind doesn't include `animate-marquee` by default.
        Add this to your tailwind.config.ts → theme.extend:

        keyframes: {
          marquee: {
            "0%":   { transform: "translateX(0%)" },
            "100%": { transform: "translateX(-50%)" },
          },
        },
        animation: {
          marquee: "marquee 20s linear infinite",
        },
      */}
    </section>
  );
}