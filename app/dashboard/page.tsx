"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { resolveRoleRoute } from "@/constants/navigation";

export default function DashboardLandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    const target = resolveRoleRoute(user.role) ?? "/dashboard/super-admin";
    router.replace(target);
  }, [loading, user, router]);

  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center">
        <div className="text-lg font-medium">Loading dashboard…</div>
        <div className="text-sm text-muted-foreground mt-1">
          Preparing your workspace.
        </div>
      </div>
    </div>
  );
}

