"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
  Search,
  Users,
  BookOpen,
} from "lucide-react";

// ── Brand ──────────────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ── Event categories ───────────────────────────────────────────────────────
const CATEGORIES = ["All", "Conference", "Fellowship", "Worship", "National", "Youth"];

// ── Category colours ───────────────────────────────────────────────────────
const CAT_COLOR: Record<string, { color: string; bg: string }> = {
  Conference: { color: BRAND,               bg: BRAND_BG                   },
  Fellowship: { color: "rgb(126,34,206)",   bg: "rgba(126,34,206,0.07)"    },
  Worship:    { color: "rgb(180,83,9)",      bg: "rgba(180,83,9,0.07)"      },
  National:   { color: "rgb(4,120,87)",      bg: "rgba(4,120,87,0.07)"      },
  Youth:      { color: "rgb(157,23,77)",     bg: "rgba(157,23,77,0.07)"     },
};

// ── Events data ────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id:       1,
    slug:     "national-synod-assembly-2025",
    category: "National",
    featured: true,
    title:    "National Synod Assembly 2025",
    excerpt:  "The biennial gathering of the entire UCCZ — delegates from all three Conferences come together to worship, deliberate, and set the vision for the church over the next two years. All members are welcome to attend as observers.",
    date:     "2025-08-14",
    dateDisplay: "14 – 17 August 2025",
    time:     "8:00 AM – 5:00 PM daily",
    location: "Harare Central Church, Harare",
    organiser:"UCCZ National Synod",
    seats:    null,
  },
  {
    id:       2,
    slug:     "eastern-conference-assembly-2025",
    category: "Conference",
    featured: false,
    title:    "Eastern Conference Assembly",
    excerpt:  "Annual assembly for all Eastern Conference congregations. Agenda includes ministry reports, elections, and a special healing service on the final evening.",
    date:     "2025-03-06",
    dateDisplay: "6 – 8 March 2025",
    time:     "9:00 AM – 4:00 PM",
    location: "Mutambara Mission, Chimanimani",
    organiser:"Eastern Conference",
    seats:    null,
  },
  {
    id:       3,
    slug:     "cyf-national-camp-2025",
    category: "Youth",
    featured: false,
    title:    "CYF National Youth Camp",
    excerpt:  "Three days of discipleship, worship, sport, and leadership development for young people aged 15 – 35 from every UCCZ congregation.",
    date:     "2025-04-18",
    dateDisplay: "18 – 20 April 2025",
    time:     "Residential — arrives Friday 6 PM",
    location: "Belvedere Teachers' College, Harare",
    organiser:"Christian Youth Fellowship",
    seats:    200,
  },
  {
    id:       4,
    slug:     "ruwadzano-national-rally-2025",
    category: "Fellowship",
    featured: false,
    title:    "Ruwadzano National Rally",
    excerpt:  "Women from across Zimbabwe gather for a day of prayer, testimony, and celebration of the Ruwadzano movement's impact in local communities.",
    date:     "2025-05-03",
    dateDisplay: "3 May 2025",
    time:     "8:00 AM – 4:00 PM",
    location: "Queens Sports Club, Bulawayo",
    organiser:"Ruwadzano / Manyano",
    seats:    600,
  },
  {
    id:       5,
    slug:     "northern-conference-week-2025",
    category: "Conference",
    featured: false,
    title:    "Northern Conference Week",
    excerpt:  "A full week of evening services, workshops on stewardship and discipleship, and the Northern Conference Annual Assembly on the final day.",
    date:     "2025-07-07",
    dateDisplay: "7 – 12 July 2025",
    time:     "6:00 PM – 9:00 PM (evenings)",
    location: "Various venues, Harare",
    organiser:"Northern Conference",
    seats:    null,
  },
  {
    id:       6,
    slug:     "christmas-cantata-2025",
    category: "Worship",
    featured: false,
    title:    "Christmas Cantata & Carol Service",
    excerpt:  "A beloved annual tradition — combined choirs from Harare congregations perform a full cantata followed by a candlelit carol service open to the public.",
    date:     "2025-12-14",
    dateDisplay: "14 December 2025",
    time:     "5:00 PM – 8:00 PM",
    location: "Harare Central Church, Harare",
    organiser:"UCCZ Music Ministry",
    seats:    800,
  },
  {
    id:       7,
    slug:     "cmf-brotherhood-day-2025",
    category: "Fellowship",
    featured: false,
    title:    "CMF National Brotherhood Day",
    excerpt:  "Men from across the UCCZ gather for a day of shared worship, a keynote address on Christian manhood, and a community service project in the host city.",
    date:     "2025-06-21",
    dateDisplay: "21 June 2025",
    time:     "7:00 AM – 3:00 PM",
    location: "Gweru City Church, Gweru",
    organiser:"Christian Men's Fellowship",
    seats:    400,
  },
  {
    id:       8,
    slug:     "western-conference-gathering-2025",
    category: "Conference",
    featured: false,
    title:    "Western Conference Gathering",
    excerpt:  "The Western Conference annual gathering includes bilingual worship in Ndebele and Shona, ministry reports, and the election of conference officers.",
    date:     "2025-10-09",
    dateDisplay: "9 – 11 October 2025",
    time:     "8:30 AM – 5:00 PM",
    location: "Bulawayo City Church, Bulawayo",
    organiser:"Western Conference",
    seats:    null,
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function formatShortDate(iso: string) {
  const d = new Date(iso);
  return {
    day:   d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    year:  d.getFullYear(),
  };
}

function isPast(iso: string) {
  return new Date(iso) < new Date();
}

// ── Category pill ──────────────────────────────────────────────────────────
function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-full text-[12.5px] font-semibold transition-all duration-200 whitespace-nowrap active:scale-[0.97]"
      style={{
        fontFamily:      "'Source Sans 3', sans-serif",
        backgroundColor: active ? BRAND : BRAND_BG,
        color:           active ? "white" : BRAND,
      }}
    >
      {label}
    </button>
  );
}

