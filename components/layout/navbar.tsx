"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Ministries", href: "/ministries" },
    { name: "Churches", href: "/churches" },
    { name: "Conferences", href: "/conferences" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-gray-100 bg-white/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="UCCZ Logo"
            width={28}
            height={28}
            className="object-contain"
            priority
          />
          <span className={clsx(
            "text-[13px] font-medium tracking-wide transition-colors",
            scrolled ? "text-gray-800" : "text-white"
          )}>
            UCCZ
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-[13px] tracking-wide transition-colors",
                  scrolled
                    ? isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA - BLUE BUTTON */}
        <div className="hidden md:flex items-center">
          <Link
            href="/membership"
            className="text-[13px] tracking-wide bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            Become a Member
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={clsx(
            "md:hidden transition-colors",
            scrolled ? "text-gray-700" : "text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden border-t border-gray-100 bg-white",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "px-6 py-3 text-[13px] tracking-wide",
                  isActive
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-black"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile CTA */}
          <Link
            href="/membership"
            className="mx-6 my-3 text-center text-[13px] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Become a Member
          </Link>
        </div>
      </div>
    </nav>
  );
}