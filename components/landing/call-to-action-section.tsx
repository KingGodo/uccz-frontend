"use client";

/**
 * UCCZ Call To Action Section — components/sections/cta.tsx
 *
 * A powerful, full-width brand-colored section that converts visitors.
 * - Deep brand background with layered texture feel
 * - Two CTAs: "Become a Member" (primary) + "Contact Us" (ghost)
 * - Scripture anchor for emotional resonance
 * - Framer Motion scroll-triggered entrance
 * - Animated background cross motif (subtle, decorative)
 */

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND   = "rgb(54, 69, 99)";
const BRAND_D = "rgb(40, 52, 76)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Variants ──────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

// ── Component ─────────────────────────────────────────────────────────────
export default function CallToActionSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: BRAND }}
      aria-labelledby="cta-heading"
    >

      {/* ── Decorative background elements ── */}

      {/* Large faint circle — top right */}
      <div
        className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ backgroundColor: "white" }}
        aria-hidden="true"
      />

      {/* Medium faint circle — bottom left */}
      <div
        className="absolute -bottom-16 -left-16 h-[280px] w-[280px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ backgroundColor: "white" }}
        aria-hidden="true"
      />

      {/* Vertical rule — left accent */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-20 rounded-r-full opacity-30 hidden lg:block pointer-events-none"
        style={{ backgroundColor: "white" }}
        aria-hidden="true"
      />

      {/* Vertical rule — right accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-20 rounded-l-full opacity-30 hidden lg:block pointer-events-none"
        style={{ backgroundColor: "white" }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >

        {/* Scripture label */}
        <motion.p
          className="text-[11px] uppercase tracking-[0.28em] font-semibold text-white/50 mb-6"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          variants={fadeUp}
        >
          John 17:21
        </motion.p>

        {/* Main heading */}
        <motion.h2
          id="cta-heading"
          className="text-[36px] sm:text-[44px] md:text-[52px] font-bold text-white leading-[1.1] tracking-[-0.02em]"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          variants={fadeUp}
        >
          You Belong Here.
          <br />
          <span className="italic opacity-80">Come As You Are.</span>
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="mt-8 mb-8 mx-auto h-px w-16 bg-white/20"
          variants={fadeUp}
          aria-hidden="true"
        />

        {/* Sub-copy */}
        <motion.p
          className="text-[15px] text-white/70 leading-[1.85] max-w-xl mx-auto"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          variants={fadeUp}
        >
          Whether you are just beginning your faith journey or have walked with
          Christ for decades, there is a place for you in the UCCZ family.
          Join a community of over 2,000 believers united in faith, service,
          and purpose across Zimbabwe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          variants={fadeUp}
        >
          {/* Primary — white filled */}
          <Link
            href="/membership"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-bold bg-white transition-all duration-200 hover:bg-white/90 hover:shadow-2xl active:scale-[0.97]"
            style={{
              color:      BRAND,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Become a Member
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          {/* Secondary — ghost */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-semibold text-white border border-white/30 transition-all duration-200 hover:bg-white/10 hover:border-white/50 active:scale-[0.97]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Mail size={14} aria-hidden="true" />
            Contact Us
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="mt-8 text-[11.5px] text-white/35 tracking-wide"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          variants={fadeUp}
        >
          Serving Zimbabwe faithfully since 1893
        </motion.p>

      </motion.div>
    </section>
  );
}