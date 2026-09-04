'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutStorySection } from '@/components/home/AboutStorySection';
import { OurVehiclesSection } from '@/components/home/OurVehiclesSection';
import { HomeServicesSection } from '@/components/home/HomeServicesSection';
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
  bookingInitialTripType?: TripType;
  bookingVehicleId?: string;
  bookingInitialData?: Partial<BookingFormData>;
}

function HomeContent({
  onOpenBookingModal,
  onSelectVehicle,
  bookingInitialTripType,
  bookingVehicleId,
  bookingInitialData,
}: HomeContentProps) {
  const [activeTripType, setActiveTripType] = useState<TripType | undefined>(bookingInitialTripType || 'outstation_roundtrip');
  const [activeVehicleId, setActiveVehicleId] = useState<string | undefined>(bookingVehicleId);
  const [activeData, setActiveData] = useState<Partial<BookingFormData> | undefined>(bookingInitialData);

  const scrollToBooking = (type: TripType = 'outstation_roundtrip', vehicleId?: string, initialData?: Partial<BookingFormData>) => {
    setActiveTripType(type);
    if (vehicleId) setActiveVehicleId(vehicleId);
    if (initialData) setActiveData(initialData);

    const el = document.getElementById('booking-section') || document.getElementById('contact');
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    scrollToBooking('outstation_roundtrip', vehicle.id, {
      selectedVehicleId: vehicle.id,
      passengers: vehicle.passengerCapacity,
    });
  };

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      {/* 1. Hero Section (#home) */}
      <section id="home">
        <HeroSection onOpenBookingModal={() => scrollToBooking()} />
      </section>

      {/* 2. "Built by drivers who love the road" About Story (#about) */}
      <section id="about">
        <AboutStorySection />
      </section>

      {/* 3. "Our fleet" Vehicles Section (#fleet) */}
      <section id="fleet">
        <OurVehiclesSection onSelectVehicle={handleVehicleSelect} />
      </section>

      {/* 4. "What we offer" Services Grid (#services) */}
      <section id="services">
        <HomeServicesSection onOpenBookingModal={(type) => scrollToBooking(type)} />
      </section>

      {/* 5. "Why choose us" Dark Navy Trust Strip (#why-us) */}
      <section id="why-us">
        <WhyChooseUsSection />
      </section>

      {/* 6. "What our customers say" Reviews & Ratings (#reviews) */}
      <section id="reviews">
        <CustomerReviewsSlider />
      </section>

      {/* 7. "Common questions" Expandable FAQ Accordion (#faq) */}
      <section id="faq">
        <FaqSection />
      </section>

      {/* 8. Dedicated Live Booking Section & Contact / Map (#contact / #booking-section) */}
      <section id="contact">
        <HomeContactSection 
          initialTripType={activeTripType} 
          initialVehicleId={activeVehicleId} 
          initialData={activeData} 
        />
      </section>
    </div>
  );
}
