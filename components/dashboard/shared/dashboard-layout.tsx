import { ReactNode } from "react";
import { AuthUser } from "@/types/user";

import { sidebarMap } from "../sidebars";
import { headerMap } from "../headers";

interface Props {
  user: AuthUser;
  children: ReactNode;
}

export default function DashboardLayout({ user, children }: Props) {
  // ✅ SAFE LOOKUP (NO FUNCTION CALLS)
  const Sidebar = sidebarMap[user.role];
  const Header = headerMap[user.role];

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* 🧭 SIDEBAR */}
      <Sidebar />

      {/* 📄 MAIN */}
      <div className="flex-1 flex flex-col">
        
        {/* 🔝 HEADER */}
        <Header user={user} />

        {/* 📦 CONTENT */}
        <main className="p-6 overflow-y-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
