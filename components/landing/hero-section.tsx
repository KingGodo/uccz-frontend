"use client";

import Image from "next/image";

const ministries = [
  { name: "Ruwadzano", logo: "/ruwadzano.png" },
  { name: "Mens Fellowship", logo: "/cmf.png" },
  { name: "CYF", logo: "/cyf.png" },
  { name: "Volunteers", logo: "/volunteers.png" },
  { name: "Sunday School", logo: "/sundayschool.png" },
];

export default function HomePage() {
  return (
    <main>

      {/* 🔥 HERO SECTION */}
      <section className="relative h-screen mt-10 w-full flex items-center justify-center text-center overflow-hidden">

        {/* Background */}
        <Image
          src="/hero.jpg"
          alt="Church Community"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Stronger Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Content */}
        <div
          className="relative z-10 max-w-3xl px-6"
          style={{
            animation: "fadeUp 0.9s ease-out",
          }}
        >
          {/* Trust Line */}
          <p className="text-xs uppercase tracking-[0.35em] text-gray-300 mb-5">
            United in Faith • Growing in Christ • Serving Communities
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight tracking-tight">
            A Spiritual Home for Every Generation
          </h1>

          {/* Supporting Message */}
          <p className="mt-6 text-sm md:text-base text-gray-200 leading-relaxed max-w-xl mx-auto">
            The United Church of Christ in Zimbabwe is committed to nurturing
            faith, strengthening families, and empowering communities through
            Christ-centered worship and service.
          </p>

          {/* CTA */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              href="/membership"
              className="bg-white text-black text-sm px-7 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Join Our Community
            </a>

            <a
              href="/about"
              className="text-white text-sm px-7 py-3 border border-white/70 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Discover Our Mission
            </a>
          </div>

          {/* Trust Stats */}
          <div className="mt-12 flex justify-center gap-10 text-white text-sm opacity-80">
            <div>
              <p className="text-xl font-semibold">100+</p>
              <p className="text-xs">Churches</p>
            </div>
            <div>
              <p className="text-xl font-semibold">3</p>
              <p className="text-xs">Conferences</p>
            </div>
            <div>
              <p className="text-xl font-semibold">80+ yrs</p>
              <p className="text-xs">Ministry Impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 MINISTRIES SCROLL */}
      <section className="bg-white py-14 border-t border-slate-100">

        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Our Ministries
          </p>
          <h2 className="mt-2 text-lg font-medium text-slate-900">
            Serving God through diverse ministries
          </h2>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-20 animate-scroll whitespace-nowrap">

            {[...ministries, ...ministries, ...ministries].map((m, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 opacity-70 hover:opacity-100 transition duration-300"
              >
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-slate-50">
                  <Image
                    src={m.logo}
                    alt={m.name}
                    width={34}
                    height={34}
                    className="object-contain"
                  />
                </div>

                <span className="text-xs text-slate-600 tracking-wide text-center">
                  {m.name}
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 35s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}