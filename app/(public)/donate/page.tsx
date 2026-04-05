"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Repeat,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

// ── Brand (same as blog + contact) ─────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_D  = "rgb(40, 52, 76)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Animation variants ──────────────────────────────────────────────────────
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

// ── Giving funds ────────────────────────────────────────────────────────────
const FUNDS = [
  {
    id:          "general",
    label:       "General Fund",
    description: "Supports the overall ministry and operations of the UCCZ, from pastoral care to community outreach.",
    icon:        "✝️",
  },
  {
    id:          "tithe",
    label:       "Tithe & Offerings",
    description: "Your faithful tithe returned to God, used to sustain congregations and advance the Gospel across Zimbabwe.",
    icon:        "🌿",
  },
  {
    id:          "missions",
    label:       "Missions",
    description: "Funds evangelism, church planting, and mission work in underserved communities throughout the region.",
    icon:        "🌍",
  },
  {
    id:          "education",
    label:       "Education Fund",
    description: "Supports UCCZ schools, bursaries for students in need, and theological training for future ministers.",
    icon:        "📖",
  },
  {
    id:          "relief",
    label:       "Relief & Welfare",
    description: "Provides food, clothing, and emergency aid to vulnerable families and disaster-affected communities.",
    icon:        "🤝",
  },
];

// ── Preset amounts ──────────────────────────────────────────────────────────
const PRESETS = [5, 10, 25, 50, 100, 250];

// ── Payment methods ─────────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  { id: "card",    label: "Card",         icon: CreditCard   },
  { id: "ecocash", label: "EcoCash",      icon: Smartphone   },
  { id: "bank",    label: "Bank Transfer",icon: Building2    },
];

// ── Impact stats ─────────────────────────────────────────────────────────────
const IMPACT_STATS = [
  { value: "320+",  label: "Congregations" },
  { value: "80K+",  label: "Members Served" },
  { value: "15+",   label: "Schools Supported" },
  { value: "100%",  label: "Accountable Giving" },
];

// ─────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────

