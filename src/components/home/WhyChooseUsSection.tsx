'use client';

import React from 'react';
import { 
  Sparkles, 
  UserCheck, 
  Clock, 
  ReceiptText, 
  Headphones 
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const WhyChooseUsSection: React.FC = () => {
  const highlights = [
    {
      id: 'clean-vehicles',
      title: 'Clean vehicles',
      icon: Sparkles,
    },
    {
      id: 'experienced-drivers',
      title: 'Experienced drivers',
      icon: UserCheck,
    },
    {
      id: 'on-time-pickup',
      title: 'On-time pickup',
      icon: Clock,
    },
    {
      id: 'transparent-pricing',
      title: 'Transparent pricing',
      icon: ReceiptText,
    },
    {
      id: '24-7-support',
      title: '24/7 support',
      icon: Headphones,
    },
  ];

  return (
    <section id="why-us" style={{
      backgroundColor: '#0c2338',
      padding: '65px 0 60px 0',
      color: '#ffffff',
    }}>
      <div className="container-custom">
        {/* Section Title matching mockup with dynamic brand name */}
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 'normal',
          color: '#ffffff',
          fontFamily: 'var(--font-heading)',
          textAlign: 'center',
          marginBottom: '38px',
          letterSpacing: '0.3px',
        }}>
          Why choose {siteConfig.name}
        </h2>

        {/* 5 Circular Badges Strip matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '20px',
          textAlign: 'center',
        }}>
          {highlights.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                {/* White Circular Icon Container */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  color: '#0c2338',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <IconComp size={24} color="#0c2338" />
                </div>

                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: 'normal',
                  color: '#ffffff',
                }}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
