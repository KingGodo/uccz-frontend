"use client";

/**
 * UCCZ Membership Registration — app/(public)/membership/page.tsx
 *
 * Fixes in this version:
 * 1. Select dropdowns show the NAME not the ID value
 *    — shadcn Select uses `value` as both the stored value and display.
 *      Fix: store name separately, use id only for API calls.
 * 2. Phone field has a fixed "+263" prefix — user only types the rest.
 *    — Stored in form.phone as "+263XXXXXXXXX" (combined on change)
 */

import { useEffect, useState } from "react";
import { api, ApiResponse } from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import {
  Conference,
  Region,
  Church,
  Ministry,
  MemberFormData,
} from "@/types/member";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_D  = "rgb(40, 52, 76)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Animation ─────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// ── Field wrapper ─────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Text input ────────────────────────────────────────────────────────────
function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full h-[42px] px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[rgb(54,69,99)] focus:ring-2 focus:ring-[rgba(54,69,99,0.12)]"
      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
    />
  );
}

// ── Phone input with fixed +263 prefix ───────────────────────────────────
function PhoneInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (full: string) => void;
}) {
  // Strip the prefix so the input shows only what the user types
  const LOCAL_PREFIX = "+263";
  const localPart = value.startsWith(LOCAL_PREFIX)
    ? value.slice(LOCAL_PREFIX.length)
    : value;

  return (
    <div className="flex h-[42px] rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 focus-within:border-[rgb(54,69,99)] focus-within:ring-2 focus-within:ring-[rgba(54,69,99,0.12)]">
      {/* Fixed prefix */}
      <span
        className="flex items-center px-3 text-[13.5px] font-semibold border-r border-slate-200 bg-slate-50 text-slate-500 select-none"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        aria-hidden="true"
      >
        +263
      </span>
      {/* User input — just the local number */}
      <input
        type="tel"
        placeholder="77 000 0000"
        value={localPart}
        onChange={(e) => {
          // Strip any leading zeros or spaces; combine with prefix
          const raw = e.target.value.replace(/[^0-9\s]/g, "");
          onChange(`${LOCAL_PREFIX}${raw}`);
        }}
        className="flex-1 px-3 text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        aria-label="Phone number (after +263)"
        maxLength={12}
      />
    </div>
  );
}

