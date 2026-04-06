"use client";

import { motion } from "framer-motion";
import { TestimonialsSection } from "@/components/landing";

// ── Brand ──────────────────────────────────────────────────────────────────
const BRAND = "rgb(54, 69, 99)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero header ── */}
      <div
        className="relative overflow-hidden text-white py-20 px-6"
        style={{ backgroundColor: BRAND }}
      >
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
            Stories of Faith
          </motion.p>

          <motion.h1
            className="text-[38px] sm:text-[48px] font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            Testimonials
          </motion.h1>

          <motion.p
            className="mt-3 text-[14px] text-white/60 max-w-lg leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Hear from members across Zimbabwe whose lives have been transformed
            through faith, fellowship, and the grace of God in the UCCZ community.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Testimonials section ── */}
      <TestimonialsSection />

    </div>
  );
}