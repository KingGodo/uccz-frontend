"use client";

export default function SponsorsSection() {
  return (
    <section className="py-20 bg-white border-t border-slate-100">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <p className="text-xs uppercase tracking-widest text-slate-500">
          Partners & Sponsors
        </p>

        <div className="mt-8 flex justify-center gap-12 opacity-70">

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-slate-200 rounded-md"
            />
          ))}

        </div>

      </div>

    </section>
  );
}
