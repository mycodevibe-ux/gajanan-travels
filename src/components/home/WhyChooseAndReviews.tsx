'use client';

import React, { useState } from 'react';
import { CheckCircle2, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const WhyChooseAndReviews: React.FC = () => {
  const checklists = [
    { col1: 'Clean & Comfortable Cars', col2: 'On-Time Pickup' },
    { col1: 'Experienced Drivers', col2: 'Multiple Vehicle Options' },
    { col1: 'Transparent Pricing', col2: 'Local & Outstation Trips' },
    { col1: 'On-Time Pickup', col2: '24/7 Booking Support' },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Rahul Mehta',
      trip: 'Pune to Mahabaleshwar',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      comment: 'Excellent service! Driver was on time and trip was very comfortable. Highly recommended.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sneha Kulkarni',
      trip: 'Pune to Goa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      comment: 'Very good experience with Gajanan Tours & Travels. Clean car and polite driver. Will book again.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Vikram Patil',
      trip: 'Pune to Shirdi',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      comment: 'Best travel service for group trips. 20 seater bus was very comfortable.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Amit Deshmukh',
      trip: 'Pune to Mumbai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment: 'Professional chauffeurs and smooth expressway ride. Very transparent pricing.',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" style={{ backgroundColor: '#001D23', padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '44px',
          alignItems: 'flex-start',
        }}>
          {/* Left Column: Why Choose Us */}
          <div>
            <div className="chariteam-tag-dark">
              WHY CHOOSE US?
            </div>

            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: 'normal',
              color: '#ffffff',
              marginBottom: '26px',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.3px',
            }}>
              Ride with Confidence
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {checklists.map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#d1d5db' }}>
                    <CheckCircle2 size={18} color="#FF6F0F" style={{ flexShrink: 0 }} />
                    <span>{row.col1}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#d1d5db' }}>
                    <CheckCircle2 size={18} color="#FF6F0F" style={{ flexShrink: 0 }} />
                    <span>{row.col2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Happy Customers */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <div className="chariteam-tag-dark">
                  WHAT OUR CUSTOMERS SAY
                </div>
                <h2 style={{
                  fontSize: '2.4rem',
                  fontWeight: 'normal',
                  color: '#ffffff',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.3px',
                }}>
                  Happy Customers
                </h2>
              </div>

              {/* Prev / Next Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255, 111, 15, 0.4)',
                    backgroundColor: 'rgba(255, 111, 15, 0.1)',
                    color: '#FF6F0F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF6F0F';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 111, 15, 0.1)';
                    e.currentTarget.style.color = '#FF6F0F';
                  }}
                  aria-label="Previous customer reviews"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255, 111, 15, 0.4)',
                    backgroundColor: 'rgba(255, 111, 15, 0.1)',
                    color: '#FF6F0F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF6F0F';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 111, 15, 0.1)';
                    e.currentTarget.style.color = '#FF6F0F';
                  }}
                  aria-label="Next customer reviews"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            {/* 3 Review Cards in horizontal row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
            }}>
              {reviews.slice(0, 3).map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    backgroundColor: '#002830',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '20px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  className="card-hover-lift"
                >
                  <div>
                    {/* Stars */}
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="#FF6F0F" color="#FF6F0F" />
                      ))}
                    </div>

                    <p style={{
                      fontSize: '0.82rem',
                      color: '#d1d5db',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                    }}>
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Author avatar & info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 'normal', color: '#ffffff' }}>
                        {rev.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#FF6F0F', fontWeight: 'normal' }}>
                        {rev.trip}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dot */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
              <span style={{ width: '20px', height: '4px', borderRadius: '2px', backgroundColor: '#FF6F0F', display: 'inline-block' }} />
              <span style={{ width: '6px', height: '4px', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
