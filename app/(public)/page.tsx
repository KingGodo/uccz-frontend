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
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhatWeDoSection />
      <TestimonialsSection />
      <NewsSection />
      <SponsorsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}