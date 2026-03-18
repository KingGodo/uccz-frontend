"use client";

export default function SponsorsSection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <p className="text-xs uppercase tracking-widest text-slate-500">
          Partners & Sponsors
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
          Organisations Supporting Our Mission
        </h2>

        <div className="mt-12 flex flex-wrap justify-center gap-14 opacity-70">

          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-12 w-32 bg-slate-200 rounded-md"
            />
          ))}

        </div>

      </div>

    </section>
  );
}