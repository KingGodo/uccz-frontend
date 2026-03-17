"use client";

const news = [
  {
    title: "Annual Conference 2026",
    desc: "Join us for a nationwide gathering of faith and unity.",
  },
  {
    title: "Youth Fellowship Launch",
    desc: "Empowering young people through CYF initiatives.",
  },
  {
    title: "Community Outreach",
    desc: "Serving communities with compassion and support.",
  },
];

export default function NewsSection() {
  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-secondary">
            News & Events
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Latest Updates
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">

          {news.map((item, i) => (
            <div
              key={i}
              className="p-6 border border-slate-200 rounded-xl bg-white"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
