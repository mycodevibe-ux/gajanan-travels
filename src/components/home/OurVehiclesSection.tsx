'use client';

import React, { useState } from 'react';
import { Users, Briefcase, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Vehicle } from '@/types';
import { vehiclesData } from '@/data/vehicles';
import { getVehicleIcon } from '@/components/vehicles/VehicleIcons';

interface OurVehiclesSectionProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const OurVehiclesSection: React.FC<OurVehiclesSectionProps> = ({ onSelectVehicle }) => {
  const [filter, setFilter] = useState<'all' | 'cars' | 'tempo_bus'>('all');

  const filteredVehicles = vehiclesData.filter((v) => {
    if (filter === 'cars') return v.category.includes('Sedan') || v.category.includes('SUV') || v.category.includes('MUV');
    if (filter === 'tempo_bus') return v.category.includes('Tempo') || v.category.includes('Bus') || v.category.includes('Van');
    return true;
  });

  return (
    <section id="fleet" style={{ backgroundColor: '#ffffff', padding: '80px 0 70px 0' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ebf5f0',
              color: '#1b4332',
              fontSize: '0.8rem',
              fontWeight: 'normal',
              padding: '4px 12px',
              borderRadius: '9999px',
              marginBottom: '10px',
            }}>
              <span>Verified Clean Fleet</span>
            </div>
            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: 'normal',
              color: '#0c2338',
              fontFamily: 'var(--font-heading)',
              marginBottom: '6px',
              letterSpacing: '0.3px',
            }}>
              Our fleet
            </h2>
            <p style={{
              fontSize: '0.96rem',
              color: '#64748b',
              margin: 0,
              maxWidth: '650px',
            }}>
              From a couple's weekend getaway to large group pilgrimage tours, choose from our premium sanitized vehicles with transparent per-km rates.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '10px',
            gap: '4px',
          }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                border: 'none',
                padding: '6px 14px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 'normal',
                backgroundColor: filter === 'all' ? '#1b4332' : 'transparent',
                color: filter === 'all' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              All Vehicles
            </button>
            <button
              onClick={() => setFilter('cars')}
              style={{
                border: 'none',
                padding: '6px 14px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 'normal',
                backgroundColor: filter === 'cars' ? '#1b4332' : 'transparent',
                color: filter === 'cars' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Sedans & SUVs
            </button>
            <button
              onClick={() => setFilter('tempo_bus')}
              style={{
                border: 'none',
                padding: '6px 14px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 'normal',
                backgroundColor: filter === 'tempo_bus' ? '#1b4332' : 'transparent',
                color: filter === 'tempo_bus' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Tempo & Buses
            </button>
          </div>
        </div>

        {/* Fleet Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(12, 35, 56, 0.04)',
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
              className="card-hover-lift"
            >
              {/* Category Tag with Dedicated Vehicle Icon */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
              }}>
                <span style={{
                  backgroundColor: '#ebf5f0',
                  color: '#1b4332',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '0.74rem',
                  fontWeight: 'normal',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  {getVehicleIcon(vehicle.id || vehicle.category, 14, '#1b4332')}
                  <span>{vehicle.category}</span>
                </span>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 'normal',
                  color: '#64748b',
                  backgroundColor: '#f8fafc',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid #f1f5f9',
                }}>
                  {vehicle.fuelType}
                </span>
              </div>

              {/* Vehicle Studio Image with Transparent Presentation */}
              <div 
                style={{
                  position: 'relative',
                  height: '160px',
                  width: '100%',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  backgroundImage: 'radial-gradient(ellipse at 50% 65%, rgba(203, 213, 225, 0.45) 0%, rgba(248, 250, 252, 0) 70%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  marginBottom: '14px',
                }}
              >
                {/* Floating Clean AC Tag */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(6px)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '0.68rem',
                  fontWeight: 'normal',
                  color: '#1b4332',
                  border: '1px solid rgba(27, 67, 50, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  zIndex: 2,
                }}>
                  <span>AC Chilled</span>
                </div>

                {/* Transparent Studio Vehicle Image */}
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  style={{
                    maxHeight: '125px',
                    maxWidth: '92%',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    transition: 'transform 0.4s ease',
                    filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.06))',
                  }}
                  className="vehicle-card-img"
                />
              </div>

              {/* Title & Starting Rate */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'normal',
                  color: '#0c2338',
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.3px',
                }}>
                  {vehicle.name}
                </h3>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '1.15rem',
                    fontWeight: 'normal',
                    fontFamily: 'var(--font-heading)',
                    color: '#f97316',
                    lineHeight: 1,
                  }}>
                    ₹{vehicle.pricePerKm}<span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#64748b' }}>/km</span>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p style={{
                fontSize: '0.78rem',
                color: '#64748b',
                lineHeight: 1.4,
                marginBottom: '12px',
                minHeight: '34px',
              }}>
                {vehicle.tagline}
              </p>

              {/* Specs Badges */}
              <div style={{
                display: 'flex',
                gap: '8px',
                fontSize: '0.78rem',
                color: '#334155',
                marginBottom: '16px',
                backgroundColor: '#f8fafc',
                padding: '6px 10px',
                borderRadius: '8px',
                justifyContent: 'space-between',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 'normal' }}>
                  <Users size={13} color="#1b4332" />
                  <span>{vehicle.passengerCapacity} Seats</span>
                </span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 'normal' }}>
                  <Briefcase size={13} color="#1b4332" />
                  <span>{vehicle.luggageCapacity} Bags</span>
                </span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span style={{ color: '#1b4332', fontWeight: 'normal' }}>Dual AC</span>
              </div>

              {/* Book now Button */}
              <button
                onClick={() => onSelectVehicle(vehicle)}
                className="btn btn-forest"
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  fontSize: '0.88rem',
                  fontWeight: 'normal',
                  borderRadius: '8px',
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>Book Cab</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
