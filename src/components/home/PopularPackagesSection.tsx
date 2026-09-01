'use client';

import React from 'react';
import { ArrowRight, MapPin, Calendar, Users } from 'lucide-react';
import { TripType, BookingFormData } from '@/types';

interface PopularPackagesSectionProps {
  onOpenBookingModal: (tripType?: TripType, vehicleId?: string, initialData?: Partial<BookingFormData>) => void;
}

export const PopularPackagesSection: React.FC<PopularPackagesSectionProps> = ({ onOpenBookingModal }) => {
  const packages = [
    {
      id: 'mahabaleshwar',
      title: 'Mahabaleshwar & Panchgani',
      duration: '2 Days • 1 Night',
      price: '₹6,499',
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=500&q=80',
      dropCity: 'Mahabaleshwar',
    },
    {
      id: 'goa',
      title: 'Goa Road Trip',
      duration: '4 Days • 3 Nights',
      price: '₹16,999',
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=500&q=80',
      dropCity: 'Goa',
    },
    {
      id: 'shirdi',
      title: 'Pune to Shirdi Darshan',
      duration: '1 Day Return',
      price: '₹4,499',
      badge: 'Pilgrimage',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=500&q=80',
      dropCity: 'Shirdi',
    },
    {
      id: 'lonavala',
      title: 'Lonavala & Khandala',
      duration: '1 Day Excursion',
      price: '₹2,499',
      badge: 'Weekend',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
      dropCity: 'Lonavala',
    },
    {
      id: 'pune-heritage',
      title: 'Pune Local Heritage Tour',
      duration: '8 Hr / 80 Km',
      price: '₹1,699',
      badge: 'City Tour',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80',
      dropCity: 'Pune City',
    },
  ];

  return (
    <section id="packages" style={{ backgroundColor: '#ffffff', padding: '75px 0 65px 0' }}>
      <div className="container-custom">
        {/* Section Header matching mockup */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '34px',
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
              Popular packages
            </h2>
            <p style={{
              fontSize: '0.96rem',
              color: '#64748b',
              margin: 0,
            }}>
              Fixed-price curated routes with driver, fuel, and tolls included.
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
            }}
          >
            <span>Custom itinerary?</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* 5 Package Cards Grid matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '34px',
        }}>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onOpenBookingModal('outstation_roundtrip', undefined, { dropCity: pkg.dropCity })}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(12, 35, 56, 0.04)',
              }}
              className="card-hover-lift"
            >
              {/* Image with Badge */}
              <div style={{ position: 'relative', height: '120px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: '#f97316',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}>
                  {pkg.badge}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0c2338', marginBottom: '4px' }}>
                  {pkg.title}
                </h3>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginBottom: '10px' }}>
                  {pkg.duration}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0c2338' }}>
                    {pkg.price} <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 400 }}>all-incl.</span>
                  </div>
                  <ArrowRight size={14} color="#f97316" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dark Navy Custom Itinerary Banner matching mockup */}
        <div style={{
          backgroundColor: '#0f2942',
          borderRadius: '16px',
          padding: '28px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 12px 30px rgba(12, 35, 56, 0.18)',
        }}>
          <div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '4px',
              fontFamily: 'var(--font-heading)',
            }}>
              Got a custom plan? — plan your trip early
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: '#94a3b8',
              margin: 0,
            }}>
              Tell us your route, passenger count, and dates. We'll build a custom itinerary.
            </p>
          </div>

          <a
            href="#contact"
            className="btn btn-orange"
            style={{
              padding: '11px 24px',
              fontSize: '0.9rem',
              fontWeight: 800,
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            <span>Build a custom plan</span>
          </a>
        </div>
      </div>
    </section>
  );
};
