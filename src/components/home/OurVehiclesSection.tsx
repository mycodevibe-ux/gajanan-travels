'use client';

import React, { useState } from 'react';
import { Users, Briefcase, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Vehicle } from '@/types';
import { vehiclesData } from '@/data/vehicles';
import { getVehicleIcon } from '@/components/vehicles/VehicleIcons';
import { useLanguage } from '@/context/LanguageContext';
import { toMarathiDigits } from '@/lib/marathiNumbers';

interface OurVehiclesSectionProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const OurVehiclesSection: React.FC<OurVehiclesSectionProps> = ({ onSelectVehicle }) => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'cars' | 'tempo_bus'>('all');

  const filteredVehicles = vehiclesData.filter((v) => {
    if (filter === 'cars') return v.category.includes('Sedan') || v.category.includes('SUV') || v.category.includes('MUV');
    if (filter === 'tempo_bus') return v.category.includes('Tempo') || v.category.includes('Bus') || v.category.includes('Van');
    return true;
  });

  const vehicleTaglinesMr: Record<string, string> = {
    'swift-dzire': 'लहान कुटुंबासाठी आरामदायी व किफायतशीर एसी सेडान.',
    'ertiga': '६-७ व्यक्तींसाठी प्रशस्त, आरामदायी आणि भरपूर जागेसह दर्जेदार गाडी.',
    'innova-crysta': 'लांबच्या आऊटस्टेशन व कौटुंबिक प्रवासासाठी सर्वोत्तम लक्झरी गाडी.',
    'tempo-17-seater-nonac': 'ग्रुप व तीर्थक्षेत्र सहलींसाठी १७ सीटर किफायतशीर नॉन-एसी टेम्पो ट्रॅव्हलर.',
    'tempo-17-seater-ac': 'आरामदायी ग्रुप प्रवासासाठी १७ सीटर लक्झरी एसी टेम्पो ट्रॅव्हलर.',
    'bus-20-seater-nonac': 'कौटुंबिक कार्यक्रम व ग्रुप सहलींसाठी २० सीटर नॉन-एसी टूरिस्ट बस.',
    'bus-20-seater-ac': 'लग्नकार्ये व कॉर्पोरेट टूरसाठी २० सीटर लक्झरी एसी कोच.',
    'bus-32-seater-nonac': 'मोठ्या ग्रुप सहली व विवाह सोहळ्यांसाठी ३२ सीटर टूरिस्ट बस.',
    'bus-40-seater-nonac': 'मोठ्या ग्रुप व तीर्थयात्रांसाठी ४० सीटर हेवी ड्युटी टूरिस्ट कोच.',
  };

  return (
    <section id="fleet" style={{ backgroundColor: '#ffffff', padding: '80px 0 70px 0' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ebf5f0',
              color: '#1b4332',
              fontSize: '0.8rem',
              fontWeight: 'normal',
              padding: '4px 12px',
              borderRadius: '9999px',
              marginBottom: '10px',
            }}>
              <span>{t.fleet_tag}</span>
            </div>
            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: 'normal',
              color: '#0c2338',
              fontFamily: 'var(--font-heading)',
              marginBottom: '6px',
              letterSpacing: '0.3px',
            }}>
              {t.fleet_title}
            </h2>
            <p style={{
              fontSize: '0.96rem',
              color: '#64748b',
              margin: 0,
              maxWidth: '650px',
            }}>
              {t.fleet_subtitle}
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '10px',
            gap: '4px',
          }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                border: 'none',
                padding: '6px 14px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 'normal',
                backgroundColor: filter === 'all' ? '#1b4332' : 'transparent',
                color: filter === 'all' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.fleet_tab_all}
            </button>
            <button
              onClick={() => setFilter('cars')}
              style={{
                border: 'none',
                padding: '6px 14px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 'normal',
                backgroundColor: filter === 'cars' ? '#1b4332' : 'transparent',
                color: filter === 'cars' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.fleet_tab_sedan} & {t.fleet_tab_suv}
            </button>
            <button
              onClick={() => setFilter('tempo_bus')}
              style={{
                border: 'none',
                padding: '6px 14px',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 'normal',
                backgroundColor: filter === 'tempo_bus' ? '#1b4332' : 'transparent',
                color: filter === 'tempo_bus' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.fleet_tab_tempo} & {t.fleet_tab_bus}
            </button>
          </div>
        </div>

        {/* Fleet Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 16px rgba(12, 35, 56, 0.04)',
                position: 'relative',
              }}
              className="card-hover-lift"
            >
              {/* Category & Status Pill Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
              }}>
                <span style={{
                  backgroundColor: '#f1f5f9',
                  color: '#0c2338',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 'normal',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.3px',
                }}>
                  {vehicle.category}
                </span>

                <span style={{
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}>
                  <Sparkles size={11} />
                  <span>Sanitized</span>
                </span>
              </div>

              {/* Transparent Vehicle Studio Cutout */}
              <div style={{
                width: '100%',
                height: '150px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                padding: '4px',
              }}>
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 12px 18px rgba(12, 35, 56, 0.16))',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="vehicle-img-hover"
                />
              </div>

              {/* Vehicle Title & Rate */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '4px',
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'normal',
                  color: '#0c2338',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.3px',
                  lineHeight: 1.1,
                  margin: 0,
                }}>
                  {vehicle.name}
                </h3>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '1.15rem',
                    fontWeight: 'normal',
                    fontFamily: 'var(--font-heading)',
                    color: '#f97316',
                    lineHeight: 1,
                  }}>
                    ₹{language === 'mr' ? toMarathiDigits(vehicle.pricePerKm) : vehicle.pricePerKm}<span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#64748b' }}>{t.fleet_per_km}</span>
                  </div>
                </div>
              </div>

              {/* 300 KM / Day Package Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#ebf5f0',
                border: '1px solid #c2e2d0',
                color: '#1b4332',
                fontSize: '0.74rem',
                fontWeight: 'normal',
                padding: '3px 8px',
                borderRadius: '6px',
                marginBottom: '8px',
                alignSelf: 'flex-start',
              }}>
                <span>🏷️</span>
                <span>
                  {language === 'mr' 
                    ? `किमान ३०० किमी/दिवस पॅकेज: ₹${toMarathiDigits(vehicle.baseFarePerDay.toLocaleString('en-IN'))}` 
                    : `Min. 300 KM/Day Package: ₹${vehicle.baseFarePerDay.toLocaleString('en-IN')}`}
                </span>
              </div>

              {/* Tagline */}
              <p style={{
                fontSize: '0.78rem',
                color: '#64748b',
                lineHeight: 1.4,
                marginBottom: '10px',
                minHeight: '32px',
              }}>
                {language === 'mr' ? (vehicleTaglinesMr[vehicle.id] || vehicle.tagline) : vehicle.tagline}
              </p>

              {/* Specs Badges */}
              <div style={{
                display: 'flex',
                gap: '8px',
                fontSize: '0.8rem',
                color: '#334155',
                marginBottom: '16px',
                backgroundColor: '#f8fafc',
                padding: '7px 12px',
                borderRadius: '8px',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 'normal' }}>
                  <Users size={14} color="#1b4332" />
                  <span>{language === 'mr' ? toMarathiDigits(vehicle.passengerCapacity) : vehicle.passengerCapacity} {t.fleet_seating}</span>
                </span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 'normal', color: '#1b4332' }}>
                  <Sparkles size={14} color="#1b4332" />
                  <span>
                    {vehicle.ac 
                      ? (language === 'mr' ? 'एसी (AC)' : 'AC') 
                      : (language === 'mr' ? 'नॉन-एसी (Non-AC)' : 'Non-AC')}
                  </span>
                </span>
              </div>

              {/* Book now Button */}
              <button
                onClick={() => onSelectVehicle(vehicle)}
                className="btn btn-forest"
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  fontSize: '0.88rem',
                  fontWeight: 'normal',
                  borderRadius: '8px',
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>{t.fleet_btn_book}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
