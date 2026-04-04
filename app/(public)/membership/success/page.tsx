"use client";

/**
 * UCCZ Membership Success — app/(public)/membership/success/page.tsx
 *
 * A proper celebration moment — the member just joined the church.
 * Make it feel significant, warm, and on-brand.
 *
 * - Full brand-colored hero panel at the top
 * - Animated checkmark entrance (Framer Motion)
 * - Welcome message with scripture
 * - Two CTAs: Home + Register Another
 * - What happens next section
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, UserPlus, Home } from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_D  = "rgb(40, 52, 76)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── What happens next steps ───────────────────────────────────────────────
const NEXT_STEPS = [
  {
    step: "01",
    title: "Your Record is Saved",
    desc:  "Your membership details have been recorded in the UCCZ system.",
  },
  {
    step: "02",
    title: "Join a Ministry",
    desc:  "Get involved with one of the Spiritual Councils that matches your calling.",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Top brand panel ── */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center py-20 px-6 text-white text-center"
        style={{ backgroundColor: BRAND }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-[0.06]"
          style={{ backgroundColor: "white" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full opacity-[0.05]"
          style={{ backgroundColor: "white" }}
          aria-hidden="true"
        />

        {/* Animated checkmark */}
        <motion.div
          className="relative flex items-center justify-center mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Outer pulse ring */}
          <motion.div
            className="absolute h-28 w-28 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{
              duration:   1.6,
              repeat:     Infinity,
              ease:       "easeOut",
              repeatType: "loop",
              delay:      0.6,
            }}
            aria-hidden="true"
          />

          {/* Check circle */}
          <div className="relative h-20 w-20 rounded-full bg-white/15 flex items-center justify-center ring-2 ring-white/20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
            >
              <Check size={36} className="text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        {/* Label */}
        <motion.p
          className="text-[10.5px] tracking-[0.3em] uppercase text-white/50 mb-3"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        >
          Welcome to UCCZ
        </motion.p>

        {/* Heading */}
        <motion.h1
          className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.1] tracking-[-0.02em]"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
        >
          Registration
          <span className="italic opacity-80"> Successful!</span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          className="mt-4 text-[14.5px] text-white/60 max-w-md leading-[1.8]"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
        >
          Your membership has been successfully recorded. You are now part of a
          community of over 2,000 believers united in faith across Zimbabwe.
        </motion.p>

        {/* Scripture */}
        <motion.p
          className="mt-6 text-[12.5px] italic text-white/40 max-w-sm"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
        >
          &ldquo;That they may all be one.&rdquo; &mdash; John 17:21
        </motion.p>
      </div>

      {/* ── Content card ── */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-6 py-12">
        <motion.div
          className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_32px_rgba(54,69,99,0.07)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.4 }}
        >

          {/* What happens next */}
          <div className="px-8 py-8 border-b border-slate-100">
            <p
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-6"
              style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              What Happens Next
            </p>

            <div className="flex flex-col gap-5">
              {NEXT_STEPS.map((item, i) => (
                <motion.div
                  key={item.step}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.55,
                    ease:     EASE,
                    delay:    0.6 + i * 0.1,
                  }}
                >
                  {/* Step number */}
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold"
                    style={{
                      backgroundColor: BRAND_BG,
                      color:           BRAND,
                      fontFamily:      "'Libre Baskerville', Georgia, serif",
                    }}
                    aria-hidden="true"
                  >
                    {item.step}
                  </span>

                  <div>
                    <p
                      className="text-[14px] font-bold text-slate-800"
                      style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-[13px] text-slate-500 mt-0.5 leading-relaxed"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="px-8 py-6 bg-slate-50/60 flex flex-col sm:flex-row gap-3">

            {/* Back to Home */}
            <Link href="/" className="flex-1">
              <button
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-semibold border-2 transition-all duration-200 hover:shadow-md active:scale-[0.97]"
                style={{
                  borderColor: BRAND,
                  color:       BRAND,
                  fontFamily:  "'Source Sans 3', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = BRAND;
                }}
              >
                <Home size={15} aria-hidden="true" />
                Back to Home
              </button>
            </Link>
        
{/* Register Another */}
            {/* Register Another */}
            <Link href="/membership" className="flex-1">
              <button
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-bold text-white transition-all duration-200 hover:shadow-lg active:scale-[0.97]"
                style={{
                  backgroundColor: BRAND,
                  fontFamily:      "'Source Sans 3', sans-serif",
                  boxShadow:       "0 4px 16px rgba(54,69,99,0.22)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_D)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
              >
                <UserPlus size={15} aria-hidden="true" />
                Register Another Member
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </Link>

          </div>
        </motion.div>

        {/* Contact line */}
        <motion.p
          className="text-center text-[12px] text-slate-400 mt-6"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.0 }}
        >
          Questions? Contact us at{" "}
          <a
            href="mailto:uccz@uccz.org"
            className="font-semibold underline underline-offset-2 transition-colors duration-150"
            style={{ color: BRAND }}
          >
            uccz@uccz.org
          </a>
        </motion.p>
      </div>

    </div>
  );
}