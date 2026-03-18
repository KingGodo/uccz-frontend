"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="UCCZ Logo"
            width={30}
            height={30}
            className="object-contain"
            priority
          />
          <span className="text-sm font-semibold tracking-wide text-gray-900">
            UCCZ
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-sm transition-all duration-200",
                  isActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/membership"
            className="text-sm bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Become a Member
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden bg-white border-t border-gray-200",
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
                  "px-6 py-4 text-sm",
                  isActive
                    ? "text-black font-medium"
                    : "text-gray-600 hover:text-black"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="/membership"
            className="mx-6 my-4 text-center text-sm bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Become a Member
          </Link>
        </div>
      </div>
    </nav>
  );
}