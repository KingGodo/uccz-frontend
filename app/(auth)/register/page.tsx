"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { api, ApiResponse } from "@/lib/api";
import { AuthUser, UserRole } from "@/types/user";
import { ROLES } from "@/constants/roles";
import { Conference, Region, Church } from "@/types/member";

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
    conference_id: "",
    region_id: "",
    church_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const [conferences, setConferences] = useState<Conference[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [churches, setChurches] = useState<Church[]>([]);

  const regionsForConference = useMemo(() => {
    if (!form.conference_id) return regions;
    return regions.filter(
      (r) => String(r.conference_id) === form.conference_id
    );
  }, [regions, form.conference_id]);

  const churchesForRegion = useMemo(() => {
    if (!form.region_id) return churches;
    return churches.filter((c) => String(c.region_id) === form.region_id);
  }, [churches, form.region_id]);

  const selectedRoleLabel = useMemo(() => {
    if (!form.role) return "";
    return form.role.replaceAll("_", " ");
  }, [form.role]);

  const selectedConferenceName = useMemo(() => {
    if (!form.conference_id) return "";
    const conf = conferences.find(
      (c) => String((c as any).id) === form.conference_id
    );
    return (
      ((conf as any)?.name as string | undefined) ??
      ((conf as any)?.title as string | undefined) ??
      ""
    );
  }, [conferences, form.conference_id]);

  const selectedRegionName = useMemo(() => {
    if (!form.region_id) return "";
    const reg = regions.find(
      (r) => String((r as any).id) === form.region_id
    );
    return (
      ((reg as any)?.name as string | undefined) ??
      ((reg as any)?.title as string | undefined) ??
      ""
    );
  }, [regions, form.region_id]);

  const selectedChurchName = useMemo(() => {
    if (!form.church_id) return "";
    const ch = churches.find(
      (c) => String((c as any).id) === form.church_id
    );
    return (
      ((ch as any)?.name as string | undefined) ??
      ((ch as any)?.title as string | undefined) ??
      ""
    );
  }, [churches, form.church_id]);

  // 🔥 FETCH SELECT DATA
  useEffect(() => {
    let cancelled = false;

    async function loadOptions() {
      try {
        setLoadingOptions(true);

        const [confRes, regRes, churchRes] = await Promise.all([
          api.get<ApiResponse<Conference[]>>("/conferences"),
          api.get<ApiResponse<Region[]>>("/regions"),
          api.get<ApiResponse<Church[]>>("/churches"),
        ]);

        if (cancelled) return;
        setConferences(confRes.data.data);
        setRegions(regRes.data.data);
        setChurches(churchRes.data.data);
      } catch (e) {
        console.error("❌ Failed loading register options:", e);
      } finally {
        if (!cancelled) setLoadingOptions(false);
      }
    }

    loadOptions();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🔥 SUBMIT TRIGGERED");
    console.log("📦 Form Data:", form);

    if (!form.role) {
      console.warn("❌ No role selected");
      return MySwal.fire("Error", "Please select a role", "error");
    }

    if (form.role === "CONFERENCE_ADMIN") {
      if (!form.conference_id) {
        console.warn("❌ No conference selected");
        return MySwal.fire(
          "Error",
          "Please select a conference",
          "error"
        );
      }
    } else if (form.role === "REGION_ADMIN") {
      if (!form.region_id) {
        console.warn("❌ No region selected");
        return MySwal.fire("Error", "Please select a region", "error");
      }
    } else if (form.role !== "SUPER_ADMIN") {
      // Remaining admin roles need full scope selection.
      if (!form.conference_id || !form.region_id || !form.church_id) {
        console.warn("❌ Missing scope selections");
        return MySwal.fire(
          "Error",
          "Please select conference, region and church",
          "error"
        );
      }
    }

    setLoading(true);

    try {
      console.log("🚀 Sending API request...");

      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        role: form.role,
        ...(form.conference_id
          ? { conference_id: Number(form.conference_id) }
          : {}),
        ...(form.region_id ? { region_id: Number(form.region_id) } : {}),
        ...(form.church_id ? { church_id: Number(form.church_id) } : {}),
      };

      const response = await api.post<RegisterResponse>(
        "/auth/register",
        payload
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6 text-center">
          <Image src="/logo.png" alt="UCCZ Logo" width={72} height={72} />
          <h1 className="text-2xl font-semibold tracking-tight mt-3">
            Create Account
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Register with your role and scope.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create your account. Select your role and the required scope.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First name</Label>
                <Input
                  id="first_name"
                  placeholder="First Name"
                  value={form.first_name}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last name</Label>
                <Input
                  id="last_name"
                  placeholder="Last Name"
                  value={form.last_name}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={form.role || ""}
                  onValueChange={(value) => {
                    const nextRole = (value ?? "") as UserRole | "";

                    setForm((prev) => ({
                      ...prev,
                      role: nextRole,
                      conference_id: "",
                      region_id: "",
                      church_id: "",
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {selectedRoleLabel || "Select Role"}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.replaceAll("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {form.role === "CONFERENCE_ADMIN" ? (
                <div className="space-y-2">
                  <Label>Conference</Label>
                  <Select
                    value={form.conference_id || ""}
                    disabled={loadingOptions}
                    onValueChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        conference_id: value ?? "",
                        region_id: "",
                        church_id: "",
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {selectedConferenceName || "Select conference"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {conferences.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {(c as any).name ??
                            (c as any).title ??
                            `Conference ${c.id}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}

              {form.role === "REGION_ADMIN" ? (
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select
                    value={form.region_id || ""}
                    disabled={loadingOptions}
                    onValueChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        region_id: value ?? "",
                        conference_id: "",
                        church_id: "",
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {selectedRegionName || "Select region"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={String(r.id)}>
                          {(r as any).name ??
                            (r as any).title ??
                            `Region ${r.id}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}

              {form.role &&
              form.role !== "SUPER_ADMIN" &&
              form.role !== "CONFERENCE_ADMIN" &&
              form.role !== "REGION_ADMIN" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Conference</Label>
                    <Select
                      value={form.conference_id || ""}
                      disabled={loadingOptions}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          conference_id: value ?? "",
                          region_id: "",
                          church_id: "",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {selectedConferenceName || "Select conference"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {conferences.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {(c as any).name ??
                              (c as any).title ??
                              `Conference ${c.id}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select
                      value={form.region_id || ""}
                      disabled={loadingOptions || !form.conference_id}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          region_id: value ?? "",
                          church_id: "",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {selectedRegionName || "Select region"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {regionsForConference.map((r) => (
                          <SelectItem key={r.id} value={String(r.id)}>
                            {(r as any).name ??
                              (r as any).title ??
                              `Region ${r.id}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Church</Label>
                    <Select
                      value={form.church_id || ""}
                      disabled={loadingOptions || !form.region_id}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          church_id: value ?? "",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {selectedChurchName || "Select church"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {churchesForRegion.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {(c as any).name ??
                              (c as any).title ??
                              `Church ${c.id}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : null}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Register"}
              </Button>
            </form>

            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => router.push("/login")}
            >
              Already have an account? Login
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © {new Date().getFullYear()} UCCZ. All rights reserved.
        </p>
      </div>
    </div>
  );
}