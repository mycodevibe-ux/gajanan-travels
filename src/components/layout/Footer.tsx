'use client';

import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { WhatsAppOriginalIcon } from '@/components/vehicles/VehicleIcons';
import { useLanguage } from '@/context/LanguageContext';
import { toMarathiDigits } from '@/lib/marathiNumbers';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const cleanId = targetId.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const firstLetter = (siteConfig?.name || 'G').charAt(0).toUpperCase();

  const popularRoutesEn = [
    'Pune to Mahabaleshwar',
    'Pune to Goa',
    'Pune to Shirdi',
    'Pune to Mumbai',
    'Pune Local rentals',
  ];

  const popularRoutesMr = [
    'पुणे ते महाबळेश्वर',
    'पुणे ते गोवा',
    'पुणे ते शिर्डी',
    'पुणे ते मुंबई',
    'पुणे स्थानिक भाडेतत्त्व',
  ];

  const popularRoutes = language === 'mr' ? popularRoutesMr : popularRoutesEn;

  return (
    <footer style={{
      backgroundColor: '#0c2338',
      color: '#cbd5e1',
      padding: '55px 0 24px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'relative',
    }}>
      <div className="container-custom">
        {/* 4 Columns Grid matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          paddingBottom: '36px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          {/* Col 1: Brand & Bio with Vibrant Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              {/* Vibrant Orange Brand Badge */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 400,
                fontSize: '1.35rem',
                fontFamily: 'var(--font-heading)',
                boxShadow: '0 4px 14px rgba(249, 115, 22, 0.45)',
              }}>
                {firstLetter}
              </div>

              {/* Brand Name */}
              <span style={{
                fontSize: '1.75rem',
                fontWeight: 'normal',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.3px',
                lineHeight: 1,
              }}>
                {siteConfig.name}
              </span>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '18px' }}>
              {t.footer_tagline}
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 'normal',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                {language === 'mr' ? '२४/७ अखंड सेवा' : '24/7 Service'}
              </span>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 'normal',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                {language === 'mr' ? 'तपासलेला सुरक्षित ताफा' : 'Verified Fleet'}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 style={{ fontSize: '0.94rem', fontWeight: 'normal', color: '#ffffff', marginBottom: '14px', letterSpacing: '0.3px', fontFamily: 'var(--font-heading)' }}>
              {t.footer_quick_links}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
              {[
                { name: t.nav_about, id: 'about' },
                { name: t.nav_fleet, id: 'fleet' },
                { name: t.nav_services, id: 'services' },
                { name: t.nav_reviews, id: 'reviews' },
                { name: t.nav_contact, id: 'contact' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#f97316')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Popular Routes */}
          <div>
            <h3 style={{ fontSize: '0.94rem', fontWeight: 'normal', color: '#ffffff', marginBottom: '14px', letterSpacing: '0.3px', fontFamily: 'var(--font-heading)' }}>
              {language === 'mr' ? 'लोकप्रिय पर्यटन मार्ग' : 'Popular routes'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
              {popularRoutes.map((route) => (
                <a
                  key={route}
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, 'contact')}
                  style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#f97316')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  {route}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Contact Us + Social Icons matching EXACT screenshot */}
          <div>
            <h3 style={{ fontSize: '0.94rem', fontWeight: 'normal', color: '#ffffff', marginBottom: '14px', letterSpacing: '0.3px', fontFamily: 'var(--font-heading)' }}>
              {language === 'mr' ? 'आमच्याशी संपर्क' : 'Contact us'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: '#94a3b8', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="#f97316" />
                <a href={`tel:${siteConfig.phone}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>
                  {language === 'mr' ? toMarathiDigits(siteConfig.phone) : siteConfig.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="#f97316" />
                <a href={`mailto:${siteConfig.email}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>
                  {siteConfig.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="#7dd3fc" />
                <span style={{ color: '#e2e8f0', fontWeight: 'normal' }}>
                  {language === 'mr' ? 'पुणे, महाराष्ट्र, भारत' : 'Pune, Maharashtra'}
                </span>
              </div>
            </div>

            {/* Circular Social Icons matching EXACT screenshot: Instagram | Facebook | WhatsApp */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {/* 1. Instagram */}
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#16344d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e486b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#16344d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="Instagram"
              >
                <Instagram size={18} color="#ffffff" />
              </a>

              {/* 2. Facebook */}
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#16344d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e486b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#16344d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="Facebook"
              >
                <Facebook size={18} color="#ffffff" fill="#ffffff" />
              </a>

              {/* 3. WhatsApp */}
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#16344d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#25D366';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#16344d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="WhatsApp"
              >
                <WhatsAppOriginalIcon size={20} color="#ffffff" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright matching mockup */}
        <div style={{
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.78rem',
          color: '#64748b',
        }}>
          <div>
            {language === 'mr' ? `© २०२६ ${siteConfig.nameMr || 'गजानन ट्रॅव्हल्स'}. सर्व हक्क राखीव.` : `© 2026 ${siteConfig.name}. All rights reserved.`}
          </div>
          <div>
            {language === 'mr' ? '१००% अधिकृत व सुरक्षित टूरिस्ट सेवा' : '100% Verified & Safe Tourist Cab Service'}
          </div>
        </div>
      </div>
    </footer>
  );
};
