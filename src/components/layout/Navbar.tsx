'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useLanguage } from '@/context/LanguageContext';
import { toMarathiDigits } from '@/lib/marathiNumbers';

interface NavbarProps {
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Strip hash from address bar on initial load
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 20);

      const sections = ['about', 'fleet', 'services', 'reviews', 'contact'];
      const headerOffset = 110;

      if (scrollY < 120) {
        setActiveSection('');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY - headerOffset;
          if (scrollY >= top - 30) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav_about, id: 'about' },
    { name: t.nav_fleet, id: 'fleet' },
    { name: t.nav_services, id: 'services' },
    { name: t.nav_reviews, id: 'reviews' },
    { name: t.nav_contact, id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
      setActiveSection(cleanId);
    }

    // Keep address bar clean without /#home, /#fleet, etc.
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const firstLetter = (siteConfig?.name || 'G').charAt(0).toUpperCase();

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: isScrolled ? '0 4px 20px rgba(12, 35, 56, 0.08)' : 'none',
      }}>
        <div className="container-custom" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
        }}>
          {/* Dynamic Logo Sourced from siteConfig.name */}
          <button 
            type="button"
            onClick={(e) => handleNavClick(e, 'home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#0c2338',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 400,
              fontSize: '1.4rem',
              fontFamily: 'var(--font-heading)',
              boxShadow: '0 2px 6px rgba(12, 35, 56, 0.2)',
            }}>
              {firstLetter}
            </div>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: 'normal',
              fontFamily: 'var(--font-heading)',
              color: '#0c2338',
              letterSpacing: '0.3px',
              lineHeight: 1,
            }}>
              {siteConfig.name}
            </div>
          </button>

          {/* Center Nav Links with Scrollspy Active Highlight */}
          <nav style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px',
          }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  type="button"
                  key={link.id}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: isActive ? '600' : 'normal',
                    color: isActive ? '#f97316' : '#334155',
                    position: 'relative',
                    padding: '8px 0',
                    background: 'transparent',
                    border: 'none',
                    letterSpacing: '0.3px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#f97316')}
                  onMouseOut={(e) => (e.currentTarget.style.color = isActive ? '#f97316' : '#334155')}
                >
                  {link.name}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '2.5px',
                      backgroundColor: '#f97316',
                      borderRadius: '2px',
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster: Language Switcher + Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language Switcher Pill (EN | मराठी) */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              borderRadius: '9999px',
              padding: '3px',
              border: '1px solid #e2e8f0',
              gap: '2px',
            }}>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  border: 'none',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.74rem',
                  fontWeight: 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: language === 'en' ? '#0c2338' : 'transparent',
                  color: language === 'en' ? '#ffffff' : '#64748b',
                }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                style={{
                  border: 'none',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.74rem',
                  fontWeight: 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: language === 'mr' ? '#0c2338' : 'transparent',
                  color: language === 'mr' ? '#ffffff' : '#64748b',
                }}
              >
                मराठी
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: 'transparent',
                color: '#0f172a',
                cursor: 'pointer',
              }}
              className="mobile-hamburger"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(12, 35, 56, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <div style={{
            width: '80%',
            maxWidth: '320px',
            height: '100%',
            backgroundColor: '#ffffff',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderLeft: '1px solid #e2e8f0',
            overflowY: 'auto',
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <span style={{ fontWeight: 'normal', fontSize: '1.3rem', color: '#0c2338', fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
                  {siteConfig.name}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    border: 'none',
                    background: '#f1f5f9',
                    borderRadius: '8px',
                    width: '34px',
                    height: '34px',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Drawer Language Switcher */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                padding: '4px',
                marginBottom: '16px',
                gap: '6px',
              }}>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  style={{
                    flex: 1,
                    border: 'none',
                    padding: '8px 0',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 'normal',
                    cursor: 'pointer',
                    backgroundColor: language === 'en' ? '#0c2338' : 'transparent',
                    color: language === 'en' ? '#ffffff' : '#64748b',
                    transition: 'all 0.2s',
                  }}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('mr')}
                  style={{
                    flex: 1,
                    border: 'none',
                    padding: '8px 0',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 'normal',
                    cursor: 'pointer',
                    backgroundColor: language === 'mr' ? '#0c2338' : 'transparent',
                    color: language === 'mr' ? '#ffffff' : '#64748b',
                    transition: 'all 0.2s',
                  }}
                >
                  मराठी
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      type="button"
                      key={link.id}
                      onClick={(e) => handleNavClick(e, link.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        fontWeight: isActive ? '600' : 'normal',
                        backgroundColor: isActive ? '#f0f7fc' : 'transparent',
                        color: isActive ? '#f97316' : '#334155',
                        fontSize: '0.95rem',
                        textAlign: 'left',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{link.name}</span>
                      {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f97316' }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
