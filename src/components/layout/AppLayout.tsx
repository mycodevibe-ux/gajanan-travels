'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppWidget } from './WhatsAppWidget';
import { BookingModal } from '@/components/booking/BookingModal';
import { VehicleDetailModal } from '@/components/vehicles/VehicleDetailModal';
import { PackageDetailModal } from '@/components/packages/PackageDetailModal';
import { Vehicle, TourPackage, TripType, BookingFormData } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialTripType, setBookingInitialTripType] = useState<TripType | undefined>('outstation_roundtrip');
  const [bookingVehicleId, setBookingVehicleId] = useState<string | undefined>(undefined);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);
  const [bookingInitialData, setBookingInitialData] = useState<Partial<BookingFormData> | undefined>(undefined);

  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState<Vehicle | null>(null);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<TourPackage | null>(null);

  const handleOpenBooking = (
    type: TripType = 'outstation_roundtrip',
    vehicleId?: string,
    initialData?: Partial<BookingFormData>,
    packageId?: string
  ) => {
    setBookingInitialTripType(type);
    setBookingVehicleId(vehicleId);
    setBookingPackageId(packageId);
    setBookingInitialData(initialData);
    setBookingModalOpen(true);
  };

  const handleBookVehicle = (vehicle: Vehicle) => {
    handleOpenBooking('outstation_roundtrip', vehicle.id, {
      selectedVehicleId: vehicle.id,
    });
  };

  const handleBookPackage = (pkg: TourPackage) => {
    handleOpenBooking('tour_package', undefined, {
      selectedPackageId: pkg.id,
      dropCity: pkg.destination,
    }, pkg.id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onOpenBookingModal={() => handleOpenBooking()} />

      <main style={{ flex: 1 }}>
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<any>, {
              onOpenBookingModal: handleOpenBooking,
              onSelectVehicle: handleBookVehicle,
              onOpenVehicleDetails: (v: Vehicle) => setSelectedVehicleForModal(v),
              onOpenPackageDetails: (pkg: TourPackage) => setSelectedPackageForModal(pkg),
              onBookPackage: handleBookPackage,
            })
          : children}
      </main>

      <Footer />
      
      {/* Floating circular WhatsApp Button (No bottom strip/patti) */}
      <WhatsAppWidget />

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialTripType={bookingInitialTripType}
        initialVehicleId={bookingVehicleId}
        initialPackageId={bookingPackageId}
        initialData={bookingInitialData}
      />

      {/* Global Vehicle Detail Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicleForModal}
        onClose={() => setSelectedVehicleForModal(null)}
        onBookVehicle={(v) => handleBookVehicle(v)}
      />

      {/* Global Package Detail Modal */}
      <PackageDetailModal
        pkg={selectedPackageForModal}
        onClose={() => setSelectedPackageForModal(null)}
        onBookPackage={(pkg) => handleBookPackage(pkg)}
      />
    </div>
  );
};
