"use client";

const services = [
  {
    title: "Church Administration",
    desc: "Centralised tools to manage membership, attendance, and church operations with clarity and efficiency.",
  },
  {
    title: "Ministry Oversight",
    desc: "Coordinate all ministries through structured systems that strengthen collaboration and accountability.",
  },
  {
    title: "Event & Conference Planning",
    desc: "Organise regional and national church events with streamlined planning and communication workflows.",
  },
  {
    title: "Member Communication",
    desc: "Engage congregations through organised messaging, announcements, and structured follow-ups.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-secondary">
            Services
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Systems That Strengthen Church Operations
          </h2>

          <p className="mt-4 text-sm text-slate-600">
            We provide structured solutions that support church leadership,
            enhance ministry coordination, and improve community engagement.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service, i) => (
            <div
              key={i}
              className="p-7 rounded-xl border border-slate-200 bg-white hover:shadow-xl transition duration-300"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}