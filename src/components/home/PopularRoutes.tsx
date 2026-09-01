'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight, MessageCircle, Navigation, ShieldCheck } from 'lucide-react';
import { popularRoutesData } from '@/data/routes';
import { createRouteInquiryUrl } from '@/lib/whatsapp';

interface PopularRoutesProps {
  onOpenBookingModal: (pickupCity?: string, dropCity?: string) => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onOpenBookingModal }) => {
  const handleWhatsAppRoute = (from: string, to: string, distance: number, price: number) => {
    const url = createRouteInquiryUrl(from, to, distance, price);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section-padding" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
      <div className="container-custom">
        <div className="section-header">
          <div className="section-tag">
            <Navigation size={14} />
            <span>Fixed Transparent Fares</span>
          </div>
          <h2 className="section-title">
            Popular Intercity Tourist Routes
          </h2>
          <p className="section-subtitle">
            Hassle-free one-way and roundtrip cab rentals between top tourist hubs with guaranteed on-time pickups.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid-3" style={{ marginBottom: '40px' }}>
          {popularRoutesData.map((route) => (
            <div
              key={route.id}
              className="card-glass card-hover-lift"
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image & Badges */}
              <div style={{ position: 'relative', height: '180px', width: '100%' }}>
                <img
                  src={route.image}
                  alt={`${route.fromCity} to ${route.toCity}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%)',
                }} />

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#34d399',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}>
                  {route.distanceKm} KM • ~{route.durationHours} hrs
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '16px',
                  color: '#ffffff',
                }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                    {route.fromCity} <span style={{ color: '#34d399' }}>→</span> {route.toCity}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '10px' }}>
                  Popular Choice: <strong style={{ color: '#0f172a' }}>{route.popularCab}</strong>
                </div>

                {/* Key stops */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px', flex: 1 }}>
                  {route.keyAttractions.map((att, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                      }}
                    >
                      {att}
                    </span>
                  ))}
                </div>

                {/* Price & Action Row */}
                <div style={{
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 'auto',
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Fares from</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>
                      ₹{route.startingPrice.toLocaleString('en-IN')}{' '}
                      <span style={{ fontSize: '0.72rem', fontWeight: 500, color: '#64748b' }}>All-Incl.</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleWhatsAppRoute(route.fromCity, route.toCity, route.distanceKm, route.startingPrice)}
                      className="btn btn-whatsapp"
                      style={{ padding: '8px 10px', borderRadius: '8px' }}
                      title="WhatsApp Route Booking"
                    >
                      <MessageCircle size={16} />
                    </button>

                    <button
                      onClick={() => onOpenBookingModal(route.fromCity, route.toCity)}
                      className="btn btn-primary btn-sm"
                    >
                      <span>Book Cab</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Routes link */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/routes"
            className="btn btn-outline"
            style={{ display: 'inline-flex', gap: '8px' }}
          >
            <span>View 120+ Intercity Tourist Routes</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