// ── Date badge ─────────────────────────────────────────────────────────────
function DateBadge({ iso, small = false }: { iso: string; small?: boolean }) {
  const { day, month } = formatShortDate(iso);
  const past = isPast(iso);
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl shrink-0 ${small ? "w-12 h-14" : "w-14 h-16"}`}
      style={{
        backgroundColor: past ? "rgb(241,245,249)" : BRAND_BG,
        color:           past ? "rgb(148,163,184)" : BRAND,
      }}
    >
      <span
        className={`font-bold leading-none ${small ? "text-[18px]" : "text-[22px]"}`}
        style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
      >
        {day}
      </span>
      <span
        className={`font-bold uppercase tracking-widest mt-0.5 ${small ? "text-[8px]" : "text-[9px]"}`}
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {month}
      </span>
    </div>
  );
}

// ── Featured event card ────────────────────────────────────────────────────
function FeaturedEventCard({ event }: { event: typeof EVENTS[0] }) {
  const cat  = CAT_COLOR[event.category] ?? { color: BRAND, bg: BRAND_BG };
  const past = isPast(event.date);

  return (
    <motion.article
      className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-transparent hover:shadow-[0_12px_48px_rgba(54,69,99,0.13)] transition-all duration-300 cursor-pointer"
      variants={cardVariant}
    >
      <div className="h-[3px] w-full" style={{ backgroundColor: cat.color }} aria-hidden="true" />
      <div className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start gap-6">

          {/* Date badge */}
          <DateBadge iso={event.date} />

          <div className="flex-1 min-w-0">
            {/* Tags row */}
            <div className="flex items-center gap-2.5 mb-4 flex-wrap">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                style={{ backgroundColor: BRAND, color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Featured
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                style={{ backgroundColor: cat.bg, color: cat.color, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {event.category}
              </span>
              {past && (
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-slate-100 text-slate-400"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Past Event
                </span>
              )}
            </div>

            {/* Title */}
            <h2
              className="text-[24px] md:text-[30px] font-bold text-slate-900 leading-[1.15] tracking-[-0.01em] group-hover:transition-colors duration-200"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif", color: "rgb(15,23,42)" }}
            >
              {event.title}
            </h2>

            {/* Excerpt */}
            <p
              className="mt-3 text-[14px] text-slate-500 leading-[1.8] max-w-2xl"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {event.excerpt}
            </p>

            {/* Meta */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {[
                { icon: Calendar, text: event.dateDisplay },
                { icon: Clock,    text: event.time        },
                { icon: MapPin,   text: event.location    },
                { icon: Users,    text: event.organiser   },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 text-[12.5px] text-slate-400"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <Icon size={12} style={{ color: cat.color }} aria-hidden="true" />
                  {text}
                </span>
              ))}
              {event.seats && (
                <span
                  className="flex items-center gap-1.5 text-[12.5px] text-slate-400"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <ChevronRight size={12} style={{ color: cat.color }} aria-hidden="true" />
                  {event.seats.toLocaleString()} seats
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href={`/events/${event.slug}`}
                className="inline-flex items-center gap-2 text-[13px] font-bold transition-all duration-200 hover:gap-3"
                style={{ color: cat.color, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                View Event Details
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ── Regular event card ─────────────────────────────────────────────────────
function EventCard({ event }: { event: typeof EVENTS[0] }) {
  const cat  = CAT_COLOR[event.category] ?? { color: BRAND, bg: BRAND_BG };
  const past = isPast(event.date);

  return (
    <Link href={`/events/${event.slug}`}>
      <motion.article
        className="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-transparent hover:shadow-[0_8px_40px_rgba(54,69,99,0.11)] transition-all duration-300 cursor-pointer"
        variants={cardVariant}
        layout
      >
        <div
          className="h-[3px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shrink-0"
          style={{ backgroundColor: cat.color }}
          aria-hidden="true"
        />
        <div className="flex flex-col flex-1 p-6">

          {/* Top row: date badge + category */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <DateBadge iso={event.date} small />
            <div className="flex flex-col items-end gap-1.5">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                style={{ backgroundColor: cat.bg, color: cat.color, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {event.category}
              </span>
              {past && (
                <span
                  className="text-[9.5px] font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full bg-slate-100 text-slate-400"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Past
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-[16.5px] font-bold text-slate-900 leading-snug group-hover:transition-colors duration-200 mb-2"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            {event.title}
          </h3>

          {/* Excerpt */}
          <p
            className="text-[13px] text-slate-500 leading-[1.8] line-clamp-3 flex-1"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {event.excerpt}
          </p>

          {/* Meta footer */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-1.5">
            {[
              { icon: Calendar, text: event.dateDisplay },
              { icon: MapPin,   text: event.location    },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-[11.5px] text-slate-400"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Icon size={11} style={{ color: cat.color }} aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div className="mt-4 flex justify-end">
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: cat.color }}
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery,    setSearchQuery]    = useState("");
  const [showPast,       setShowPast]       = useState(false);

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      const matchesCat    = activeCategory === "All" || e.category === activeCategory;
      const matchesSearch = searchQuery.trim() === "" ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.organiser.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPast   = showPast ? true : !isPast(e.date);
      return matchesCat && matchesSearch && matchesPast;
    });
  }, [activeCategory, searchQuery, showPast]);

  const featured     = filtered.find((e) => e.featured);
  const regularEvents = filtered.filter((e) => !e.featured || activeCategory !== "All" || searchQuery);

  // When filtering or searching, show all in the grid
  const gridEvents = (activeCategory !== "All" || searchQuery) ? filtered : regularEvents;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
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
            Whats On
          </motion.p>
          <motion.h1
            className="text-[38px] sm:text-[48px] font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            UCCZ
            <span className="italic opacity-80"> Events</span>
          </motion.h1>
          <motion.p
            className="mt-3 text-[14px] text-white/60 max-w-lg leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Assemblies, youth camps, fellowship rallies, and worship services —
            find your next gathering in the UCCZ calendar.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Filters bar ── */}
      <div className="sticky top-[96px] z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}

            {/* Past events toggle */}
            <button
              onClick={() => setShowPast((v) => !v)}
              className="px-4 py-1.5 rounded-full text-[12.5px] font-semibold transition-all duration-200 whitespace-nowrap border"
              style={{
                fontFamily:      "'Source Sans 3', sans-serif",
                borderColor:     showPast ? BRAND : "rgb(203,213,225)",
                backgroundColor: showPast ? BRAND_BG : "white",
                color:           showPast ? BRAND : "rgb(148,163,184)",
              }}
            >
              {showPast ? "Hiding past" : "Show past"}
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[220px] shrink-0">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[36px] pl-8 pr-3 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-700 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              aria-label="Search events"
            />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <BookOpen size={40} className="mx-auto mb-4 text-slate-300" />
            <p
              className="text-[16px] font-semibold text-slate-500"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              No events found
            </p>
            <p
              className="text-[13px] text-slate-400 mt-2"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Try a different category, search term, or show past events.
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchQuery}-${showPast}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {/* Featured event — only on "All" with no search */}
            {featured && activeCategory === "All" && !searchQuery && (
              <div className="mb-8">
                <FeaturedEventCard event={featured} />
              </div>
            )}

            {/* Grid */}
            {gridEvents.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gridEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Suggest an event */}
        {filtered.length > 0 && (
          <motion.div
            className="mt-14 rounded-2xl border border-slate-200 bg-white overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />
            <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p
                  className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-1"
                  style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Planning an event?
                </p>
                <h3
                  className="text-[18px] font-bold text-slate-900"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  Submit your event to the UCCZ calendar
                </h3>
                <p
                  className="mt-1 text-[13px] text-slate-500"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Ministers and council leaders can request listing for congregation or fellowship events.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Contact Us
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}