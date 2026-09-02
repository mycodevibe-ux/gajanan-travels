'use client';

import React from 'react';
import { ShieldCheck, Star, Clock } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useLanguage } from '@/context/LanguageContext';

export const AboutStorySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" style={{
      backgroundColor: '#f0f7fc',
      padding: '75px 0 70px 0',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '42px',
          alignItems: 'center',
        }}>
          {/* Left Story Text & Milestones */}
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 'normal',
              color: '#0c2338',
              lineHeight: 1.2,
              marginBottom: '16px',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.3px',
            }}>
              {t.about_title}
            </h2>

            <p style={{
              fontSize: '0.96rem',
              color: '#475569',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}>
              {t.about_desc}
            </p>

            {/* 3 Milestones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{
                  color: '#f97316',
                  fontWeight: 'normal',
                  fontSize: '0.94rem',
                  fontFamily: 'var(--font-heading)',
                  minWidth: '50px',
                }}>
                  2014
                </span>
                <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                  Started with 2 cars doing Mumbai-Pune expressway runs.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{
                  color: '#f97316',
                  fontWeight: 'normal',
                  fontSize: '0.94rem',
                  fontFamily: 'var(--font-heading)',
                  minWidth: '50px',
                }}>
                  2019
                </span>
                <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                  Expanded to 30+ vehicles covering all of Maharashtra & Goa.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{
                  color: '#f97316',
                  fontWeight: 'normal',
                  fontSize: '0.94rem',
                  fontFamily: 'var(--font-heading)',
                  minWidth: '50px',
                }}>
                  Today
                </span>
                <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                  500+ monthly trips, 12 years of safe accident-free commercial driving.
                </span>
              </div>
            </div>

            {/* Feature Tag Strip */}
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              fontSize: '0.84rem',
              color: '#0c2338',
              fontWeight: 'normal',
              borderTop: '1px solid #d4e3ef',
              paddingTop: '18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#f97316" />
                <span>All-commercial tourist fleet</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Star size={16} color="#f97316" fill="#f97316" />
                <span>4.8/5 on Google</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="#f97316" />
                <span>24/7 Pune-based desk</span>
              </div>
            </div>
          </div>

          {/* Right High-res Car Photo matching mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '520px',
              height: '340px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(12, 35, 56, 0.12)',
              border: '3px solid #ffffff',
              backgroundColor: '#e2e8f0',
            }}>
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
                alt="Luxury blue tourist sedan"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
