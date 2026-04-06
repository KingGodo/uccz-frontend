"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const BRAND = "rgb(54, 69, 99)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function CallToActionSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="bg-white border-t border-slate-100 py-24 px-6"
      aria-labelledby="cta-heading"
    >
      <motion.div
        className="max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <motion.p
          className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-5"
          style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
          variants={fadeUp}
        >
          John 17:21
        </motion.p>

        <motion.h2
          id="cta-heading"
          className="text-[34px] sm:text-[44px] font-bold text-slate-900 leading-[1.1] tracking-[-0.02em]"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          variants={fadeUp}
        >
          You Belong Here.{" "}
          <span className="italic" style={{ color: BRAND }}>Come As You Are.</span>
        </motion.h2>

        <motion.p
          className="mt-6 text-[15px] text-slate-500 leading-[1.85]"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          variants={fadeUp}
        >
          Whether you are just beginning your faith journey or have walked with
          Christ for decades, there is a place for you in the UCCZ family.
          Join over 80,000 believers united in faith, service, and purpose
          across Zimbabwe.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          variants={fadeUp}
        >
          <Link
            href="/membership"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            style={{ backgroundColor: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Become a Member
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-semibold border transition-all duration-200 hover:bg-slate-50 active:scale-[0.97]"
            style={{ borderColor: BRAND, color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Mail size={14} aria-hidden="true" />
            Contact Us
          </Link>
        </motion.div>

        <motion.p
          className="mt-8 text-[11.5px] text-slate-400"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          variants={fadeUp}
        >
          Serving Zimbabwe faithfully since 1893
        </motion.p>
      </motion.div>
    </section>
  );
}