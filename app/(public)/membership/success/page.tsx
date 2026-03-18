"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow text-center">

        <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />

        <h1 className="text-2xl font-semibold text-gray-900">
          Registration Successful
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Your membership has been successfully recorded. Welcome to the UCCZ community.
        </p>

        <div className="mt-6 space-y-3">
          <Link href="/">
            <Button className="w-full">Back to Home</Button>
          </Link>

          <Link href="/membership">
            <Button variant="outline" className="w-full">
              Register Another Member
            </Button>
          </Link>
        </div>

      </div>

    </section>
  );
}
