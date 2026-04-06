"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { login, storeToken } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { AuthUser } from "@/types/user";
import { resolveRoleRoute } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ✅ Typed error
interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);

      console.log("✅ LOGIN RESPONSE:", res);

      const user: AuthUser = res.data.user;
      storeToken(res.data.token);

      // 💾 Save user
      localStorage.setItem("user", JSON.stringify(user));

      // 🧠 Update context
      setUser(user);

      // 🚀 Redirect
      const redirectPath = resolveRoleRoute(user.role) || "/dashboard/super-admin";
      router.push(redirectPath);

    } catch (err: unknown) {
      console.error("❌ LOGIN ERROR:", err);

      const error = err as ApiError;

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6 text-center">
          <Image src="/logo.png" alt="UCCZ Logo" width={72} height={72} />
          <h1 className="text-2xl font-semibold tracking-tight mt-3">
            UCCZ Membership System
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to your dashboard
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email and password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © {new Date().getFullYear()} UCCZ. All rights reserved.
        </p>
      </div>
    </div>
  );
}
