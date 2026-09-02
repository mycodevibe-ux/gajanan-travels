'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Car, 
  UserCheck, 
  Phone,
  Tag,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles
} from 'lucide-react';
import { TripType, BookingFormData } from '@/types';
import { siteConfig } from '@/data/siteConfig';
import { useLanguage } from '@/context/LanguageContext';

interface HeroSectionProps {
  onOpenBookingModal: (tripType?: TripType, vehicleId?: string, initialData?: Partial<BookingFormData>) => void;
}

const tripSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85',
    destination: 'Mahabaleshwar & Panchgani',
    distance: '120 KM from Pune',
    tag: 'Scenic Hillstation Roadtrip',
    title: 'Misty Ghats & Strawberry Valleys',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=85',
    destination: 'Goa Coastal Highway',
    distance: '440 KM from Pune',
    tag: 'Beach & Coastal Tour',
    title: 'Smooth Ocean Highway & Palm Drives',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=85',
    destination: 'Lonavala & Khandala Ghats',
    distance: '65 KM from Pune',
    tag: 'Monsoon Express Getaway',
    title: 'Lush Green Hills & Fort Trails',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85',
    destination: 'Shirdi Sai Darshan Route',
    distance: '185 KM from Pune',
    tag: 'Spiritual Temple Pilgrimage',
    title: 'Comfortable AC Family Darshan Trip',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=85',
    destination: 'Maharashtra Outstation Network',
    distance: '24/7 Verified Cabs',
    tag: 'Executive Chauffeur Drive',
    title: 'Sanitized Cabs & Road-Tested Drivers',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBookingModal }) => {
  const { t } = useLanguage();
  const [pickupLocation, setPickupLocation] = useState('Pune');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [dropDate, setDropDate] = useState(
    new Date(Date.now() + 172800000).toISOString().split('T')[0]
  );
  const [passengers, setPassengers] = useState('1-4');
  const [vehicleType, setVehicleType] = useState('Sedan');

  // Hero Trip Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tripSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + tripSlides.length) % tripSlides.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % tripSlides.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleMapping: Record<string, string> = {
      'Sedan': 'swift-dzire',
      'SUV (Ertiga)': 'ertiga',
      'Luxury SUV (Innova)': 'innova-crysta',
      'Tempo (17 Seater)': 'tata-17-seater',
      'Bus (20 Seater)': 'tata-20-seater',
      'Luxury Van (Urbania)': 'urbania',
    };

    const numPassengers = passengers === '1-4' ? 4 : passengers === '5-7' ? 7 : passengers === '8-17' ? 17 : 20;

    onOpenBookingModal('outstation_roundtrip', vehicleMapping[vehicleType] || 'swift-dzire', {
      pickupCity: pickupLocation || 'Pune',
      dropCity: dropLocation || 'Mahabaleshwar',
      pickupDate: pickupDate,
      returnDate: dropDate,
      passengers: numPassengers,
    });
  };

  return (
    <div style={{
      backgroundColor: '#f0f7fc',
      padding: '50px 0 45px 0',
      position: 'relative',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Top Hero Visual Row matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'center',
          marginBottom: '38px',
        }}>
          {/* Left Text Block */}
          <div>
            <h1 style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
              fontWeight: 'normal',
              lineHeight: 1.05,
              color: '#0c2338',
              letterSpacing: '0.3px',
              marginBottom: '18px',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
            }}>
              {t.hero_title_1}<br />
              <span style={{ color: '#f97316' }}>{t.hero_title_2}</span>
            </h1>

            <p style={{
              fontSize: '1rem',
              color: '#475569',
              lineHeight: 1.65,
              marginBottom: '26px',
              maxWidth: '520px',
            }}>
              {t.hero_subtitle}
            </p>

            {/* 2 Buttons: Orange + Green */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <button
                onClick={() => onOpenBookingModal('outstation_roundtrip')}
                className="btn btn-orange"
                style={{ padding: '12px 26px', fontSize: '0.94rem', fontWeight: 'normal' }}
              >
                <span>{t.hero_btn_book}</span>
              </button>

              <a
                href={`tel:${siteConfig.phone}`}
                className="btn btn-green"
                style={{ padding: '12px 24px', fontSize: '0.94rem', fontWeight: 'normal', textDecoration: 'none' }}
              >
                <Phone size={16} />
                <span>{siteConfig.phone}</span>
              </a>
            </div>

            {/* 3 Feature Pill Badges matching mockup */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="hero-pill-badge">
                <Car size={15} color="#f97316" />
                <span>{t.hero_pill_clean}</span>
              </div>

              <div className="hero-pill-badge">
                <UserCheck size={15} color="#f97316" />
                <span>{t.hero_pill_drivers}</span>
              </div>

              <div className="hero-pill-badge">
                <Tag size={15} color="#f97316" />
                <span>{t.hero_pill_inclusive}</span>
              </div>
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
                height: '350px',
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
                  <span>500+ Happy Trips</span>
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

        {/* "Plan your ride" Search Bar Card with Drop date and full width balanced layout */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px 28px',
          boxShadow: '0 8px 30px rgba(12, 35, 56, 0.08)',
          width: '100%',
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'normal',
            color: '#0c2338',
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '0.3px',
          }}>
            {t.search_title}
          </h2>

          <form onSubmit={handleSearchSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr) 115px',
              gap: '14px',
              alignItems: 'flex-end',
              width: '100%',
            }} className="plan-ride-grid">
              {/* 1. Pickup location */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 'normal', marginBottom: '5px' }}>
                  {t.search_pickup}
                </label>
                <input
                  type="text"
                  placeholder={t.search_pickup_placeholder}
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    fontWeight: 'normal',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
              </div>

              {/* 2. Drop location */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 'normal', marginBottom: '5px' }}>
                  {t.search_drop}
                </label>
                <input
                  type="text"
                  placeholder={t.search_drop_placeholder}
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    fontWeight: 'normal',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
              </div>

              {/* 3. Pickup date */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 'normal', marginBottom: '5px' }}>
                  {t.search_pickup_date}
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    fontWeight: 'normal',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
              </div>

              {/* 4. Drop date (NEW) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 'normal', marginBottom: '5px' }}>
                  {t.search_drop_date}
                </label>
                <input
                  type="date"
                  value={dropDate}
                  min={pickupDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDropDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    fontWeight: 'normal',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
              </div>

              {/* 5. Passengers */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 'normal', marginBottom: '5px' }}>
                  {t.search_passengers}
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    fontWeight: 'normal',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                    cursor: 'pointer',
                  }}
                >
                  <option value="1-4">1-4</option>
                  <option value="5-7">5-7</option>
                  <option value="8-17">8-17</option>
                  <option value="18-20+">18-20+</option>
                </select>
              </div>

              {/* 6. Vehicle type */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 'normal', marginBottom: '5px' }}>
                  {t.search_vehicle_type}
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    fontWeight: 'normal',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                    cursor: 'pointer',
                  }}
                >
                  <option value="Sedan">Sedan (Dzire)</option>
                  <option value="SUV (Ertiga)">SUV (Ertiga)</option>
                  <option value="Luxury SUV (Innova)">Luxury SUV (Innova)</option>
                  <option value="Tempo (17 Seater)">Tempo (17 Seater)</option>
                  <option value="Bus (20 Seater)">Bus (20 Seater)</option>
                  <option value="Luxury Van (Urbania)">Luxury Van (Urbania)</option>
                </select>
              </div>

              {/* 7. Orange Search Button */}
              <div>
                <button
                  type="submit"
                  className="btn btn-orange"
                  style={{
                    width: '100%',
                    height: '42px',
                    fontSize: '0.92rem',
                    fontWeight: 'normal',
                    borderRadius: '8px',
                  }}
                >
                  <Search size={15} />
                  <span>{t.search_btn}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
