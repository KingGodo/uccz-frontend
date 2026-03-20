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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  // ✅ STRICTLY STRING (NO NULL)
  const [selectedConference, setSelectedConference] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedChurch, setSelectedChurch] = useState<string>("");

  const [form, setForm] = useState<MemberFormData>({
    church_id: 0,
    first_name: "",
    last_name: "",
    sex: "",
    date_of_birth: "",
    has_relative_in_uccz: false,
    ministries: [],
  });

  // 🔥 FETCH INITIAL DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const confRes = await api.get<ApiResponse<Conference[]>>("/conferences");
        console.log("📦 Conferences:", confRes.data.data);
        setConferences(confRes.data.data);

        const minRes = await api.get<ApiResponse<Ministry[]>>("/ministries");
        console.log("📦 Ministries:", minRes.data.data);
        setMinistries(minRes.data.data);
      } catch (err) {
        console.error("❌ Initial fetch error:", err);
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
          `/regions/conference/${selectedConference}`
        );

        console.log("📦 Regions:", res.data.data);

        setRegions(res.data.data);
        setChurches([]);

        setSelectedRegion("");
        setSelectedChurch("");
      } catch (err) {
        console.error("❌ Regions fetch error:", err);
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
          `/churches/region/${selectedRegion}`
        );

        console.log("📦 Churches:", res.data.data);

        setChurches(res.data.data);
        setSelectedChurch("");
      } catch (err) {
        console.error("❌ Churches fetch error:", err);
      }
    };

    fetchChurches();
  }, [selectedRegion]);

  // 🔥 HANDLE FORM
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
      console.error("❌ Submit error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">

        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold">
              Membership Registration
            </h1>
            <p className="text-muted-foreground">
              Register a new member into UCCZ.
            </p>
          </div>

          <Link href="/">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
            <CardDescription>
              Select conference → region → church and fill details
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* 🔥 SELECTS */}
              <div className="grid md:grid-cols-3 gap-4">

                {/* CONFERENCE */}
                <div>
                  <Label>Conference</Label>
                  <Select
                    value={selectedConference}
                    onValueChange={(v) => setSelectedConference(v ?? "")}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {selectedConference
                          ? conferences.find(
                              (c) => String(c.id) === selectedConference
                            )?.name
                          : "Select conference"}
                      </SelectValue>
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

                {/* REGION */}
                <div>
                  <Label>Region</Label>
                  <Select
                    value={selectedRegion}
                    onValueChange={(v) => setSelectedRegion(v ?? "")}
                    disabled={!selectedConference}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {selectedRegion
                          ? regions.find(
                              (r) => String(r.id) === selectedRegion
                            )?.name
                          : "Select region"}
                      </SelectValue>
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

                {/* CHURCH */}
                <div>
                  <Label>Church</Label>
                  <Select
                    value={selectedChurch}
                    onValueChange={(v) => {
                      const next = v ?? "";
                      setSelectedChurch(next);
                      handleChange("church_id", next ? Number(next) : 0);
                    }}
                    disabled={!selectedRegion}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {selectedChurch
                          ? churches.find(
                              (c) => String(c.id) === selectedChurch
                            )?.name
                          : "Select church"}
                      </SelectValue>
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

              {/* NAMES */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={form.first_name}
                    onChange={(e) =>
                      handleChange("first_name", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={form.last_name}
                    onChange={(e) =>
                      handleChange("last_name", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* DOB + SEX */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={form.date_of_birth}
                    onChange={(e) =>
                      handleChange("date_of_birth", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Sex</Label>
                  <Select
                    value={form.sex}
                    onValueChange={(v) => handleChange("sex", v ?? "")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* MINISTRIES */}
              <div>
                <Label>Ministries</Label>
                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  {ministries.map((m) => (
                    <label
                      key={m.id}
                      className="flex items-center gap-3 border p-2 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={form.ministries.includes(m.id)}
                        onChange={() => toggleMinistry(m.id)}
                      />
                      {m.name}
                    </label>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Register Member"}
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
