'use client';

import React, { useState } from 'react';
import { X, Send, Car, MapPin, PlaneTakeoff, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { WhatsAppOriginalIcon } from '@/components/vehicles/VehicleIcons';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts = [
    {
      title: 'Book Swift Dzire / Ertiga',
      desc: 'Check rates & vehicle availability',
      icon: Car,
      text: `Hello ${siteConfig.name}! 🚗 I want to book a tourist cab (Swift Dzire / Ertiga / Innova). Please share rates.`,
    },
    {
      title: 'Pune to Mahabaleshwar / Goa Tour',
      desc: 'Get custom itinerary with hotel stays',
      icon: MapPin,
      text: `Hello ${siteConfig.name}! 🗺️ I am planning a holiday trip (Mahabaleshwar / Goa / Shirdi). Please share package options and quotation.`,
    },
    {
      title: 'Airport Taxi Pickup / Drop',
      desc: 'Pune / Mumbai Airport on-time transfer',
      icon: PlaneTakeoff,
      text: `Hello ${siteConfig.name}! ✈️ I need an airport pickup/drop cab. Please share available car options.`,
    },
    {
      title: '17 or 20 Seater Bus Charter',
      desc: 'Group travel & family outings',
      icon: Car,
      text: `Hello ${siteConfig.name}! 👥 We need a 17 or 20 seater bus for group travel. Please share rates.`,
    },
  ];

  const handleLaunchChat = (customText: string) => {
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(customText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 999,
    }}>
      {/* Popover Assistant Window */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '68px',
          right: '0',
          width: '330px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 40px -10px rgba(12, 35, 56, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          animation: 'slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Header */}
          <div style={{
            background: '#0c2338',
            color: '#ffffff',
            padding: '16px 18px',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  <WhatsAppOriginalIcon size={22} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontWeight: 'normal', fontSize: '0.94rem', color: '#ffffff' }}>
                    {siteConfig.name} WhatsApp
                  </div>
                  <div style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '5px', color: '#86efac' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block' }} />
                    <span>Online (24/7 Available)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '14px', backgroundColor: '#f8fafc' }}>
            <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '10px' }}>
              👋 Hi there! How can we assist with your journey today?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quickPrompts.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleLaunchChat(item.text)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '9px 12px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#25D366';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: '#f0f7fc',
                      color: '#0c2338',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <IconComp size={15} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 'normal', color: '#0c2338' }}>{item.title}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.desc}</div>
                    </div>
                    <Send size={13} color="#25D366" />
                  </button>
                );
              })}
            </div>

            <div style={{
              marginTop: '12px',
              textAlign: 'center',
              fontSize: '0.72rem',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}>
              <ShieldCheck size={12} color="#25D366" />
              <span>Official WhatsApp: {siteConfig.phone}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button with Original WhatsApp Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pulse-wa"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.5)',
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Open WhatsApp Support"
      >
        {isOpen ? <X size={24} /> : <WhatsAppOriginalIcon size={30} color="#ffffff" />}
      </button>
    </div>
  );
};
