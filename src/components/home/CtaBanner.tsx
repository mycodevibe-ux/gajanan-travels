'use client';

import React from 'react';
import { MessageCircle, Luggage, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

interface CtaBannerProps {
  onOpenBookingModal: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenBookingModal }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello ${siteConfig.name}! 👋 I am planning a trip. Please help me book my ride.`);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '20px 0 70px 0' }}>
      <div className="container-custom">
        <div style={{
          background: 'linear-gradient(135deg, #123829 0%, #1b4332 50%, #0d281e 100%)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          borderRadius: '24px',
          padding: '38px 44px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 45px -10px rgba(27, 67, 50, 0.35)',
        }}>
          {/* Ambient Glow */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Left Luggage Icon & Heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              flexShrink: 0,
            }}>
              <Luggage size={30} color="#34d399" />
            </div>

            <div>
              <h2 style={{
                fontSize: '1.9rem',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '6px',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.02em',
              }}>
                Planning a trip?
              </h2>
              <p style={{
                fontSize: '0.96rem',
                color: '#d1fae5',
                margin: 0,
              }}>
                Book your ride now and enjoy a hassle-free journey across Maharashtra.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
            <button
              onClick={onOpenBookingModal}
              className="btn btn-forest"
              style={{
                backgroundColor: '#ffffff',
                color: '#1b4332',
                borderColor: '#ffffff',
                padding: '12px 26px',
                borderRadius: '10px',
                fontSize: '0.94rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#ebf5f0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Book Your Ride</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={handleWhatsApp}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '0.94rem',
                gap: '8px',
                backgroundColor: '#22c55e',
                border: 'none',
                color: '#ffffff',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(34, 197, 94, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#16a34a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#22c55e';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MessageCircle size={18} color="#ffffff" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
