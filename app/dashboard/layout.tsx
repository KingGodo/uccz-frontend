"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/dashboard/shared/dashboard-layout";

export default function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
