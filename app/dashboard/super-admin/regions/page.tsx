"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type AnyRecord = Record<string, unknown>;

function unwrapList(payload: unknown): AnyRecord[] {
  if (Array.isArray(payload)) return payload as AnyRecord[];
  if (payload && typeof payload === "object" && "data" in (payload as AnyRecord)) {
    const data = (payload as AnyRecord).data;
    if (Array.isArray(data)) return data as AnyRecord[];
    if (data && typeof data === "object" && "data" in (data as AnyRecord) && Array.isArray((data as AnyRecord).data)) {
      return (data as AnyRecord).data as AnyRecord[];
    }
  }
  return [];
}

export default function SuperAdminRegionsPage() {
  const [items, setItems] = useState<AnyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/regions");
        if (cancelled) return;
        setItems(unwrapList(res.data));
      } catch (e) {
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
        <p className="text-muted-foreground">All regions in the system.</p>
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
              <Skeleton className="h-4 w-40" />
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
                <TableHead>Conference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  </TableRow>
                ))
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground">
                    No regions found.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((row, idx) => (
                  <TableRow key={(row.id as string | number | undefined) ?? idx}>
                    <TableCell className="text-muted-foreground">
                      {(row.id as string | number | undefined) ?? "—"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {(row.name as string | undefined) ??
                        (row.title as string | undefined) ??
                        "—"}
                    </TableCell>
                    <TableCell>
                      {(row.conference_id as string | number | undefined) ??
                        ((row.conference as AnyRecord | undefined)?.name as string | undefined) ??
                        "—"}
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