// ── Step heading ──────────────────────────────────────────────────────────
function SectionLabel({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
        style={{ backgroundColor: BRAND, fontFamily: "'Libre Baskerville', Georgia, serif" }}
        aria-hidden="true"
      >
        {step}
      </span>
      <h3
        className="text-[15px] font-bold text-slate-800"
        style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
      >
        {children}
      </h3>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function MembershipPage() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [regions,     setRegions]     = useState<Region[]>([]);
  const [churches,    setChurches]    = useState<Church[]>([]);
  const [ministries,  setMinistries]  = useState<Ministry[]>([]);
  const [loading,     setLoading]     = useState(false);

  /*
   * FIX 1 — Store the selected ID separately from the displayed name.
   * shadcn <Select> binds `value` to what it shows in the trigger.
   * If we pass `String(id)` as value, it displays the ID number.
   * Solution: use the item's NAME as the Select value (it's unique
   * within each list), then look up the ID when we need it for API calls.
   */
  const [selectedConferenceName, setSelectedConferenceName] = useState<string>("");
  const [selectedRegionName,     setSelectedRegionName]     = useState<string>("");
  const [selectedChurchName,     setSelectedChurchName]     = useState<string>("");

  // Derived IDs — looked up from the name whenever needed
  const selectedConferenceId = conferences.find(
    (c) => c.name === selectedConferenceName
  )?.id;

  const selectedRegionId = regions.find(
    (r) => r.name === selectedRegionName
  )?.id;

  const selectedChurchId = churches.find(
    (c) => c.name === selectedChurchName
  )?.id;

  const [form, setForm] = useState<MemberFormData>({
    church_id:            0,
    first_name:           "",
    last_name:            "",
    sex:                  "",
    date_of_birth:        "",
    email:                "",
    phone:                "+263",   // pre-filled prefix
    has_relative_in_uccz: false,
    ministries:           [],
  });

  // ── Fetch conferences + ministries ──────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const confRes = await api.get<ApiResponse<Conference[]>>("/conferences");
        setConferences(confRes.data.data);

        const minRes = await api.get<ApiResponse<Ministry[]>>("/ministries");
        setMinistries(minRes.data.data);
      } catch (err) {
        console.error("❌ Initial fetch error:", err);
      }
    };
    fetchData();
  }, []);

  // ── Fetch regions when conference selected ──────────────────────────────
  useEffect(() => {
    if (!selectedConferenceId) return;
    const fetchRegions = async () => {
      try {
        const res = await api.get<ApiResponse<Region[]>>(
          `/regions/conference/${selectedConferenceId}`
        );
        setRegions(res.data.data);
        setChurches([]);
        setSelectedRegionName("");
        setSelectedChurchName("");
        setForm((prev) => ({ ...prev, church_id: 0 }));
      } catch (err) {
        console.error("❌ Regions fetch error:", err);
      }
    };
    fetchRegions();
  }, [selectedConferenceId]);

  // ── Fetch churches when region selected ────────────────────────────────
  useEffect(() => {
    if (!selectedRegionId) return;
    const fetchChurches = async () => {
      try {
        const res = await api.get<ApiResponse<Church[]>>(
          `/churches/region/${selectedRegionId}`
        );
        setChurches(res.data.data);
        setSelectedChurchName("");
        setForm((prev) => ({ ...prev, church_id: 0 }));
      } catch (err) {
        console.error("❌ Churches fetch error:", err);
      }
    };
    fetchChurches();
  }, [selectedRegionId]);

  // ── Form handlers ───────────────────────────────────────────────────────
  const handleChange = (
    name: keyof MemberFormData,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMinistry = (id: number) => {
    setForm((prev) => ({
      ...prev,
      ministries: prev.ministries.includes(id)
        ? prev.ministries.filter((m) => m !== id)
        : [...prev.ministries, id],
    }));
  };

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<{ id: number }>>("/members", form);
      const memberId = res.data.data.id;

      await Promise.all(
        form.ministries.map((ministry_id) =>
          api.post("/member-ministries", { member_id: memberId, ministry_id })
        )
      );

      window.location.href = "/membership/success";
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Page header ── */}
      <div
        className="relative overflow-hidden border-b border-white/10 text-white py-16"
        style={{ backgroundColor: BRAND }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-12 -right-12 h-52 w-52 rounded-full opacity-[0.06] pointer-events-none"
          style={{ backgroundColor: "white" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full opacity-[0.05] pointer-events-none"
          style={{ backgroundColor: "white" }}
          aria-hidden="true"
        />

        <motion.div
          className="relative max-w-4xl mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[12px] text-white/60 hover:text-white transition-colors duration-150 mb-6"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <ArrowLeft size={13} aria-hidden="true" />
              Back to Home
            </Link>
          </motion.div>

          <motion.p
            className="text-[10.5px] tracking-[0.28em] uppercase text-white/50 mb-3"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Join the Community
          </motion.p>

          <motion.h1
            className="text-[34px] sm:text-[42px] font-bold text-white leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            variants={fadeUp}
          >
            Membership
            <span className="italic opacity-80"> Registration</span>
          </motion.h1>

          <motion.p
            className="mt-3 text-[14px] text-white/60 max-w-lg leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            variants={fadeUp}
          >
            Register a new member into the United Church of Christ in Zimbabwe.
            Select your conference, region, and church, then complete the details below.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Form card ── */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_32px_rgba(54,69,99,0.07)] overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>

            {/* ══════════════════════════════
                STEP 1 — Church Selection
                FIX: value = item.name (string), so Select shows the name.
                     ID is derived separately via .find()
            ══════════════════════════════ */}
            <div className="px-8 py-8 border-b border-slate-100">
              <SectionLabel step={1}>Select Your Church</SectionLabel>

              <div className="grid md:grid-cols-3 gap-5">

                {/* Conference */}
                <Field label="Conference">
                  <Select
                    value={selectedConferenceName}
                    onValueChange={(name) => setSelectedConferenceName(name ?? "")}
                  >
                    <SelectTrigger
                      className="h-[42px] rounded-xl border-slate-200 text-[13.5px] focus:ring-2 focus:ring-[rgba(54,69,99,0.12)] focus:border-[rgb(54,69,99)]"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      <SelectValue placeholder="Select conference" />
                    </SelectTrigger>
                    <SelectContent>
                      {conferences.map((c) => (
                        // value = c.name → trigger displays the name ✓
                        <SelectItem key={c.id} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {/* Region */}
                <Field label="Region">
                  <Select
                    value={selectedRegionName}
                    onValueChange={(name) => setSelectedRegionName(name ?? "")}
                    disabled={!selectedConferenceName}
                  >
                    <SelectTrigger
                      className="h-[42px] rounded-xl border-slate-200 text-[13.5px] focus:ring-2 focus:ring-[rgba(54,69,99,0.12)] focus:border-[rgb(54,69,99)] disabled:opacity-40"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={r.name}>
                          {r.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {/* Church */}
                <Field label="Church">
                  <Select
                    value={selectedChurchName}
                    onValueChange={(name) => {
                      const safe = name ?? "";
                      setSelectedChurchName(safe);
                      const church = churches.find((c) => c.name === safe);
                      handleChange("church_id", church?.id ?? 0);
                    }}
                    disabled={!selectedRegionName}
                  >
                    <SelectTrigger
                      className="h-[42px] rounded-xl border-slate-200 text-[13.5px] focus:ring-2 focus:ring-[rgba(54,69,99,0.12)] focus:border-[rgb(54,69,99)] disabled:opacity-40"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      <SelectValue placeholder="Select church" />
                    </SelectTrigger>
                    <SelectContent>
                      {churches.map((c) => (
                        <SelectItem key={c.id} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

              </div>
            </div>

            {/* ══════════════════════════════
                STEP 2 — Personal Details
            ══════════════════════════════ */}
            <div className="px-8 py-8 border-b border-slate-100">
              <SectionLabel step={2}>Personal Details</SectionLabel>

              <div className="flex flex-col gap-5">

                {/* Names */}
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="First Name">
                    <StyledInput
                      placeholder="e.g. Tendai"
                      value={form.first_name}
                      onChange={(e) => handleChange("first_name", e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Last Name">
                    <StyledInput
                      placeholder="e.g. Moyo"
                      value={form.last_name}
                      onChange={(e) => handleChange("last_name", e.target.value)}
                      required
                    />
                  </Field>
                </div>

                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Email Address">
                    <StyledInput
                      type="email"
                      placeholder="example@gmail.com"
                      value={form.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </Field>

                  {/*
                   * FIX 2 — Phone with +263 prefix locked in.
                   * PhoneInput stores "+263" + whatever the user types.
                   * The form.phone value sent to the API is always "+263XXXXXXXXX".
                   */}
                  <Field label="Phone Number">
                    <PhoneInput
                      value={form.phone || "+263"}
                      onChange={(full) => handleChange("phone", full)}
                    />
                  </Field>
                </div>

                {/* DOB + Sex */}
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Date of Birth">
                    <StyledInput
                      type="date"
                      value={form.date_of_birth}
                      onChange={(e) => handleChange("date_of_birth", e.target.value)}
                      required
                    />
                  </Field>

                  <Field label="Sex">
                    <Select
                      value={form.sex}
                      onValueChange={(v) => handleChange("sex", v ?? "")}
                    >
                      <SelectTrigger
                        className="h-[42px] rounded-xl border-slate-200 text-[13.5px] focus:ring-2 focus:ring-[rgba(54,69,99,0.12)] focus:border-[rgb(54,69,99)]"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                {/* Relative in UCCZ */}
                <div>
                  <label
                    className="flex items-start gap-3 cursor-pointer"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <span className="relative mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={form.has_relative_in_uccz}
                        onChange={(e) =>
                          handleChange("has_relative_in_uccz", e.target.checked)
                        }
                      />
                      <span className="h-5 w-5 rounded-md border-2 border-slate-300 bg-white transition-all duration-150 peer-checked:border-[rgb(54,69,99)] peer-checked:bg-[rgb(54,69,99)] flex items-center justify-center">
                        {form.has_relative_in_uccz && (
                          <CheckCircle2 size={12} className="text-white" />
                        )}
                      </span>
                    </span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-slate-800">
                        I have a relative in UCCZ
                      </p>
                      <p className="text-[12px] text-slate-400 mt-0.5">
                        Check this if a family member is already a registered member.
                      </p>
                    </div>
                  </label>
                </div>

              </div>
            </div>

            {/* ══════════════════════════════
                STEP 3 — Ministries
            ══════════════════════════════ */}
            <div className="px-8 py-8 border-b border-slate-100">
              <SectionLabel step={3}>Join a Ministry</SectionLabel>

              <p
                className="text-[13px] text-slate-500 mb-5 -mt-2"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Select one or more Spiritual Councils you would like to join.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {ministries.map((m) => {
                  const isChecked = form.ministries.includes(m.id);
                  return (
                    <label
                      key={m.id}
                      className="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150"
                      style={{
                        borderColor:     isChecked ? BRAND : "#e2e8f0",
                        backgroundColor: isChecked ? BRAND_BG : "white",
                      }}
                    >
                      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={isChecked}
                          onChange={() => toggleMinistry(m.id)}
                        />
                        <span
                          className="h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all duration-150"
                          style={{
                            borderColor:     isChecked ? BRAND : "#cbd5e1",
                            backgroundColor: isChecked ? BRAND : "white",
                          }}
                        >
                          {isChecked && (
                            <CheckCircle2 size={12} className="text-white" />
                          )}
                        </span>
                      </span>
                      <span
                        className="text-[13.5px] transition-colors duration-150"
                        style={{
                          color:      isChecked ? BRAND : "#475569",
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontWeight: isChecked ? 600 : 500,
                        }}
                      >
                        {m.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ══════════════════════════════
                SUBMIT
            ══════════════════════════════ */}
            <div className="px-8 py-7 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p
                className="text-[12.5px] text-slate-400 max-w-sm"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                By registering, you agree to become a member of the United Church
                of Christ in Zimbabwe.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[13.5px] font-bold text-white transition-all duration-200 hover:shadow-lg active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                style={{
                  backgroundColor: BRAND,
                  fontFamily:      "'Source Sans 3', sans-serif",
                  boxShadow:       loading ? "none" : "0 4px 20px rgba(54,69,99,0.28)",
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = BRAND_D)}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = BRAND)}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Register Member
                    <ArrowRight size={15} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}