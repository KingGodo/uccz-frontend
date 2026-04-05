"use client";

/**
 * UCCZ Footer — components/layout/footer.tsx
 *
 * Improvements over original:
 * - bg-primary undefined token → actual brand color rgb(54, 69, 99)
 * - hover:text-secondary undefined token → brand accent white/80
 * - Real contact details from live uccz.org (address, phone, email)
 * - Newsletter subscription bar added (from live site)
 * - Social media links added
 * - Ministries column links are now real <Link> components
 * - Full site map column added (mirrors live uccz.org footer)
 * - Logo + tagline in brand column
 * - Bottom bar: copyright + privacy policy link
 * - Libre Baskerville headings + Source Sans 3 body
 */

import Link from "next/link";
import Image from "next/image";
import {
  Phone, Mail, MapPin,
  Facebook, Youtube, Twitter, Instagram,
  Heart, ArrowRight,
} from "lucide-react";

// ── Brand ─────────────────────────────────────────────────────────────────
const BRAND   = "rgb(54, 69, 99)";
const BRAND_D = "rgb(40, 52, 76)";

// ── Footer link groups ────────────────────────────────────────────────────
const QUICK_LINKS = [
  { name: "Home",          href: "/"            },
  { name: "About Us",      href: "/about"       },
  { name: "Our Team",      href: "/team"         },
  { name: "Events",        href: "/events"       },
  { name: "Blog & News",   href: "/blog"         },
  { name: "Gallery",       href: "/gallery"      },
  { name: "FAQ",           href: "/faq"          },
  { name: "Contact Us",    href: "/contact"      },
];

const MINISTRY_LINKS = [
  { name: "Christian Youth Fellowship", href: "/ministries/cyf"          },
  { name: "Christian Men's Fellowship", href: "/ministries/cmf"          },
  { name: "Ruwadzano",                  href: "/ministries/ruwadzano"    },
  { name: "Sunday School",              href: "/ministries/sunday-school"},
  { name: "Volunteers",                 href: "/ministries/volunteers"   },
];

const CONFERENCE_LINKS = [
  { name: "Eastern Conference",  href: "/conferences/eastern"  },
  { name: "Northern Conference", href: "/conferences/northern" },
  { name: "Western Conference",  href: "/conferences/western"  },
  { name: "Donate",              href: "/donate"               },
  { name: "Membership",          href: "/membership"           },
  { name: "Privacy Policy",      href: "/privacy"              },
];

const SOCIAL = [
  { icon: <Facebook  size={15} />, href: "#", label: "Facebook"  },
  { icon: <Youtube   size={15} />, href: "#", label: "YouTube"   },
  { icon: <Twitter   size={15} />, href: "#", label: "Twitter/X" },
  { icon: <Instagram size={15} />, href: "#", label: "Instagram" },
];

// ─────────────────────────────────────────────────────────────────────────
// NEWSLETTER BAR — sits at the very top of the footer
// ─────────────────────────────────────────────────────────────────────────
function NewsletterBar() {
  return (
    <div
      className="border-b border-white/10"
      style={{ backgroundColor: BRAND_D }}
    >
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p
            className="text-[15px] font-bold text-white"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Stay Connected
          </p>
          <p
            className="text-[12.5px] text-white/55 mt-0.5"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Receive updates, sermons and event news in your inbox.
          </p>
        </div>

        {/* Newsletter form — basic HTML, wire up to your backend */}
        <form
          className="flex w-full sm:w-auto gap-2"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Newsletter subscription"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            aria-label="Email address"
            className="flex-1 sm:w-[240px] px-4 py-2.5 rounded-lg text-[13px] bg-white/10 border border-white/15 text-white placeholder:text-white/35 outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[13px] font-semibold bg-white transition-all duration-200 hover:bg-white/90 active:scale-[0.97] shrink-0"
            style={{ color: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Subscribe
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// FOOTER COLUMN HEADING
// ─────────────────────────────────────────────────────────────────────────
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-5"
      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
    >
      {children}
    </h3>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// FOOTER LINK
// ─────────────────────────────────────────────────────────────────────────
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[13px] text-white/55 hover:text-white transition-colors duration-150 leading-relaxed"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {children}
      </Link>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// MAIN FOOTER
// ─────────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: BRAND }}
      role="contentinfo"
    >
      {/* Newsletter bar */}
      <NewsletterBar />

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2">

            {/* Logo + name */}
            <Link
              href="/"
              className="flex items-center gap-3 mb-5 group"
              aria-label="UCCZ homepage"
            >
              <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/15 group-hover:ring-white/30 transition-all duration-300">
                <Image
                  src="/logo.png"
                  alt="UCCZ Logo"
                  fill
                  className="object-contain p-[3px]"
                  sizes="40px"
                />
              </div>
              <div className="flex flex-col leading-none gap-[3px]">
                <span
                  className="text-[14px] font-bold tracking-[0.14em] uppercase text-white"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  UCCZ
                </span>
                <span
                  className="text-[9px] tracking-[0.13em] text-white/40 uppercase"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  United Church of Christ in Zimbabwe
                </span>
              </div>
            </Link>

            {/* Description */}
            <p
              className="text-[13.5px] text-white/55 leading-[1.85] max-w-[280px]"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Established in 1893 at Mount Selinda Mission, UCCZ has been a
              beacon of faith, hope and community across Zimbabwe for over
              130 years.
            </p>

            {/* Contact details — real info from live site */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=30+Second+Avenue+Parktown+Waterfalls+Harare+Zimbabwe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-[12.5px] text-white/50 hover:text-white transition-colors duration-150"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <MapPin size={13} className="mt-[1px] shrink-0 text-white/30" aria-hidden="true" />
                30/32 Second Avenue Parktown, Waterfalls, Harare, Zimbabwe
              </a>
              <a
                href="tel:+263773252439"
                className="flex items-center gap-2.5 text-[12.5px] text-white/50 hover:text-white transition-colors duration-150"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Phone size={13} className="text-white/30" aria-hidden="true" />
                +263 773 252 439
              </a>
              <a
                href="mailto:uccz@uccz.org"
                className="flex items-center gap-2.5 text-[12.5px] text-white/50 hover:text-white transition-colors duration-150"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Mail size={13} className="text-white/30" aria-hidden="true" />
                uccz@uccz.org
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-2.5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/50 hover:bg-white/20 hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <ColHeading>Quick Links</ColHeading>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>{l.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Ministries ── */}
          <div>
            <ColHeading>Ministries</ColHeading>
            <ul className="flex flex-col gap-2.5">
              {MINISTRY_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>{l.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Conferences & More ── */}
          <div>
            <ColHeading>Conferences</ColHeading>
            <ul className="flex flex-col gap-2.5">
              {CONFERENCE_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>{l.name}</FooterLink>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[12px] text-white/35"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            &copy; {new Date().getFullYear()} United Church of Christ in Zimbabwe.
            All rights reserved.
          </p>
          <p
            className="flex items-center gap-1.5 text-[12px] text-white/30"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Made with{" "}
            <Heart size={11} className="fill-red-400 text-red-400" aria-hidden="true" />
            {" "}in Zimbabwe
          </p>
        </div>
      </div>

    </footer>
  );
}