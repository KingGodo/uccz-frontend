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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Region } from "@/types/member";

export default function ConferenceAdminRegionsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Region[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get<ApiResponse<Region[]>>("/regions");
        if (cancelled) return;
        setItems(res.data.data);
      } catch {
        if (cancelled) return;
        setError("Failed to load regions.");
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
        <h1 className="text-2xl font-semibold tracking-tight">Regions</h1>
        <p className="text-muted-foreground">Manage all regions.</p>
      </div>

      {error ? (
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle>Couldn’t load regions</CardTitle>
            <CardDescription className="text-destructive">{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base">List</CardTitle>
          <CardDescription>
            {loading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              `${items.length} region${items.length === 1 ? "" : "s"}`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Conference ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground">
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground">
                    No regions found.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-muted-foreground">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {r.conference_id}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

