'use client';

import React, { useEffect } from 'react';
import { X, Users, Briefcase, Fuel, ShieldCheck, CheckCircle2, MessageCircle, CalendarCheck, Star } from 'lucide-react';
import { Vehicle } from '@/types';
import { createVehicleInquiryUrl } from '@/lib/whatsapp';

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
        style={{ maxWidth: '780px' }}
      >
        {/* Header */}
        <div style={{
          position: 'relative',
          height: '260px',
          width: '100%',
          backgroundColor: '#0f172a',
        }}>
          <img
            src={vehicle.image}
            alt={vehicle.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              border: 'none',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(4px)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>

          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
          }}>
            <span className="badge badge-emerald" style={{ marginBottom: '6px' }}>
              {vehicle.category}
            </span>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#ffffff' }}>
              {vehicle.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {/* Quick Specs Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Seating Capacity</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{vehicle.passengerCapacity} Passengers</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Luggage Space</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{vehicle.luggageCapacity} Big Bags</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Fuel / Transmission</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{vehicle.fuelType} ({vehicle.transmission})</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Air Conditioning</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#059669' }}>Dual Climate AC</div>
            </div>
          </div>

          {/* Features List */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              Included Comforts & Amenities:
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px',
            }}>
              {vehicle.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#334155' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tariff Breakdown Table */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              Transparent Tariff & Billing Terms:
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Base Outstation Rate</td>
                  <td style={{ padding: '8px 0', fontWeight: 700, color: '#059669', textAlign: 'right' }}>₹{vehicle.pricePerKm} / KM</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Minimum Distance Billed</td>
                  <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a', textAlign: 'right' }}>{vehicle.minKmPerDay} KM / Day</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Driver Night Allowance (10 PM - 6 AM)</td>
                  <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a', textAlign: 'right' }}>₹{vehicle.driverAllowancePerDay} / Night</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Extra Hour Rate (Local Rentals)</td>
                  <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a', textAlign: 'right' }}>₹{vehicle.extraHourRate} / Hour</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>Tolls, State Border Tax & Parking</td>
                  <td style={{ padding: '8px 0', fontWeight: 600, color: '#0f172a', textAlign: 'right' }}>As per actuals or pre-included in quote</td>
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
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                ₹{vehicle.baseFarePerDay} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>/ Full Day Package</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleWhatsApp}
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Inquiry</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookVehicle(vehicle);
                }}
                className="btn btn-primary"
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
