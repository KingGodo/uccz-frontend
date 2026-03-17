"use client";

const services = [
  {
    title: "Church Management",
    desc: "Manage members, attendance, and church activities efficiently.",
  },
  {
    title: "Ministry Coordination",
    desc: "Organize and oversee all ministries from one central system.",
  },
  {
    title: "Event Management",
    desc: "Plan conferences, services, and church events with ease.",
  },
  {
    title: "Member Engagement",
    desc: "Connect with members through structured communication tools.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <p className="text-xs uppercase tracking-widest text-secondary">
          Services
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-slate-900">
          Empowering Church Operations
        </h2>

        <div className="mt-12 grid md:grid-cols-4 gap-6">

          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-slate-200 hover:shadow-lg transition"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