/** Fund selector card */
function FundCard({
  fund,
  selected,
  onClick,
}: {
  fund: typeof FUNDS[0];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 active:scale-[0.98]"
      style={{
        backgroundColor: selected ? BRAND_BG : "white",
        borderColor:     selected ? BRAND : "rgb(226 232 240)",
        boxShadow:       selected ? `0 0 0 2px ${BRAND}22` : undefined,
      }}
    >
      <span className="text-[22px] leading-none mt-0.5 shrink-0" aria-hidden="true">
        {fund.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13.5px] font-bold leading-snug"
          style={{
            color:      selected ? BRAND : "rgb(15 23 42)",
            fontFamily: "'Libre Baskerville', Georgia, serif",
          }}
        >
          {fund.label}
        </p>
        <p
          className="mt-1 text-[12px] text-slate-500 leading-relaxed line-clamp-2"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {fund.description}
        </p>
      </div>
      {selected && (
        <CheckCircle
          size={16}
          className="shrink-0 mt-0.5"
          style={{ color: BRAND }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

/** Preset amount pill */
function AmountPill({
  value,
  selected,
  onClick,
}: {
  value: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-[44px] rounded-xl border text-[13.5px] font-bold transition-all duration-200 active:scale-[0.97]"
      style={{
        backgroundColor: selected ? BRAND : "white",
        borderColor:     selected ? BRAND : "rgb(226 232 240)",
        color:           selected ? "white" : BRAND,
        fontFamily:      "'Source Sans 3', sans-serif",
      }}
    >
      ${value}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function DonatePage() {
  const [selectedFund,    setSelectedFund]    = useState("general");
  const [frequency,       setFrequency]       = useState<"once" | "monthly">("once");
  const [presetAmount,    setPresetAmount]    = useState<number | null>(25);
  const [customAmount,    setCustomAmount]    = useState("");
  const [paymentMethod,   setPaymentMethod]   = useState("card");

  // Card fields
  const [cardName,    setCardName]    = useState("");
  const [cardNumber,  setCardNumber]  = useState("");
  const [cardExpiry,  setCardExpiry]  = useState("");
  const [cardCvv,     setCardCvv]     = useState("");

  // EcoCash
  const [ecoNumber,   setEcoNumber]   = useState("");

  // Bank
  // (static info shown)

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const displayAmount = customAmount
    ? parseFloat(customAmount) || 0
    : presetAmount ?? 0;

  const selectedFundObj = FUNDS.find((f) => f.id === selectedFund)!;

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    if (displayAmount <= 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  }

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
            Support the Ministry
          </motion.p>

          <motion.h1
            className="text-[38px] sm:text-[48px] font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            Give
            <span className="italic opacity-80"> Generously</span>
          </motion.h1>

          <motion.p
            className="mt-3 text-[14px] text-white/60 max-w-lg leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Each of you should give what you have decided in your heart to
            give, not reluctantly or under compulsion, for God loves a
            cheerful giver. — 2 Corinthians 9:7
          </motion.p>
        </motion.div>
      </div>

      {/* ── Impact stats bar ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-[24px] font-bold tracking-[-0.02em]"
                style={{ color: BRAND, fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {stat.value}
              </p>
              <p
                className="text-[11.5px] text-slate-500 mt-0.5 uppercase tracking-[0.12em]"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <motion.div
          className="grid lg:grid-cols-[1fr_400px] gap-10 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >

          {/* ── LEFT: Donation form ── */}
          <motion.div variants={cardVariant}>
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />

              <div className="p-8 md:p-10">

                {success ? (
                  /* ── Success state ── */
                  <motion.div
                    className="flex flex-col items-center text-center py-10 gap-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: BRAND_BG }}
                    >
                      <Heart size={30} style={{ color: BRAND }} aria-hidden="true" />
                    </div>
                    <h3
                      className="text-[24px] font-bold text-slate-900"
                      style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                    >
                      Thank You!
                    </h3>
                    <p
                      className="text-[13.5px] text-slate-500 max-w-sm leading-relaxed"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Your gift of{" "}
                      <strong style={{ color: BRAND }}>${displayAmount.toFixed(2)}</strong> to the{" "}
                      <strong>{selectedFundObj.label}</strong> has been received.
                      A confirmation will be sent to your email. May God bless you abundantly.
                    </p>
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setCustomAmount("");
                        setPresetAmount(25);
                        setCardName(""); setCardNumber(""); setCardExpiry(""); setCardCvv("");
                        setEcoNumber("");
                      }}
                      className="mt-2 text-[13px] font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
                      style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Make another gift
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDonate} noValidate>

                    {/* ── Step 1: Choose fund ── */}
                    <div className="mb-8">
                      <h2
                        className="text-[18px] font-bold text-slate-900 mb-1"
                        style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                      >
                        1. Choose a Fund
                      </h2>
                      <p
                        className="text-[12.5px] text-slate-400 mb-4"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        Where would you like your gift to go?
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {FUNDS.map((fund) => (
                          <FundCard
                            key={fund.id}
                            fund={fund}
                            selected={selectedFund === fund.id}
                            onClick={() => setSelectedFund(fund.id)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* ── Step 2: Frequency ── */}
                    <div className="mb-8">
                      <h2
                        className="text-[18px] font-bold text-slate-900 mb-4"
                        style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                      >
                        2. Giving Frequency
                      </h2>
                      <div className="flex gap-3">
                        {(["once", "monthly"] as const).map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setFrequency(f)}
                            className="flex-1 flex items-center justify-center gap-2 h-[44px] rounded-xl border text-[13px] font-semibold transition-all duration-200"
                            style={{
                              backgroundColor: frequency === f ? BRAND : "white",
                              borderColor:     frequency === f ? BRAND : "rgb(226 232 240)",
                              color:           frequency === f ? "white" : BRAND,
                              fontFamily:      "'Source Sans 3', sans-serif",
                            }}
                          >
                            {f === "monthly" && <Repeat size={13} aria-hidden="true" />}
                            {f === "once" ? "One-time" : "Monthly"}
                          </button>
                        ))}
                      </div>
                      {frequency === "monthly" && (
                        <motion.p
                          className="mt-2.5 text-[12px] text-slate-400 flex items-center gap-1.5"
                          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <ShieldCheck size={12} style={{ color: BRAND }} aria-hidden="true" />
                          You can cancel your recurring gift at any time.
                        </motion.p>
                      )}
                    </div>

                    {/* ── Step 3: Amount ── */}
                    <div className="mb-8">
                      <h2
                        className="text-[18px] font-bold text-slate-900 mb-4"
                        style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                      >
                        3. Select Amount
                      </h2>

                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-4">
                        {PRESETS.map((v) => (
                          <AmountPill
                            key={v}
                            value={v}
                            selected={presetAmount === v && !customAmount}
                            onClick={() => {
                              setPresetAmount(v);
                              setCustomAmount("");
                            }}
                          />
                        ))}
                      </div>

                      {/* Custom amount */}
                      <div className="relative">
                        <span
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-slate-400 pointer-events-none"
                          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                        >
                          $
                        </span>
                        <input
                          type="number"
                          min="1"
                          step="0.01"
                          placeholder="Enter custom amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setPresetAmount(null);
                          }}
                          className="w-full h-[44px] pl-8 pr-4 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200"
                          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                        />
                      </div>
                    </div>

                    {/* ── Step 4: Payment method ── */}
                    <div className="mb-8">
                      <h2
                        className="text-[18px] font-bold text-slate-900 mb-4"
                        style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                      >
                        4. Payment Method
                      </h2>

                      {/* Method tabs */}
                      <div className="flex gap-2.5 mb-5">
                        {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setPaymentMethod(id)}
                            className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border text-[11.5px] font-semibold transition-all duration-200"
                            style={{
                              backgroundColor: paymentMethod === id ? BRAND_BG : "white",
                              borderColor:     paymentMethod === id ? BRAND : "rgb(226 232 240)",
                              color:           paymentMethod === id ? BRAND : "rgb(100 116 139)",
                              fontFamily:      "'Source Sans 3', sans-serif",
                            }}
                          >
                            <Icon size={16} aria-hidden="true" />
                            {label}
                          </button>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">

                        {/* Card fields */}
                        {paymentMethod === "card" && (
                          <motion.div
                            key="card"
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28 }}
                          >
                            {/* Name on card */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate-600" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                                Name on Card
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Tatenda Moyo"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                className="h-[44px] px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200"
                                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                              />
                            </div>
                            {/* Card number */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate-600" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                                Card Number
                              </label>
                              <input
                                type="text"
                                placeholder="•••• •••• •••• ••••"
                                maxLength={19}
                                value={cardNumber}
                                onChange={(e) => {
                                  const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                                  setCardNumber(raw.replace(/(.{4})/g, "$1 ").trim());
                                }}
                                className="h-[44px] px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200 tracking-[0.1em]"
                                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate-600" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                                  Expiry
                                </label>
                                <input
                                  type="text"
                                  placeholder="MM / YY"
                                  maxLength={7}
                                  value={cardExpiry}
                                  onChange={(e) => {
                                    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                                    setCardExpiry(raw.length > 2 ? `${raw.slice(0, 2)} / ${raw.slice(2)}` : raw);
                                  }}
                                  className="h-[44px] px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200"
                                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate-600" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                                  CVV
                                </label>
                                <input
                                  type="text"
                                  placeholder="•••"
                                  maxLength={4}
                                  value={cardCvv}
                                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                  className="h-[44px] px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200"
                                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* EcoCash fields */}
                        {paymentMethod === "ecocash" && (
                          <motion.div
                            key="ecocash"
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28 }}
                          >
                            <div
                              className="rounded-xl p-4 text-[13px] leading-relaxed"
                              style={{ backgroundColor: BRAND_BG, color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                            >
                              Enter your EcoCash number below. You will receive a USSD prompt on your phone to authorise the payment.
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate-600" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                                EcoCash Number
                              </label>
                              <input
                                type="tel"
                                placeholder="+263 77 ••• ••••"
                                value={ecoNumber}
                                onChange={(e) => setEcoNumber(e.target.value)}
                                className="h-[44px] px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.10)] transition-all duration-200"
                                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* Bank transfer */}
                        {paymentMethod === "bank" && (
                          <motion.div
                            key="bank"
                            className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28 }}
                          >
                            <p
                              className="text-[12.5px] text-slate-500 leading-relaxed"
                              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                            >
                              Please use the details below to make a direct bank transfer. Use your name as the reference.
                            </p>
                            {[
                              ["Bank",           "CBZ Bank Zimbabwe"],
                              ["Account Name",   "United Church of Christ in Zimbabwe"],
                              ["Account Number", "1234567890"],
                              ["Branch",         "Harare Main Branch"],
                              ["Swift Code",     "CBZZWZHAXXX"],
                            ].map(([k, v]) => (
                              <div
                                key={k}
                                className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0"
                              >
                                <span
                                  className="text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-400"
                                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                                >
                                  {k}
                                </span>
                                <span
                                  className="text-[13px] font-semibold text-slate-800"
                                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                                >
                                  {v}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}

                      </AnimatePresence>
                    </div>

                    {/* ── Submit ── */}
                    <button
                      type="submit"
                      disabled={loading || displayAmount <= 0}
                      className="w-full flex items-center justify-center gap-2.5 h-[52px] rounded-xl text-[15px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ backgroundColor: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true" />
                          Processing…
                        </>
                      ) : (
                        <>
                          <Heart size={16} aria-hidden="true" />
                          Give {displayAmount > 0 ? `$${displayAmount.toFixed(2)}` : "Now"}
                          {frequency === "monthly" ? " / month" : ""}
                        </>
                      )}
                    </button>

                    {/* Security note */}
                    <p
                      className="mt-3 text-center text-[11.5px] text-slate-400 flex items-center justify-center gap-1.5"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      <ShieldCheck size={12} aria-hidden="true" />
                      Secured with 256-bit SSL encryption
                    </p>

                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="flex flex-col gap-5">

            {/* Your giving summary */}
            <motion.div
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
              variants={cardVariant}
            >
              <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />
              <div className="p-6">
                <p
                  className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-4"
                  style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Giving Summary
                </p>

                <div className="flex flex-col gap-3">
                  {[
                    ["Fund",      selectedFundObj.label],
                    ["Amount",    displayAmount > 0 ? `$${displayAmount.toFixed(2)}` : "—"],
                    ["Frequency", frequency === "once" ? "One-time" : "Monthly"],
                    ["Method",    PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label ?? "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span
                        className="text-[12px] text-slate-400 font-semibold uppercase tracking-[0.1em]"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {k}
                      </span>
                      <span
                        className="text-[13px] font-bold text-slate-800"
                        style={{ fontFamily: "'Source Sans 3', sans-serif", color: k === "Amount" && displayAmount > 0 ? BRAND : undefined }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Why give */}
            <motion.div
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
              variants={cardVariant}
            >
              <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />
              <div className="p-6">
                <p
                  className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-4"
                  style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Why Give?
                </p>
                <div className="flex flex-col gap-3.5">
                  {[
                    { icon: Heart,       text: "Your gift sustains congregations and pastoral ministry across Zimbabwe." },
                    { icon: ShieldCheck, text: "All funds are managed with full accountability and transparency." },
                    { icon: Repeat,      text: "Monthly giving helps us plan and reach more communities consistently." },
                    { icon: ChevronRight,text: "Every gift, however small, advances the Gospel and serves others." },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="shrink-0 h-7 w-7 rounded-lg flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: BRAND_BG }}
                      >
                        <Icon size={13} style={{ color: BRAND }} aria-hidden="true" />
                      </div>
                      <p
                        className="text-[12.5px] text-slate-500 leading-relaxed"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Need help */}
            <motion.div
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
              variants={cardVariant}
            >
              <div className="h-[3px] w-full" style={{ backgroundColor: BRAND }} aria-hidden="true" />
              <div className="p-6 flex items-center justify-between gap-4">
                <div>
                  <p
                    className="text-[13.5px] font-bold text-slate-800"
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  >
                    Need help giving?
                  </p>
                  <p
                    className="text-[12px] text-slate-500 mt-0.5"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Contact our stewardship team.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="shrink-0 inline-flex items-center gap-1.5 text-[12.5px] font-bold transition-opacity hover:opacity-70"
                  style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Contact Us
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>


    </div>
  );
}