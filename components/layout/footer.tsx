"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        
        {/* Church Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">UCCZ</h2>
          <p className="text-sm text-gray-200">
            United Church of Christ in Zimbabwe is committed to spreading the
            gospel, empowering communities, and building strong Christian
            families across the nation.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-secondary">Home</Link></li>
            <li><Link href="/about" className="hover:text-secondary">About</Link></li>
            <li><Link href="/ministries" className="hover:text-secondary">Ministries</Link></li>
            <li><Link href="/events" className="hover:text-secondary">Events</Link></li>
            <li><Link href="/contact" className="hover:text-secondary">Contact</Link></li>
          </ul>
        </div>

        {/* Ministries */}
        <div>
          <h3 className="font-semibold mb-4">Ministries</h3>
          <ul className="space-y-2 text-sm">
            <li>Ruwadzano</li>
            <li>CYF</li>
            <li>Sunday School</li>
            <li>Men’s Fellowship</li>
            <li>Pastors</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>Harare, Zimbabwe</li>
            <li>Email: info@uccz.org</li>
            <li>Phone: +263 77 000 0000</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-600 text-center py-4 text-sm text-gray-300">
        © {new Date().getFullYear()} UCCZ. All rights reserved.
      </div>
    </footer>
  );
}