"use client";

import Image from "next/image";
import { AuthUser } from "@/types/user";
import { logoutUser } from "@/lib/auth";

interface Props {
  title: string;
  user: AuthUser;
}

export default function DashboardHeader({ title, user }: Props) {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      
      {/* 🔥 LEFT SIDE */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="UCCZ Logo"
          width={35}
          height={35}
        />
        <h1 className="text-lg font-semibold text-gray-800">
          {title}
        </h1>
      </div>

      {/* 🔥 RIGHT SIDE */}
      <div className="flex items-center gap-4">
        
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">
            {user.email}
          </p>
          <p className="text-xs text-gray-500">
            {user.role.replaceAll("_", " ")}
          </p>
        </div>

        <button
          onClick={logoutUser}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
