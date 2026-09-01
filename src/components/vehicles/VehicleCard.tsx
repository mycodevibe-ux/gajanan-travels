'use client';

import React from 'react';
import { Users, Briefcase, Fuel, Star, Sparkles } from 'lucide-react';
import { Vehicle } from '@/types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenDetails: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelectVehicle,
  onOpenDetails,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        position: 'relative',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
      }}
      className="card-hover-lift"
    >
      {/* Top Image Container */}
      <div style={{
        position: 'relative',
        height: '200px',
        width: '100%',
        backgroundColor: '#f8fafc',
        overflow: 'hidden',
      }}>
        <img
          src={vehicle.image}
          alt={vehicle.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          className="vehicle-card-img"
        />

        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px',
        }}>
          <span style={{
            backgroundColor: '#1b4332',
            color: '#ffffff',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 700,
          }}>
            {vehicle.category}
          </span>
          {vehicle.popular && (
            <span style={{
              backgroundColor: '#f59e0b',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
            }}>
              <Sparkles size={11} />
              <span>POPULAR</span>
            </span>
          )}
        </div>

        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          color: '#ffffff',
          padding: '3px 8px',
          borderRadius: '6px',
          fontSize: '0.74rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <Star size={12} color="#f59e0b" fill="#f59e0b" />
          <span>{vehicle.rating}</span>
          <span style={{ color: '#cbd5e1', fontSize: '0.68rem' }}>({vehicle.reviewsCount})</span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
          {vehicle.name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px', minHeight: '34px', lineHeight: 1.45 }}>
          {vehicle.tagline}
        </p>

        {/* Specs Pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px',
          padding: '8px',
          backgroundColor: '#ebf5f0',
          borderRadius: '8px',
          marginBottom: '14px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <Users size={14} color="#1b4332" />
            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Seats</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{vehicle.passengerCapacity}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', borderLeft: '1px solid #c2e2d0', borderRight: '1px solid #c2e2d0' }}>
            <Briefcase size={14} color="#1b4332" />
            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Luggage</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{vehicle.luggageCapacity}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <Fuel size={14} color="#1b4332" />
            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>AC</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Yes</span>
          </div>
        </div>

        {/* Price & Single "Book" Button */}
        <div style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          gap: '10px',
        }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
              Starting Rate
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
              ₹{vehicle.pricePerKm} <span style={{ fontSize: '0.74rem', fontWeight: 500, color: '#64748b' }}>/ km</span>
            </div>
          </div>

          {/* Single Clean "Book" Button */}
          <button
            onClick={() => onSelectVehicle(vehicle)}
            className="btn btn-forest"
            style={{
              padding: '8px 22px',
              fontSize: '0.84rem',
              borderRadius: '8px',
              fontWeight: 700,
            }}
          >
            <span>Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};
