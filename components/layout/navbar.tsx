"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, Phone, Mail, ChevronDown, Heart,
  Users, BookOpen, ImageIcon, HelpCircle,
  MapPin, GraduationCap, HandHeart,
} from "lucide-react";
import clsx from "clsx";

// ── Brand tokens ──────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_D  = "rgb(40, 52, 76)";
const BRAND_BG = "rgba(54, 69, 99, 0.07)";

// ── Types ─────────────────────────────────────────────────────────────────
type NavChild = { name: string; href: string; icon: React.ReactNode; desc: string };
type NavLink  = { name: string; href: string; children?: NavChild[] };

// ── Navigation structure ──────────────────────────────────────────────────
const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "Who We Are",
    href: "/about",
    children: [
      { name: "About Us",            href: "/about",        icon: <BookOpen      size={15} />, desc: "Our history, mission & vision"     },
      { name: "Our Team",            href: "/team",          icon: <Users         size={15} />, desc: "Meet the people leading UCCZ"      },
      { name: "Spiritual Councils",  href: "/conferences",   icon: <MapPin        size={15} />, desc: "Conferences & fellowship councils" },
      { name: "Testimonials",        href: "/testimonials",  icon: <Heart         size={15} />, desc: "Stories of God's goodness"         },
      { name: "Gallery",             href: "/gallery",       icon: <ImageIcon     size={15} />, desc: "Photos from our community"         },
      { name: "FAQ",                 href: "/faq",           icon: <HelpCircle    size={15} />, desc: "Common questions answered"         },
    ],
  },
  { name: "Events",       href: "/events" },
  { name: "Testimonials", href: "/testimonials" },
  {
    name: "Conferences & Councils",
    href: "/conferences",
    children: [
      { name: "Conferences",                 href: "/conferences",              icon: <MapPin        size={15} />, desc: "Eastern, Northern & Western"    },
      { name: "Volunteers",                  href: "/ministries/volunteers",    icon: <HandHeart     size={15} />, desc: "Serve your community"           },
      { name: "Sunday School",               href: "/ministries/sunday-school", icon: <GraduationCap size={15} />, desc: "Faith formation for children"   },
      { name: "Christian Men's Fellowship",  href: "/ministries/cmf",           icon: <Users         size={15} />, desc: "Brotherhood in faith"           },
      { name: "Christian Youth Fellowship",  href: "/ministries/cyf",           icon: <Heart         size={15} />, desc: "Empowering the next generation" },
      { name: "Ruwadzano",                   href: "/ministries/ruwadzano",     icon: <Heart         size={15} />, desc: "Women united in prayer"         },
    ],
  },
  { name: "Blog",    href: "/blog"    },
  { name: "Contact", href: "/contact" },
];

