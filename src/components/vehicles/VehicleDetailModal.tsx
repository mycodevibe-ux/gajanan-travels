'use client';

import React, { useEffect } from 'react';
import { X, Users, Briefcase, Fuel, ShieldCheck, CheckCircle2, CalendarCheck, Star, Sparkles } from 'lucide-react';
import { Vehicle } from '@/types';
import { createVehicleInquiryUrl } from '@/lib/whatsapp';
import { getVehicleIcon, WhatsAppOriginalIcon } from '@/components/vehicles/VehicleIcons';
import { useLanguage } from '@/context/LanguageContext';
import { toMarathiDigits } from '@/lib/marathiNumbers';

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
  const { language } = useLanguage();

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
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 10,
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Vehicle Content Body */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{
                  backgroundColor: '#ebf5f0',
                  color: '#1b4332',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 'normal',
                }}>
                  {vehicle.category}
                </span>
                <span style={{
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 'normal',
                }}>
                  {vehicle.fuelType}
                </span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 'normal', color: '#0c2338', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
                {vehicle.name}
              </h3>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'normal', fontFamily: 'var(--font-heading)', color: '#f97316', lineHeight: 1 }}>
                ₹{language === 'mr' ? toMarathiDigits(vehicle.pricePerKm) : vehicle.pricePerKm} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: '#64748b' }}>{language === 'mr' ? '/किमी' : '/ KM'}</span>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                {language === 'mr' ? 'निश्चित वाजवी दर' : 'Fixed honest tariff'}
              </div>
            </div>
          </div>

          {/* Quick Specs Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            backgroundColor: '#f8fafc',
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid #e2e8f0',
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{language === 'mr' ? 'आसने' : 'Passenger Capacity'}</div>
              <div style={{ fontSize: '1rem', fontWeight: 'normal', color: '#0f172a' }}>{language === 'mr' ? toMarathiDigits(vehicle.passengerCapacity) : vehicle.passengerCapacity} {language === 'mr' ? 'प्रवासी' : 'Guests'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{language === 'mr' ? 'बॅग्स' : 'Luggage Space'}</div>
              <div style={{ fontSize: '1rem', fontWeight: 'normal', color: '#0f172a' }}>{language === 'mr' ? toMarathiDigits(vehicle.luggageCapacity) : vehicle.luggageCapacity} {language === 'mr' ? 'बॅगा' : 'Bags'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{language === 'mr' ? 'इंधन' : 'Fuel & Drive'}</div>
              <div style={{ fontSize: '1rem', fontWeight: 'normal', color: '#0f172a' }}>{vehicle.fuelType} ({vehicle.transmission})</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{language === 'mr' ? 'वातानुकूलन' : 'Air Conditioning'}</div>
              <div style={{ fontSize: '1rem', fontWeight: 'normal', color: '#1b4332' }}>{language === 'mr' ? 'थंडगार ड्युअल एसी' : 'Chilled Dual AC'}</div>
            </div>
          </div>

          {/* Features List */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 'normal', color: '#0f172a', marginBottom: '10px', fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
              {language === 'mr' ? 'समाविष्ट सुविधा व आराम:' : 'Included Comforts & Amenities:'}
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
              {language === 'mr' ? 'पारदर्शक दरपत्रक व बिलिंग नियम:' : 'Transparent Tariff & Billing Terms:'}
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>{language === 'mr' ? 'मूळ आऊटस्टेशन दर' : 'Base Outstation Rate'}</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#1b4332', textAlign: 'right' }}>₹{language === 'mr' ? toMarathiDigits(vehicle.pricePerKm) : vehicle.pricePerKm} {language === 'mr' ? '/ किमी' : '/ KM'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>{language === 'mr' ? 'किमान बिलिंग अंतर' : 'Minimum Distance Billed'}</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#0f172a', textAlign: 'right' }}>{language === 'mr' ? toMarathiDigits(vehicle.minKmPerDay) : vehicle.minKmPerDay} {language === 'mr' ? 'किमी / दिवस' : 'KM / Day'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>{language === 'mr' ? 'चालक नाईट भत्ता (रात्री १० ते स. ६)' : 'Driver Night Allowance (10 PM - 6 AM)'}</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#0f172a', textAlign: 'right' }}>₹{language === 'mr' ? toMarathiDigits(vehicle.driverAllowancePerDay) : vehicle.driverAllowancePerDay} {language === 'mr' ? '/ रात्र' : '/ Night'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>{language === 'mr' ? 'अतिरिक्त तास दर (Extra Hour)' : 'Extra Hour Rate (Local Rentals)'}</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#0f172a', textAlign: 'right' }}>₹{language === 'mr' ? toMarathiDigits(vehicle.extraHourRate) : vehicle.extraHourRate} {language === 'mr' ? '/ तास' : '/ Hour'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>{language === 'mr' ? 'टोल, पार्किंग आणि राज्य कर' : 'Tolls, Parking & State Tax'}</td>
                  <td style={{ padding: '8px 0', fontWeight: 'normal', color: '#f97316', textAlign: 'right' }}>{language === 'mr' ? 'स्वतंत्र (प्रत्यक्ष पावतीनुसार)' : 'Extra (As per actuals)'}</td>
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
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{language === 'mr' ? 'सुरुवातीचे दर' : 'Starting from'}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'normal', fontFamily: 'var(--font-heading)', color: '#1b4332' }}>
                ₹{language === 'mr' ? toMarathiDigits(vehicle.baseFarePerDay) : vehicle.baseFarePerDay} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#64748b' }}>{language === 'mr' ? '/ संपूर्ण दिवस पॅकेज' : '/ Full Day Package'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleWhatsApp}
                className="btn btn-whatsapp"
                style={{ padding: '10px 18px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <WhatsAppOriginalIcon size={18} color="#ffffff" />
                <span>{language === 'mr' ? 'व्हॉट्सॲप चौकशी' : 'WhatsApp Inquiry'}</span>
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
                <span>{language === 'mr' ? 'ही गाडी बुक करा' : 'Book This Cab'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
