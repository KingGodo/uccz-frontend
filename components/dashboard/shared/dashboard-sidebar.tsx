"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem } from "@/constants/navigation";

interface Props {
  title: string;
  items: NavItem[];
}

export default function DashboardSidebar({ title, items }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md p-5">
      
      {/* 🧾 TITLE */}
      <h2 className="text-lg font-bold mb-6">{title}</h2>

      {/* 📍 NAV */}
      <nav className="space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
