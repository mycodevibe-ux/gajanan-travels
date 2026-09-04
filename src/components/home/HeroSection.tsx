'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TripType, BookingFormData } from '@/types';
import { siteConfig } from '@/data/siteConfig';
import { useLanguage } from '@/context/LanguageContext';

interface HeroSectionProps {
  onOpenBookingModal: (tripType?: TripType, vehicleId?: string, initialData?: Partial<BookingFormData>) => void;
}

const tripSlidesEn = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=85',
    destination: 'Mahabaleshwar & Panchgani',
    distance: '120 KM from Pune',
    tag: 'Scenic Hillstation Roadtrip',
    title: 'Misty Ghats & Strawberry Valleys',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
    destination: 'Goa Coastal Highway',
    distance: '440 KM from Pune',
    tag: 'Beach & Coastal Tour',
    title: 'Smooth Ocean Highway & Palm Drives',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    destination: 'Lonavala & Khandala Ghats',
    distance: '65 KM from Pune',
    tag: 'Monsoon Express Getaway',
    title: 'Lush Green Hills & Fort Trails',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85',
    destination: 'Shirdi Sai Darshan Route',
    distance: '185 KM from Pune',
    tag: 'Spiritual Temple Pilgrimage',
    title: 'Comfortable AC Family Darshan Trip',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    destination: 'Konkan & Ganpatipule Coast',
    distance: '320 KM from Pune',
    tag: 'Coastal Beach Getaway',
    title: 'Pristine Beaches & Coconut Groves',
  },
];

const tripSlidesMr = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=85',
    destination: 'महाबळेश्वर व पाचगणी',
    distance: 'पुण्यापासून १२० किमी',
    tag: 'निसर्गरम्य थंड हवेचे ठिकाण',
    title: 'धुके, हिरवेगार घाट आणि निसर्ग सफर',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
    destination: 'गोवा सागरी महामार्ग',
    distance: 'पुण्यापासून ४४० किमी',
    tag: 'समुद्रकिनारा व निसर्ग सफर',
    title: 'सुखद सागरी प्रवास आणि निसर्ग सौंदर्य',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    destination: 'लोणावळा व खंडाळा घाट',
    distance: 'पुण्यापासून ६५ किमी',
    tag: 'पावसाळी वीकेंड सहल',
    title: 'हिरवेगार डोंगर, धबधबे आणि किल्ले',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85',
    destination: 'शिर्डी साई दर्शन मार्ग',
    distance: 'पुण्यापासून १८५ किमी',
    tag: 'पवित्र तीर्थक्षेत्र यात्रा',
    title: 'सुखकर व सुरक्षित कौटुंबिक दर्शन प्रवास',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    destination: 'कोकण व गणपतीपुळे समुद्रकिनारा',
    distance: 'पुण्यापासून ३२० किमी',
    tag: 'सागरी निसर्ग सहल',
    title: 'शांत समुद्रकिनारा आणि नारळीच्या बागा',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBookingModal }) => {
  const { language, t } = useLanguage();
  const tripSlides = language === 'mr' ? tripSlidesMr : tripSlidesEn;

  // Hero Trip Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tripSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, tripSlides.length]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + tripSlides.length) % tripSlides.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % tripSlides.length);
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '70px 0 65px 0',
      position: 'relative',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Top Hero Visual Row matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '44px',
          alignItems: 'center',
        }}>
          {/* Left Text Block */}
          <div>
            <h1 style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.4rem)',
              fontWeight: 'normal',
              lineHeight: 1.06,
              color: '#0c2338',
              letterSpacing: '0.3px',
              marginBottom: '20px',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
            }}>
              {t.hero_title_1}<br />
              <span style={{ color: '#f97316' }}>{t.hero_title_2}</span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: '#475569',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '540px',
            }}>
              {t.hero_subtitle}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => onOpenBookingModal('outstation_roundtrip')}
                className="btn btn-orange"
                style={{
                  padding: '13px 32px',
                  fontSize: '1rem',
                  fontWeight: 'normal',
                }}
              >
                <span>{t.hero_btn_book}</span>
                <ArrowRight size={17} />
              </button>

              <a
                href="#fleet"
                className="btn btn-secondary"
                style={{
                  padding: '13px 28px',
                  fontSize: '1rem',
                  fontWeight: 'normal',
                }}
              >
                <span>{language === 'mr' ? 'गाड्यांचे दर पहा' : 'View Fleet & Rates'}</span>
              </a>
            </div>
          </div>

          {/* Right Cinematic Trip Picture Slider */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="hero-slider-container"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '540px',
                height: '380px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 50px -10px rgba(12, 35, 56, 0.22)',
                border: '3px solid #ffffff',
                backgroundColor: '#0c2338',
              }}
            >
              {/* Stacked Slider Images with Smooth Cross-Fade & Ken-Burns Effect */}
              {tripSlides.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <div
                    key={slide.id}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.85s ease-in-out',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.destination}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 6s ease-out',
                      }}
                    />

                    {/* Gradient Overlay for Rich Contrast */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(12, 35, 56, 0.55) 0%, rgba(12, 35, 56, 0.05) 40%, rgba(12, 35, 56, 0.85) 100%)',
                    }} />
                  </div>
                );
              })}

              {/* Top Bar: Destination Pill Tag & Trust Stats Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 4,
                gap: '8px',
              }}>
                {/* Destination Pill */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(8px)',
                  color: '#1b4332',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.76rem',
                  fontWeight: 'normal',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                }}>
                  <MapPin size={13} color="#f97316" />
                  <span>{tripSlides[currentSlide].destination}</span>
                </div>

                {/* 500+ Trips Small Glass Badge */}
                <div style={{
                  backgroundColor: 'rgba(12, 35, 56, 0.8)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.74rem',
                  fontWeight: 'normal',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}>
                  <Sparkles size={12} color="#f97316" />
                  <span>{language === 'mr' ? '५००+ आनंदी सहली' : '500+ Happy Trips'}</span>
                </div>
              </div>

              {/* Prev / Next Slider Arrows (Appear on Hover) */}
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous Slide"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '12px',
                  transform: 'translateY(-50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(6px)',
                  border: 'none',
                  color: '#0c2338',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 5,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next Slide"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '12px',
                  transform: 'translateY(-50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(6px)',
                  border: 'none',
                  color: '#0c2338',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 5,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronRight size={18} />
              </button>

              {/* Bottom Trip Caption & Highlight Content */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '18px',
                right: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                zIndex: 4,
                gap: '12px',
              }}>
                <div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: '#f97316',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    fontWeight: 'normal',
                    marginBottom: '2px',
                  }}>
                    {tripSlides[currentSlide].tag}
                  </div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    lineHeight: 1.2,
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.3px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  }}>
                    {tripSlides[currentSlide].title}
                  </div>
                </div>

                {/* Interactive Slide Dots Indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  backdropFilter: 'blur(6px)',
                  padding: '5px 8px',
                  borderRadius: '9999px',
                }}>
                  {tripSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentSlide(i)}
                      style={{
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        width: i === currentSlide ? '20px' : '6px',
                        height: '6px',
                        borderRadius: '3px',
                        backgroundColor: i === currentSlide ? '#f97316' : 'rgba(255, 255, 255, 0.5)',
                        transition: 'all 0.3s ease',
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
