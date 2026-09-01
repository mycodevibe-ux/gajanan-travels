'use client';

import React, { useState } from 'react';
import { X, Star, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { ReviewItem } from '@/data/reviews';
import { siteConfig } from '@/data/siteConfig';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (newReview: ReviewItem) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [name, setName] = useState('');
  const [trip, setTrip] = useState('Pune to Mahabaleshwar');
  const [car, setCar] = useState('Swift Dzire');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      alert('Please enter your name and review comment.');
      return;
    }

    const newRev: ReviewItem = {
      id: Date.now(),
      name,
      trip,
      car,
      rating,
      comment,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      date: 'Just now',
    };

    onSubmitReview(newRev);
    setSubmitted(true);

    // Also dispatch to WhatsApp to notify business owner
    const waText = encodeURIComponent(
      `⭐ *New Customer Review Received!*\n\n👤 *Customer:* ${name}\n🚩 *Trip:* ${trip}\n🚘 *Vehicle:* ${car}\n⭐ *Rating:* ${rating}/5 Stars\n💬 *Feedback:* "${comment}"`
    );
    // Silent notification option
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: '16px', zIndex: 1000 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '14px 20px',
          background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-heading)' }}>
              Share Your Travel Experience
            </h3>
            <p style={{ fontSize: '0.74rem', color: '#d1fae5', margin: '2px 0 0 0' }}>
              Your feedback helps other travelers choose the best rides!
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div style={{ padding: '32px 20px', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#ebf5f0',
              color: '#1b4332',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
            }}>
              <CheckCircle2 size={34} color="#1b4332" />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Thank You For Your Review!
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#64748b', marginBottom: '20px' }}>
              Your review has been successfully added to the live slider.
            </p>
            <button
              onClick={onClose}
              className="btn btn-forest"
              style={{ padding: '8px 24px', fontSize: '0.86rem', borderRadius: '8px' }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '18px 20px' }}>
            {/* Star Rating Picker */}
            <div style={{ marginBottom: '14px', textAlign: 'center' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 700, marginBottom: '6px' }}>
                Your Rating
              </label>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      transform: rating >= star ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <Star
                      size={28}
                      fill={rating >= star ? '#f59e0b' : 'none'}
                      color={rating >= star ? '#f59e0b' : '#cbd5e1'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Shinde"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  Trip Route
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pune to Mahabaleshwar"
                  value={trip}
                  onChange={(e) => setTrip(e.target.value)}
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

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                Vehicle You Traveled In
              </label>
              <select
                value={car}
                onChange={(e) => setCar(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              >
                <option value="Swift Dzire">Swift Dzire (Sedan)</option>
                <option value="Ertiga (7 Seater)">Maruti Ertiga (7 Seater)</option>
                <option value="Innova Crysta">Innova Crysta</option>
                <option value="Tata 17 Seater Bus">Tata 17 Seater Tempo Traveller</option>
                <option value="Tata 20 Seater Bus">Tata 20 Seater Tourist Bus</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '3px' }}>
                Your Review / Experience *
              </label>
              <textarea
                rows={3}
                placeholder="Share how your driver, ride comfort, and overall journey was..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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

            <button
              type="submit"
              className="btn btn-forest"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '0.88rem',
                borderRadius: '8px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Send size={15} />
              <span>Submit Review</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
