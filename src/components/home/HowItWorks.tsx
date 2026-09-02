import React from 'react';
import { MapPin, Calendar, KeyRound, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: MapPin,
      title: 'Choose Location',
      desc: 'Select your pickup city, destination, airport terminal or doorstep address.',
      color: '#2563eb',
      bgColor: '#eff6ff',
    },
    {
      number: '02',
      icon: Calendar,
      title: 'Pick-Up Date & Car',
      desc: 'Pick your travel dates and choose from economy sedans to 7-seater luxury SUVs.',
      color: '#10b981',
      bgColor: '#ecfdf5',
    },
    {
      number: '03',
      icon: KeyRound,
      title: 'Book & Hit The Road',
      desc: 'Get instant WhatsApp confirmation and spotless sanitized vehicle at your door.',
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container-custom">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>How It Works</span>
          </div>
          <h2 className="section-title">
            Rent A Car In 3 Easy Steps
          </h2>
          <p className="section-subtitle">
            Experience effortless booking with Drivewise. Choose your ride, customize your itinerary, and get rolling in minutes.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          position: 'relative',
        }}>
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="card-glass card-hover-lift"
                style={{
                  padding: '36px 28px',
                  borderRadius: '24px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  position: 'relative',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Step Number Watermark */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  right: '24px',
                  fontSize: '2.4rem',
                  fontWeight: 'normal',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.3px',
                  color: '#f1f5f9',
                  lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {step.number}
                </div>

                {/* Icon */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  backgroundColor: step.bgColor,
                  color: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: `0 8px 20px ${step.bgColor}`,
                }}>
                  <IconComp size={32} />
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 'normal', color: '#0f172a', marginBottom: '10px', fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
