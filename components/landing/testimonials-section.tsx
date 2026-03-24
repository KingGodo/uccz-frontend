"use client";

const testimonials = [
  {
    name: "Church Member",
    role: "Congregation",
    message:
      "This platform has transformed how we manage our church. What once took hours now takes minutes — it's been a true blessing.",
    initials: "CM",
  },
  {
    name: "Ministry Leader",
    role: "Ministry Leader",
    message:
      "We can now coordinate activities much more efficiently. Every ministry feels more connected and purposeful than before.",
    initials: "ML",
  },
  {
    name: "Pastor",
    role: "Pastoral Team",
    message:
      "It has strengthened communication within our congregation in ways I never expected. The whole church feels closer.",
    initials: "PS",
  },
  {
    name: "Youth Member",
    role: "CYF",
    message:
      "It has made engagement and participation so much easier. Even the youngest members feel heard and involved now.",
    initials: "YM",
  },
  {
    name: "Church Admin",
    role: "Administration",
    message:
      "Managing data and members is now seamless and efficient. I can finally focus on what matters — serving the people.",
    initials: "CA",
  },
  {
    name: "Ruwadzano Chair",
    role: "Ruwadzano",
    message:
      "Our women's fellowship has never been more organised. Meetings, records, and outreach all flow beautifully now.",
    initials: "RC",
  },
];

// ── Brand colours (matching hero) ─────────────────────────────────────────
const BRAND = "rgb(54, 69, 99)";

// ── Card ──────────────────────────────────────────────────────────────────
function Card({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="relative flex-shrink-0 w-[300px] rounded-2xl p-6 group"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(54,69,99,0.10)",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.04), 0 0 0 0 rgba(54,69,99,0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 32px rgba(54,69,99,0.12), 0 0 0 1px rgba(54,69,99,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Large decorative quote mark */}
      <span
        className="absolute top-4 right-5 text-6xl leading-none select-none pointer-events-none"
        style={{
          color: "rgba(54,69,99,0.07)",
          fontFamily: "'Libre Baskerville', Georgia, serif",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-amber-400"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Message */}
      <p
        className="text-[13.5px] leading-[1.75] text-slate-600 relative z-10"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        &ldquo;{t.message}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3">
        {/* Avatar */}
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 tracking-wide"
          style={{ backgroundColor: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {t.initials}
        </div>

        <div>
          <p
            className="text-[13px] font-semibold text-slate-800 leading-tight"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            {t.name}
          </p>
          <p
            className="text-[11px] text-slate-400 mt-0.5 uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Track ─────────────────────────────────────────────────────────────────
function MarqueeTrack({
  direction,
  duration = 40,
}: {
  direction: "left" | "right";
  duration?: number;
}) {
  // Triple-copy for bulletproof seamless loop
  const items = [...testimonials, ...testimonials, ...testimonials];

  const keyframe =
    direction === "left"
      ? `@keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }`
      : `@keyframes scrollRight {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }`;

  const animClass = direction === "left" ? "track-left" : "track-right";
  const animName = direction === "left" ? "scrollLeft" : "scrollRight";

  return (
    <div className="overflow-hidden">
      <style>{`
        ${keyframe}
        .${animClass} {
          animation: ${animName} ${duration}s linear infinite;
        }
        .${animClass}:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className={`flex gap-5 w-max ${animClass}`}>
        {items.map((t, i) => (
          <Card key={`${direction}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "rgb(248,250,249)" }}
    >
      {/* Subtle background cross-hatch texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgb(54,69,99) 0px, rgb(54,69,99) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgb(54,69,99) 0px, rgb(54,69,99) 1px, transparent 1px, transparent 60px)",
        }}
        aria-hidden="true"
      />

      {/* Soft radial glow centred behind the header */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(54,69,99,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Header ── */}
      <div className="relative max-w-6xl mx-auto px-6 text-center mb-14">
        <p
          className="text-[10px] tracking-[0.35em] uppercase mb-4"
          style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Testimonials
        </p>

        <h2
          className="text-[36px] sm:text-[44px] font-bold leading-tight text-slate-900"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          Voices from Our{" "}
          <span className="italic" style={{ color: BRAND }}>
            Congregation
          </span>
        </h2>

        {/* Thin brand divider */}
        <div
          className="mx-auto mt-6 h-px w-10 rounded-full"
          style={{ backgroundColor: BRAND, opacity: 0.3 }}
          aria-hidden="true"
        />

        <p
          className="mt-5 text-[15px] text-slate-500 max-w-lg mx-auto leading-relaxed"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Hear how our platform is helping members, leaders, and ministries
          across the UCCZ family thrive together.
        </p>
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <MarqueeTrack direction="left" duration={38} />
      </div>

      {/* ── Gap ── */}
      <div className="mt-5" />

      {/* ── Row 2 — scrolls right ── */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <MarqueeTrack direction="right" duration={44} />
      </div>

      {/* Bottom soft fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgb(248,250,249))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}