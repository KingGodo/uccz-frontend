"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CouncilsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Councils
        </h1>
        <p className="text-muted-foreground">Other councils for Ruwadzano.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming soon</CardTitle>
          <CardDescription>
            This section is ready for council endpoints once they’re available.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
            If you have council-related API routes, share them and I’ll integrate.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

