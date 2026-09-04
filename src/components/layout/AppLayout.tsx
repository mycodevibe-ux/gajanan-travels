'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppWidget } from './WhatsAppWidget';
import { Vehicle, TourPackage, TripType, BookingFormData } from '@/types';
import { LanguageProvider } from '@/context/LanguageContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [bookingInitialTripType, setBookingInitialTripType] = useState<TripType | undefined>('outstation_roundtrip');
  const [bookingVehicleId, setBookingVehicleId] = useState<string | undefined>(undefined);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);
  const [bookingInitialData, setBookingInitialData] = useState<Partial<BookingFormData> | undefined>(undefined);

  const scrollToBookingSection = () => {
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

  const handleOpenBooking = (
    type: TripType = 'outstation_roundtrip',
    vehicleId?: string,
    initialData?: Partial<BookingFormData>,
    packageId?: string
  ) => {
    setBookingInitialTripType(type);
    if (vehicleId) setBookingVehicleId(vehicleId);
    if (packageId) setBookingPackageId(packageId);
    if (initialData) setBookingInitialData(initialData);

    scrollToBookingSection();
  };

  const handleBookVehicle = (vehicle: Vehicle) => {
    handleOpenBooking('outstation_roundtrip', vehicle.id, {
      selectedVehicleId: vehicle.id,
      passengers: vehicle.passengerCapacity,
    });
  };

  const handleBookPackage = (pkg: TourPackage) => {
    handleOpenBooking('tour_package', undefined, {
      selectedPackageId: pkg.id,
      dropCity: pkg.destination,
    }, pkg.id);
  };

  return (
    <LanguageProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar onOpenBookingModal={() => scrollToBookingSection()} />

        <main style={{ flex: 1 }}>
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, {
                onOpenBookingModal: handleOpenBooking,
                onSelectVehicle: handleBookVehicle,
                bookingInitialTripType,
                bookingVehicleId,
                bookingInitialData,
                onOpenVehicleDetails: (v: Vehicle) => handleBookVehicle(v),
                onOpenPackageDetails: (pkg: TourPackage) => handleBookPackage(pkg),
                onBookPackage: handleBookPackage,
              })
            : children}
        </main>

        <Footer />
        
        {/* Floating circular WhatsApp Button */}
        <WhatsAppWidget />
      </div>
    </LanguageProvider>
  );
};
