'use client';

import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhatWeDoSection,
  TestimonialsSection,
  NewsSection,
  SponsorsSection,
  CallToActionSection,
} from '@/components/landing';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhatWeDoSection />
      <TestimonialsSection />
      <NewsSection />
      <SponsorsSection />
      <CallToActionSection />
    </div>
  );
}