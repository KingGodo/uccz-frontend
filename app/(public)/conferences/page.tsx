"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Heart,
  GraduationCap,
  HandHeart,
  ChevronRight,
  ArrowRight,
  Church,
  Globe,
  BookOpen,
} from "lucide-react";

// ── Brand (same across all pages) ─────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_D  = "rgb(40, 52, 76)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ── Quick stats ────────────────────────────────────────────────────────────
const STATS = [
  { value: "3",    label: "Conferences"       },
  { value: "320+", label: "Congregations"     },
  { value: "80K+", label: "Members"           },
  { value: "5",    label: "National Councils" },
];

// ── The three conferences ──────────────────────────────────────────────────
const CONFERENCES = [
  {
    id:          "eastern",
    name:        "Eastern Conference",
    region:      "Manicaland & Masvingo Provinces",
    tagline:     "Rooted in the highlands of the east.",
    description:
      "The Eastern Conference encompasses congregations across Manicaland and Masvingo provinces, ministering to communities from the Nyanga highlands to the lowveld. It is one of the oldest and most vibrant conferences in the UCCZ, with a long heritage of education, mission, and healthcare ministry.",
    highlights: [
      "120+ local congregations",
      "Strong emphasis on rural mission",
      "Partnership with Mutambara Mission Hospital",
      "Annual Eastern Conference Assembly each March",
    ],
    presiding: "Rev. Dr. E. Makoni",
    email:     "eastern@uccz.org",
    color:     "rgb(180, 83, 9)",   // amber-700
    colorBg:   "rgba(180,83,9,0.07)",
    icon:      "🌄",
  },
  {
    id:          "northern",
    name:        "Northern Conference",
    region:      "Harare, Mashonaland & Midlands",
    tagline:     "The heartbeat of the urban church.",
    description:
      "Centred in Harare and extending across Mashonaland and the Midlands, the Northern Conference is the largest conference by membership. It leads in urban ministry, youth engagement, and national advocacy, hosting the UCCZ Synod Offices and the flagship Harare Central Church.",
    highlights: [
      "150+ congregations including urban centres",
      "Home of the UCCZ Synod Offices",
      "Leading youth & young adult ministry",
      "Annual Northern Conference Week each July",
    ],
    presiding: "Rev. T. Chinhamo",
    email:     "northern@uccz.org",
    color:     BRAND,
    colorBg:   BRAND_BG,
    icon:      "🏙️",
  },
  {
    id:          "western",
    name:        "Western Conference",
    region:      "Matabeleland & Bulawayo",
    tagline:     "Serving the land of the Ndebele.",
    description:
      "The Western Conference ministers across Matabeleland North, Matabeleland South, and the city of Bulawayo. With deep roots in Ndebele culture and the pioneering work of the London Missionary Society, this conference leads in bilingual worship, interfaith dialogue, and community development.",
    highlights: [
      "70+ congregations across Matabeleland",
      "Bilingual ministry in Ndebele & Shona",
      "Nduyo Hymnal rooted in Western tradition",
      "Annual Western Conference Gathering each October",
    ],
    presiding: "Rev. S. Ncube",
    email:     "western@uccz.org",
    color:     "rgb(4, 120, 87)",   // emerald-700
    colorBg:   "rgba(4,120,87,0.07)",
    icon:      "🌿",
  },
];

