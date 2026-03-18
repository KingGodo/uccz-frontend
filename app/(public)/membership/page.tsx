"use client";

import { useEffect, useState } from "react";
import { api, ApiResponse } from "@/lib/api";

import {
  Conference,
  Region,
  Church,
  Ministry,
  MemberFormData,
} from "@/types/member";

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
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-semibold mb-6">
          Membership Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Conference */}
          <select
            className="w-full border p-3 rounded"
            onChange={(e) => setSelectedConference(Number(e.target.value))}
          >
            <option>Select Conference</option>
            {conferences.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Region */}
          <select
            className="w-full border p-3 rounded"
            onChange={(e) => setSelectedRegion(Number(e.target.value))}
          >
            <option>Select Region</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          {/* Church */}
          <select
            className="w-full border p-3 rounded"
            onChange={(e) => handleChange("church_id", Number(e.target.value))}
          >
            <option>Select Church</option>
            {churches.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Names */}
          <input
            placeholder="First Name"
            className="w-full border p-3 rounded"
            onChange={(e) => handleChange("first_name", e.target.value)}
          />

          <input
            placeholder="Last Name"
            className="w-full border p-3 rounded"
            onChange={(e) => handleChange("last_name", e.target.value)}
          />

          {/* DOB */}
          <input
            type="date"
            className="w-full border p-3 rounded"
            onChange={(e) => handleChange("date_of_birth", e.target.value)}
          />

          {/* Sex */}
          <select
            className="w-full border p-3 rounded"
            onChange={(e) => handleChange("sex", e.target.value)}
          >
            <option>Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Ministries */}
          <div>
            <p className="mb-2 font-medium">Select Ministries</p>
            <div className="grid grid-cols-2 gap-2">
              {ministries.map((m) => (
                <label key={m.id} className="flex items-center gap-2">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Register"}
          </button>

        </form>
      </div>
    </section>
  );
}