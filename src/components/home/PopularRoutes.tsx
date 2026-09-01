'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight, MessageCircle, Navigation, ShieldCheck } from 'lucide-react';
import { popularRoutesData } from '@/data/routes';
import { siteConfig } from '@/data/siteConfig';

interface PopularRoutesProps {
  onOpenBookingModal: (pickupCity?: string, dropCity?: string) => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onOpenBookingModal }) => {
  const handleWhatsAppRoute = (from: string, to: string, distance: number, price: number) => {
    const text = encodeURIComponent(
      `Hello ${siteConfig.name}! 👋 I am interested in booking a ride for *${from} → ${to}* (${distance} km, Est. ₹${price}). Please share available cab options.`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
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
              {/* Route Image with Tag */}
              <div style={{ position: 'relative', height: '180px', width: '100%' }}>
                <img
                  src={route.image}
                  alt={`${route.fromCity} to ${route.toCity}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '9999px',
                }}>
                  {route.durationHours} hrs • {route.distanceKm} km
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>{route.fromCity}</span>
                  <ArrowRight size={16} color="#1b4332" />
                  <span style={{ fontWeight: 800, color: '#1b4332', fontSize: '1.05rem' }}>{route.toCity}</span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '14px' }}>
                  Popular: {route.popularCab}
                </div>

                {/* Key Attractions tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {route.keyAttractions.slice(0, 3).map((spot, i) => (
                    <span key={i} style={{
                      backgroundColor: '#f1f5f9',
                      fontSize: '0.72rem',
                      color: '#475569',
                      padding: '2px 8px',
                      borderRadius: '6px',
                    }}>
                      {spot}
                    </span>
                  ))}
                </div>

                {/* Bottom Pricing & Action */}
                <div style={{
                  marginTop: 'auto',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Fares from</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                      ₹{route.startingPrice.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleWhatsAppRoute(route.fromCity, route.toCity, route.distanceKm, route.startingPrice)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#ebf5f0',
                        color: '#1b4332',
                        border: '1px solid #d4e8dd',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="Inquire on WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </button>

                    <button
                      onClick={() => onOpenBookingModal(route.fromCity, route.toCity)}
                      className="btn btn-forest"
                      style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                    >
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
