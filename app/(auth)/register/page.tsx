"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { api } from "@/lib/api";
import { AuthUser, UserRole } from "@/types/user";
import { ROLES } from "@/constants/roles";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MySwal = withReactContent(Swal);

interface RegisterResponse {
  user: AuthUser;
  token: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "" as UserRole | "",
    church_id: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🔥 SUBMIT TRIGGERED");
    console.log("📦 Form Data:", form);

    if (!form.role) {
      console.warn("❌ No role selected");
      return MySwal.fire("Error", "Please select a role", "error");
    }

    if (form.role !== "SUPER_ADMIN" && !form.church_id) {
      console.warn("❌ No church selected");
      return MySwal.fire("Error", "Please select a church", "error");
    }

    setLoading(true);

    try {
      console.log("🚀 Sending API request...");

      const response = await api.post<RegisterResponse>(
        "/auth/register",
        form
      );

      console.log("✅ API SUCCESS:", response.data);

      await MySwal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        confirmButtonText: "Go to Login",
      });

      console.log("➡️ Redirecting to login...");
      router.push("/login");
    } catch (err: unknown) {
      console.error("❌ ERROR:", err);

      let message = "Something went wrong";

      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as {
          response?: { data?: { message?: string } };
        };

        message = error.response?.data?.message || "Registration failed";
      }

      await MySwal.fire({
        title: "Registration Failed",
        text: message,
        icon: "error",
      });
    } finally {
      console.log("⏹️ Request finished");
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* LEFT */}
      <div className="hidden md:flex items-center justify-center bg-muted">
        <div className="text-center space-y-4">
          <Image src="/logo.png" alt="Logo" width={120} height={120} />
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                placeholder="First Name"
                value={form.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
              />

              <Input
                placeholder="Last Name"
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
              />

              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              {/* ✅ ROLE SELECT */}
              <Select
                value={form.role || ""}
                onValueChange={(value) => {
                  if (!value) return;

                  console.log("🎭 Role selected:", value);

                  setForm({
                    ...form,
                    role: value as UserRole,
                    church_id: "",
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>

                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* ✅ CHURCH SELECT */}
              {form.role && form.role !== "SUPER_ADMIN" && (
                <Select
                  value={form.church_id || ""}
                  onValueChange={(value) => {
                    console.log("⛪ Church selected:", value);
                    setForm({ ...form, church_id: value || "" });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Church" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">Church A</SelectItem>
                    <SelectItem value="2">Church B</SelectItem>
                    <SelectItem value="3">Church C</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Register"}
              </Button>
            </form>

            <Button
              variant="ghost"
              className="w-full mt-2"
              onClick={() => router.push("/login")}
            >
              Already have an account? Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}