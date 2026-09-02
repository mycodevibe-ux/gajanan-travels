'use client';

import React from 'react';
import { 
  Compass, 
  Clock, 
  Users, 
  Briefcase, 
  HeartHandshake, 
  Headphones, 
  ArrowRight
} from 'lucide-react';
import { TripType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface HomeServicesSectionProps {
  onOpenBookingModal?: (type?: TripType) => void;
}

export const HomeServicesSection: React.FC<HomeServicesSectionProps> = ({ onOpenBookingModal = () => {} }) => {
  const { t } = useLanguage();

  const offerings = [
    {
      id: 'outstation',
      title: t.service_outstation_title,
      desc: t.service_outstation_desc,
      icon: Compass,
      tripType: 'outstation_roundtrip' as TripType,
    },
    {
      id: 'local',
      title: t.service_local_title,
      desc: t.service_local_desc,
      icon: Clock,
      tripType: 'local_rental' as TripType,
    },
    {
      id: 'group',
      title: t.service_group_title,
      desc: t.service_group_desc,
      icon: Users,
      tripType: 'outstation_roundtrip' as TripType,
    },
    {
      id: 'corporate',
      title: t.service_corporate_title,
      desc: t.service_corporate_desc,
      icon: Briefcase,
      tripType: 'local_rental' as TripType,
    },
    {
      id: 'family',
      title: t.service_family_title,
      desc: t.service_family_desc,
      icon: HeartHandshake,
      tripType: 'outstation_roundtrip' as TripType,
    },
    {
      id: 'support',
      title: t.service_support_title,
      desc: t.service_support_desc,
      icon: Headphones,
      tripType: 'outstation_roundtrip' as TripType,
    },
  ];

  return (
    <section id="services" style={{
      backgroundColor: '#f0f7fc',
      padding: '75px 0 65px 0',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div className="container-custom">
        {/* Section Header matching mockup */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{
            fontSize: '2.4rem',
            fontWeight: 'normal',
            color: '#0c2338',
            fontFamily: 'var(--font-heading)',
            marginBottom: '6px',
            letterSpacing: '0.3px',
          }}>
            {t.services_title}
          </h2>
          <p style={{
            fontSize: '0.96rem',
            color: '#64748b',
            margin: 0,
          }}>
            {t.services_subtitle}
          </p>
        </div>

        {/* 6 White Cards (3x2 Grid on Desktop) */}
        <div 
          className="services-grid-3x3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {offerings.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onOpenBookingModal(item.tripType)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '26px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 4px 16px rgba(12, 35, 56, 0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                className="card-hover-lift"
              >
                {/* Square Icon Container with subtle blue background matching mockup */}
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  backgroundColor: '#e8f3fb',
                  color: '#0c2338',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <IconComp size={23} color="#0c2338" />
                </div>

                <div>
                  <h3 style={{
                    fontSize: '1.35rem',
                    fontWeight: 'normal',
                    color: '#0c2338',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.3px',
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '0.86rem',
                    color: '#64748b',
                    lineHeight: 1.5,
                    margin: 0,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
