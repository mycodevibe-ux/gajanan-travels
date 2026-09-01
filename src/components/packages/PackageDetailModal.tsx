'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Hotel, 
  Car, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  CalendarCheck, 
  ChevronDown, 
  ChevronUp, 
  Utensils, 
  Bed
} from 'lucide-react';
import { TourPackage } from '@/types';
import { createPackageInquiryUrl } from '@/lib/whatsapp';

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  onClose,
  onBookPackage,
}) => {
  const [activeDay, setActiveDay] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (pkg) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pkg, onClose]);

  if (!pkg) return null;

  const handleWhatsApp = () => {
    const duration = `${pkg.durationDays}D / ${pkg.durationNights}N`;
    const url = createPackageInquiryUrl(pkg.title, duration, pkg.pricePerPerson);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px' }}
      >
        {/* Top Image Banner */}
        <div style={{
          position: 'relative',
          height: '260px',
          width: '100%',
          backgroundColor: '#0f172a',
        }}>
          <img
            src={pkg.image}
            alt={pkg.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
          }} />

          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              border: 'none',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(4px)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <X size={20} />
          </button>

          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: '22px',
            right: '22px',
            color: '#ffffff',
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: '#1b4332',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.76rem',
                fontWeight: 700,
              }}>
                {pkg.category} Tour
              </span>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.76rem',
                fontWeight: 700,
              }}>
                {pkg.durationDays} Days / {pkg.durationNights} Nights
              </span>
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, fontFamily: 'var(--font-heading)' }}>
              {pkg.title}
            </h2>
            <div style={{ fontSize: '0.84rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <MapPin size={14} color="#52b788" />
              <span>{pkg.destination}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {/* Quick Specs Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
            backgroundColor: '#ebf5f0',
            border: '1px solid #c2e2d0',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Hotel size={20} color="#1b4332" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Stay Category</div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>{pkg.hotelTier}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Car size={20} color="#1b4332" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Vehicle Included</div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>{pkg.vehicleIncluded}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={20} color="#1b4332" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Duration</div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>{pkg.durationDays}D / {pkg.durationNights}N</div>
              </div>
            </div>
          </div>

          {/* Day-by-Day Itinerary Accordion */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
              Day-wise Itinerary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pkg.itinerary.map((dayItem) => {
                const isExpanded = activeDay === dayItem.day;
                return (
                  <div
                    key={dayItem.day}
                    style={{
                      border: isExpanded ? '1.5px solid #1b4332' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDay(isExpanded ? 0 : dayItem.day)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: isExpanded ? '#ebf5f0' : '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          backgroundColor: isExpanded ? '#1b4332' : '#f1f5f9',
                          color: isExpanded ? '#ffffff' : '#0f172a',
                          width: '30px',
                          height: '30px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.82rem',
                          flexShrink: 0,
                        }}>
                          D{dayItem.day}
                        </span>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                          {dayItem.title}
                        </div>
                      </div>

                      {isExpanded ? <ChevronUp size={17} color="#1b4332" /> : <ChevronDown size={17} color="#64748b" />}
                    </button>

                    {isExpanded && (
                      <div style={{ padding: '14px 16px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
                        <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.55, marginBottom: '12px' }}>
                          {dayItem.description}
                        </p>

                        <div style={{ marginBottom: '12px' }}>
                          <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                            Activities:
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            {dayItem.activities.map((act, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#334155' }}>
                                <span style={{ color: '#1b4332' }}>•</span>
                                <span>{act}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          gap: '16px',
                          paddingTop: '10px',
                          borderTop: '1px dashed #e2e8f0',
                          fontSize: '0.78rem',
                          color: '#64748b',
                        }}>
                          <div>Meal: <strong>{dayItem.mealPlan}</strong></div>
                          <div>Stay: <strong>{dayItem.stay}</strong></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}>
            <div style={{
              backgroundColor: '#ebf5f0',
              border: '1px solid #c2e2d0',
              borderRadius: '12px',
              padding: '16px',
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1b4332', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#1b4332" />
                <span>Included</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {pkg.inclusions.map((inc, idx) => (
                  <div key={idx} style={{ fontSize: '0.8rem', color: '#1b4332', display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                    <span>✓</span>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '12px',
              padding: '16px',
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#9f1239', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <XCircle size={16} color="#e11d48" />
                <span>Not Included</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {pkg.exclusions.map((exc, idx) => (
                  <div key={idx} style={{ fontSize: '0.8rem', color: '#be123c', display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                    <span>✗</span>
                    <span>{exc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '18px',
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Special Package Rate</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                  ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ₹{pkg.originalPrice.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.76rem', color: '#64748b' }}>/ person</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleWhatsApp}
                className="btn btn-whatsapp"
                style={{ padding: '10px 18px' }}
              >
                <MessageCircle size={17} />
                <span>WhatsApp Inquiry</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookPackage(pkg);
                }}
                className="btn btn-forest"
                style={{ padding: '10px 18px' }}
              >
                <CalendarCheck size={17} />
                <span>Book Package</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
