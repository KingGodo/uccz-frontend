"use client";

export default function CallToActionSection() {
  return (
    <section className="py-24 bg-secondary text-center text-black">

      <div className="max-w-3xl mx-auto px-6">

        <h2 className="text-3xl font-semibold">
          Join Our Community Today
        </h2>

        <p className="mt-4 text-sm">
          Be part of a growing community of faith, service, and impact.
        </p>

        <a
          href="/membership"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition"
        >
          Get Started
        </a>

      </div>

    </section>
  );
}
