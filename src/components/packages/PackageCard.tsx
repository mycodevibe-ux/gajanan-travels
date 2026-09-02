'use client';

import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Hotel, 
  Car, 
  Star, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { TourPackage } from '@/types';
import { createPackageInquiryUrl } from '@/lib/whatsapp';

interface PackageCardProps {
  pkg: TourPackage;
  onOpenDetails: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onOpenDetails,
  onBookPackage,
}) => {
  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const duration = `${pkg.durationDays}D / ${pkg.durationNights}N`;
    const url = createPackageInquiryUrl(pkg.title, duration, pkg.pricePerPerson);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const durationText = pkg.durationNights > 0
    ? `${pkg.durationDays} Days / ${pkg.durationNights} Nights`
    : pkg.id === 'pune-local-package'
      ? '8 Hours / 80 KM'
      : '1 Day';

  return (
    <div
      onClick={() => onOpenDetails(pkg)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      className="card-hover-lift"
    >
      {/* Top Image Container */}
      <div style={{
        position: 'relative',
        height: '210px',
        width: '100%',
        backgroundColor: '#0f172a',
        overflow: 'hidden',
      }}>
        <img
          src={pkg.image}
          alt={pkg.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.1) 60%, transparent 100%)',
        }} />

        {/* Badges on top */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
        }}>
          <span style={{
            backgroundColor: 'rgba(27, 67, 50, 0.9)',
            backdropFilter: 'blur(4px)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.74rem',
            fontWeight: 'normal',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Calendar size={12} color="#ffffff" />
            <span>{durationText}</span>
          </span>

          <span style={{
            backgroundColor: '#ffffff',
            color: '#1b4332',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 'normal',
          }}>
            {pkg.category}
          </span>
        </div>

        {/* Discount Badge */}
        {pkg.discountPercent > 0 && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 'normal',
          }}>
            {pkg.discountPercent}% OFF
          </div>
        )}

        {/* Rating overlay */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          color: '#ffffff',
          padding: '3px 8px',
          borderRadius: '6px',
          fontSize: '0.74rem',
          fontWeight: 'normal',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <Star size={12} color="#f59e0b" fill="#f59e0b" />
          <span>{pkg.rating}</span>
          <span style={{ color: '#cbd5e1', fontSize: '0.68rem' }}>({pkg.reviewsCount})</span>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Destination Route */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '0.78rem',
          color: '#1b4332',
          fontWeight: 'normal',
          marginBottom: '4px',
        }}>
          <MapPin size={13} />
          <span>{pkg.destination}</span>
        </div>

        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'normal',
          color: '#0f172a',
          marginBottom: '6px',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '0.3px',
        }}>
          {pkg.title}
        </h3>

        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '14px', lineHeight: 1.45 }}>
          {pkg.subtitle}
        </p>

        {/* Inclusions summary strip */}
        <div style={{
          display: 'flex',
          gap: '10px',
          padding: '8px 10px',
          backgroundColor: '#ebf5f0',
          borderRadius: '8px',
          marginBottom: '14px',
          fontSize: '0.76rem',
          color: '#1b4332',
          fontWeight: 'normal',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Hotel size={13} color="#1b4332" />
            <span>{pkg.hotelTier}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Car size={13} color="#1b4332" />
            <span>Private Cab</span>
          </div>
        </div>

        {/* Highlights */}
        <div style={{ marginBottom: '16px', flex: 1 }}>
          {pkg.highlights.slice(0, 2).map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', fontSize: '0.78rem', color: '#475569', marginBottom: '3px' }}>
              <span style={{ color: '#1b4332', fontWeight: 'normal' }}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Price & Action Strip */}
        <div style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
              Starting from
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 'normal', fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
                ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
              </span>
              {pkg.originalPrice && (
                <span style={{ fontSize: '0.76rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ₹{pkg.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.66rem', color: '#64748b' }}>per person</div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={handleWhatsAppInquiry}
              className="btn btn-whatsapp"
              style={{ padding: '8px 10px', borderRadius: '8px' }}
              title="WhatsApp Inquiry"
            >
              <MessageCircle size={15} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(pkg);
              }}
              className="btn btn-forest"
              style={{ padding: '8px 14px', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              <span>Details</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
