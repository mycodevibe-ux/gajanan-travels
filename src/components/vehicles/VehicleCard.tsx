'use client';

import React from 'react';
import { Users, Briefcase, Fuel, Star, Sparkles, ShieldCheck } from 'lucide-react';
import { Vehicle } from '@/types';
import { getVehicleIcon } from '@/components/vehicles/VehicleIcons';

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
      {/* Top Image Container with Studio Transparent Look */}
      <div 
        style={{
          position: 'relative',
          height: '210px',
          width: '100%',
          background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 16px 20px 16px',
        }}
        onClick={() => onOpenDetails(vehicle)}
      >
        {/* Subtle Radial Glow */}
        <div style={{
          position: 'absolute',
          width: '80%',
          height: '60%',
          bottom: '10px',
          background: 'radial-gradient(ellipse at center, rgba(27, 67, 50, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Studio Vehicle Image with Transparent Cutout Effect */}
        <img
          src={vehicle.image}
          alt={vehicle.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            transition: 'transform 0.4s ease',
            filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.06))',
            cursor: 'pointer',
          }}
          className="vehicle-card-img"
        />

        {/* Category Badge with Vector Icon */}
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
            padding: '4px 9px',
            borderRadius: '8px',
            fontSize: '0.72rem',
            fontWeight: 'normal',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 2px 6px rgba(27, 67, 50, 0.2)',
          }}>
            {getVehicleIcon(vehicle.id || vehicle.category, 13, '#ffffff')}
            <span>{vehicle.category}</span>
          </span>
          {vehicle.popular && (
            <span style={{
              backgroundColor: '#f59e0b',
              color: '#ffffff',
              padding: '4px 9px',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontWeight: 'normal',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              boxShadow: '0 2px 6px rgba(245, 158, 11, 0.2)',
            }}>
              <Sparkles size={11} />
              <span>POPULAR</span>
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(6px)',
          border: '1px solid #e2e8f0',
          color: '#0f172a',
          padding: '3px 8px',
          borderRadius: '8px',
          fontSize: '0.74rem',
          fontWeight: 'normal',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        }}>
          <Star size={12} color="#f59e0b" fill="#f59e0b" />
          <span>{vehicle.rating}</span>
          <span style={{ color: '#64748b', fontSize: '0.68rem' }}>({vehicle.reviewsCount})</span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <h3 
            onClick={() => onOpenDetails(vehicle)}
            style={{ 
              fontSize: '1.35rem', 
              fontWeight: 'normal', 
              color: '#0f172a', 
              margin: 0, 
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.3px',
              cursor: 'pointer',
            }}
          >
            {vehicle.name}
          </h3>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 'normal',
            color: '#1b4332',
            backgroundColor: '#ebf5f0',
            padding: '2px 7px',
            borderRadius: '4px',
          }}>
            {vehicle.fuelType}
          </span>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px', minHeight: '34px', lineHeight: 1.45 }}>
          {vehicle.tagline}
        </p>

        {/* Specs Pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '6px',
          padding: '8px 12px',
          backgroundColor: '#ebf5f0',
          borderRadius: '8px',
          marginBottom: '14px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <Users size={14} color="#1b4332" />
            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Seats</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 'normal', color: '#0f172a' }}>{vehicle.passengerCapacity} Seats</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', borderLeft: '1px solid #c2e2d0' }}>
            <Sparkles size={14} color="#1b4332" />
            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Options</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 'normal', color: '#0f172a' }}>AC / Non-AC</span>
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
            <div style={{ fontSize: '1.25rem', fontWeight: 'normal', fontFamily: 'var(--font-heading)', color: '#0f172a', lineHeight: 1 }}>
              ₹{vehicle.pricePerKm} <span style={{ fontSize: '0.74rem', fontWeight: 'normal', color: '#64748b' }}>/ km</span>
            </div>
          </div>

          <button
            onClick={() => onSelectVehicle(vehicle)}
            className="btn btn-forest"
            style={{
              padding: '8px 22px',
              fontSize: '0.84rem',
              borderRadius: '8px',
              fontWeight: 'normal',
            }}
          >
            <span>Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};
