import React from 'react';
import { Star, ShieldCheck, Quote, ThumbsUp } from 'lucide-react';
import { reviewsData } from '@/data/reviews';
import { siteConfig } from '@/data/siteConfig';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-custom">
        <div className="section-header">
          <div className="section-tag">
            <ThumbsUp size={14} />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="section-title">
            Loved by Over 50,000+ Travelers
          </h2>
          <p className="section-subtitle">
            Read unfiltered feedback from families, couples, corporate clients, and international tourists who traveled with us.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontSize: '0.86rem',
            color: '#b45309',
            fontWeight: 700,
          }}>
            <Star size={16} fill="#f59e0b" color="#f59e0b" />
            <span>Rated 4.9/5 based on 1,850+ Google & Tripadvisor Reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid-3">
          {reviewsData.map((rev) => (
            <div
              key={rev.id}
              className="card-glass card-hover-lift"
              style={{
                padding: '24px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <Quote size={32} color="#10b981" style={{ opacity: 0.15, position: 'absolute', top: '20px', right: '20px' }} />

              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>

              {/* Comment */}
              <p style={{
                fontSize: '0.9rem',
                color: '#334155',
                lineHeight: 1.6,
                marginBottom: '20px',
                flex: 1,
                fontStyle: 'italic',
              }}>
                "{rev.comment}"
              </p>

              {/* Trip Tag */}
              {(rev.packageBooked || rev.vehicleBooked) && (
                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: '#059669',
                  backgroundColor: '#ecfdf5',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  display: 'inline-block',
                }}>
                  Booked: {rev.packageBooked || rev.vehicleBooked}
                </div>
              )}

              {/* Author Strip */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderTop: '1px solid #f1f5f9',
                paddingTop: '14px',
              }}>
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #34d399',
                  }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>
                    {rev.author}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {rev.location} • {rev.date}
                  </div>
                </div>

                {rev.verified && (
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px', color: '#059669', fontSize: '0.72rem', fontWeight: 700 }}>
                    <ShieldCheck size={14} />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
