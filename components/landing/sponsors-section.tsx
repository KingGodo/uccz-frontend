"use client";

/**
 * UCCZ Sponsors & Partners Section — components/sections/sponsors.tsx
 *
 * Uses the actual donor images from the live uccz.org site:
 *   /donor_1.png → /donor_4.png  (same paths used on live site)
 *
 * Layout:
 * - Section header (label + heading + sub-copy from live site)
 * - Auto-scrolling marquee of sponsor logos (same pattern as ministry strip)
 * - "Give Today" CTA matching live site
 * - Framer Motion scroll-triggered entrance for the header
 */

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND = "rgb(54, 69, 99)";
const BRAND_D = "rgb(40, 52, 76)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Sponsor logos — from live uccz.org ───────────────────────────────────
const SPONSORS = [
  { name: "Donor Partner 1", logo: "/donor_1.png" },
  { name: "Donor Partner 2", logo: "/donor_2.png" },
  { name: "Donor Partner 3", logo: "/donor_3.png" },
  { name: "Donor Partner 4", logo: "/donor_4.png" },
];

// Duplicate for seamless marquee loop
const MARQUEE_SPONSORS = [...SPONSORS, ...SPONSORS, ...SPONSORS];

// ── Variants ──────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ── Component ─────────────────────────────────────────────────────────────
export default function SponsorsSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden"
      aria-labelledby="sponsors-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header — centred ── */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.p
            className="text-[11px] uppercase tracking-[0.25em] font-semibold"
            style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Partners &amp; Sponsors
          </motion.p>

          <motion.h2
            id="sponsors-heading"
            className="mt-3 text-[28px] md:text-[34px] font-bold text-slate-900 leading-[1.2] tracking-[-0.01em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            Giving For a{" "}
            <span className="italic" style={{ color: BRAND }}>
              Higher Cause
            </span>
          </motion.h2>

          {/* Live site sub-copy */}
          <motion.p
            className="mt-4 text-[14px] text-slate-500 leading-[1.85]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            While we might invest our finances into the stock market, real
            estate, or other assets to see growth, an investment into the
            Kingdom is the only one that has eternal significance.
          </motion.p>

          {/* Give Today CTA — matches live site */}
          <motion.div className="mt-7" variants={fadeUp}>
            <Link
              href="/donate"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-semibold text-white transition-all duration-200 hover:shadow-lg active:scale-[0.97]"
              style={{
                backgroundColor: BRAND,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = BRAND_D)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = BRAND)
              }
            >
              Give Today
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="mt-14 mb-12 h-px bg-slate-200 mx-auto max-w-xs" aria-hidden="true" />

        {/* ── Sponsor logos marquee ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Edge fade mask */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex gap-16 animate-marquee whitespace-nowrap">
              {MARQUEE_SPONSORS.map((sponsor, i) => (
                <div
                  key={`${sponsor.name}-${i}`}
                  className="flex items-center justify-center shrink-0 group"
                >
                  <div className="relative h-12 w-36 transition-all duration-300 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                      sizes="144px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Supporting text ── */}
        <motion.p
          className="mt-10 text-center text-[12px] text-slate-400 tracking-wide"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Interested in partnering with UCCZ?{" "}
          <Link
            href="/contact"
            className="font-semibold underline underline-offset-2 transition-colors duration-150"
            style={{ color: BRAND }}
          >
            Get in touch
          </Link>
        </motion.p>

      </div>
    </section>
  );
}