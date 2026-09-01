'use client';

import React from 'react';
import { 
  CalendarDays, 
  Compass, 
  Clock, 
  Bus, 
  Users, 
  Building2, 
  Sparkles, 
  Headphones
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'Airport Transfer',
      desc: 'On-time pickup & drop service',
      icon: CalendarDays,
    },
    {
      title: 'Outstation Trips',
      desc: 'One way & round trip available',
      icon: Compass,
    },
    {
      title: 'Local Rental',
      desc: 'Hourly & full day booking',
      icon: Clock,
    },
    {
      title: 'Group Travel',
      desc: '17 & 20 seater buses',
      icon: Bus,
    },
    {
      title: 'Family Trips',
      desc: 'Comfortable rides for family',
      icon: Users,
    },
    {
      title: 'Corporate Travel',
      desc: 'Reliable travel for companies',
      icon: Building2,
    },
    {
      title: 'Wedding & Events',
      desc: 'Special rides for special moments',
      icon: Sparkles,
    },
    {
      title: '24/7 Support',
      desc: 'We are always here to help you',
      icon: Headphones,
    },
  ];

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '65px 0', borderTop: '1px solid #e9ecef', borderBottom: '1px solid #e9ecef' }}>
      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '20px',
          textAlign: 'center',
        }}>
          {services.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px 8px',
                  borderRadius: '16px',
                  transition: 'transform 0.2s ease',
                }}
                className="card-hover-lift"
              >
                {/* Chariteam Dark Icon Box with Orange Icon */}
                <div style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '16px',
                  backgroundColor: '#001D23',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF6F0F',
                  marginBottom: '14px',
                  boxShadow: '0 6px 16px rgba(0, 29, 35, 0.1)',
                  transition: 'all 0.3s ease',
                }}>
                  <IconComp size={26} />
                </div>

                <h3 style={{
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  color: '#001D23',
                  marginBottom: '4px',
                  lineHeight: 1.2,
                  fontFamily: 'var(--font-heading)',
                }}>
                  {srv.title}
                </h3>

                <p style={{
                  fontSize: '0.74rem',
                  color: '#6c757d',
                  lineHeight: 1.4,
                }}>
                  {srv.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
