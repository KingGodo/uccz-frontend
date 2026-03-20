"use client";

import { useEffect, useState } from "react";

import { api, ApiResponse } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TreasuryDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [membersCount, setMembersCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const membersRes = await api.get<ApiResponse<any[]>>("/members");
        if (cancelled) return;
        setMembersCount(membersRes.data.data.length);
      } catch {
        if (cancelled) return;
        setError("Failed to load dashboard stats.");
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Treasury</h1>
        <p className="text-muted-foreground">Overview and finance entry point.</p>
      </div>

      {error ? (
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle>Couldn’t load stats</CardTitle>
            <CardDescription className="text-destructive">
              {error}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Members</CardTitle>
          <CardDescription className="text-sm">Reference count</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? <Skeleton className="h-10 w-24" /> : membersCount}
        </CardContent>
      </Card>
    </div>
  );
}

