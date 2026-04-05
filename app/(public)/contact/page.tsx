"use client";

/**
 * UCCZ Contact Page — app/(public)/contact/page.tsx
 *
 * Matches the blog page design system exactly:
 * - Same brand color (rgb(54, 69, 99))
 * - Same typography: Libre Baskerville (headings) + Source Sans 3 (body)
 * - Same hero header pattern
 * - Same card/border/shadow style
 * - Framer Motion stagger animations
 * - Contact form + info cards + map embed
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

// ── Brand (same as blog) ────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Animation variants (same as blog) ──────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ── Contact info data ───────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    lines: ["UCCZ Synod Offices", "4 Fife Avenue, Harare", "Zimbabwe"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+263 242 700 900", "+263 242 700 901"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["info@uccz.org", "admin@uccz.org"],
  },
  {
    icon: Clock,
    label: "Office Hours",
    lines: ["Mon – Fri: 8:00 AM – 4:30 PM", "Saturday: 8:00 AM – 12:00 PM", "Sunday: Closed"],
  },
];

// ── FAQ data ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How do I join a UCCZ congregation near me?",
    a: "You can use our church finder on the website, or contact our Synod Offices directly and we will connect you with a congregation in your area.",
  },
  {
    q: "How do I submit prayer requests?",
    a: "Prayer requests can be submitted via the contact form on this page, by email to info@uccz.org, or by speaking directly with your local minister.",
  },
  {
    q: "Where can I download the Nduyo Hymnal?",
    a: "The Nduyo Hymnal App is available for free on both Google Play and the Apple App Store. Search for 'Nduyo Hymnal' to find and install it.",
  },
  {
    q: "How do I report a technical issue with the website?",
    a: "Please use the contact form and select 'Technical Issue' as the subject. Our web team will respond within 2 business days.",
  },
];

// ── Input component ─────────────────────────────────────────────────────────
function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-600"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="h-[44px] px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      />
    </div>
  );
}

// ── FAQ accordion item ──────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span
          className="text-[14.5px] font-semibold text-slate-800 group-hover:text-[rgb(54,69,99)] transition-colors duration-200"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          {q}
        </span>
        <ChevronDown
          size={16}
          className="shrink-0 text-slate-400 transition-transform duration-300"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: open ? BRAND : undefined,
          }}
          aria-hidden="true"
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p
          className="pb-5 text-[13.5px] text-slate-500 leading-[1.8]"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

// ── Info card ───────────────────────────────────────────────────────────────
function InfoCard({
  icon: Icon,
  label,
  lines,
}: {
  icon: React.ElementType;
  label: string;
  lines: string[];
}) {
  return (
    <motion.div
      className="group flex gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:border-transparent hover:shadow-[0_8px_40px_rgba(54,69,99,0.10)] transition-all duration-300"
      variants={cardVariant}
    >
      {/* Icon circle */}
      <div
        className="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-colors duration-200"
        style={{ backgroundColor: BRAND_BG }}
      >
        <Icon size={17} style={{ color: BRAND }} aria-hidden="true" />
      </div>

      <div>
        <p
          className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-1.5"
          style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {label}
        </p>
        {lines.map((line, i) => (
          <p
            key={i}
            className="text-[13.5px] text-slate-600 leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay — replace with your real API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero header (matches blog page exactly) ── */}
      <div
        className="relative overflow-hidden text-white py-20 px-6"
        style={{ backgroundColor: BRAND }}
      >
        {/* Decorative circles */}
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
            Get in Touch
          </motion.p>

          <motion.h1
            className="text-[38px] sm:text-[48px] font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            Contact
            <span className="italic opacity-80"> Us</span>
          </motion.h1>

          <motion.p
            className="mt-3 text-[14px] text-white/60 max-w-lg leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            We did love to hear from you. Reach out to the United Church of
            Christ in Zimbabwe — our team is here to help.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <motion.div
          className="grid lg:grid-cols-[1fr_420px] gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >

          {/* ── LEFT: Form ── */}
          <motion.div variants={cardVariant}>
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              {/* Brand top bar */}
              <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />

              <div className="p-8 md:p-10">
                <h2
                  className="text-[22px] font-bold text-slate-900 mb-1"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  Send a Message
                </h2>
                <p
                  className="text-[13px] text-slate-500 mb-8"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Fill in the form below and we will get back to you as soon as possible.
                </p>

                {sent ? (
                  /* ── Success state ── */
                  <motion.div
                    className="flex flex-col items-center text-center py-10 gap-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <div
                      className="h-14 w-14 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: BRAND_BG }}
                    >
                      <CheckCircle size={28} style={{ color: BRAND }} aria-hidden="true" />
                    </div>
                    <h3
                      className="text-[20px] font-bold text-slate-900"
                      style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                    >
                      Message Sent!
                    </h3>
                    <p
                      className="text-[13.5px] text-slate-500 max-w-sm leading-relaxed"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Thank you for reaching out. A member of our team will
                      respond to you within 2 business days.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setName(""); setEmail(""); setSubject(""); setMessage("");
                      }}
                      className="mt-2 text-[13px] font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
                      style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form fields ── */
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        label="Full Name"
                        placeholder="e.g. Tatenda Moyo"
                        value={name}
                        onChange={setName}
                        required
                      />
                      <Field
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={setEmail}
                        required
                      />
                    </div>

                    {/* Subject select */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-600"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full h-[44px] px-4 pr-10 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 appearance-none outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200"
                          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                        >
                          <option value="" disabled>Select a subject…</option>
                          <option>General Enquiry</option>
                          <option>Church Membership</option>
                          <option>Prayer Request</option>
                          <option>Donations &amp; Stewardship</option>
                          <option>Nduyo Hymnal App</option>
                          <option>Technical Issue</option>
                          <option>Other</option>
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-600"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        Message <span className="ml-1 text-red-400">*</span>
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Write your message here…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200 resize-none"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !name || !email || !message}
                      className="self-start inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ backgroundColor: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {loading ? (
                        <>
                          <span
                            className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                            aria-hidden="true"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={14} aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Info cards + map ── */}
          <div className="flex flex-col gap-5">

            {/* Info cards */}
            {CONTACT_INFO.map((item) => (
              <InfoCard key={item.label} icon={item.icon} label={item.label} lines={item.lines} />
            ))}

            {/* Map embed */}
            <motion.div
              className="rounded-2xl border border-slate-200 overflow-hidden"
              variants={cardVariant}
            >
              <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />
              <iframe
                title="UCCZ Synod Offices on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.6316348764567!2d31.0440!3d-17.8292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ5JzQ1LjEiUyAzMcKwMDInMzguNCJF!5e0!3m2!1sen!2szw!4v1700000000000"
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

          </div>
        </motion.div>

        {/* ── FAQ section ── */}
        <motion.div
          className="mt-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div className="mb-8" variants={fadeUp}>
            <p
              className="text-[10.5px] tracking-[0.28em] uppercase mb-2"
              style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Common Questions
            </p>
            <h2
              className="text-[28px] font-bold text-slate-900 tracking-[-0.01em]"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              Frequently Asked
              <span className="italic opacity-60"> Questions</span>
            </h2>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden divide-y-0 px-8"
            variants={cardVariant}
          >
            <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />
            <div className="px-0">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>

    </div>
  );
}