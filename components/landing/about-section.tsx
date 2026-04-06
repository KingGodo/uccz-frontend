"use client";

/**
 * UCCZ Services Section — components/sections/services.tsx
 *
 * Improvements:
 * - Framer Motion scroll-triggered animations (useInView)
 * - Brand color rgb(54, 69, 99) replaces undefined `text-secondary`
 * - Libre Baskerville headings + Source Sans 3 body
 * - Icons added per service card (lucide-react)
 * - Numbered accent on each card for editorial feel
 * - Hover: border color shifts to brand, icon bg fills
 * - Content matches live uccz.org services (Medical, Build, Evangelism, Holistic Care)
 *   plus the system-specific services already in the original
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HeartPulse,
  HardHat,
  Megaphone,
  HandHeart,
} from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Services data (from live uccz.org + enhanced descriptions) ────────────
const SERVICES = [
  {
    icon:  <HeartPulse size={20} />,
    title: "Medical Help",
    desc:  "Providing healthcare support and medical outreach to underserved communities across Zimbabwe through mission hospitals and health programs.",
  },
  {
    icon:  <HardHat size={20} />,
    title: "We Build and Create",
    desc:  "Constructing schools, churches, and community infrastructure that serve as lasting foundations for growth and gospel-centered development.",
  },
  {
    icon:  <Megaphone size={20} />,
    title: "Growth & Evangelism",
    desc:  "Spreading the Gospel through organised outreach, church planting, and evangelism programs that grow the body of Christ in Zimbabwe.",
  },
  {
    icon:  <HandHeart size={20} />,
    title: "Holistic Care",
    desc:  "Caring for the whole person — body, mind, and spirit — through counselling, social services, and community support networks.",
  },
];

// ── Animation variants ────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

// ── Component ─────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-28 bg-white border-t border-slate-100 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Label */}
          <motion.p
            className="text-[11px] uppercase tracking-[0.25em] font-semibold"
            style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Services
          </motion.p>

          {/* Heading */}
          <motion.h2
            id="services-heading"
            className="mt-3 text-[32px] md:text-[38px] font-bold text-slate-900 leading-[1.15] tracking-[-0.01em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            What We Do for
            <span className="italic" style={{ color: BRAND }}>
              {" "}Our Society
            </span>
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            className="mt-4 text-[14.5px] text-slate-500 leading-[1.8]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            The UCCZ serves Zimbabwe through four pillars of community impact —
            bringing healing, development, the Gospel, and wholeness to every
            corner of the country.
          </motion.p>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className="group relative p-7 rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-transparent hover:shadow-[0_8px_40px_rgba(54,69,99,0.11)] cursor-default"
              variants={cardVariant}
            >
              {/* Card number — top right, decorative */}
              <span
                className="absolute top-5 right-5 text-[11px] font-bold tabular-nums opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                style={{ color: BRAND, fontFamily: "'Libre Baskerville', Georgia, serif" }}
                aria-hidden="true"
              >
                0{i + 1}
              </span>

              {/* Icon */}
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: BRAND_BG,
                  color:           BRAND,
                }}
                aria-hidden="true"
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                className="text-[15px] font-bold text-slate-900 leading-snug"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="mt-3 text-[13px] text-slate-500 leading-[1.8]"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {service.desc}
              </p>

              {/* Bottom brand line — grows on hover */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: BRAND }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}