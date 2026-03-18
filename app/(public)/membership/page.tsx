"use client";

import { useEffect, useState } from "react";
import { api, ApiResponse } from "@/lib/api";
import Link from "next/link";

import {
  Conference,
  Region,
  Church,
  Ministry,
  MemberFormData,
} from "@/types/member";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MembershipPage() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [churches, setChurches] = useState<Church[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<MemberFormData>({
    church_id: 0,
    first_name: "",
    last_name: "",
    sex: "",
    date_of_birth: "",
    has_relative_in_uccz: false,
    ministries: [],
  });

  const [selectedConference, setSelectedConference] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

  // 🔥 FETCH CONFERENCES + MINISTRIES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const confRes = await api.get<ApiResponse<Conference[]>>("/conferences");
        setConferences(confRes.data.data);

        const minRes = await api.get<ApiResponse<Ministry[]>>("/ministries");
        setMinistries(minRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // 🔥 FETCH REGIONS
  useEffect(() => {
    if (!selectedConference) return;

    const fetchRegions = async () => {
      try {
        const res = await api.get<ApiResponse<Region[]>>(
          `/regions?conference_id=${selectedConference}`
        );
        setRegions(res.data.data);
        setChurches([]);
        setSelectedRegion(null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRegions();
  }, [selectedConference]);

  // 🔥 FETCH CHURCHES
  useEffect(() => {
    if (!selectedRegion) return;

    const fetchChurches = async () => {
      try {
        const res = await api.get<ApiResponse<Church[]>>(
          `/churches?region_id=${selectedRegion}`
        );
        setChurches(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChurches();
  }, [selectedRegion]);

  // 🔥 HANDLE INPUT
  const handleChange = (
    name: keyof MemberFormData,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 MINISTRIES
  const toggleMinistry = (id: number) => {
    setForm((prev) => ({
      ...prev,
      ministries: prev.ministries.includes(id)
        ? prev.ministries.filter((m) => m !== id)
        : [...prev.ministries, id],
    }));
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post<ApiResponse<{ id: number }>>(
        "/members",
        form
      );

      const memberId = res.data.data.id;

      await Promise.all(
        form.ministries.map((ministry_id) =>
          api.post("/member-ministries", {
            member_id: memberId,
            ministry_id,
          })
        )
      );

      window.location.href = "/membership/success";
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Membership Registration
            </h1>
            <p className="text-muted-foreground mt-1">
              Register a new member in the UCCZ membership system.
            </p>
          </div>
          <Link href="/" className="hidden sm:block">
            <Button variant="outline">Back to home</Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Member details</CardTitle>
            <CardDescription>
              Select the conference, region, and church, then fill in the member
              information.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Conference</Label>
                  <Select
                    onValueChange={(v) =>
                      setSelectedConference(v ? Number(v) : null)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select conference" />
                    </SelectTrigger>
                    <SelectContent>
                      {conferences.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select
                    onValueChange={(v) =>
                      setSelectedRegion(v ? Number(v) : null)
                    }
                    disabled={!selectedConference}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          selectedConference
                            ? "Select region"
                            : "Select conference first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={String(r.id)}>
                          {r.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Church</Label>
                  <Select
                    onValueChange={(v) =>
                      handleChange("church_id", v ? Number(v) : 0)
                    }
                    disabled={!selectedRegion}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          selectedRegion ? "Select church" : "Select region first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {churches.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First name</Label>
                  <Input
                    id="first_name"
                    placeholder="e.g. King"
                    value={form.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last name</Label>
                  <Input
                    id="last_name"
                    placeholder="e.g. Godo"
                    value={form.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={form.date_of_birth}
                    onChange={(e) =>
                      handleChange("date_of_birth", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sex</Label>
                  <Select onValueChange={(v) => handleChange("sex", String(v))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium">Ministries</div>
                  <div className="text-sm text-muted-foreground">
                    Select all ministries the member belongs to.
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ministries.map((m) => (
                    <label
                      key={m.id}
                      className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2"
                    >
                      <input
                        type="checkbox"
                        checked={form.ministries.includes(m.id)}
                        onChange={() => toggleMinistry(m.id)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{m.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Register member"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}