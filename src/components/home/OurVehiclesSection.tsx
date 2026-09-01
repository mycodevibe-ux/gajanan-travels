'use client';

import React from 'react';
import { Users, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import { Vehicle } from '@/types';
import { vehiclesData } from '@/data/vehicles';

interface OurVehiclesSectionProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const OurVehiclesSection: React.FC<OurVehiclesSectionProps> = ({ onSelectVehicle }) => {
  // Show 4 core fleet vehicles matching mockup
  const displayFleet = vehiclesData.slice(0, 4);

  return (
    <section id="fleet" style={{ backgroundColor: '#ffffff', padding: '75px 0 65px 0' }}>
      <div className="container-custom">
        {/* Section Header matching mockup */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '38px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: 900,
              color: '#0c2338',
              fontFamily: 'var(--font-heading)',
              marginBottom: '6px',
              letterSpacing: '-0.02em',
            }}>
              Our fleet
            </h2>
            <p style={{
              fontSize: '0.96rem',
              color: '#64748b',
              margin: 0,
              maxWidth: '650px',
            }}>
              From a couple's weekend getaway to a 40-person family reunion, find the exact vehicle you need with transparent per-km rates.
            </p>
          </div>

          <a
            href="#contact"
            style={{
              color: '#f97316',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              textDecoration: 'none',
              transition: 'gap 0.2s',
            }}
          >
            <span>View all vehicles</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* 4 Fleet Cards Grid matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          {displayFleet.map((vehicle) => (
            <div
              key={vehicle.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 16px rgba(12, 35, 56, 0.04)',
                transition: 'all 0.25s ease',
              }}
              className="card-hover-lift"
            >
              {/* Image Container with Zoom Mask */}
              <div 
                className="img-zoom-container"
                style={{
                  height: '160px',
                  width: '100%',
                  marginBottom: '14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                }}
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Title & Starting Rate */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#0c2338',
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                }}>
                  {vehicle.name}
                </h3>
                <span style={{
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  color: '#f97316',
                }}>
                  ₹{vehicle.pricePerKm}/km
                </span>
              </div>

              {/* Specs */}
              <div style={{
                display: 'flex',
                gap: '12px',
                fontSize: '0.8rem',
                color: '#64748b',
                marginBottom: '16px',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} color="#0c2338" />
                  <span>{vehicle.passengerCapacity} Seats</span>
                </span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Briefcase size={14} color="#0c2338" />
                  <span>{vehicle.luggageCapacity} Bags</span>
                </span>
              </div>

              {/* Clean "Book now" Button */}
              <button
                onClick={() => onSelectVehicle(vehicle)}
                className="btn btn-outline-navy"
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  marginTop: 'auto',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0c2338';
                  e.currentTarget.style.borderColor = '#0c2338';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.color = '#0c2338';
                }}
              >
                <span>Book now</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
