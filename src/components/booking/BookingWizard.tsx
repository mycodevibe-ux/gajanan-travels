'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  PlaneTakeoff, 
  Compass, 
  ArrowRight, 
  Clock, 
  MessageCircle,
  Phone,
  User,
  Loader2
} from 'lucide-react';
import { TripType, BookingFormData } from '@/types';
import { vehiclesData } from '@/data/vehicles';
import { getVehicleIcon, WhatsAppOriginalIcon } from '@/components/vehicles/VehicleIcons';
import { calculateEstimatedPrice } from '@/lib/pricing';
import { createWhatsAppBookingUrl } from '@/lib/whatsapp';
import { siteConfig } from '@/data/siteConfig';
import { useLanguage } from '@/context/LanguageContext';
import { toMarathiDigits, formatMarathiDate } from '@/lib/marathiNumbers';

interface BookingWizardProps {
  initialTripType?: TripType;
  initialVehicleId?: string;
  initialData?: Partial<BookingFormData>;
  onSuccessClose?: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialTripType = 'outstation_roundtrip',
  initialVehicleId,
  initialData,
  onSuccessClose,
}) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<BookingFormData>({
    tripType: initialTripType === 'tour_package' ? 'outstation_roundtrip' : initialTripType,
    pickupCity: initialData?.pickupCity || 'Pune',
    dropCity: initialData?.dropCity || 'Mahabaleshwar',
    pickupDate: initialData?.pickupDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    pickupTime: '08:00',
    returnDate: initialData?.returnDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    rentalPackageHours: '8hr80km',
    selectedVehicleId: initialData?.selectedVehicleId || initialVehicleId || vehiclesData[0].id,
    passengers: initialData?.passengers || 4,
    luggage: 2,
    fullName: '',
    phone: '',
    email: '',
    specialRequests: '',
    addOns: {
      childSeat: false,
      englishDriver: false,
      roofCarrier: false,
      petFriendly: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        selectedVehicleId: initialData.selectedVehicleId || initialVehicleId || prev.selectedVehicleId,
      }));
    } else if (initialVehicleId) {
      setFormData((prev) => ({ ...prev, selectedVehicleId: initialVehicleId }));
    }
  }, [initialData, initialVehicleId]);

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const selectedVehicle = useMemo(() => {
    return vehiclesData.find(v => v.id === formData.selectedVehicleId) || vehiclesData[0];
  }, [formData.selectedVehicleId]);

  // Real-time calculation
  const priceResult = useMemo(() => {
    return calculateEstimatedPrice(formData);
  }, [formData]);

  // Auto-switch vehicle when passenger count changes
  const handlePassengersChange = (count: number) => {
    const validCount = Math.max(1, count);
    let autoVehicleId = formData.selectedVehicleId;

    if (validCount <= 4) {
      autoVehicleId = 'swift-dzire';
    } else if (validCount <= 7) {
      autoVehicleId = 'ertiga';
    } else if (validCount <= 13) {
      autoVehicleId = 'force-urbania';
    } else if (validCount <= 17) {
      autoVehicleId = 'tata-17-seater';
    } else {
      autoVehicleId = 'tata-20-seater';
    }

    setFormData((prev) => ({
      ...prev,
      passengers: validCount,
      selectedVehicleId: autoVehicleId,
    }));
  };

  const handleTripTypeChange = (type: TripType) => {
    setFormData(prev => ({
      ...prev,
      tripType: type,
      dropCity: type === 'local_rental' ? '' : (prev.dropCity || 'Mahabaleshwar'),
    }));
  };

  const handleBookViaWhatsApp = () => {
    const url = createWhatsAppBookingUrl(
      formData,
      selectedVehicle.name,
      undefined,
      priceResult.totalEstimate
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    if (onSuccessClose) onSuccessClose();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please provide your full name and mobile number.');
      return;
    }
    const refNumber = 'RW-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refNumber);
    setIsSubmitting(true);

    try {
      // Send real email lead to mycodevibe@gmail.com
      await fetch('https://formsubmit.co/ajax/mycodevibe@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🚗 New Booking Inquiry #${refNumber} - ${formData.fullName} (${formData.phone})`,
          _captcha: 'false',
          'Reference No': refNumber,
          'Customer Name': formData.fullName,
          'Phone Number': formData.phone,
          'Customer Email': formData.email || 'N/A',
          'Trip Type': formData.tripType,
          'Pickup City': formData.pickupCity,
          'Drop City': formData.dropCity || 'Local City',
          'Selected Vehicle': selectedVehicle.name,
          'Pickup Date & Time': `${formData.pickupDate} ${formData.pickupTime}`,
          'Estimated Fare': `Rs. ${priceResult.totalEstimate}`,
          'Special Requests': formData.specialRequests || 'None',
        }),
      });
    } catch (err) {
      console.error('Email dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '24px 20px', textAlign: 'center' }}>
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#ebf5f0',
          color: '#1b4332',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
        }}>
          <CheckCircle2 size={32} color="#1b4332" />
        </div>

        <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '4px', fontWeight: 'normal', fontFamily: 'var(--font-heading)', letterSpacing: '0.3px' }}>
          Booking Inquiry Received!
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.86rem', marginBottom: '14px' }}>
          Thank you, {formData.fullName}. Ref: <span style={{ color: '#1b4332', fontWeight: 'normal' }}>{bookingRef}</span>
        </p>

        <div style={{
          maxWidth: '440px',
          margin: '0 auto 18px auto',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '12px 14px',
          fontSize: '0.82rem',
          color: '#334155',
          textAlign: 'left',
          lineHeight: 1.5,
        }}>
          <div>Route: {formData.pickupCity} → {formData.dropCity || 'Local City'}</div>
          <div>Vehicle: {selectedVehicle.name} • {formData.pickupDate} {formData.returnDate ? `to ${formData.returnDate}` : ''}</div>
          <div style={{ color: '#1b4332', fontWeight: 'normal', marginTop: '2px' }}>
            Estimated Fare: ₹{priceResult.totalEstimate.toLocaleString('en-IN')} approx.
          </div>
          <div style={{ marginTop: '6px', fontSize: '0.76rem', color: '#1b4332', fontWeight: 'normal' }}>
            ✓ Quote details dispatched to {siteConfig.email}
          </div>
        </div>

        <button
          onClick={handleBookViaWhatsApp}
          className="btn btn-whatsapp"
          style={{ padding: '10px 22px', fontSize: '0.88rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <WhatsAppOriginalIcon size={18} color="#ffffff" />
          <span>Send Quote to WhatsApp ({siteConfig.phone})</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 20px' }}>
      {/* 1-Row Compact Trip Type Selector */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '6px',
        backgroundColor: '#f8fafc',
        padding: '4px',
        borderRadius: '10px',
        marginBottom: '14px',
        border: '1px solid #e2e8f0',
      }}>
        {[
          { type: 'outstation_roundtrip', label: language === 'mr' ? 'येणे-जाणे (Roundtrip)' : 'Roundtrip', icon: Compass },
          { type: 'outstation_oneway', label: language === 'mr' ? 'वन-वे ड्रॉप' : 'One-Way', icon: ArrowRight },
          { type: 'local_rental', label: language === 'mr' ? 'स्थानिक भाडे' : 'Local Rental', icon: Clock },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = formData.tripType === tab.type;
          return (
            <button
              key={tab.type}
              type="button"
              onClick={() => handleTripTypeChange(tab.type as TripType)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '7px 4px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? '#1b4332' : 'transparent',
                color: isActive ? '#ffffff' : '#64748b',
                fontWeight: 'normal',
                fontSize: '0.78rem',
                transition: 'all 0.15s ease',
              }}
            >
              <IconComp size={13} color={isActive ? '#ffffff' : '#64748b'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {step === 1 ? (
        <div>
          {/* Compact 4-Column Inputs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '10px',
            marginBottom: '12px',
          }}>
            {/* Pickup */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal', marginBottom: '3px' }}>
                {language === 'mr' ? 'पिकअप ठिकाण' : 'Pickup Location'}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder={language === 'mr' ? 'उदा. पुणे' : 'e.g. Pune'}
                  value={formData.pickupCity}
                  onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px 8px 28px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    fontWeight: 'normal',
                    outline: 'none',
                    color: '#0f172a',
                  }}
                  required
                />
                <MapPin size={13} color="#1b4332" style={{ position: 'absolute', left: '8px', top: '10px' }} />
              </div>
            </div>

            {/* Drop Destination */}
            {formData.tripType !== 'local_rental' ? (
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal', marginBottom: '3px' }}>
                  {language === 'mr' ? 'जाण्याचे ठिकाण' : 'Drop Destination'}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'उदा. महाबळेश्वर' : 'e.g. Mahabaleshwar'}
                    value={formData.dropCity}
                    onChange={(e) => setFormData({ ...formData, dropCity: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 10px 8px 28px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      fontWeight: 'normal',
                      outline: 'none',
                      color: '#0f172a',
                    }}
                    required
                  />
                  <MapPin size={13} color="#1b4332" style={{ position: 'absolute', left: '8px', top: '10px' }} />
                </div>
              </div>
            ) : (
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal', marginBottom: '3px' }}>
                  {language === 'mr' ? 'तास व किमी पॅकेज' : 'Rental Package'}
                </label>
                <select
                  value={formData.rentalPackageHours}
                  onChange={(e) => setFormData({ ...formData, rentalPackageHours: e.target.value as any })}
                  style={{
                    width: '100%',
                    padding: '8px 8px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8rem',
                    fontWeight: 'normal',
                    outline: 'none',
                    color: '#0f172a',
                    cursor: 'pointer',
                  }}
                >
                  <option value="4hr40km">{language === 'mr' ? '४ तास / ४० किमी' : '4 Hr / 40 KM'}</option>
                  <option value="8hr80km">{language === 'mr' ? '८ तास / ८० किमी (पूर्ण दिवस)' : '8 Hr / 80 KM (Full Day)'}</option>
                  <option value="12hr120km">{language === 'mr' ? '१२ तास / १२० किमी' : '12 Hr / 120 KM'}</option>
                </select>
              </div>
            )}

            {/* Pickup Date */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal', marginBottom: '3px' }}>
                {language === 'mr' ? 'पिकअप तारीख' : 'Pickup Date'}
              </label>
              <input
                type="date"
                value={formData.pickupDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 8px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  fontWeight: 'normal',
                  outline: 'none',
                  color: '#0f172a',
                }}
                required
              />
            </div>

            {/* Return Date */}
            {formData.tripType === 'outstation_roundtrip' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal', marginBottom: '3px' }}>
                  {language === 'mr' ? 'परतीची तारीख' : 'Return Date'}
                </label>
                <input
                  type="date"
                  value={formData.returnDate}
                  min={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 8px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    fontWeight: 'normal',
                    outline: 'none',
                    color: '#0f172a',
                  }}
                />
              </div>
            )}
          </div>

          {/* Visual Vehicle Selection Strip */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.74rem', color: '#1b4332', fontWeight: 'normal' }}>
                {language === 'mr' ? 'पसंतीची गाडी निवडा' : 'Select Preferred Cab / Vehicle'}
              </label>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {selectedVehicle.name} • {language === 'mr' ? toMarathiDigits(selectedVehicle.passengerCapacity) : selectedVehicle.passengerCapacity} {language === 'mr' ? 'आसने' : 'Seats'}
              </span>
            </div>

            {/* Scrollable / Grid of Vehicles with Transparent Images */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
              gap: '8px',
              marginBottom: '10px',
            }}>
              {vehiclesData.map((v) => {
                const isSelected = v.id === formData.selectedVehicleId;
                return (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => setFormData({ ...formData, selectedVehicleId: v.id })}
                    style={{
                      border: isSelected ? '2px solid #1b4332' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#f2f9f5' : '#ffffff',
                      borderRadius: '10px',
                      padding: '8px 6px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 3px 8px rgba(27,67,50,0.12)' : 'none',
                      position: 'relative',
                    }}
                  >
                    {/* Selected check badge */}
                    {isSelected && (
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#1b4332',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 'normal',
                      }}>
                        ✓
                      </span>
                    )}

                    {/* Transparent Vehicle Thumbnail */}
                    <div style={{
                      height: '42px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '4px',
                    }}>
                      <img
                        src={v.image}
                        alt={v.name}
                        style={{
                          maxHeight: '100%',
                          maxWidth: '90%',
                          objectFit: 'contain',
                          mixBlendMode: 'multiply',
                        }}
                      />
                    </div>

                    {/* Vehicle Name with Icon */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.74rem',
                      fontWeight: 'normal',
                      color: isSelected ? '#1b4332' : '#0f172a',
                      lineHeight: 1.2,
                    }}>
                      {getVehicleIcon(v.id || v.category, 12, isSelected ? '#1b4332' : '#64748b')}
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name.split(' ')[0]}</span>
                    </div>

                    {/* Rate & Capacity */}
                    <div style={{ fontSize: '0.68rem', color: isSelected ? '#047857' : '#64748b', fontWeight: 'normal', marginTop: '2px' }}>
                      ₹{language === 'mr' ? toMarathiDigits(v.pricePerKm) : v.pricePerKm}{language === 'mr' ? '/किमी' : '/km'} • {language === 'mr' ? toMarathiDigits(v.passengerCapacity) : v.passengerCapacity}{language === 'mr' ? 'सीट' : 'S'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Passengers Input with Auto Vehicle Matching */}
          <div style={{
            marginBottom: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontSize: '0.74rem', color: '#475569', fontWeight: 'normal' }}>
                {language === 'mr' ? 'एकूण प्रवासी संख्या' : 'Total Passengers'}
              </label>
              <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 'normal' }}>
                ✓ {language === 'mr' ? `निवडलेली गाडी: ${selectedVehicle.name}` : `Matched Cab: ${selectedVehicle.name}`}
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.passengers}
                onChange={(e) => handlePassengersChange(parseInt(e.target.value, 10) || 1)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 32px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  fontWeight: 'normal',
                  outline: 'none',
                  color: '#0f172a',
                  backgroundColor: '#ffffff',
                }}
              />
              <Users size={15} color="#1b4332" style={{ position: 'absolute', left: '10px', top: '11px' }} />
            </div>
          </div>

          {/* Calculation Info Strip */}
          <div style={{
            backgroundColor: '#ebf5f0',
            border: '1px solid #c2e2d0',
            borderRadius: '8px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem',
            color: '#1b4332',
            fontWeight: 'normal',
            marginBottom: '14px',
          }}>
            <div>
              <span>📍 {language === 'mr' ? 'मार्ग:' : 'Route:'} <span style={{ fontWeight: 'normal' }}>{formData.pickupCity} → {formData.dropCity || (formData.tripType === 'local_rental' ? (language === 'mr' ? 'पुणे स्थानिक' : 'Pune Local') : 'City')}</span></span>
            </div>
            <span>✓ {language === 'mr' ? 'चालक व टोल समाविष्ट' : 'Includes Driver & Tolls'}</span>
          </div>

          {/* Compact Bottom Price & Action Strip */}
          <div style={{
            backgroundColor: '#1b4332',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            color: '#ffffff',
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.3px', color: '#a7f3d0' }}>
                {language === 'mr' ? 'अंदाजे एकूण भाडे' : 'Estimated Total Fare'}
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 'normal', fontFamily: 'var(--font-heading)', color: '#ffffff', lineHeight: 1 }}>
                ₹{language === 'mr' ? toMarathiDigits(priceResult.totalEstimate.toLocaleString('en-IN')) : priceResult.totalEstimate.toLocaleString('en-IN')}{' '}
                <span style={{ fontSize: '0.72rem', color: '#d1fae5', fontWeight: 'normal' }}>{language === 'mr' ? 'अंदाजे' : 'approx.'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-white-outline"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.82rem',
                  backgroundColor: '#ffffff',
                  color: '#1b4332',
                  border: 'none',
                  fontWeight: 'normal',
                  borderRadius: '6px',
                }}
              >
                <span>{language === 'mr' ? 'पुढे जा' : 'Proceed'}</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={handleBookViaWhatsApp}
                className="btn btn-whatsapp"
                style={{ padding: '8px 14px', fontSize: '0.82rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <WhatsAppOriginalIcon size={16} color="#ffffff" />
                <span>{language === 'mr' ? 'व्हॉट्सॲपवर पाठवा' : 'Instant WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Step 2: Passenger Info (Compact) */
        <form onSubmit={handleFormSubmit}>
          <div style={{
            backgroundColor: '#ebf5f0',
            border: '1px solid #c2e2d0',
            borderRadius: '8px',
            padding: '8px 12px',
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
          }}>
            <div>
              <span style={{ color: '#1b4332' }}>{formData.pickupCity} → {formData.dropCity || 'Local City'}</span>
              <span style={{ color: '#64748b', marginLeft: '6px' }}>({selectedVehicle.name})</span>
            </div>
            <div style={{ fontWeight: 'normal', color: '#1b4332', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
              ₹{language === 'mr' ? toMarathiDigits(priceResult.totalEstimate.toLocaleString('en-IN')) : priceResult.totalEstimate.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
            marginBottom: '10px',
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal', marginBottom: '3px' }}>
                {language === 'mr' ? 'तुमचे नाव *' : 'Your Name *'}
              </label>
              <input
                type="text"
                placeholder={language === 'mr' ? 'उदा. राहुल कदम' : 'e.g. Rahul Mehta'}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  fontWeight: 'normal',
                  outline: 'none',
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal', marginBottom: '3px' }}>
                {language === 'mr' ? 'व्हॉट्सॲप मोबाईल नंबर *' : 'WhatsApp Mobile Number *'}
              </label>
              <input
                type="tel"
                placeholder={language === 'mr' ? 'उदा. ९०११६५७३५५' : 'e.g. 9011657355'}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  fontWeight: 'normal',
                  outline: 'none',
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal', marginBottom: '3px' }}>
              {language === 'mr' ? 'पिकअप पत्ता किंवा विशेष सूचना' : 'Special Notes / Pickup Address'}
            </label>
            <input
              type="text"
              placeholder={language === 'mr' ? 'उदा. स्वारगेट, पुणे येथून सकाळी ७ वाजता' : 'e.g. Pickup at Swargate Pune at 7 AM'}
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.82rem',
                fontWeight: 'normal',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontWeight: 'normal',
                fontSize: '0.8rem',
                color: '#475569',
              }}
            >
              {language === 'mr' ? '← मागे जा' : '← Back'}
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleBookViaWhatsApp}
                className="btn btn-whatsapp"
                style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <WhatsAppOriginalIcon size={16} color="#ffffff" />
                <span>{language === 'mr' ? 'व्हॉट्सॲपवर पाठवा' : `Send to WhatsApp (${siteConfig.phone})`}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-forest"
                style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>{language === 'mr' ? 'पाठवत आहे...' : 'Sending...'}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={15} />
                    <span>{language === 'mr' ? 'बुकिंग पाठवा' : 'Submit Request'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
