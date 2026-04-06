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

export default function RuwadzanoDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [womenCount, setWomenCount] = useState(0);
  const [menCount, setMenCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const membersRes = await api.get<ApiResponse<any[]>>("/members");
        if (cancelled) return;

        const members = membersRes.data.data;

        const normalizeSex = (sex: unknown) =>
          String(sex ?? "").trim().toLowerCase();

        const females = members.filter((m) => {
          const s = normalizeSex((m as any).sex);
          return s === "female" || s.includes("female") || s.includes("woman");
        });

        const males = members.filter((m) => {
          const s = normalizeSex((m as any).sex);
          return s === "male" || s.includes("male") || s.includes("man");
        });

        setWomenCount(females.length);
        setMenCount(males.length);
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
        <h1 className="text-2xl font-semibold tracking-tight">Ruwadzano Dashboard</h1>
        <p className="text-muted-foreground">Overview for women members.</p>
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
            <CardTitle className="text-base">Women Fellowship</CardTitle>
            <CardDescription className="text-sm">Female members</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? <Skeleton className="h-10 w-24" /> : womenCount}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Men Fellowship</CardTitle>
            <CardDescription className="text-sm">Male members</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? <Skeleton className="h-10 w-24" /> : menCount}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Volunteers</CardTitle>
            <CardDescription className="text-sm">Coming soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? <Skeleton className="h-10 w-24" /> : 0}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Councils</CardTitle>
            <CardDescription className="text-sm">Coming soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? <Skeleton className="h-10 w-24" /> : 0}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

