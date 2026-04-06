"use client";
import AboutSection     from "@/components/landing/about-section";
import TestimonialsSection from "@/components/landing/testimonials-section";

function TeamSection() {
  return (
    <section
      id="team"
      className="scroll-mt-[90px] py-24 bg-white border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-3"
          style={{ color: "rgb(54,69,99)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Our Team
        </p>
        <h2
          className="text-[32px] md:text-[38px] font-bold text-slate-900 leading-tight"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          The People Leading UCCZ
        </h2>
        {/* Add your team cards/grid here */}
        <p className="mt-6 text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          Team content coming soon.
        </p>
      </div>
    </section>
  );
}

function CouncilsSection() {
  return (
    <section
      id="councils"
      className="scroll-mt-[90px] py-24 bg-slate-50 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-3"
          style={{ color: "rgb(54,69,99)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Spiritual Councils
        </p>
        <h2
          className="text-[32px] md:text-[38px] font-bold text-slate-900 leading-tight"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          Conferences &amp; Fellowship Councils
        </h2>
        {/* Add your councils content here */}
        <p className="mt-6 text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          Councils content coming soon.
        </p>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section
      id="gallery"
      className="scroll-mt-[90px] py-24 bg-white border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-3"
          style={{ color: "rgb(54,69,99)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Gallery
        </p>
        <h2
          className="text-[32px] md:text-[38px] font-bold text-slate-900 leading-tight"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          Photos from Our Community
        </h2>
        {/* Add your photo grid here */}
        <p className="mt-6 text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          Gallery content coming soon.
        </p>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-[90px] py-24 bg-slate-50 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-3"
          style={{ color: "rgb(54,69,99)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          FAQ
        </p>
        <h2
          className="text-[32px] md:text-[38px] font-bold text-slate-900 leading-tight"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          Common Questions Answered
        </h2>
        {/* Add your FAQ accordion here */}
        <p className="mt-6 text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          FAQ content coming soon.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main>
      {/*
        pt-[90px] accounts for fixed navbar (topbar ~28px + nav ~68px = ~96px).
        Adjust if your topbar/nav heights differ.
      */}
      <div className="pt-[96px]">

        {/* About Us section — id="about" */}
        <div id="about" className="scroll-mt-[90px]">
          <AboutSection />
        </div>

        {/* Our Team — id="team" */}
        <TeamSection />

        {/* Spiritual Councils — id="councils" */}
        <CouncilsSection />

        {/* Testimonials — id="testimonials" */}
        <div id="testimonials" className="scroll-mt-[90px]">
          <TestimonialsSection />
        </div>

        {/* Gallery — id="gallery" */}
        <GallerySection />

        {/* FAQ — id="faq" */}
        <FaqSection />

      </div>
    </main>
  );
}