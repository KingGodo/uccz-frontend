"use client";

import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhatWeDoSection,
  TestimonialsSection,
  NewsSection,
  SponsorsSection,
  CallToActionSection,
} from "@/components/landing";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero sits directly under the fixed navbar — no top padding needed
          because HeroSection is full-screen and handles its own offset */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhatWeDoSection />
      <TestimonialsSection />
      <NewsSection />
      <SponsorsSection />
      <CallToActionSection />
    </main>
  );
}