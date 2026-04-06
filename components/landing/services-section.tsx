"use client";

/**
 * UCCZ Services Section — components/sections/services.tsx
 *
 * Shows the platform/system features of the UCCZ membership system.
 * - Framer Motion scroll-triggered animations via useInView
 * - Brand color rgb(54, 69, 99) throughout
 * - Libre Baskerville headings + Source Sans 3 body
 * - Lucide icons per card
 * - Numbered card accents
 * - Hover: shadow lift + brand underline animation
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LayoutDashboard,
  Network,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Services data ─────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon:  <LayoutDashboard size={20} />,
    title: "Church Administration",
    desc:  "Centralised tools to manage membership, attendance, and church operations with clarity and efficiency.",
  },
  {
    icon:  <Network size={20} />,
    title: "Ministry Oversight",
    desc:  "Coordinate all ministries through structured systems that strengthen collaboration and accountability.",
  },
  {
    icon:  <CalendarDays size={20} />,
    title: "Event & Conference Planning",
    desc:  "Organise regional and national church events with streamlined planning and communication workflows.",
  },
  {
    icon:  <MessageSquare size={20} />,
    title: "Member Communication",
    desc:  "Engage congregations through organised messaging, announcements, and structured follow-ups.",
  },
];

// ── Variants ──────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
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
          <motion.p
            className="text-[11px] uppercase tracking-[0.25em] font-semibold"
            style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Services
          </motion.p>

          <motion.h2
            id="services-heading"
            className="mt-3 text-[32px] md:text-[38px] font-bold text-slate-900 leading-[1.15] tracking-[-0.01em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            Systems That
            <span className="italic" style={{ color: BRAND }}>
              {" "}Strengthen
            </span>{" "}
            Church Operations
          </motion.h2>

          <motion.p
            className="mt-4 text-[14.5px] text-slate-500 leading-[1.8]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            We provide structured solutions that support church leadership,
            enhance ministry coordination, and improve community engagement
            across all levels of the UCCZ.
          </motion.p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className="group relative p-7 rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-transparent hover:shadow-[0_8px_40px_rgba(54,69,99,0.11)] cursor-default overflow-hidden"
              variants={cardVariant}
            >
              {/* Card number */}
              <span
                className="absolute top-5 right-5 text-[11px] font-bold tabular-nums opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                style={{ color: BRAND, fontFamily: "'Libre Baskerville', Georgia, serif" }}
                aria-hidden="true"
              >
                0{i + 1}
              </span>

              {/* Icon */}
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-5 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: BRAND_BG, color: BRAND }}
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

              {/* Brand underline — grows left to right on hover */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[2.5px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
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