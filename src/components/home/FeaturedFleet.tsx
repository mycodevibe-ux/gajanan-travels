'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car, ArrowRight, Sparkles } from 'lucide-react';
import { vehiclesData } from '@/data/vehicles';
import { Vehicle, VehicleCategory } from '@/types';
import { VehicleCard } from '@/components/vehicles/VehicleCard';

interface FeaturedFleetProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenDetails: (vehicle: Vehicle) => void;
}

export const FeaturedFleet: React.FC<FeaturedFleetProps> = ({
  onSelectVehicle,
  onOpenDetails,
}) => {
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>('All');

  const categories: { label: string; value: VehicleCategory }[] = [
    { label: 'All Cars', value: 'All' },
    { label: 'SUVs & MUVs', value: 'SUV' },
    { label: 'Sedans', value: 'Sedan' },
    { label: 'Tempo Travellers', value: 'Tempo' },
    { label: 'Luxury Convoys', value: 'Luxury' },
  ];

  const filteredVehicles = vehiclesData.filter((v) => {
    if (activeCategory === 'All') return true;
    return v.category === activeCategory;
  }).slice(0, 6);

  return (
    <section className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container-custom">
        <div className="section-header">
          <div className="section-tag">
            <Car size={14} />
            <span>Drivewise Fleet</span>
          </div>
          <h2 className="section-title">
            Explore Our Most Popular Rental Cars
          </h2>
          <p className="section-subtitle">
            Find the perfect vehicle for any trip. From economic city sedans to spacious 7-seater Innovas and luxury executive cars.
          </p>

          {/* Filter Pills */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff',
            padding: '6px',
            borderRadius: '9999px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            marginTop: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            border: '1px solid #e2e8f0',
          }}>
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: isSelected ? 700 : 500,
                    border: 'none',
                    backgroundColor: isSelected ? '#2563eb' : 'transparent',
                    color: isSelected ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid-3" style={{ marginBottom: '40px' }}>
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelectVehicle={onSelectVehicle}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

        {/* Explore Full Fleet Link */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/vehicles"
            className="btn btn-outline btn-lg"
            style={{ display: 'inline-flex', gap: '8px' }}
          >
            <span>View All Cars & Tariffs</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
