"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

export default function SuperAdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    users: 0,
    conferences: 0,
    regions: 0,
    churches: 0,
    members: 0,
  });

  const cards = useMemo(
    () => [
      {
        label: "Users",
        value: counts.users,
        href: "/dashboard/super-admin/users",
      },
      {
        label: "Conferences",
        value: counts.conferences,
        href: "/dashboard/super-admin/conferences",
      },
      {
        label: "Regions",
        value: counts.regions,
        href: "/dashboard/super-admin/regions",
      },
      {
        label: "Churches",
        value: counts.churches,
        href: "/dashboard/super-admin/churches",
      },
      {
        label: "Members",
        value: counts.members,
        href: "/dashboard/super-admin/members",
      },
    ],
    [counts]
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [usersRes, conferencesRes, regionsRes, churchesRes, membersRes] =
          await Promise.all([
            api.get("/users"),
            api.get("/conferences"),
            api.get("/regions"),
            api.get("/churches"),
            api.get("/members"),
          ]);

        const asList = (payload: unknown): unknown[] => {
          if (Array.isArray(payload)) return payload;
          if (
            payload &&
            typeof payload === "object" &&
            "data" in (payload as Record<string, unknown>) &&
            Array.isArray((payload as Record<string, unknown>).data)
          ) {
            return (payload as Record<string, unknown>).data as unknown[];
          }
          if (
            payload &&
            typeof payload === "object" &&
            "data" in (payload as Record<string, unknown>) &&
            (payload as any).data &&
            typeof (payload as any).data === "object" &&
            Array.isArray((payload as any).data.data)
          ) {
            return (payload as any).data.data as unknown[];
          }
          return [];
        };

        if (cancelled) return;
        setCounts({
          users: asList(usersRes.data).length,
          conferences: asList(conferencesRes.data).length,
          regions: asList(regionsRes.data).length,
          churches: asList(churchesRes.data).length,
          members: asList(membersRes.data).length,
        });
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
        <h2 className="text-2xl font-semibold tracking-tight">Super Admin</h2>
        <p className="text-muted-foreground">
          System-wide overview and management.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="block">
            <Card className="border bg-background hover:bg-muted/20 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {card.label}
                    </div>
                    <div className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
                      {loading ? <Skeleton className="h-7 w-16" /> : card.value}
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
