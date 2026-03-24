"use client";

/**
 * UCCZ Hero Section — components/sections/hero.tsx
 *
 * Direction: Full-screen image, centered text overlay.
 * Philosophy: One image. One headline. One CTA. Nothing competing.
 *
 * What was removed vs previous version:
 * - Split layout (gone)
 * - Floating scripture card (gone)
 * - Stats row (moved to a dedicated stats section below)
 * - Scroll indicator (gone)
 * - Ministry strip kept but simplified
 *
 * What remains:
 * - Full-screen /hero.jpg background
 * - Layered dark gradient for text legibility
 * - Scripture label → headline → divider → subtext → CTAs
 * - Staggered Framer Motion entrance, all centered
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND   = "rgb(54, 69, 99)";
const BRAND_D = "rgb(40, 52, 76)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Ministries for strip ───────────────────────────────────────────────────
const MINISTRIES = [
  { name: "Ruwadzano",       logo: "/ruwadzano.png"   },
  { name: "Mens Fellowship", logo: "/cmf.png"          },
  { name: "CYF",             logo: "/cyf.png"          },
  { name: "Volunteers",      logo: "/volunteers.png"   },
  { name: "Sunday School",   logo: "/sundayschool.png" },
];

// ── Stagger container ──────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.3 },
  },
};

// ── Each element fades up ──────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <>
      <section
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero"
      >

        {/* ── Background image ── */}
        <Image
          src="/hero.jpg"
          alt="UCCZ congregation"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* ── Gradient overlays ──
            Three layers working together:
            1. Overall dark tint for contrast
            2. Bottom-up fade — grounds the text
            3. Top-down fade — softens the sky/top edge
        ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle brand tint — ties the image to the site palette */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: BRAND }}
          aria-hidden="true"
        />

        {/* ── Centered content ── */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >

          {/* Scripture label */}
          <motion.p
            className="text-[10.5px] tracking-[0.35em] uppercase text-white/60 mb-7"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            John 17:21
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="text-[48px] sm:text-[64px] md:text-[76px] lg:text-[88px] font-bold leading-[1.0] tracking-[-0.025em] text-white"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            That They May
            <br />
            <span className="italic" style={{ color: "rgba(255,255,255,0.85)" }}>
              All Be One.
            </span>
          </motion.h1>

          {/* Thin divider */}
          <motion.div
            className="mt-9 mb-9 h-px w-12 bg-white/25"
            variants={fadeUp}
            aria-hidden="true"
          />

          {/* Subtext */}
          <motion.p
            className="text-[15px] sm:text-[16.5px] text-white/65 leading-[1.8] max-w-xl"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            A union of believers grounded in the mystical union of Christ
            and His Church — serving Zimbabwe and beyond since 1893.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            variants={fadeUp}
          >
            {/* Primary */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-bold text-white transition-all duration-200 hover:shadow-2xl active:scale-[0.97]"
              style={{ backgroundColor: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_D)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
            >
              Discover Our Story
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            {/* Secondary — ghost */}
            <Link
              href="/membership"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-semibold text-white border border-white/30 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/50 active:scale-[0.97]"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Become a Member
            </Link>
          </motion.div>

        </motion.div>

        {/* ── Bottom fade into next section ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, rgb(248,250,249))",
          }}
          aria-hidden="true"
        />

      </section>

      {/* ── Ministry strip ── */}
      <MinistryStrip />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// MINISTRY STRIP — truly continuous left-to-right CSS marquee
// ─────────────────────────────────────────────────────────────────────────
function MinistryStrip() {
  // Two copies are enough: while copy A scrolls in from the left,
  // copy B is already waiting just behind it — no gap, no pause.
  const TRACKS = [...MINISTRIES, ...MINISTRIES];

  return (
    <section
      className="w-full bg-white border-b border-gray-100 py-6 overflow-hidden"
      aria-label="Our Spiritual Councils"
    >
      {/* Keyframe injected inline so no Tailwind config is needed */}
      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0%);   }
        }
        .marquee-ltr {
          animation: marquee-ltr 20s linear infinite;
        }
      `}</style>

      <p
        className="text-center text-[10px] tracking-[0.32em] uppercase text-gray-300 mb-5"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        Our Spiritual Councils
      </p>

      {/* Edge-fade mask */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/*
          The track is 200% wide (two identical copies side-by-side).
          It starts at -50% (copy B visible) and slides to 0% (copy A visible),
          then instantly loops — the eye never sees a reset because both
          copies are identical.
        */}
        <div className="flex w-max marquee-ltr">
          {TRACKS.map((ministry, i) => (
            <div
              key={`${ministry.name}-${i}`}
              className="flex items-center gap-3 shrink-0 group cursor-default px-6"
            >
              {/* Logo */}
              <div className="relative h-9 w-9 shrink-0">
                <Image
                  src={ministry.logo}
                  alt={ministry.name}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  sizes="36px"
                />
              </div>

              {/* Name */}
              <span
                className="text-[13px] font-semibold text-gray-400 group-hover:text-gray-700 transition-colors duration-300 whitespace-nowrap"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {ministry.name}
              </span>

              {/* Dot separator */}
              <span
                className="ml-3 h-1 w-1 rounded-full bg-gray-200 shrink-0"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}