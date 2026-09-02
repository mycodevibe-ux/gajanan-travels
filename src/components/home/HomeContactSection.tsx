'use client';

import React, { useState, useMemo } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Navigation,
  Compass,
  Gauge,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { WhatsAppOriginalIcon } from '@/components/vehicles/VehicleIcons';
import { useLanguage } from '@/context/LanguageContext';
import { toMarathiDigits, formatMarathiDate } from '@/lib/marathiNumbers';
import { getRouteEstimate, getCabFareEstimate } from '@/lib/routeCalculator';

export const HomeContactSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    pickup: '',
    destination: '',
    vehicle: 'Sedan',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate number of trip days between startDate and endDate
  const tripDays = useMemo(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return Math.max(1, diffDays);
      }
    }
    return 1;
  }, [formData.startDate, formData.endDate]);

  // Dynamic route distance, time & toll calculation
  const routeEstimate = useMemo(() => {
    return getRouteEstimate(formData.pickup, formData.destination);
  }, [formData.pickup, formData.destination]);

  const totalToll = useMemo(() => {
    return (routeEstimate.tollEstimate || 0) * tripDays;
  }, [routeEstimate.tollEstimate, tripDays]);

  const cabFare = useMemo(() => {
    return getCabFareEstimate(formData.vehicle, routeEstimate.distanceKm, tripDays, routeEstimate.isLocalTrip);
  }, [formData.vehicle, routeEstimate.distanceKm, tripDays, routeEstimate.isLocalTrip]);

  const hasRouteInput = Boolean(formData.pickup.trim() || formData.destination.trim());

  // Dynamic Google Map Driving Route Embed URL
  const mapEmbedUrl = useMemo(() => {
    const p = formData.pickup.trim();
    const d = formData.destination.trim();
    if (p && d) {
      return `https://maps.google.com/maps?saddr=${encodeURIComponent(p)}&daddr=${encodeURIComponent(d)}&output=embed`;
    }
    if (d) {
      return `https://maps.google.com/maps?saddr=Pune&daddr=${encodeURIComponent(d)}&output=embed`;
    }
    if (p) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(p + ', Pune')}&output=embed`;
    }
    return 'https://maps.google.com/maps?q=Pune%2C%20Maharashtra&output=embed';
  }, [formData.pickup, formData.destination]);

  const googleMapsDirectionsUrl = useMemo(() => {
    const p = encodeURIComponent(formData.pickup.trim() || 'Pune');
    const d = encodeURIComponent(formData.destination.trim() || 'Pune');
    return `https://www.google.com/maps/dir/?api=1&origin=${p}&destination=${d}`;
  }, [formData.pickup, formData.destination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    // Send email dispatch in background to mycodevibe@gmail.com
    try {
      fetch('https://formsubmit.co/ajax/mycodevibe@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🚗 New Cab Enquiry - ${formData.name} (${formData.phone})`,
          _captcha: 'false',
          'Customer Name': formData.name,
          'Phone Number': formData.phone,
          'Pickup Location': formData.pickup || 'Pune',
          'Destination': formData.destination || 'Not specified',
          'Vehicle Preference': formData.vehicle,
          'Start Date': formData.startDate,
          'End Date': formData.endDate,
          'Total Trip Days': `${tripDays} Day(s)`,
          'Distance Est': `${routeEstimate.distanceKm} KM`,
          'Travel Time Est': routeEstimate.durationText.en,
          'Toll Est': `₹${totalToll} (${tripDays} Days)`,
          'Cab Fare Est': `₹${cabFare.toLocaleString('en-IN')}`,
          'Notes': formData.notes || 'Enquiry from Plan Your Trip form',
        }),
      });
    } catch (err) {
      console.error(err);
    }

    // Direct WhatsApp dispatch with route, toll & fare breakdown
    const routeSummary = hasRouteInput 
      ? `\n🛣️ *Route:* ${routeEstimate.routeTitle} (~${routeEstimate.distanceKm} KM)\n⏱️ *Est. Time:* ${routeEstimate.durationText.en}\n💳 *FastTag Toll:* ~₹${totalToll} (${tripDays} Day${tripDays > 1 ? 's' : ''} - Extra as per actuals)\n💰 *Est. Cab Fare:* ₹${cabFare.toLocaleString('en-IN')} (${tripDays} Day${tripDays > 1 ? 's' : ''} Roundtrip)`
      : '';

    const message = encodeURIComponent(
      `Hello ${siteConfig.name}! 🚗\n\n*New Trip Booking Enquiry:*\n👤 *Name:* ${formData.name}\n📱 *Phone:* ${formData.phone}\n📅 *Dates:* ${formData.startDate} to ${formData.endDate} (${tripDays} Day${tripDays > 1 ? 's' : ''} Trip)\n📍 *Pickup:* ${formData.pickup || 'Pune'}\n🏁 *Destination:* ${formData.destination || 'Not specified'}\n🚘 *Vehicle:* ${formData.vehicle}${routeSummary}\n💬 *Notes:* ${formData.notes || 'Please confirm ride & availability.'}`
    );

    setIsSubmitting(false);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" style={{ backgroundColor: '#ffffff', padding: '75px 0 65px 0' }}>
      <div className="container-custom">
        {/* Section Header matching mockup */}
        <div style={{ marginBottom: '34px' }}>
          <h2 style={{
            fontSize: '2.4rem',
            fontWeight: 'normal',
            color: '#0c2338',
            fontFamily: 'var(--font-heading)',
            marginBottom: '6px',
            letterSpacing: '0.3px',
          }}>
            {t.contact_title}
          </h2>
          <p style={{
            fontSize: '0.96rem',
            color: '#64748b',
            margin: 0,
          }}>
            {t.contact_subtitle}
          </p>
        </div>

        {/* 2-Column Main Layout matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'stretch',
        }}>
          {/* Left Form */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '26px',
            boxShadow: '0 4px 20px rgba(12, 35, 56, 0.04)',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Row 1: Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="contact-grid-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', fontWeight: 'normal', marginBottom: '4px' }}>
                    {language === 'mr' ? 'तुमचे नाव *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'उदा. राहुल कदम' : 'e.g. Rahul Kadam'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#0c2338',
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', fontWeight: 'normal', marginBottom: '4px' }}>
                    {language === 'mr' ? 'मोबाईल नंबर *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    placeholder={language === 'mr' ? 'उदा. ९०११६५७३५५' : 'e.g. 9011657355'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#0c2338',
                    }}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Pickup Location & Destination */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="contact-grid-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', fontWeight: 'normal', marginBottom: '4px' }}>
                    {language === 'mr' ? 'पिकअप ठिकाण' : 'Pickup Location'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'उदा. पुणे, कात्रज, स्वारगेट' : 'e.g. Pune, Katraj, Swargate'}
                    value={formData.pickup}
                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#0c2338',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', fontWeight: 'normal', marginBottom: '4px' }}>
                    {language === 'mr' ? 'जाण्याचे ठिकाण' : 'Drop Destination'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'उदा. परभणी, दापोली, महाबळेश्वर, गोवा' : 'e.g. Parbhani, Dapoli, Mahabaleshwar, Goa'}
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#0c2338',
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Start Date & End Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="contact-grid-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', fontWeight: 'normal', marginBottom: '4px' }}>
                    {language === 'mr' ? 'प्रवासाची तारीख' : 'Start Date (Pickup)'}
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      const newStart = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        startDate: newStart,
                        endDate: prev.endDate < newStart ? newStart : prev.endDate,
                      }));
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#0c2338',
                    }}
                    required
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 'normal' }}>
                      {language === 'mr' ? 'परतीची तारीख' : 'End Date (Return)'}
                    </label>
                    <span style={{ fontSize: '0.68rem', color: '#047857', fontWeight: 'normal' }}>
                      {language === 'mr' ? `(${toMarathiDigits(tripDays)} दिवस)` : `(${tripDays} Day${tripDays > 1 ? 's' : ''})`}
                    </span>
                  </div>
                  <input
                    type="date"
                    value={formData.endDate}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#0c2338',
                    }}
                    required
                  />
                </div>
              </div>

              {/* Row 4: Vehicle & Notes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="contact-grid-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', fontWeight: 'normal', marginBottom: '4px' }}>
                    {language === 'mr' ? 'पसंतीची गाडी' : 'Vehicle Preference'}
                  </label>
                  <select
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#0c2338',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Sedan">{language === 'mr' ? 'सेडान (Swift Dzire)' : 'Sedan (Swift Dzire)'}</option>
                    <option value="SUV">{language === 'mr' ? 'एसयूव्ही (Maruti Ertiga)' : 'SUV (Maruti Ertiga)'}</option>
                    <option value="Luxury SUV">{language === 'mr' ? 'लक्झरी एसयूव्ही (Innova Crysta)' : 'Luxury SUV (Innova Crysta)'}</option>
                    <option value="Tempo Traveller">{language === 'mr' ? 'टेम्पो ट्रॅव्हलर (१७ सीटर)' : 'Tempo Traveller (17 Seater TT)'}</option>
                    <option value="Tourist Bus">{language === 'mr' ? 'टूरिस्ट बस (२० सीटर)' : 'Tourist Coach Bus (20 Seater)'}</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', fontWeight: 'normal', marginBottom: '4px' }}>
                    {language === 'mr' ? 'काही विशेष सूचना?' : 'Special Notes'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'उदा. सकाळी ६ वाजता पिकअप' : 'e.g. Morning 6 AM pickup'}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#0c2338',
                    }}
                  />
                </div>
              </div>

              {/* Dynamic Live Route, Distance, Toll & Time Calculation Box */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '12px',
                padding: '14px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '8px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Navigation size={14} color="#f97316" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 'normal', color: '#0c2338', fontFamily: 'var(--font-heading)' }}>
                      {language === 'mr' ? 'थेट अंतर, टोल व वेळ अंदाज' : 'Live Route, Toll & Time Estimate'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#047857', backgroundColor: '#eaf5ee', padding: '2px 8px', borderRadius: '9999px', fontWeight: 'normal' }}>
                    {hasRouteInput && routeEstimate.distanceKm > 0 ? routeEstimate.routeTitle : (language === 'mr' ? 'मार्ग निवडा' : 'Select Route')}
                  </span>
                </div>

                {/* 4 Metrics Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  marginBottom: '10px',
                }}>
                  {/* 1. Distance */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 10px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                      {language === 'mr' ? '📍 एकूण अंतर' : '📍 Distance'}
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#0c2338', fontWeight: 'normal', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
                      {routeEstimate.distanceKm === 0 ? (
                        <span style={{ color: '#64748b' }}>{language === 'mr' ? '०' : '0'} <span style={{ fontSize: '0.72rem', fontWeight: 'normal', color: '#94a3b8' }}>{language === 'mr' ? 'किमी' : 'KM'}</span></span>
                      ) : (
                        <>{language === 'mr' ? toMarathiDigits(routeEstimate.distanceKm) : routeEstimate.distanceKm} <span style={{ fontSize: '0.72rem', fontWeight: 'normal', color: '#64748b' }}>{language === 'mr' ? 'किमी' : 'KM'}</span></>
                      )}
                    </div>
                  </div>

                  {/* 2. Travel Time */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 10px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                      {language === 'mr' ? '⏱️ अंदाजे प्रवास वेळ' : '⏱️ Travel Time'}
                    </div>
                    <div style={{ fontSize: '0.96rem', color: routeEstimate.distanceKm === 0 ? '#94a3b8' : '#0c2338', fontWeight: 'normal', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
                      {routeEstimate.distanceKm === 0 ? '--' : (language === 'mr' ? toMarathiDigits(routeEstimate.durationText.mr) : routeEstimate.durationText.en)}
                    </div>
                  </div>

                  {/* 3. FastTag Toll */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 10px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                      {language === 'mr' ? '🛣️ FastTag टोल (स्वतंत्र)' : '🛣️ FastTag Toll (Extra)'}
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#f97316', fontWeight: 'normal', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
                      {routeEstimate.distanceKm === 0 ? (
                        <span style={{ color: '#64748b' }}>₹{language === 'mr' ? '०' : '0'} <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#94a3b8' }}>{language === 'mr' ? '(--)' : '(--)'}</span></span>
                      ) : routeEstimate.tollEstimate === 0 ? (
                        <span style={{ color: '#047857' }}>₹{language === 'mr' ? '०' : '0'} <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#64748b' }}>{language === 'mr' ? '(टोल नाही)' : '(No Toll)'}</span></span>
                      ) : (
                        <>₹{language === 'mr' ? toMarathiDigits(totalToll) : totalToll} <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#64748b' }}>{language === 'mr' ? `(${toMarathiDigits(tripDays)} दिवस)` : `(${tripDays} Day${tripDays > 1 ? 's' : ''})`}</span></>
                      )}
                    </div>
                  </div>

                  {/* 4. Estimated Fare */}
                  <div style={{ backgroundColor: '#eaf5ee', border: '1px solid #bde4ca', borderRadius: '8px', padding: '8px 10px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#1b4332' }}>
                      {language === 'mr' ? '💰 अंदाजे गाडी भाडे' : '💰 Est. Cab Fare'}
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#1b4332', fontWeight: 'normal', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
                      {cabFare === 0 ? (
                        <span style={{ color: '#64748b' }}>₹{language === 'mr' ? '०' : '0'} <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#94a3b8' }}>{language === 'mr' ? '(ठिकाण टाका)' : '(Enter drop)'}</span></span>
                      ) : (
                        <>₹{language === 'mr' ? toMarathiDigits(cabFare.toLocaleString('en-IN')) : cabFare.toLocaleString('en-IN')} <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#047857' }}>{language === 'mr' ? `(${toMarathiDigits(tripDays)} दिवस)` : `(${tripDays} Day${tripDays > 1 ? 's' : ''})`}</span></>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#64748b' }}>
                  <span>
                    ✓ {routeEstimate.isLocalTrip 
                      ? (language === 'mr' ? 'पुणे शहर स्थानिक दर • टोल नाही' : 'Pune Local City Tariff • No FastTag Toll')
                      : (language === 'mr' ? 'किमान ३०० किमी/दिवस पॅकेज • टोल व पार्किंग स्वतंत्र (पावतीनुसार)' : 'Min. 300 KM/Day package • Toll & Parking extra at actuals')}
                  </span>
                  <a 
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#0284c7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                  >
                    <span>{language === 'mr' ? 'मॅप उघडा' : 'View on Maps'}</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              {/* Full-width Green WhatsApp Button matching mockup */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-green"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '0.96rem',
                  fontWeight: 'normal',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <WhatsAppOriginalIcon size={20} color="#ffffff" />
                <span>{language === 'mr' ? 'व्हॉट्सॲपवर चौकशी पाठवा' : 'Send enquiry on WhatsApp'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Info Box + Live Dynamic Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            {/* Soft Blue Info Box */}
            <div style={{
              backgroundColor: '#eef6fc',
              borderRadius: '16px',
              border: '1px solid #d9ebf7',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {/* Call us */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c2338',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  flexShrink: 0,
                }}>
                  <Phone size={16} color="#0c2338" />
                </div>
                <div>
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>
                    {language === 'mr' ? 'थेट फोन करा' : 'Call us'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                    <a href={`tel:${siteConfig.phone}`} style={{ color: '#475569', textDecoration: 'none', fontWeight: 'normal' }}>
                      {language === 'mr' ? toMarathiDigits(siteConfig.phone) : siteConfig.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c2338',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  flexShrink: 0,
                }}>
                  <Mail size={16} color="#0c2338" />
                </div>
                <div>
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>
                    {language === 'mr' ? 'ईमेल करा' : 'Email'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                    <a href={`mailto:${siteConfig.email}`} style={{ color: '#475569', textDecoration: 'none', fontWeight: 'normal' }}>
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Based in */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c2338',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  flexShrink: 0,
                }}>
                  <MapPin size={16} color="#0c2338" />
                </div>
                <div>
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>
                    {language === 'mr' ? 'कार्यालय' : 'Based in'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 'normal' }}>
                    {language === 'mr' ? 'पुणे, महाराष्ट्र, भारत' : 'Pune, Maharashtra'}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c2338',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  flexShrink: 0,
                }}>
                  <Clock size={16} color="#0c2338" />
                </div>
                <div>
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>
                    {language === 'mr' ? 'कार्यालयीन वेळ' : 'Hours'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 'normal' }}>
                    {language === 'mr' ? 'सोम – रवि, स. ६:०० ते रात्री ११:००' : 'Mon – Sun, 6 AM – 11 PM'}
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Live Route Map matching full height of Left Box */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: '340px',
            }}>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#0c2338',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.82rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Compass size={15} color="#f97316" />
                  <span style={{ fontFamily: 'var(--font-heading)' }}>
                    {language === 'mr' ? `मार्ग नकाशा: ${routeEstimate.routeTitle}` : `Route Map: ${routeEstimate.routeTitle}`}
                  </span>
                </div>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#f97316',
                    textDecoration: 'none',
                    fontSize: '0.76rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>{language === 'mr' ? 'मॅप्स दिशा ↗' : 'Directions ↗'}</span>
                </a>
              </div>
              <div style={{ flex: 1, width: '100%', minHeight: '300px' }}>
                <iframe
                  key={mapEmbedUrl}
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, width: '100%', height: '100%', minHeight: '300px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${siteConfig.name} Route Map`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
