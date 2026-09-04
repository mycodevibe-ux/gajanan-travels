'use client';

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Compass,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useLanguage } from '@/context/LanguageContext';
import { toMarathiDigits } from '@/lib/marathiNumbers';
import { BookingWizard } from '@/components/booking/BookingWizard';
import { TripType, BookingFormData } from '@/types';

interface HomeContactSectionProps {
  initialTripType?: TripType;
  initialVehicleId?: string;
  initialData?: Partial<BookingFormData>;
}

export const HomeContactSection: React.FC<HomeContactSectionProps> = ({
  initialTripType = 'outstation_roundtrip',
  initialVehicleId,
  initialData,
}) => {
  const { language, t } = useLanguage();

  return (
    <section id="contact" style={{ backgroundColor: '#ffffff', padding: '75px 0 65px 0' }}>
      <div id="booking-section" style={{ position: 'relative', top: '-80px' }} />
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#ebf5f0',
            color: '#1b4332',
            fontSize: '0.8rem',
            fontWeight: 'normal',
            padding: '4px 12px',
            borderRadius: '9999px',
            marginBottom: '10px',
          }}>
            <span>✨ {language === 'mr' ? 'थेट पारदर्शक बुकिंग' : 'Live Transparent Booking'}</span>
          </div>
          <h2 style={{
            fontSize: '2.4rem',
            fontWeight: 'normal',
            color: '#0c2338',
            fontFamily: 'var(--font-heading)',
            marginBottom: '6px',
            letterSpacing: '0.3px',
          }}>
            {t.contact_title}
          </h2>
          <p style={{
            fontSize: '0.96rem',
            color: '#64748b',
            margin: 0,
          }}>
            {t.contact_subtitle}
          </p>
        </div>

        {/* 2-Column Main Layout: Left Booking Wizard + Right Contact info & Map */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}>
          {/* Left Column: Embedded Live Booking Wizard */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #cbd5e1',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(12, 35, 56, 0.06)',
          }}>
            {/* Form Top Title */}
            <div style={{
              padding: '14px 20px',
              backgroundColor: '#0c2338',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  {language === 'mr' ? 'गाडी निवडा व भाडे कॅल्क्युलेट करा' : 'Select Vehicle & Calculate Live Fare'}
                </h3>
                <p style={{ fontSize: '0.74rem', color: '#cbd5e1', margin: '2px 0 0 0' }}>
                  {language === 'mr' ? 'पारदर्शक दर • २४ तास सेवा • थेट व्हॉट्सॲप' : 'Transparent estimate • 24/7 Verified Chauffeur'}
                </p>
              </div>
            </div>

            <BookingWizard
              key={`${initialVehicleId || ''}-${initialTripType || ''}-${JSON.stringify(initialData || {})}`}
              initialTripType={initialTripType}
              initialVehicleId={initialVehicleId}
              initialData={initialData}
            />
          </div>

          {/* Right Column: Info Box + Google Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Soft Blue Info Box */}
            <div style={{
              backgroundColor: '#eef6fc',
              borderRadius: '16px',
              border: '1px solid #d9ebf7',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {/* Call us */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c2338',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  flexShrink: 0,
                }}>
                  <Phone size={16} color="#0c2338" />
                </div>
                <div>
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>
                    {language === 'mr' ? 'थेट फोन करा' : 'Call us'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                    <a href={`tel:${siteConfig.phone}`} style={{ color: '#475569', textDecoration: 'none', fontWeight: 'normal' }}>
                      {language === 'mr' ? toMarathiDigits(siteConfig.phone) : siteConfig.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c2338',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  flexShrink: 0,
                }}>
                  <Mail size={16} color="#0c2338" />
                </div>
                <div>
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>
                    {language === 'mr' ? 'ईमेल करा' : 'Email'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 'normal' }}>
                    <a href={`mailto:${siteConfig.email}`} style={{ color: '#475569', textDecoration: 'none', fontWeight: 'normal' }}>
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Based in */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c2338',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  flexShrink: 0,
                }}>
                  <MapPin size={16} color="#0c2338" />
                </div>
                <div>
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>
                    {language === 'mr' ? 'कार्यालय' : 'Based in'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 'normal' }}>
                    {language === 'mr' ? 'पुणे, महाराष्ट्र, भारत' : 'Pune, Maharashtra'}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c2338',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  flexShrink: 0,
                }}>
                  <Clock size={16} color="#0c2338" />
                </div>
                <div>
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>
                    {language === 'mr' ? 'कार्यालयीन वेळ' : 'Hours'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 'normal' }}>
                    {language === 'mr' ? 'सोम – रवि, स. ६:०० ते रात्री ११:००' : 'Mon – Sun, 6 AM – 11 PM'}
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Location Map */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '340px',
            }}>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#0c2338',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.82rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Compass size={15} color="#f97316" />
                  <span style={{ fontFamily: 'var(--font-heading)' }}>
                    {siteConfig.name} - Location Map
                  </span>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Pune%20Maharashtra"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#f97316',
                    textDecoration: 'none',
                    fontSize: '0.76rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>{language === 'mr' ? 'मॅप्स दिशा ↗' : 'Directions ↗'}</span>
                </a>
              </div>
              <div style={{ flex: 1, width: '100%', minHeight: '300px' }}>
                <iframe
                  src="https://maps.google.com/maps?q=Pune%2C%20Maharashtra&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, width: '100%', height: '100%', minHeight: '300px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${siteConfig.name} Route Map`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
