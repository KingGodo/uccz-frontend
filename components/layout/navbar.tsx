"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, Phone, Mail, ChevronDown,
  Users, BookOpen, Heart, ImageIcon,
  HelpCircle, MapPin, GraduationCap, HandHeart,
} from "lucide-react";
import clsx from "clsx";

// ── Brand tokens ──────────────────────────────────────────────────────────
const BRAND    = "rgb(54, 69, 99)";
const BRAND_D  = "rgb(40, 52, 76)";
const BRAND_BG = "rgba(54, 69, 99, 0.06)";

// ── Types ─────────────────────────────────────────────────────────────────
type NavChild = { name: string; href: string; icon: React.ReactNode; desc: string };
type NavLink  = { name: string; href: string; children?: NavChild[] };

// ── Navigation structure (mirrors live uccz.org) ──────────────────────────
const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "Who We Are",
    href: "/about",
    children: [
      { name: "About Us",           href: "/about",              icon: <BookOpen    size={15} />, desc: "Our history, mission & vision"      },
      { name: "Our Team",           href: "/team",               icon: <Users       size={15} />, desc: "Meet the people leading UCCZ"       },
      { name: "Spiritual Councils", href: "/conferences",        icon: <MapPin      size={15} />, desc: "Conferences & fellowship councils"  },
      { name: "Testimonials",       href: "/testimonials",       icon: <Heart       size={15} />, desc: "Stories of God's goodness"          },
      { name: "Gallery",            href: "/gallery",            icon: <ImageIcon   size={15} />, desc: "Photos from our community"          },
      { name: "FAQ",                href: "/faq",                icon: <HelpCircle  size={15} />, desc: "Common questions answered"          },
    ],
  },
  { name: "Events",       href: "/events" },
  { name: "Testimonials", href: "/testimonials" },
  {
    name: "Conferences & Councils",
    href: "/conferences",
    children: [
      { name: "Conferences",                href: "/conferences",              icon: <MapPin        size={15} />, desc: "Eastern, Northern & Western"      },
      { name: "Volunteers",                 href: "/ministries/volunteers",    icon: <HandHeart     size={15} />, desc: "Serve your community"             },
      { name: "Sunday School",              href: "/ministries/sunday-school", icon: <GraduationCap size={15} />, desc: "Faith formation for children"     },
      { name: "Christian Men's Fellowship", href: "/ministries/cmf",           icon: <Users         size={15} />, desc: "Brotherhood in faith"             },
      { name: "Christian Youth Fellowship", href: "/ministries/cyf",           icon: <Heart         size={15} />, desc: "Empowering the next generation"   },
      { name: "Ruwadzano",                  href: "/ministries/ruwadzano",     icon: <Heart         size={15} />, desc: "Women united in prayer"           },
    ],
  },
  { name: "Blog",    href: "/blog" },
  { name: "Contact", href: "/contact" },
];

// ── Topbar ────────────────────────────────────────────────────────────────
function Topbar() {
  return (
    <div
      className="hidden lg:block text-white text-[11.5px]"
      style={{ backgroundColor: BRAND }}
      role="complementary"
      aria-label="Contact information"
    >
      <div className="mx-auto max-w-7xl px-6 py-[7px] flex items-center justify-between">
        <div className="flex items-center gap-5">
          <a
            href="tel:+263773252439"
            className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity duration-150"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Phone size={10.5} strokeWidth={2.2} aria-hidden="true" />
            +263 773 252 439
          </a>
          <span className="opacity-20 select-none">|</span>
          <a
            href="mailto:uccz@uccz.org"
            className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity duration-150"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Mail size={10.5} strokeWidth={2.2} aria-hidden="true" />
            uccz@uccz.org
          </a>
        </div>
        <p
          className="opacity-55 tracking-wide text-[10.5px] italic"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          &ldquo;That They May All Be One&rdquo; &mdash; John 17:21
        </p>
      </div>
    </div>
  );
}

// ── Dropdown panel ────────────────────────────────────────────────────────
// FIX: children passed via JSX nesting, not as a prop
function DropdownPanel({
  isOpen,
  items,
}: {
  isOpen: boolean;
  items: NavChild[];
}) {
  return (
    <div
      className={clsx(
        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px]",
        "bg-white rounded-xl shadow-[0_8px_40px_rgba(54,69,99,0.13)] border border-gray-100",
        "grid grid-cols-2 gap-0.5 p-2",
        "transition-all duration-200 origin-top z-50",
        isOpen
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      )}
      role="menu"
    >
      {items.map((item) => (
        <DropdownItem key={item.href} item={item} />
      ))}
    </div>
  );
}

