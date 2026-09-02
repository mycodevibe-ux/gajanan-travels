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
    { label: 'All Fleet', value: 'All' },
    { label: 'Sedans', value: 'Sedan' },
    { label: 'SUVs & MUVs', value: 'SUV' },
    { label: 'Tempo Travellers', value: 'Tempo' },
    { label: 'Luxury Buses', value: 'Bus' },
  ];

  const filteredVehicles = vehiclesData.filter((v) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Sedan') return v.category.includes('Sedan');
    if (activeCategory === 'SUV') return v.category.includes('SUV') || v.category.includes('MUV');
    if (activeCategory === 'Tempo') return v.category.includes('Tempo') || v.category.includes('Van');
    if (activeCategory === 'Bus') return v.category.includes('Bus');
    return v.category.includes(activeCategory);
  }).slice(0, 6);

  return (
    <section className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container-custom">
        <div className="section-header">
          <div className="section-tag" style={{ backgroundColor: '#ebf5f0', color: '#1b4332' }}>
            <Car size={14} />
            <span>Tour Fleet Showcase</span>
          </div>
          <h2 className="section-title">
            Explore Our Clean & Verified Fleet
          </h2>
          <p className="section-subtitle">
            Find the perfect vehicle for any trip. From economic city sedans to spacious 7-seater Innovas and luxury executive tempo travellers.
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
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.86rem',
                    fontWeight: isSelected ? 700 : 500,
                    border: 'none',
                    backgroundColor: isSelected ? '#1b4332' : 'transparent',
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
          <a
            href="#fleet"
            className="btn btn-outline-forest btn-lg"
            style={{ display: 'inline-flex', gap: '8px' }}
          >
            <span>Compare All Vehicles & Per-KM Rates</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
