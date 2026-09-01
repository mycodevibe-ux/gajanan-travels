'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutStorySection } from '@/components/home/AboutStorySection';
import { OurVehiclesSection } from '@/components/home/OurVehiclesSection';
import { HomeServicesSection } from '@/components/home/HomeServicesSection';
import { PopularPackagesSection } from '@/components/home/PopularPackagesSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { CustomerReviewsSlider } from '@/components/home/CustomerReviewsSlider';
import { FaqSection } from '@/components/home/FaqSection';
import { HomeContactSection } from '@/components/home/HomeContactSection';
import { Vehicle, TripType, BookingFormData } from '@/types';

export default function HomePage() {
  return (
    <AppLayout>
      <HomeContent />
    </AppLayout>
  );
}

interface HomeContentProps {
  onOpenBookingModal?: (type?: TripType, vehicleId?: string, initialData?: Partial<BookingFormData>) => void;
  onSelectVehicle?: (vehicle: Vehicle) => void;
  onOpenVehicleDetails?: (vehicle: Vehicle) => void;
}

function HomeContent({
  onOpenBookingModal = () => {},
  onSelectVehicle = () => {},
  onOpenVehicleDetails = () => {},
}: HomeContentProps) {
  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      {/* 1. Hero Section & "Plan your ride" Search Bar (#home) */}
      <section id="home">
        <HeroSection onOpenBookingModal={onOpenBookingModal} />
      </section>

      {/* 2. "Built by drivers who love the road" About Story (#about) */}
      <section id="about">
        <AboutStorySection />
      </section>

      {/* 3. "Our fleet" Vehicles Section (#fleet) */}
      <section id="fleet">
        <OurVehiclesSection onSelectVehicle={onSelectVehicle} />
      </section>

      {/* 4. "What we offer" Services Grid (#services) */}
      <section id="services">
        <HomeServicesSection onOpenBookingModal={onOpenBookingModal} />
      </section>

      {/* 5. "Popular packages" Tours & Custom Itinerary (#packages) */}
      <section id="packages">
        <PopularPackagesSection onOpenBookingModal={onOpenBookingModal} />
      </section>

      {/* 6. "Why choose Rideway" Dark Navy Trust Strip (#why-us) */}
      <section id="why-us">
        <WhyChooseUsSection />
      </section>

      {/* 7. "What our customers say" Reviews & Ratings (#reviews) */}
      <section id="reviews">
        <CustomerReviewsSlider />
      </section>

      {/* 8. "Common questions" Expandable FAQ Accordion (#faq) */}
      <section id="faq">
        <FaqSection />
      </section>

      {/* 9. "Plan your trip" Contact Form & Google Map (#contact) */}
      <section id="contact">
        <HomeContactSection />
      </section>
    </div>
  );
}
