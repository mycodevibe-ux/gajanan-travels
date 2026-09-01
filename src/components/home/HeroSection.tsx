'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Car, 
  UserCheck, 
  Phone,
  Tag
} from 'lucide-react';
import { TripType, BookingFormData } from '@/types';
import { siteConfig } from '@/data/siteConfig';

interface HeroSectionProps {
  onOpenBookingModal: (tripType?: TripType, vehicleId?: string, initialData?: Partial<BookingFormData>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBookingModal }) => {
  const [pickupLocation, setPickupLocation] = useState('Pune');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [dropDate, setDropDate] = useState(
    new Date(Date.now() + 172800000).toISOString().split('T')[0]
  );
  const [passengers, setPassengers] = useState('1-4');
  const [vehicleType, setVehicleType] = useState('Sedan');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleMapping: Record<string, string> = {
      'Sedan': 'swift-dzire',
      'SUV (Ertiga)': 'ertiga',
      'Luxury SUV (Innova)': 'innova-crysta',
      'Tempo (17 Seater)': 'tata-17-seater',
      'Bus (20 Seater)': 'tata-20-seater',
    };

    const numPassengers = passengers === '1-4' ? 4 : passengers === '5-7' ? 7 : passengers === '8-17' ? 17 : 20;

    onOpenBookingModal('outstation_roundtrip', vehicleMapping[vehicleType] || 'swift-dzire', {
      pickupCity: pickupLocation || 'Pune',
      dropCity: dropLocation || 'Mahabaleshwar',
      pickupDate: pickupDate,
      returnDate: dropDate,
      passengers: numPassengers,
    });
  };

  return (
    <div style={{
      backgroundColor: '#f0f7fc',
      padding: '50px 0 45px 0',
      position: 'relative',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Top Hero Visual Row matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'center',
          marginBottom: '38px',
        }}>
          {/* Left Text Block */}
          <div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 4.8vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              color: '#0c2338',
              letterSpacing: '-0.03em',
              marginBottom: '18px',
              fontFamily: 'var(--font-heading)',
            }}>
              Your journey,<br />
              <span style={{ color: '#f97316' }}>our responsibility.</span>
            </h1>

            <p style={{
              fontSize: '1rem',
              color: '#475569',
              lineHeight: 1.65,
              marginBottom: '26px',
              maxWidth: '520px',
            }}>
              Outstation trips, local travel, airport transfers and group travel – all at your service. Clean cars, transparent per-km billing, and drivers who know every turn.
            </p>

            {/* 2 Buttons: Orange + Green */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <button
                onClick={() => onOpenBookingModal('outstation_roundtrip')}
                className="btn btn-orange"
                style={{ padding: '12px 26px', fontSize: '0.94rem', fontWeight: 800 }}
              >
                <span>Book your ride</span>
              </button>

              <a
                href={`tel:${siteConfig.phone}`}
                className="btn btn-green"
                style={{ padding: '12px 24px', fontSize: '0.94rem', fontWeight: 800, textDecoration: 'none' }}
              >
                <Phone size={16} />
                <span>{siteConfig.phone}</span>
              </a>
            </div>

            {/* 3 Feature Pill Badges matching mockup */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="hero-pill-badge">
                <Car size={15} color="#f97316" />
                <span>Clean sanitized vehicles</span>
              </div>

              <div className="hero-pill-badge">
                <UserCheck size={15} color="#f97316" />
                <span>Road-tested drivers</span>
              </div>

              <div className="hero-pill-badge">
                <Tag size={15} color="#f97316" />
                <span>All-inclusive options</span>
              </div>
            </div>
          </div>

          {/* Right Cockpit / Driving Image with 500+ Trips Overlay Badge */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                height: '320px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(12, 35, 56, 0.15)',
                border: '3px solid #ffffff',
                backgroundColor: '#e2e8f0',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"
                alt="Chauffeur driving clean car"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Stats Floating Badge matching mockup */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                padding: '10px 18px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
              }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0c2338', lineHeight: 1 }}>500+</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>Happy trips</div>
                </div>
                <div style={{ width: '1px', height: '28px', backgroundColor: '#e2e8f0' }} />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0c2338', lineHeight: 1 }}>12+</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>Years on the road</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* "Plan your ride" Search Bar Card with Drop date and full width balanced layout */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px 28px',
          boxShadow: '0 8px 30px rgba(12, 35, 56, 0.08)',
          width: '100%',
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#0c2338',
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)',
          }}>
            Plan your ride
          </h2>

          <form onSubmit={handleSearchSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr) 115px',
              gap: '14px',
              alignItems: 'flex-end',
              width: '100%',
            }} className="plan-ride-grid">
              {/* 1. Pickup location */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '5px' }}>
                  Pickup location
                </label>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
              </div>

              {/* 2. Drop location */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '5px' }}>
                  Drop location
                </label>
                <input
                  type="text"
                  placeholder="Enter drop location"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
              </div>

              {/* 3. Pickup date */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '5px' }}>
                  Pickup date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
              </div>

              {/* 4. Drop date (NEW) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '5px' }}>
                  Drop date
                </label>
                <input
                  type="date"
                  value={dropDate}
                  min={pickupDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDropDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
              </div>

              {/* 5. Passengers */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '5px' }}>
                  Passengers
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                    cursor: 'pointer',
                  }}
                >
                  <option value="1-4">1-4</option>
                  <option value="5-7">5-7</option>
                  <option value="8-17">8-17</option>
                  <option value="18-20+">18-20+</option>
                </select>
              </div>

              {/* 6. Vehicle type */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '5px' }}>
                  Vehicle type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                    cursor: 'pointer',
                  }}
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV (Ertiga)">SUV (Ertiga)</option>
                  <option value="Luxury SUV (Innova)">Luxury SUV (Innova)</option>
                  <option value="Tempo (17 Seater)">Tempo (17 Seater)</option>
                  <option value="Bus (20 Seater)">Bus (20 Seater)</option>
                </select>
              </div>

              {/* 7. Orange Search Button */}
              <div>
                <button
                  type="submit"
                  className="btn btn-orange"
                  style={{
                    width: '100%',
                    height: '42px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    borderRadius: '8px',
                  }}
                >
                  <Search size={15} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1080px) {
          .plan-ride-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 650px) {
          .plan-ride-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
