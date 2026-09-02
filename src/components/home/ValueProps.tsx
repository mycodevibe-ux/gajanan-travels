import React from 'react';
import { ShieldCheck, Clock, UserCheck, Sparkles, DollarSign, Award, RefreshCw, HeartHandshake } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const values = [
    {
      icon: DollarSign,
      title: 'Best Price Guarantee',
      desc: 'No hidden taxes or surge fees. Complete transparency with itemized tolls, fuel, and chauffeur allowances.',
      color: '#2563eb',
      bgColor: '#eff6ff',
    },
    {
      icon: Clock,
      title: '24/7 Roadside Assistance',
      desc: 'Our dedicated dispatch team is available around the clock to support you during any point of your journey.',
      color: '#10b981',
      bgColor: '#ecfdf5',
    },
    {
      icon: UserCheck,
      title: 'Verified Expert Chauffeurs',
      desc: 'Uniformed, background-checked, polite drivers skilled in highway driving, hill navigation and tour guidance.',
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
    {
      icon: Sparkles,
      title: 'Sanitized & GPS Fleet',
      desc: 'Every vehicle undergoes interior steam sanitization, multi-point maintenance checks, and features live GPS tracking.',
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container-custom">
        <div className="section-header">
          <div className="section-tag">
            <Award size={14} />
            <span>Why Choose Drivewise</span>
          </div>
          <h2 className="section-title">
            We Are The Most Trusted Car Rental Partner
          </h2>
          <p className="section-subtitle">
            Drivewise delivers unbeatable value with spotless premium cars, experienced polite chauffeurs, and upfront guaranteed rates.
          </p>
        </div>

        <div className="grid-4">
          {values.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="card-glass card-hover-lift"
                style={{
                  padding: '32px 24px',
                  borderRadius: '24px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: item.bgColor,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: `0 4px 14px ${item.bgColor}`,
                }}>
                  <IconComp size={28} />
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 'normal', color: '#0f172a', marginBottom: '10px', fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
