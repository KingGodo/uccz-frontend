/**
 * UCCZ Root Layout — app/layout.tsx
 *
 * Loads the two brand fonts globally:
 *   - Libre Baskerville → headings, logo, scripture quotes (authoritative, traditional)
 *   - Source Sans 3     → nav, body, UI text (clean, readable, professional)
 *
 * Drop-in addition — keep whatever else you already have in this file.
 * Just make sure the <head> font links and the className on <body> are present.
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UCCZ | United Church of Christ in Zimbabwe",
  description:
    "United Church of Christ in Zimbabwe — a union of believers grounded in faith, community, and service since 1893.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
         * Google Fonts — Libre Baskerville + Source Sans 3
         * preconnect speeds up the font load
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      {/*
       * font-sans applies Source Sans 3 as the default body font.
       * Use font-serif class (or inline style) for headings / display text.
       */}
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}