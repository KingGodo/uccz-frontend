"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TreasuryFinancePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Finance</h1>
        <p className="text-muted-foreground">
          Finance dashboard coming soon.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Module status</CardTitle>
          <CardDescription>
            We don’t yet have a finance endpoint wired to display transactions.
            You can still use this space for future finance charts and reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
            If you share the finance API endpoints (or response shape), I’ll connect
            this page properly.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

