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
import { calculateEstimatedPrice } from '@/lib/pricing';
import { createWhatsAppBookingUrl } from '@/lib/whatsapp';
import { siteConfig } from '@/data/siteConfig';

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
      englishDriver: true,
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
      // Send real email lead to mycodvibe@gmail.com
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          tripType: formData.tripType,
          pickupCity: formData.pickupCity,
          dropCity: formData.dropCity || 'Local City',
          vehicleName: selectedVehicle.name,
          pickupDate: `${formData.pickupDate} ${formData.pickupTime}`,
          estimatedFare: priceResult.totalEstimate,
          message: formData.specialRequests || 'Standard Booking',
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

        <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '4px', fontWeight: 800 }}>
          Booking Inquiry Received!
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.86rem', marginBottom: '14px' }}>
          Thank you, <strong>{formData.fullName}</strong>. Ref: <span style={{ color: '#1b4332', fontWeight: 800 }}>{bookingRef}</span>
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
          <div><strong>Route:</strong> {formData.pickupCity} → {formData.dropCity || 'Local City'}</div>
          <div><strong>Vehicle:</strong> {selectedVehicle.name} • {formData.pickupDate} {formData.returnDate ? `to ${formData.returnDate}` : ''}</div>
          <div style={{ color: '#1b4332', fontWeight: 800, marginTop: '2px' }}>
            Estimated Fare: ₹{priceResult.totalEstimate.toLocaleString('en-IN')} approx.
          </div>
          <div style={{ marginTop: '6px', fontSize: '0.76rem', color: '#1b4332', fontWeight: 600 }}>
            ✓ Quote details dispatched to {siteConfig.email}
          </div>
        </div>

        <button
          onClick={handleBookViaWhatsApp}
          className="btn btn-whatsapp"
          style={{ padding: '10px 22px', fontSize: '0.88rem', borderRadius: '8px' }}
        >
          <MessageCircle size={16} />
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
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '6px',
        backgroundColor: '#f8fafc',
        padding: '4px',
        borderRadius: '10px',
        marginBottom: '14px',
        border: '1px solid #e2e8f0',
      }}>
        {[
          { type: 'outstation_roundtrip', label: 'Roundtrip', icon: Compass },
          { type: 'outstation_oneway', label: 'One-Way', icon: ArrowRight },
          { type: 'local_rental', label: 'Local Rental', icon: Clock },
          { type: 'airport_transfer', label: 'Airport Drop', icon: PlaneTakeoff },
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
                fontWeight: isActive ? 700 : 500,
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
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                Pickup Location
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Pune"
                  value={formData.pickupCity}
                  onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px 8px 28px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
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
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                  Drop Destination
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="e.g. Mahabaleshwar"
                    value={formData.dropCity}
                    onChange={(e) => setFormData({ ...formData, dropCity: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 10px 8px 28px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
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
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                  Rental Package
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
                    outline: 'none',
                    color: '#0f172a',
                    cursor: 'pointer',
                  }}
                >
                  <option value="4hr40km">4 Hr / 40 KM</option>
                  <option value="8hr80km">8 Hr / 80 KM (Full Day)</option>
                  <option value="12hr120km">12 Hr / 120 KM</option>
                </select>
              </div>
            )}

            {/* Pickup Date */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                Pickup Date
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
                  outline: 'none',
                  color: '#0f172a',
                }}
                required
              />
            </div>

            {/* Return Date */}
            {formData.tripType === 'outstation_roundtrip' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                  Return Date
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
                    outline: 'none',
                    color: '#0f172a',
                  }}
                />
              </div>
            )}
          </div>

          {/* Row 2: Vehicle Selector & Passengers Inline */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '10px',
            marginBottom: '12px',
          }}>
            {/* Vehicle Dropdown */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                Vehicle Type
              </label>
              <select
                value={formData.selectedVehicleId}
                onChange={(e) => setFormData({ ...formData, selectedVehicleId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1.5px solid #1b4332',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  outline: 'none',
                  color: '#0f172a',
                  backgroundColor: '#f2f9f5',
                  cursor: 'pointer',
                }}
              >
                {vehiclesData.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.passengerCapacity} Seats - ₹{v.pricePerKm}/km)
                  </option>
                ))}
              </select>
            </div>

            {/* Passengers */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                Passengers
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: Number(e.target.value) || 1 })}
                  style={{
                    width: '100%',
                    padding: '8px 8px 8px 26px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    outline: 'none',
                    color: '#0f172a',
                  }}
                />
                <Users size={13} color="#1b4332" style={{ position: 'absolute', left: '8px', top: '10px' }} />
              </div>
            </div>
          </div>

          {/* Calculation Info Strip */}
          <div style={{
            backgroundColor: '#ebf5f0',
            border: '1px solid #c2e2d0',
            borderRadius: '8px',
            padding: '7px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.76rem',
            color: '#1b4332',
            fontWeight: 600,
            marginBottom: '14px',
          }}>
            <div>
              <span>📍 Route: <strong>{formData.pickupCity} → {formData.dropCity || 'City'}</strong></span>
              <span style={{ marginLeft: '10px', color: '#475569' }}>
                ({priceResult.breakdownNotes[0] || 'Approx distance estimate'})
              </span>
            </div>
            <span>✓ Includes Driver & Tolls</span>
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
              <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#a7f3d0' }}>
                Estimated Total Fare
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                ₹{priceResult.totalEstimate.toLocaleString('en-IN')}{' '}
                <span style={{ fontSize: '0.72rem', color: '#d1fae5', fontWeight: 400 }}>approx.</span>
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
                  fontWeight: 800,
                  borderRadius: '6px',
                }}
              >
                <span>Proceed</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={handleBookViaWhatsApp}
                className="btn btn-whatsapp"
                style={{ padding: '8px 14px', fontSize: '0.82rem', borderRadius: '6px' }}
              >
                <MessageCircle size={15} />
                <span>Instant WhatsApp</span>
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
              <strong style={{ color: '#1b4332' }}>{formData.pickupCity} → {formData.dropCity || 'Local City'}</strong>
              <span style={{ color: '#64748b', marginLeft: '6px' }}>({selectedVehicle.name})</span>
            </div>
            <div style={{ fontWeight: 800, color: '#1b4332', fontSize: '1.1rem' }}>
              ₹{priceResult.totalEstimate.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
            marginBottom: '10px',
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                Your Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Mehta"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                WhatsApp Mobile Number *
              </label>
              <input
                type="tel"
                placeholder="e.g. 9011657355"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
              Special Notes / Pickup Address
            </label>
            <input
              type="text"
              placeholder="e.g. Pickup at Swargate Pune at 7 AM"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.82rem',
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
                fontWeight: 600,
                fontSize: '0.8rem',
                color: '#475569',
              }}
            >
              ← Back
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleBookViaWhatsApp}
                className="btn btn-whatsapp"
                style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '6px' }}
              >
                <MessageCircle size={15} />
                <span>Send to WhatsApp ({siteConfig.phone})</span>
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
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={15} />
                    <span>Submit Request</span>
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
