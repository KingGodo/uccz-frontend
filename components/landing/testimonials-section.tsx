"use client";

const testimonials = [
  {
    name: "Church Member",
    role: "Member",
    message: "This platform has transformed how we manage our church.",
  },
  {
    name: "Ministry Leader",
    role: "Leader",
    message: "We can now coordinate activities much more efficiently.",
  },
  {
    name: "Pastor",
    role: "Pastor",
    message: "It has strengthened communication within our congregation.",
  },
  {
    name: "Youth Member",
    role: "CYF",
    message: "It has made engagement and participation so much easier.",
  },
  {
    name: "Church Admin",
    role: "Admin",
    message: "Managing data and members is now seamless and efficient.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-secondary">
          Testimonials
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-slate-900">
          What People Are Saying
        </h2>
      </div>

      {/* 🔥 ROW 1 (LEFT) */}
      <div className="overflow-hidden">
        <div className="flex gap-6 animate-scroll-left w-max">

          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="min-w-[280px] max-w-[280px] p-6 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-slate-600 leading-relaxed">
                &ldquo;{t.message}&rdquo;
              </p>

              <div className="mt-4">
                <p className="text-sm font-medium text-slate-900">
                  {t.name}
                </p>
                <p className="text-xs text-slate-500">
                  {t.role}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* 🔥 ROW 2 (RIGHT) */}
      <div className="overflow-hidden mt-6">
        <div className="flex gap-6 animate-scroll-right w-max">

          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="min-w-[280px] max-w-[280px] p-6 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-slate-600 leading-relaxed">
                &ldquo;{t.message}&rdquo;
              </p>

              <div className="mt-4">
                <p className="text-sm font-medium text-slate-900">
                  {t.name}
                </p>
                <p className="text-xs text-slate-500">
                  {t.role}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* 🔥 Animations */}
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scrollLeft 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scrollRight 40s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
