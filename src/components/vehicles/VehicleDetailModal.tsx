'use client';

import React, { useEffect } from 'react';
import { X, Users, Briefcase, Fuel, ShieldCheck, CheckCircle2, CalendarCheck, Star, Sparkles } from 'lucide-react';
import { Vehicle } from '@/types';
import { createVehicleInquiryUrl } from '@/lib/whatsapp';
import { getVehicleIcon, WhatsAppOriginalIcon } from '@/components/vehicles/VehicleIcons';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBookVehicle: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onBookVehicle,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (vehicle) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  const handleWhatsApp = () => {
    const url = createVehicleInquiryUrl(vehicle.name, vehicle.pricePerKm);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', borderRadius: '20px', overflow: 'hidden' }}
      >
        {/* Studio Showcase Header */}
        <div style={{
          position: 'relative',
          height: '280px',
          width: '100%',
          background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          overflow: 'hidden',
        }}>
          {/* Ambient Spotlight */}
          <div style={{
            position: 'absolute',
            width: '80%',
            height: '70%',
            bottom: '15px',
            background: 'radial-gradient(ellipse at center, rgba(27, 67, 50, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          {/* Vehicle Studio Image with Transparent Presentation */}
          <img
            src={vehicle.image}
            alt={vehicle.name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.08))',
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              border: '1px solid #cbd5e1',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              color: '#0f172a',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              zIndex: 10,
            }}
          >
            <X size={20} />
          </button>

          {/* Overlay Title & Category on Top Left */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            <span style={{
              backgroundColor: '#1b4332',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.74rem',
              fontWeight: 'normal',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              width: 'fit-content',
              boxShadow: '0 2px 6px rgba(27, 67, 50, 0.25)',
            }}>
              {getVehicleIcon(vehicle.id || vehicle.category, 14, '#ffffff')}
              <span>{vehicle.category}</span>
            </span>
          </div>

          {/* Name & Tagline at Bottom */}
          <div style={{
            position: 'absolute',
            bottom: '14px',
            left: '20px',
            right: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 'normal', color: '#0c2338', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
                {vehicle.name}
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                {vehicle.tagline}
              </span>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.92)',
              padding: '4px 10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.82rem',
              fontWeight: 'normal',
              color: '#0f172a',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            }}>
              <Star size={14} color="#f59e0b" fill="#f59e0b" />
              <span>{vehicle.rating}</span>
              <span style={{ color: '#64748b', fontSize: '0.74rem', fontWeight: 'normal' }}>({vehicle.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {/* Quick Specs Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            backgroundColor: '#ebf5f0',
            border: '1px solid #c2e2d0',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Seating Capacity</div>
              <div style={{ fontSize: '1rem', fontWeight: 'normal', color: '#0f172a' }}>{vehicle.passengerCapacity} Passengers</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Luggage Space</div>
              <div style={{ fontSize: '1rem', fontWeight: 'normal', color: '#0f172a' }}>{vehicle.luggageCapacity} Large Bags</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Fuel / Transmission</div>
              <div style={{ fontSize: '1rem', fontWeight: 'normal', color: '#0f172a' }}>{vehicle.fuelType} ({vehicle.transmission})</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Air Conditioning</div>
              <div style={{ fontSize: '1rem', fontWeight: 'normal', color: '#1b4332' }}>Chilled Dual AC</div>
            </div>
          </div>

          {/* Features List */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 'normal', color: '#0f172a', marginBottom: '10px', fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
              Included Comforts & Amenities:
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px',
            }}>
              {vehicle.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#334155' }}>
                  <CheckCircle2 size={16} color="#1b4332" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tariff Breakdown Table */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 'normal', color: '#0f172a', marginBottom: '10px', fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
              Transparent Tariff & Billing Terms:
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Base Outstation Rate</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#1b4332', textAlign: 'right' }}>₹{vehicle.pricePerKm} / KM</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Minimum Distance Billed</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#0f172a', textAlign: 'right' }}>{vehicle.minKmPerDay} KM / Day</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Driver Night Allowance (10 PM - 6 AM)</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#0f172a', textAlign: 'right' }}>₹{vehicle.driverAllowancePerDay} / Night</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Extra Hour Rate (Local Rentals)</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#0f172a', textAlign: 'right' }}>₹{vehicle.extraHourRate} / Hour</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Tolls, State Border Tax & Parking</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#0f172a', textAlign: 'right' }}>Clear transparent billing (Actuals)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '18px',
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Starting from</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'normal', fontFamily: 'var(--font-heading)', color: '#1b4332' }}>
                ₹{vehicle.baseFarePerDay} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#64748b' }}>/ Full Day Package</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleWhatsApp}
                className="btn btn-whatsapp"
                style={{ padding: '10px 18px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <WhatsAppOriginalIcon size={18} color="#ffffff" />
                <span>WhatsApp Inquiry</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookVehicle(vehicle);
                }}
                className="btn btn-forest"
                style={{ padding: '10px 22px', borderRadius: '10px' }}
              >
                <CalendarCheck size={18} />
                <span>Book This Cab</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
