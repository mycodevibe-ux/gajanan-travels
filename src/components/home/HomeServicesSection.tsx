'use client';

import React from 'react';
import { 
  PlaneTakeoff, 
  Compass, 
  Clock, 
  Users, 
  Briefcase, 
  HeartHandshake, 
  Headphones, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TripType } from '@/types';

interface HomeServicesSectionProps {
  onOpenBookingModal?: (type?: TripType) => void;
}

export const HomeServicesSection: React.FC<HomeServicesSectionProps> = ({ onOpenBookingModal = () => {} }) => {
  const offerings = [
    {
      id: 'airport',
      title: 'Airport transfer',
      desc: 'Reliable pickup and drop, tracked flight timing.',
      icon: PlaneTakeoff,
      tripType: 'airport_transfer' as TripType,
    },
    {
      id: 'outstation',
      title: 'Outstation trips',
      desc: 'Goa, Mahabaleshwar, Shirdi and beyond.',
      icon: Compass,
      tripType: 'outstation_roundtrip' as TripType,
    },
    {
      id: 'local',
      title: 'Local rental',
      desc: 'Hourly or full-day rentals within Pune.',
      icon: Clock,
      tripType: 'local_rental' as TripType,
    },
    {
      id: 'group',
      title: 'Group travel',
      desc: 'Buses and tempo travellers for large groups.',
      icon: Users,
      tripType: 'outstation_roundtrip' as TripType,
    },
    {
      id: 'corporate',
      title: 'Corporate travel',
      desc: 'Employee transport and client pickups.',
      icon: Briefcase,
      tripType: 'local_rental' as TripType,
    },
    {
      id: 'wedding',
      title: 'Wedding cars',
      desc: 'Decorated vehicles for the big day.',
      icon: Sparkles,
      tripType: 'outstation_roundtrip' as TripType,
    },
    {
      id: 'family',
      title: 'Family trips',
      desc: 'Spacious, comfortable rides for families.',
      icon: HeartHandshake,
      tripType: 'outstation_roundtrip' as TripType,
    },
    {
      id: 'support',
      title: '24/7 support',
      desc: "Someone's always available on call.",
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
            fontWeight: 900,
            color: '#0c2338',
            fontFamily: 'var(--font-heading)',
            marginBottom: '6px',
            letterSpacing: '-0.02em',
          }}>
            What we offer
          </h2>
          <p style={{
            fontSize: '0.96rem',
            color: '#64748b',
            margin: 0,
          }}>
            From a quick airport drop to a week-long family tour, we handle it.
          </p>
        </div>

        {/* 8 White Cards Grid (4x2 on desktop) matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '18px',
        }}>
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
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 4px 16px rgba(12, 35, 56, 0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                className="card-hover-lift"
              >
                {/* Square Icon Container with subtle blue background matching mockup */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: '#e8f3fb',
                  color: '#0c2338',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <IconComp size={22} color="#0c2338" />
                </div>

                <div>
                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#0c2338',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-heading)',
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
