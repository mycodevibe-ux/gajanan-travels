'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { WhatsAppOriginalIcon } from '@/components/vehicles/VehicleIcons';

export const HomeContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    pickup: '',
    destination: '',
    vehicle: 'Sedan',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
          'Pickup Date': formData.date,
          'Notes': formData.notes || 'Enquiry from Plan Your Trip form',
        }),
      });
    } catch (err) {
      console.error(err);
    }

    // Direct WhatsApp dispatch to 9011657355
    const message = encodeURIComponent(
      `Hello ${siteConfig.name}! 🚗\n\n*New Trip Booking Enquiry:*\n👤 *Name:* ${formData.name}\n📱 *Phone:* ${formData.phone}\n📅 *Date:* ${formData.date}\n📍 *Pickup:* ${formData.pickup || 'Pune'}\n🏁 *Destination:* ${formData.destination || 'Not specified'}\n🚘 *Vehicle:* ${formData.vehicle}\n💬 *Notes:* ${formData.notes || 'Please confirm ride & rates.'}`
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
            Plan your trip
          </h2>
          <p style={{
            fontSize: '0.96rem',
            color: '#64748b',
            margin: 0,
          }}>
            Send us your travel details and we'll confirm your ride on WhatsApp.
          </p>
        </div>

        {/* 2-Column Main Layout matching mockup */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start',
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
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
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

              {/* Row 2: Date & Pickup */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="contact-grid-row">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Pickup location"
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                />
              </div>

              {/* Row 3: Destination & Vehicle */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="contact-grid-row">
                <input
                  type="text"
                  placeholder="Destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                  }}
                />
                <select
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                    cursor: 'pointer',
                  }}
                >
                  <option value="Sedan">Sedan (Swift Dzire)</option>
                  <option value="SUV">SUV (Maruti Ertiga)</option>
                  <option value="Luxury SUV">Luxury SUV (Innova Crysta)</option>
                  <option value="Tempo Traveller">Tempo Traveller (17 Seater TT)</option>
                  <option value="Tourist Bus">Tourist Coach Bus (20 Seater)</option>
                </select>
              </div>

              {/* Row 4: Notes */}
              <div>
                <textarea
                  rows={3}
                  placeholder="Anything else we should know?"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#0c2338',
                    resize: 'vertical',
                  }}
                />
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
                <span>Send enquiry on WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Right Column: Info Box + Map matching mockup */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>Call us</div>
                  <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                    <a href={`tel:${siteConfig.phone}`} style={{ color: '#475569', textDecoration: 'none', fontWeight: 'normal' }}>
                      {siteConfig.phone}
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
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>Email</div>
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
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>Based in</div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 'normal' }}>
                    Pune, Maharashtra
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
                  <div style={{ fontWeight: 'normal', fontSize: '0.86rem', color: '#0c2338' }}>Hours</div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 'normal' }}>
                    Mon – Sun, 6 AM – 11 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Live Map Box matching mockup */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              height: '145px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360438186!2d73.79292679237691!3d18.524616458039755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${siteConfig.name} Pune Location`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
