"use client";

const news = [
  {
    title: "National Annual Conference",
    desc: "A nationwide gathering focused on unity, leadership development, and spiritual renewal.",
  },
  {
    title: "Youth Fellowship Expansion",
    desc: "Strengthening CYF structures to empower the next generation of church leaders.",
  },
  {
    title: "Community Outreach Programs",
    desc: "Serving vulnerable communities through coordinated missions and social support initiatives.",
  },
];

export default function NewsSection() {
  return (
    <section className="py-28 bg-white border-t border-slate-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-secondary">
            News & Events
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Church Updates & Activities
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-7">

          {news.map((item, i) => (
            <div
              key={i}
              className="p-7 border border-slate-200 rounded-xl bg-white hover:shadow-xl transition duration-300"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}