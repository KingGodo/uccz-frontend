"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    if (
      data &&
      typeof data === "object" &&
      "data" in (data as AnyRecord) &&
      Array.isArray((data as AnyRecord).data)
    ) {
      return (data as AnyRecord).data as AnyRecord[];
    }
  }
  return [];
}

export default function SuperAdminUsersPage() {
  const [items, setItems] = useState<AnyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/users");
        if (cancelled) return;
        setItems(unwrapList(res.data));
      } catch (e) {
        if (cancelled) return;
        setError("Failed to load users.");
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
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-muted-foreground">All system users.</p>
      </div>

      {error ? (
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle>Couldn’t load users</CardTitle>
            <CardDescription className="text-destructive">{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base">Directory</CardTitle>
          <CardDescription>
            {loading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              `${items.length} user${items.length === 1 ? "" : "s"}`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-52" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  </TableRow>
                ))
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((row, idx) => {
                  const id = (row.id as string | number | undefined) ?? idx;
                  const firstName =
                    (row.first_name as string | undefined) ??
                    (row.firstName as string | undefined);
                  const lastName =
                    (row.last_name as string | undefined) ??
                    (row.lastName as string | undefined);
                  const name =
                    [firstName, lastName].filter(Boolean).join(" ") ||
                    ((row.name as string | undefined) ?? "—");

                  const role = (row.role as string | undefined) ?? "—";
                  const email = (row.email as string | undefined) ?? "—";
                  const isActive =
                    (row.is_active as boolean | undefined) ??
                    (row.isActive as boolean | undefined);

                  return (
                    <TableRow key={id}>
                      <TableCell className="text-muted-foreground">{id}</TableCell>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{role.replaceAll("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        {isActive === undefined ? (
                          <Badge variant="outline">—</Badge>
                        ) : isActive ? (
                          <Badge>Active</Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

