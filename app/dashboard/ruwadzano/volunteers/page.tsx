"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VolunteersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Volunteers</h1>
        <p className="text-muted-foreground">Volunteer management for Ruwadzano.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming soon</CardTitle>
          <CardDescription>
            We’ll connect the volunteers endpoint once it’s available in your backend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
            Tip: If you share the volunteers API route + response shape, I’ll wire this page to live data.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

