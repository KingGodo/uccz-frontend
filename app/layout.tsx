import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers"; // ✅ ADD THIS

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

      <body className="font-sans antialiased bg-white text-gray-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}