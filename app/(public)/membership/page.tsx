"use client";

import { useState } from "react";

interface FormData {
  conference: string;
  region: string;
  church: string;
  name: string;
  email: string;
  phone: string;
}

export default function MembershipPage() {
  const [form, setForm] = useState<FormData>({
    conference: "",
    region: "",
    church: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    alert("Membership application submitted!");
  };

  return (
    <main className="min-h-screen bg-slate-50 py-24 px-6">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-secondary">
            Membership
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Join the Church
          </h1>

          <p className="mt-4 text-sm text-slate-600">
            Select your church structure and complete your membership application.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-white p-8 rounded-xl border border-slate-200 space-y-6"
        >

          {/* 🔥 STRUCTURE SELECTION */}

          {/* Conference */}
          <div>
            <label className="text-sm text-slate-700">Conference</label>
            <select
              name="conference"
              required
              value={form.conference}
              onChange={handleChange}
              className="mt-2 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Conference</option>
              <option value="Harare">Harare Conference</option>
              <option value="Bulawayo">Bulawayo Conference</option>
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="text-sm text-slate-700">Region</label>
            <select
              name="region"
              required
              value={form.region}
              onChange={handleChange}
              className="mt-2 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Region</option>
              <option value="Region 1">Region 1</option>
              <option value="Region 2">Region 2</option>
            </select>
          </div>

          {/* Church */}
          <div>
            <label className="text-sm text-slate-700">Church</label>
            <select
              name="church"
              required
              value={form.church}
              onChange={handleChange}
              className="mt-2 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Church</option>
              <option value="Gweru Central">Gweru Central</option>
              <option value="Mkoba">Mkoba</option>
            </select>
          </div>

          {/* 🔥 PERSONAL DETAILS */}

          {/* Name */}
          <div>
            <label className="text-sm text-slate-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-slate-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="mt-2 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </main>
  );
}
