'use client';

import React from 'react';
import { 
  Sparkles, 
  UserCheck, 
  Clock, 
  Tag, 
  Headphones 
} from 'lucide-react';

export const WhyChooseRideway: React.FC = () => {
  const features = [
    {
      title: 'Clean & Comfortable',
      desc: 'Well maintained vehicles',
      icon: Sparkles,
    },
    {
      title: 'Experienced Drivers',
      desc: 'Polite, verified & experienced',
      icon: UserCheck,
    },
    {
      title: 'On-Time Pickup',
      desc: 'We value your time',
      icon: Clock,
    },
    {
      title: 'Transparent Pricing',
      desc: 'No hidden charges, no surprises',
      icon: Tag,
    },
    {
      title: '24/7 Support',
      desc: 'We are always here to help',
      icon: Headphones,
    },
  ];

  return (
    <section id="about" style={{ backgroundColor: '#ffffff', padding: '50px 0 65px 0' }}>
      <div className="container-custom">
        <h2 style={{
          fontSize: '1.85rem',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '28px',
          fontFamily: 'var(--font-heading)',
        }}>
          Why Choose Rideway?
        </h2>

        {/* 5 Horizontal Light Green Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '16px',
        }}>
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#f2f9f5',
                  border: '1px solid #d4e8dd',
                  borderRadius: '14px',
                  padding: '20px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s ease',
                }}
                className="card-hover-lift"
              >
                {/* Green Circle Icon */}
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#ebf5f0',
                  border: '1px solid #c2e2d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1b4332',
                  flexShrink: 0,
                }}>
                  <IconComp size={20} />
                </div>

                <div>
                  <h3 style={{
                    fontSize: '0.94rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: '3px',
                    lineHeight: 1.2,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.74rem',
                    color: '#64748b',
                    margin: 0,
                    lineHeight: 1.35,
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