// ─────────────────────────────────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────────────────────────────────
function Topbar() {
  return (
    <div
      className="hidden lg:block text-white text-[11.5px]"
      style={{ backgroundColor: BRAND }}
      role="complementary"
      aria-label="Contact information"
    >
      <div className="mx-auto max-w-7xl px-6 py-[7px] flex items-center justify-between">

        {/* Left — contact */}
        <div className="flex items-center gap-5">
          <a
            href="tel:+263773252439"
            className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity duration-200"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Phone size={10.5} strokeWidth={2.2} aria-hidden="true" />
            +263 773 252 439
          </a>

          <span className="h-3 w-px bg-white/20" aria-hidden="true" />

          <a
            href="mailto:uccz@uccz.org"
            className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity duration-200"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Mail size={10.5} strokeWidth={2.2} aria-hidden="true" />
            uccz@uccz.org
          </a>
        </div>

        {/* Right — tagline */}
        <p
          className="text-[10.5px] italic opacity-50 tracking-wide"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          &ldquo;That They May All Be One&rdquo; &mdash; John 17:21
        </p>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// DROPDOWN PANEL
// ─────────────────────────────────────────────────────────────────────────
function DropdownPanel({ isOpen, items }: { isOpen: boolean; items: NavChild[] }) {
  return (
    <div
      className={clsx(
        // Position
        "absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2",
        "w-[500px] z-50",
        // Visual
        "bg-white rounded-2xl border border-gray-100/80",
        "shadow-[0_16px_56px_rgba(54,69,99,0.14),0_2px_8px_rgba(54,69,99,0.06)]",
        // Grid
        "grid grid-cols-2 gap-1 p-2.5",
        // Animation
        "transition-all duration-200 ease-out origin-top",
        isOpen
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-[0.97] -translate-y-1 pointer-events-none"
      )}
      role="menu"
    >
      {/* Tiny arrow pointing up */}
      <div
        className="absolute -top-[5px] left-1/2 -translate-x-1/2 h-[10px] w-[10px] rotate-45 bg-white border-l border-t border-gray-100/80"
        aria-hidden="true"
      />

      {items.map((item) => (
        <DropdownItem key={item.href} item={item} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// DROPDOWN ITEM
// ─────────────────────────────────────────────────────────────────────────
function DropdownItem({ item }: { item: NavChild }) {
  return (
    <Link
      href={item.href}
      role="menuitem"
      className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-slate-50"
    >
      {/* Icon */}
      <span
        className="mt-[1px] flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200"
        style={{ backgroundColor: BRAND_BG, color: BRAND }}
        aria-hidden="true"
      >
        {/* Default icon */}
        <span className="block group-hover:hidden">
          {item.icon}
        </span>
        {/* Hover icon — filled background */}
        <span
          className="hidden group-hover:block"
          style={{ color: "white" }}
        >
          {item.icon}
        </span>
      </span>

      {/* Text */}
      <div className="min-w-0">
        <p
          className="text-[13px] font-semibold text-gray-800 leading-snug truncate"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {item.name}
        </p>
        <p
          className="text-[11.5px] text-gray-400 mt-0.5 leading-snug"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {item.desc}
        </p>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isMenuOpen,   setIsMenuOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobile,   setOpenMobile]   = useState<string | null>(null);
  const pathname   = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll shadow
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Active check — handles nested routes
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close all mobile menus
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobile(null);
  };

  // Hover intent — prevents flicker when moving mouse between trigger and panel
  const handleMouseEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header className="fixed top-0 z-50 w-full">

      <Topbar />

      <nav
        role="navigation"
        aria-label="Main navigation"
        className={clsx(
          "w-full bg-white/95 backdrop-blur-sm border-b transition-all duration-300",
          scrolled
            ? "border-gray-100 shadow-[0_4px_40px_rgba(54,69,99,0.08)]"
            : "border-gray-100/60 shadow-none"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="UCCZ — go to homepage"
          >
            <div className="relative h-[38px] w-[38px] overflow-hidden rounded-full ring-2 ring-transparent group-hover:ring-[rgba(54,69,99,0.22)] transition-all duration-300">
              <Image
                src="/logo.png"
                alt="UCCZ Logo"
                fill
                sizes="38px"
                className="object-contain p-[3px]"
                priority
              />
            </div>
            <div className="flex flex-col leading-none gap-[3px]">
              <span
                className="text-[14px] font-bold tracking-[0.14em] uppercase"
                style={{ color: BRAND, fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                UCCZ
              </span>
              <span
                className="hidden sm:block text-[9px] tracking-[0.13em] text-gray-400 uppercase"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                United Church of Christ in Zimbabwe
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center">
            {NAV_LINKS.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.children && handleMouseEnter(link.name)}
                onMouseLeave={() => link.children && handleMouseLeave()}
              >
                {link.children ? (
                  <>
                    <button
                      className={clsx(
                        "flex items-center gap-1 px-3.5 py-2 text-[13px] rounded-lg transition-all duration-150 whitespace-nowrap select-none",
                        active(link.href)
                          ? "font-semibold"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 font-medium"
                      )}
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: active(link.href) ? BRAND : undefined,
                      }}
                      aria-expanded={openDropdown === link.name}
                      aria-haspopup="true"
                    >
                      {link.name}
                      <ChevronDown
                        size={13}
                        className={clsx(
                          "transition-transform duration-200",
                          openDropdown === link.name
                            ? "rotate-180 opacity-70"
                            : "opacity-40"
                        )}
                      />
                    </button>

                    <DropdownPanel
                      isOpen={openDropdown === link.name}
                      items={link.children}
                    />
                  </>
                ) : (
                  <Link
                    href={link.href}
                    aria-current={active(link.href) ? "page" : undefined}
                    className={clsx(
                      "relative flex items-center px-3.5 py-2 text-[13px] rounded-lg transition-all duration-150 whitespace-nowrap",
                      active(link.href)
                        ? "font-semibold"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 font-medium"
                    )}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: active(link.href) ? BRAND : undefined,
                    }}
                  >
                    {link.name}

                    {/* Active underline */}
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "absolute bottom-[6px] left-1/2 -translate-x-1/2 h-[2.5px] rounded-full transition-all duration-300",
                        active(link.href) ? "w-4 opacity-100" : "w-0 opacity-0"
                      )}
                      style={{ backgroundColor: BRAND }}
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* ── Desktop CTAs ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">

            {/* Donate — outline */}
            <Link
              href="/donate"
              className="inline-flex items-center gap-1.5 px-4 py-[9px] rounded-lg border text-[13px] font-semibold tracking-wide transition-all duration-200 hover:shadow-md active:scale-[0.97]"
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
              <Heart size={13} aria-hidden="true" />
              Donate
            </Link>

            {/* Become a Member — filled */}
            <Link
              href="/membership"
              className="inline-flex items-center gap-1.5 px-4 py-[9px] rounded-lg text-[13px] font-semibold tracking-wide text-white transition-all duration-200 hover:shadow-lg hover:shadow-[rgba(54,69,99,0.25)] active:scale-[0.97]"
              style={{ backgroundColor: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_D)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
            >
              Become a Member
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className={clsx(
              "lg:hidden flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200",
              isMenuOpen ? "bg-gray-100" : "hover:bg-gray-50"
            )}
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <span
              className={clsx(
                "transition-transform duration-200",
                isMenuOpen ? "rotate-90" : "rotate-0"
              )}
            >
              {isMenuOpen
                ? <X    size={18} className="text-gray-700" />
                : <Menu size={18} className="text-gray-700" />
              }
            </span>
          </button>

        </div>

        {/* ── Mobile drawer ── */}
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={clsx(
            "lg:hidden overflow-hidden border-t border-gray-100 bg-white",
            "transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-[740px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col px-4 pt-3 pb-6 overflow-y-auto max-h-[78vh]">

            {NAV_LINKS.map((link) =>
              link.children ? (

                /* ── Accordion ── */
                <div key={link.name} className="border-b border-gray-50 last:border-0">
                  <button
                    className={clsx(
                      "flex w-full items-center justify-between px-3 py-3.5 text-[13.5px] rounded-lg transition-colors duration-150",
                      active(link.href)
                        ? "font-semibold"
                        : "text-gray-600 hover:text-gray-900 font-medium"
                    )}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: active(link.href) ? BRAND : undefined,
                    }}
                    onClick={() =>
                      setOpenMobile((v) => (v === link.name ? null : link.name))
                    }
                    aria-expanded={openMobile === link.name}
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "opacity-40 transition-transform duration-200 shrink-0",
                        openMobile === link.name && "rotate-180 opacity-60"
                      )}
                    />
                  </button>

                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-250 ease-in-out",
                      openMobile === link.name ? "max-h-[420px] mb-2" : "max-h-0"
                    )}
                  >
                    <div className="ml-3 border-l-2 border-gray-100 pl-3 flex flex-col gap-0.5 py-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 py-2.5 text-[13px] text-gray-500 hover:text-gray-900 rounded-lg px-2 hover:bg-gray-50 transition-colors duration-150"
                          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                          onClick={closeMenu}
                        >
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                            style={{ backgroundColor: BRAND_BG, color: BRAND }}
                            aria-hidden="true"
                          >
                            {child.icon}
                          </span>
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

              ) : (

                /* ── Plain link ── */
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={active(link.href) ? "page" : undefined}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-3.5 text-[13.5px] rounded-lg transition-colors duration-150 border-b border-gray-50 last:border-0",
                    active(link.href)
                      ? "font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium"
                  )}
                  style={{
                    fontFamily:      "'Source Sans 3', sans-serif",
                    color:           active(link.href) ? BRAND : undefined,
                    backgroundColor: active(link.href) ? BRAND_BG : undefined,
                  }}
                  onClick={closeMenu}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "h-[18px] w-[3px] rounded-full shrink-0 transition-opacity duration-200",
                      active(link.href) ? "opacity-100" : "opacity-0"
                    )}
                    style={{ backgroundColor: BRAND }}
                  />
                  {link.name}
                </Link>

              )
            )}

            {/* ── Mobile contact ── */}
            <div className="mt-4 mx-1 pt-4 border-t border-gray-100 flex flex-col gap-2.5">
              <a
                href="tel:+263773252439"
                className="flex items-center gap-2 text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Phone size={12} aria-hidden="true" />
                +263 773 252 439
              </a>
              <a
                href="mailto:uccz@uccz.org"
                className="flex items-center gap-2 text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Mail size={12} aria-hidden="true" />
                uccz@uccz.org
              </a>
            </div>

            {/* ── Mobile CTAs ── */}
            <div className="mt-4 mx-1 flex flex-col gap-2.5">
              <Link
                href="/donate"
                className="flex items-center justify-center gap-1.5 text-[13.5px] font-semibold py-3 rounded-xl border transition-all duration-200 active:scale-[0.97]"
                style={{
                  borderColor: BRAND,
                  color:       BRAND,
                  fontFamily:  "'Source Sans 3', sans-serif",
                }}
                onClick={closeMenu}
              >
                <Heart size={14} aria-hidden="true" />
                Donate
              </Link>
              <Link
                href="/membership"
                className="flex items-center justify-center text-[13.5px] font-semibold text-white py-3 rounded-xl transition-all duration-200 active:scale-[0.97] shadow-md"
                style={{
                  backgroundColor: BRAND,
                  fontFamily:      "'Source Sans 3', sans-serif",
                  boxShadow:       "0 4px 16px rgba(54,69,99,0.25)",
                }}
                onClick={closeMenu}
              >
                Become a Member
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}