'use client';

import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { WhatsAppOriginalIcon } from '@/components/vehicles/VehicleIcons';

interface MobileBottomBarProps {
  onOpenBookingModal: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBookingModal }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 950,
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '8px 12px',
      gap: '8px',
    }} className="mobile-bottom-bar">
      {/* Call Button */}
      <a
        href={`tel:${siteConfig.phone}`}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 4px',
          borderRadius: '8px',
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          fontSize: '0.72rem',
          fontWeight: 'normal',
          border: '1px solid #e2e8f0',
        }}
      >
        <Phone size={16} color="#1b4332" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hello%20Gajanan%20Tours%20and%20Travels,%20I%20want%20to%20inquire%20about%20a%20cab`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '10px 8px',
          borderRadius: '8px',
          backgroundColor: '#25D366',
          color: '#ffffff',
          fontSize: '0.82rem',
          fontWeight: 'normal',
        }}
      >
        <WhatsAppOriginalIcon size={17} color="#ffffff" />
        <span>WhatsApp</span>
      </a>

      {/* Book Now Button (Forest Green) */}
      <button
        onClick={onOpenBookingModal}
        style={{
          flex: 1.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '10px 8px',
          borderRadius: '8px',
          backgroundColor: '#1b4332',
          color: '#ffffff',
          fontSize: '0.82rem',
          fontWeight: 'normal',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <CalendarCheck size={17} />
        <span>Book Now</span>
      </button>
    </div>
  );
};
