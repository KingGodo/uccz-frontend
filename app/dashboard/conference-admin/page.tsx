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
import type { Region, Church } from "@/types/member";

export default function ConferenceAdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [regionsCount, setRegionsCount] = useState(0);
  const [churchesCount, setChurchesCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [regionsRes, churchesRes] = await Promise.all([
          api.get<ApiResponse<Region[]>>("/regions"),
          api.get<ApiResponse<Church[]>>("/churches"),
        ]);

        if (cancelled) return;
        setRegionsCount(regionsRes.data.data.length);
        setChurchesCount(churchesRes.data.data.length);
      } catch (e) {
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
        <h1 className="text-2xl font-semibold tracking-tight">
          Conference Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview for conference-related resources.
        </p>
      </div>

      {error ? (
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle>Couldn’t load stats</CardTitle>
            <CardDescription className="text-destructive">{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Regions</CardTitle>
            <CardDescription className="text-sm">Total regions</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? <Skeleton className="h-10 w-24" /> : regionsCount}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Churches</CardTitle>
            <CardDescription className="text-sm">Total churches</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? <Skeleton className="h-10 w-24" /> : churchesCount}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

