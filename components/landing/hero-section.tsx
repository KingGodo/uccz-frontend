"use client";

import Image from "next/image";

const ministries = [
  "UCCZ",
  "Mens Fellowship",
  "Ruwadzano",
  "CYF",
  "Sunday School",
];

export default function HomePage() {
  return (
    <main>

      {/* 🔥 HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">

        {/* Background */}
        <Image
          src="/hero.jpg"
          alt="Church Hero"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Gradient Overlay (better than dark black) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Content */}
        <div
          className="relative z-10 max-w-3xl px-6"
          style={{
            animation: "fadeUp 0.8s ease-out",
          }}
        >
          {/* Tagline */}
          <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">
            Faith • Community • Service
          </p>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight">
            United Church of Christ in Zimbabwe
          </h1>

          {/* Description */}
          <p className="mt-6 text-sm md:text-base text-gray-200 leading-relaxed max-w-xl mx-auto">
            A Christ-centered community dedicated to spiritual growth, unity,
            and serving people across Zimbabwe with love and purpose.
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="/membership"
              className="bg-secondary text-black text-sm px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Become a Member
            </a>

            <a
              href="/about"
              className="text-white text-sm px-6 py-3 border border-white/70 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 🔥 MINISTRIES SCROLL */}
      <section className="bg-white py-14 border-t border-slate-100">

        {/* Title */}
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Our Ministries
          </p>
          <h2 className="mt-2 text-lg font-medium text-slate-900">
            Serving through different communities
          </h2>
        </div>

        {/* Scroll Container */}
        <div className="overflow-hidden">
          <div className="flex gap-20 animate-scroll whitespace-nowrap">

            {[...ministries, ...ministries, ...ministries].map((name, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 opacity-70 hover:opacity-100 transition duration-300"
              >
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-slate-50">
                  <Image
                    src="/logo.png"
                    alt={name}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>

                <span className="text-xs text-slate-600 tracking-wide text-center">
                  {name}
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 🔥 Animations */}
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
            transform: translateY(20px);
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