// ── Single dropdown item ──────────────────────────────────────────────────
function DropdownItem({ item }: { item: NavChild }) {
  return (
    <Link
      href={item.href}
      role="menuitem"
      className="group flex items-start gap-3 rounded-lg p-3 transition-colors duration-150 hover:bg-gray-50"
    >
      {/* Icon box — bg flips to brand on hover via group */}
      <span
        className="mt-[1px] flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-all duration-150 group-hover:text-white"
        style={{ backgroundColor: BRAND_BG, color: BRAND }}
        aria-hidden="true"
      >
        {/* Swap bg on group hover using Tailwind group state isn't possible inline,
            so we render two layers and toggle visibility */}
        <span className="group-hover:hidden block">{item.icon}</span>
        <span
          className="hidden group-hover:block"
          style={{ color: "white" }}
        >
          {item.icon}
        </span>
      </span>

      <div>
        <p
          className="text-[13px] font-semibold text-gray-800 group-hover:text-gray-900 leading-snug"
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

// ── Main Navbar ───────────────────────────────────────────────────────────
export default function Navbar() {
  const [isMenuOpen,   setIsMenuOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobile,   setOpenMobile]   = useState<string | null>(null);
  const pathname   = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll-aware shadow — setState inside listener callback (correct pattern)
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobile(null);
  };

  // Hover-intent: small delay before closing to prevent flicker
  const handleMouseEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <header className="fixed top-0 z-50 w-full">

      {/* ── Topbar ── */}
      <Topbar />

      {/* ── Nav bar ── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={clsx(
          "w-full bg-white border-b border-gray-100 transition-shadow duration-300",
          scrolled ? "shadow-[0_4px_32px_rgba(54,69,99,0.09)]" : "shadow-none"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="UCCZ — go to homepage"
          >
            <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full ring-2 ring-transparent group-hover:ring-[rgba(54,69,99,0.2)] transition-all duration-300">
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
                className="hidden sm:block text-[9px] tracking-[0.14em] text-gray-400 uppercase"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                United Church of Christ in Zimbabwe
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-0">
            {NAV_LINKS.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.children && handleMouseEnter(link.name)}
                onMouseLeave={() => link.children && handleMouseLeave()}
              >
                {link.children ? (
                  <>
                    {/* Dropdown trigger button */}
                    <button
                      className={clsx(
                        "flex items-center gap-1 px-3.5 py-2 text-[13px] rounded-md transition-all duration-200 whitespace-nowrap",
                        active(link.href)
                          ? "font-semibold"
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 font-medium"
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
                          "transition-transform duration-200 opacity-50",
                          openDropdown === link.name && "rotate-180 opacity-80"
                        )}
                      />
                    </button>

                    {/* Dropdown panel — items passed as prop, not children */}
                    <DropdownPanel
                      isOpen={openDropdown === link.name}
                      items={link.children}
                    />
                  </>
                ) : (
                  /* Plain link */
                  <Link
                    href={link.href}
                    aria-current={active(link.href) ? "page" : undefined}
                    className={clsx(
                      "relative flex items-center px-3.5 py-2 text-[13px] rounded-md transition-all duration-200 whitespace-nowrap",
                      active(link.href)
                        ? "font-semibold"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 font-medium"
                    )}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: active(link.href) ? BRAND : undefined,
                    }}
                  >
                    {link.name}
                    {/* Active underline dot */}
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
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">

            {/* Donate — outline */}
            <Link
              href="/donate"
              className="
                inline-flex items-center justify-center gap-1.5
                px-4 py-2 rounded-lg border text-[13px] font-semibold tracking-wide
                transition-all duration-200 hover:shadow-md active:scale-[0.97]
                hover:text-white
              "
              style={{
                borderColor:     BRAND,
                color:           BRAND,
                fontFamily:      "'Source Sans 3', sans-serif",
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
              className="
                inline-flex items-center justify-center
                px-4 py-2 rounded-lg text-[13px] font-semibold tracking-wide text-white
                transition-all duration-200
                hover:shadow-lg hover:shadow-[rgba(54,69,99,0.28)]
                active:scale-[0.97]
              "
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
            {isMenuOpen
              ? <X    size={18} className="text-gray-700" />
              : <Menu size={18} className="text-gray-700" />
            }
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
            isMenuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col px-4 pt-2 pb-5 overflow-y-auto max-h-[75vh]">

            {NAV_LINKS.map((link) =>
              link.children ? (
                /* Accordion group */
                <div key={link.name}>
                  <button
                    className={clsx(
                      "flex w-full items-center justify-between px-3 py-3 text-[13.5px] rounded-lg transition-colors duration-150",
                      active(link.href)
                        ? "font-semibold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium"
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
                        "opacity-40 transition-transform duration-200",
                        openMobile === link.name && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Accordion children — nested between tags */}
                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-200 ease-in-out",
                      openMobile === link.name ? "max-h-[400px]" : "max-h-0"
                    )}
                  >
                    <div className="ml-3 mb-1 border-l-2 border-gray-100 pl-3 flex flex-col gap-0.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2.5 py-2.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                          onClick={closeMenu}
                        >
                          <span style={{ color: BRAND }} aria-hidden="true">
                            {child.icon}
                          </span>
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Plain link */
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={active(link.href) ? "page" : undefined}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-3 text-[13.5px] rounded-lg transition-colors duration-150",
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

            {/* Contact info on mobile */}
            <div className="mt-3 mx-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="tel:+263773252439"
                className="flex items-center gap-2 text-[11.5px] text-gray-400"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Phone size={11} aria-hidden="true" />
                +263 773 252 439
              </a>
              <a
                href="mailto:uccz@uccz.org"
                className="flex items-center gap-2 text-[11.5px] text-gray-400"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Mail size={11} aria-hidden="true" />
                uccz@uccz.org
              </a>
            </div>

            {/* Mobile CTAs */}
            <div className="mt-4 px-3 flex flex-col gap-2.5">
              <Link
                href="/donate"
                className="block text-center text-[13.5px] font-semibold py-3 rounded-lg border transition-all duration-200 active:scale-[0.97]"
                style={{
                  borderColor: BRAND,
                  color:       BRAND,
                  fontFamily:  "'Source Sans 3', sans-serif",
                }}
                onClick={closeMenu}
              >
                Donate
              </Link>
              <Link
                href="/membership"
                className="block text-center text-[13.5px] font-semibold text-white py-3 rounded-lg transition-all duration-200 active:scale-[0.97]"
                style={{ backgroundColor: BRAND, fontFamily: "'Source Sans 3', sans-serif" }}
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