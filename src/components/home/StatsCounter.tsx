import React from 'react';
import { Users, Car, MapPin, Award, Star } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const StatsCounter: React.FC = () => {
  const stats = [
    { label: 'Happy Tourists Served', value: '50,000+', icon: Users, color: '#34d399' },
    { label: 'Luxury & Commercial Fleet', value: '250+', icon: Car, color: '#f59e0b' },
    { label: 'Popular Intercity Routes', value: '120+', icon: MapPin, color: '#38bdf8' },
    { label: 'Years of Excellence', value: '12+', icon: Award, color: '#a78bfa' },
  ];

  return (
    <section style={{
      backgroundColor: '#090e17',
      color: '#ffffff',
      padding: '60px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          textAlign: 'center',
        }}>
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                  marginBottom: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <IconComp size={28} />
                </div>

                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: 'normal',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.3px',
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '6px',
                }}>
                  {stat.value}
                </div>

                <div style={{ fontSize: '0.88rem', color: '#94a3b8', fontWeight: 'normal' }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
