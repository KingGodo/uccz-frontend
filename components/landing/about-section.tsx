"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* 🔥 IMAGE */}
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-sm">
          <Image
            src="/hero.jpg"
            alt="UCCZ Community"
            fill
            className="object-cover"
          />
        </div>

        {/* 🔥 CONTENT */}
        <div
          style={{
            animation: "fadeUp 0.8s ease-out",
          }}
        >
          {/* Label */}
          <p className="text-xs uppercase tracking-widest text-secondary mb-4">
            About Us
          </p>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
            A Christ-centered community serving Zimbabwe
          </h2>

          {/* Description */}
          <p className="mt-6 text-sm md:text-base text-slate-600 leading-relaxed">
            The United Church of Christ in Zimbabwe is a community of believers
            committed to spreading the Gospel, nurturing spiritual growth, and
            serving communities with compassion and integrity.
          </p>

          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
            Through our ministries, outreach programs, and church structures, we
            empower individuals and families to live meaningful lives rooted in
            faith, unity, and service.
          </p>

          {/* 🔥 VALUES */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="rounded-xl border border-slate-200 p-4 bg-white">
              <p className="text-sm font-medium text-slate-900">
                Faith
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Rooted in Christ and guided by Scripture.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 bg-white">
              <p className="text-sm font-medium text-slate-900">
                Unity
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Building strong, connected communities.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 bg-white">
              <p className="text-sm font-medium text-slate-900">
                Service
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Serving others with love and compassion.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 bg-white">
              <p className="text-sm font-medium text-slate-900">
                Integrity
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Living with honesty and accountability.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* 🔥 Animation */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </section>
  );
}
