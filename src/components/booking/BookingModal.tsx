'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BookingWizard } from './BookingWizard';
import { TripType, BookingFormData } from '@/types';
import { siteConfig } from '@/data/siteConfig';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTripType?: TripType;
  initialVehicleId?: string;
  initialPackageId?: string;
  initialData?: Partial<BookingFormData>;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTripType,
  initialVehicleId,
  initialPackageId,
  initialData,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: '16px' }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Compact Modal Header */}
        <div style={{
          padding: '12px 18px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0c2338 0%, #163654 100%)',
          color: '#ffffff',
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', color: '#ffffff', fontWeight: 'normal', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
              Book Your Ride With {siteConfig.name}
            </h3>
            <p style={{ fontSize: '0.74rem', color: '#cbd5e1', margin: 0, marginTop: '2px' }}>
              Live transparent estimate • Clean AC cabs • 24/7 Verified Chauffeur
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)')}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <BookingWizard
          initialTripType={initialTripType}
          initialVehicleId={initialVehicleId}
          initialData={initialData}
          onSuccessClose={onClose}
        />
      </div>
    </div>
  );
};