// ── Fellowships / Councils ─────────────────────────────────────────────────
const COUNCILS = [
  {
    id:          "cmf",
    href:        "/ministries/cmf",
    name:        "Christian Men's Fellowship",
    short:       "CMF",
    description: "A brotherhood committed to prayer, accountability, and service. CMF meets monthly in every congregation and leads charitable projects across the country.",
    icon:        Users,
    color:       "rgb(30, 64, 175)",   // blue-800
    colorBg:     "rgba(30,64,175,0.07)",
  },
  {
    id:          "cyf",
    href:        "/ministries/cyf",
    name:        "Christian Youth Fellowship",
    short:       "CYF",
    description: "Empowering the next generation through discipleship, leadership training, and national youth camps. CYF is the future of the UCCZ.",
    icon:        Heart,
    color:       "rgb(157, 23, 77)",   // pink-800
    colorBg:     "rgba(157,23,77,0.07)",
  },
  {
    id:          "ruwadzano",
    href:        "/ministries/ruwadzano",
    name:        "Ruwadzano / Manyano",
    short:       "Women's Fellowship",
    description: "Women united in prayer, study, and action. Ruwadzano chapters provide a safe and empowering space for women in every UCCZ congregation.",
    icon:        Heart,
    color:       "rgb(126, 34, 206)",  // purple-800
    colorBg:     "rgba(126,34,206,0.07)",
  },
  {
    id:          "sunday-school",
    href:        "/ministries/sunday-school",
    name:        "Sunday School",
    short:       "Children's Ministry",
    description: "Faith formation from the earliest years. Our Sunday School curriculum is grounded in Scripture and adapted for the Zimbabwean context.",
    icon:        GraduationCap,
    color:       "rgb(180, 83, 9)",    // amber-700
    colorBg:     "rgba(180,83,9,0.07)",
  },
  {
    id:          "volunteers",
    href:        "/ministries/volunteers",
    name:        "Volunteers",
    short:       "Community Service",
    description: "From hospital visits to food distribution, our volunteers are the hands and feet of Christ in every community we serve.",
    icon:        HandHeart,
    color:       "rgb(4, 120, 87)",    // emerald-700
    colorBg:     "rgba(4,120,87,0.07)",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Conference card
// ─────────────────────────────────────────────────────────────────────────
function ConferenceCard({ conf, index }: { conf: typeof CONFERENCES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-transparent hover:shadow-[0_12px_48px_rgba(54,69,99,0.12)] transition-all duration-300"
      variants={cardVariant}
    >
      {/* Coloured top bar */}
      <div className="h-[4px] w-full" style={{ backgroundColor: conf.color }} aria-hidden="true" />

      <div className="p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[26px] leading-none" aria-hidden="true">{conf.icon}</span>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                style={{ backgroundColor: conf.colorBg, color: conf.color, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Conference {index + 1} of 3
              </span>
            </div>
            <h2
              className="text-[22px] font-bold text-slate-900 leading-snug tracking-[-0.01em]"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              {conf.name}
            </h2>
            <p
              className="flex items-center gap-1.5 mt-1 text-[12.5px] text-slate-400"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <MapPin size={11} style={{ color: conf.color }} aria-hidden="true" />
              {conf.region}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-[14.5px] italic text-slate-500 mb-4 leading-relaxed"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif", color: conf.color, opacity: 0.8 }}
        >
          {conf.tagline}
        </p>

        {/* Description */}
        <p
          className="text-[13.5px] text-slate-500 leading-[1.8] mb-6"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {conf.description}
        </p>

        {/* Highlights */}
        <div className="mb-6">
          <p
            className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-3"
            style={{ color: conf.color, fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Highlights
          </p>
          <ul className="flex flex-col gap-2">
            {conf.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 text-[13px] text-slate-600"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <ChevronRight
                  size={13}
                  className="shrink-0 mt-0.5"
                  style={{ color: conf.color }}
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p
              className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Presiding Minister
            </p>
            <p
              className="text-[13px] font-semibold text-slate-700"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {conf.presiding}
            </p>
          </div>
          <a
            href={`mailto:${conf.email}`}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold transition-opacity hover:opacity-70"
            style={{ color: conf.color, fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {conf.email}
            <ArrowRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Council card
// ─────────────────────────────────────────────────────────────────────────
function CouncilCard({ council }: { council: typeof COUNCILS[0] }) {
  const Icon = council.icon;
  return (
    <motion.div variants={cardVariant}>
      <Link href={council.href}>
        <article className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-transparent hover:shadow-[0_8px_40px_rgba(54,69,99,0.11)] transition-all duration-300 cursor-pointer">
          <div className="h-[3px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ backgroundColor: council.color }} aria-hidden="true" />
          <div className="flex flex-col flex-1 p-6">
            {/* Icon + short */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200"
                style={{ backgroundColor: council.colorBg }}
              >
                <Icon size={18} style={{ color: council.color }} aria-hidden="true" />
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                style={{ backgroundColor: council.colorBg, color: council.color, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {council.short}
              </span>
            </div>

            {/* Name */}
            <h3
              className="text-[16px] font-bold text-slate-900 leading-snug mb-3 group-hover:transition-colors duration-200"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              {council.name}
            </h3>

            {/* Description */}
            <p
              className="text-[13px] text-slate-500 leading-[1.8] flex-1"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {council.description}
            </p>

            {/* CTA */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span
                className="text-[12px] font-semibold"
                style={{ color: council.color, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Learn more
              </span>
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: council.color }}
                aria-hidden="true"
              />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function ConferencesPage() {
  const [activeTab, setActiveTab] = useState<"conferences" | "councils">("conferences");

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero header ── */}
      <div
        className="relative overflow-hidden text-white py-20 px-6"
        style={{ backgroundColor: BRAND }}
      >
        {/* Decorative shapes */}
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-[0.06] bg-white pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full opacity-[0.05] bg-white pointer-events-none" aria-hidden="true" />
        {/* Extra diagonal decoration */}
        <div
          className="absolute top-0 right-0 h-full w-[35%] opacity-[0.03] pointer-events-none"
          style={{
            background: "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 14px)",
          }}
          aria-hidden="true"
        />

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
            Structure &amp; Fellowship
          </motion.p>

          <motion.h1
            className="text-[38px] sm:text-[52px] font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            Conferences &amp;
            <span className="italic opacity-80"> Councils</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-[14px] text-white/60 max-w-xl leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            The United Church of Christ in Zimbabwe is organised into three
            geographic Conferences and five national Fellowship Councils, together
            serving over 80,000 members across Zimbabwe.
          </motion.p>

          {/* Inline quick-nav pills */}
          <motion.div className="mt-8 flex flex-wrap gap-3" variants={fadeUp}>
            {CONFERENCES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold text-white/80 border border-white/20 hover:bg-white/10 transition-all duration-200"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <span aria-hidden="true">{c.icon}</span>
                {c.name}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-[26px] font-bold tracking-[-0.02em]"
                style={{ color: BRAND, fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {s.value}
              </p>
              <p
                className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-[0.12em]"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab switcher ── */}
      <div className="sticky top-[96px] z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2">
          {(["conferences", "councils"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-full text-[12.5px] font-semibold transition-all duration-200 capitalize whitespace-nowrap"
              style={{
                backgroundColor: activeTab === tab ? BRAND : BRAND_BG,
                color:           activeTab === tab ? "white" : BRAND,
                fontFamily:      "'Source Sans 3', sans-serif",
              }}
            >
              {tab === "conferences" ? "🗺️  The Three Conferences" : "🤝  Fellowships & Councils"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <AnimatePresence mode="wait">

          {/* CONFERENCES TAB */}
          {activeTab === "conferences" && (
            <motion.div
              key="conferences"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {/* Section intro */}
              <motion.div className="mb-10" variants={fadeUp}>
                <p
                  className="text-[10.5px] tracking-[0.28em] uppercase mb-2"
                  style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Geographic Structure
                </p>
                <h2
                  className="text-[28px] font-bold text-slate-900 tracking-[-0.01em] max-w-2xl"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  Three Conferences,{" "}
                  <span className="italic opacity-60">one Church.</span>
                </h2>
                <p
                  className="mt-3 text-[14px] text-slate-500 leading-relaxed max-w-2xl"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  The UCCZ is divided into three regional conferences that together
                  span Zimbabwe from east to west. Each conference holds its own
                  annual assembly and elects its presiding minister, while remaining
                  united under the national Synod.
                </p>
              </motion.div>

              {/* Conference cards grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CONFERENCES.map((conf, i) => (
                  <div key={conf.id} id={conf.id}>
                    <ConferenceCard conf={conf} index={i} />
                  </div>
                ))}
              </div>

              {/* Structure diagram callout */}
              <motion.div
                className="mt-12 rounded-2xl border border-slate-200 bg-white overflow-hidden"
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />
                <div className="p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
                  <div>
                    <p
                      className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-3"
                      style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      How the UCCZ is governed
                    </p>
                    <h3
                      className="text-[20px] font-bold text-slate-900 mb-3"
                      style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                    >
                      From congregation to Synod
                    </h3>
                    <p
                      className="text-[13.5px] text-slate-500 leading-[1.8] max-w-xl"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Each local congregation is led by its minister and church
                      council. Congregations belong to a Conference, each governed
                      by a Conference Executive. All three Conferences are united
                      under the national Synod, which meets every two years to set
                      policy, elect national leadership, and advance the church is
                      mission across Zimbabwe.
                    </p>

                    {/* Hierarchy chain */}
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {["Local Congregation", "Conference", "National Synod"].map((level, i, arr) => (
                        <div key={level} className="flex items-center gap-2">
                          <span
                            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold"
                            style={{ backgroundColor: BRAND_BG, color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                          >
                            {level}
                          </span>
                          {i < arr.length - 1 && (
                            <ChevronRight size={14} className="text-slate-300" aria-hidden="true" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Icon cluster */}
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    {[
                      { icon: Church, label: "320+ Congregations" },
                      { icon: Globe,  label: "3 Conferences"       },
                      { icon: BookOpen, label: "1 Synod"           },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl w-[190px]"
                        style={{ backgroundColor: BRAND_BG }}
                      >
                        <Icon size={16} style={{ color: BRAND }} aria-hidden="true" />
                        <span
                          className="text-[12.5px] font-semibold"
                          style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* COUNCILS TAB */}
          {activeTab === "councils" && (
            <motion.div
              key="councils"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {/* Section intro */}
              <motion.div className="mb-10" variants={fadeUp}>
                <p
                  className="text-[10.5px] tracking-[0.28em] uppercase mb-2"
                  style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  National Fellowships
                </p>
                <h2
                  className="text-[28px] font-bold text-slate-900 tracking-[-0.01em]"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  Fellowships &amp;{" "}
                  <span className="italic opacity-60">Councils</span>
                </h2>
                <p
                  className="mt-3 text-[14px] text-slate-500 leading-relaxed max-w-2xl"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Alongside the three geographic Conferences, the UCCZ operates five
                  national Fellowship Councils that cut across conference boundaries,
                  uniting members by age, gender, and calling. Each council has its
                  own constitution, national leadership, and annual gathering.
                </p>
              </motion.div>

              {/* Council cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {COUNCILS.map((council) => (
                  <CouncilCard key={council.id} council={council} />
                ))}
              </div>

              {/* Get involved prompt */}
              <motion.div
                className="mt-12 rounded-2xl border border-slate-200 bg-white overflow-hidden"
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />
                <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="max-w-xl">
                    <p
                      className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-2"
                      style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Not sure where to start?
                    </p>
                    <h3
                      className="text-[20px] font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                    >
                      Every fellowship welcomes new members
                    </h3>
                    <p
                      className="text-[13.5px] text-slate-500 leading-[1.8]"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Whether you are a young person looking for community, a man
                      seeking brotherhood, or a woman wanting to pray with others —
                      there is a place for you in the UCCZ. Speak to your local
                      minister or contact the Synod Office to get connected.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border text-[13px] font-bold transition-all duration-200 hover:shadow-md active:scale-[0.97]"
                      style={{ borderColor: BRAND, color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/membership"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                      style={{ backgroundColor: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Become a Member
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── CTA: Get involved ── */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{ backgroundColor: BRAND }}
        >
          {/* Diagonal texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              background: "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 16px)",
            }}
            aria-hidden="true"
          />
          <div className="relative px-8 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <p
                className="text-[10.5px] uppercase tracking-[0.28em] text-white/50 mb-3"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Join the family
              </p>
              <h2
                className="text-[28px] md:text-[34px] font-bold text-white leading-[1.15] tracking-[-0.01em]"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Find your conference.
                <span className="italic opacity-75"> Find your people.</span>
              </h2>
              <p
                className="mt-3 text-[14px] text-white/60 leading-relaxed"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Over 320 congregations are waiting to welcome you. Discover a UCCZ
                church near you today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[13px] font-bold transition-all duration-200 hover:bg-white/90 active:scale-[0.97]"
                style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Find a Church
                <MapPin size={14} aria-hidden="true" />
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}