"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const BRAND   = "rgb(54, 69, 99)";
const BRAND_D = "rgb(40, 52, 76)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MINISTRIES = [
  { name: "Ruwadzano",       logo: "/ruwadzano.png"   },
  { name: "Mens Fellowship", logo: "/cmf.png"          },
  { name: "CYF",             logo: "/cyf.png"          },
  { name: "Volunteers",      logo: "/volunteers.png"   },
  { name: "Sunday School",   logo: "/sundayschool.png" },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE, delay } },
});

export default function HeroSection() {
  return (
    <>
      <section
        className="relative w-full min-h-screen overflow-hidden"
        aria-label="Hero"
      >
        <Image
          src="/hero.jpg"
          alt="UCCZ congregation gathered in worship"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0" style={{ background: "rgba(10,14,22,0.50)" }} aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,14,22,0.95) 0%, rgba(10,14,22,0.60) 35%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(10,14,22,0.70) 0%, transparent 55%)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundColor: BRAND }} aria-hidden="true" />

        <motion.div
          className="absolute left-8 right-8 sm:left-12 sm:right-12 h-px"
          style={{ top: "calc(68px + 16px)", background: "rgba(255,255,255,0.10)" }}
          variants={fadeIn(0.2)}
          initial="hidden"
          animate="show"
          aria-hidden="true"
        />

        <motion.p
          className="absolute left-8 sm:left-12 text-[11px] tracking-[0.42em] uppercase text-white/45"
          style={{ top: "calc(68px + 14px)", fontFamily: "'Source Sans 3', sans-serif" }}
          variants={fadeIn(0.35)}
          initial="hidden"
          animate="show"
        >
          UCCZ
        </motion.p>

        <motion.p
          className="absolute right-8 sm:right-12 text-[11px] tracking-[0.42em] uppercase text-white/25"
          style={{ top: "calc(68px + 14px)", fontFamily: "'Source Sans 3', sans-serif" }}
          variants={fadeIn(0.35)}
          initial="hidden"
          animate="show"
        >
          Est. 1893
        </motion.p>

        <motion.div
          className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-5"
          variants={fadeIn(1.1)}
          initial="hidden"
          animate="show"
          aria-label="Scripture: John chapter 17 verse 21"
        >
          <div className="h-14 w-px" style={{ background: "rgba(255,255,255,0.12)" }} aria-hidden="true" />
          <p
            className="text-[9px] tracking-[0.32em] uppercase whitespace-nowrap"
            style={{
              color: "rgba(255,255,255,0.28)",
              fontFamily: "'Source Sans 3', sans-serif",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            John 17 &nbsp;&middot;&nbsp; 21
          </p>
          <div className="h-14 w-px" style={{ background: "rgba(255,255,255,0.12)" }} aria-hidden="true" />
        </motion.div>

        {/* Flex column fills the full viewport, navbar spacer at top, content at bottom */}
        <div className="relative z-10 flex flex-col min-h-screen" style={{ paddingTop: "calc(68px + 30px)" }}>

          {/* Spacer pushes content to the bottom */}
          <div className="flex-1" />

          {/* Main content — sits at the bottom */}
          <div className="px-8 sm:px-12 pb-14 sm:pb-20 max-w-4xl">
          <motion.div
            className="mb-7 h-px w-14"
            style={{ background: "rgba(255,255,255,0.22)" }}
            variants={fadeIn(0.55)}
            initial="hidden"
            animate="show"
            aria-hidden="true"
          />

          <motion.p
            className="mb-5 text-[10px] tracking-[0.38em] uppercase"
            style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeIn(0.65)}
            initial="hidden"
            animate="show"
          >
            United Church of Christ in Zimbabwe
          </motion.p>

          <motion.h1
            className="font-bold leading-[0.93] tracking-[-0.03em] text-white"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: "clamp(52px, 9vw, 108px)" }}
            variants={fadeUp(0.55)}
            initial="hidden"
            animate="show"
          >
            That They
            <br />
            May <span style={{ color: "rgba(255,255,255,0.38)" }}>All</span>
            <br />
            Be{" "}
            <span
              className="italic"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.55)", color: "transparent" }}
            >
              One.
            </span>
          </motion.h1>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-7 sm:gap-14">
            <motion.p
              className="text-[14px] leading-[1.9] max-w-[280px]"
              style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Source Sans 3', sans-serif" }}
              variants={fadeUp(0.75)}
              initial="hidden"
              animate="show"
            >
              A union of believers grounded in the mystical union of Christ
              and His Church — serving Zimbabwe and beyond since 1893.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={fadeUp(0.9)}
              initial="hidden"
              animate="show"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[13px] font-bold text-white transition-all duration-200 active:scale-[0.97]"
                style={{
                  backgroundColor: BRAND,
                  fontFamily: "'Source Sans 3', sans-serif",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.07) inset",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND_D;
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07) inset";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND;
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.07) inset";
                }}
              >
                Discover Our Story
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/membership"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[13px] font-semibold transition-all duration-200 active:scale-[0.97]"
                style={{
                  color: "rgba(255,255,255,0.70)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  fontFamily: "'Source Sans 3', sans-serif",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.30)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.70)";
                }}
              >
                Become a Member
              </Link>
            </motion.div>
          </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: BRAND, opacity: 0.7 }}
          aria-hidden="true"
        />
      </section>

      <MinistryStrip />
    </>
  );
}

function MinistryStrip() {
  const TRACKS = [...MINISTRIES, ...MINISTRIES, ...MINISTRIES];

  return (
    <section className="w-full bg-white" aria-label="Our Spiritual Councils">
      <style>{`
        @keyframes ministry-ltr {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
        .ministry-ltr {
          animation: ministry-ltr 26s linear infinite;
        }
        .ministry-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="h-px w-full bg-gray-100" aria-hidden="true" />

      <div className="flex items-stretch">
        <div
          className="shrink-0 flex items-center px-7 py-4"
          style={{ borderRight: "1px solid rgb(243,244,246)" }}
        >
          <p
            className="text-[9px] tracking-[0.38em] uppercase whitespace-nowrap"
            style={{ color: "rgb(209,213,219)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Councils
          </p>
        </div>

        <div
          className="flex-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div className="flex w-max ministry-ltr">
            {TRACKS.map((ministry, i) => (
              <div
                key={`${ministry.name}-${i}`}
                className="flex items-center gap-3 shrink-0 group cursor-default px-8 py-4"
              >
                <div className="relative h-7 w-7 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={ministry.logo}
                    alt={ministry.name}
                    fill
                    className="object-contain"
                    sizes="28px"
                  />
                </div>

                <span
                  className="text-[12px] font-medium whitespace-nowrap transition-colors duration-300 text-gray-400 group-hover:text-gray-700"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {ministry.name}
                </span>

                <span className="ml-6 h-[3px] w-[3px] rounded-full shrink-0 bg-gray-200" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gray-100" aria-hidden="true" />
    </section>
  );
}