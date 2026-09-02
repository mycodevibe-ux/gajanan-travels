'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

interface NavbarProps {
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'fleet', 'services', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'FLEET', href: '#fleet', id: 'fleet' },
    { name: 'SERVICES', href: '#services', id: 'services' },
    { name: 'REVIEWS', href: '#reviews', id: 'reviews' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
    }
  };

  const firstLetter = (siteConfig?.name || 'R').charAt(0).toUpperCase();

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
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
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
          </a>

          {/* Center Nav Links */}
          <nav style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px',
          }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 'normal',
                    color: isActive ? '#f97316' : '#334155',
                    position: 'relative',
                    padding: '8px 0',
                    textDecoration: 'none',
                    letterSpacing: '0.3px',
                    transition: 'color 0.2s ease',
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
                      height: '2px',
                      backgroundColor: '#f97316',
                      borderRadius: '2px',
                    }} />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Phone Pill + Orange Book Now Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a 
              href={`tel:${siteConfig.phone}`}
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                color: '#0c2338',
                fontSize: '0.86rem',
                fontWeight: 'normal',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                padding: '7px 16px',
                borderRadius: '9999px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              className="desktop-phone"
              onMouseOver={(e) => (e.currentTarget.style.borderColor = '#f97316')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
            >
              <Phone size={13} color="#f97316" />
              <span>{siteConfig.phone}</span>
            </a>

            {/* Vibrant Orange Book Now Button */}
            <button
              onClick={onOpenBookingModal}
              className="btn btn-orange"
              style={{
                padding: '9px 20px',
                fontSize: '0.84rem',
                fontWeight: 'normal',
                letterSpacing: '0.3px',
                borderRadius: '8px',
              }}
            >
              <span>BOOK NOW</span>
            </button>

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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        fontWeight: 'normal',
                        backgroundColor: isActive ? '#f0f7fc' : 'transparent',
                        color: isActive ? '#f97316' : '#334155',
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                      }}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>

            <div style={{ paddingTop: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn btn-outline-navy"
                style={{ width: '100%', padding: '10px' }}
              >
                <Phone size={15} color="#f97316" />
                <span>{siteConfig.phone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenBookingModal) onOpenBookingModal();
                }}
                className="btn btn-orange"
                style={{ width: '100%', padding: '10px' }}
              >
                <span>BOOK NOW</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
