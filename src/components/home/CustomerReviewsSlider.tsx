'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, PenLine, ChevronLeft, ChevronRight } from 'lucide-react';
import { initialReviewsData, ReviewItem } from '@/data/reviews';
import { WriteReviewModal } from './WriteReviewModal';
import { useLanguage } from '@/context/LanguageContext';

export const CustomerReviewsSlider: React.FC = () => {
  const { t } = useLanguage();
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialReviewsData);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rideway_customer_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= initialReviewsData.length) {
          const merged = parsed.map((rev: ReviewItem, i: number) => ({
            ...rev,
            avatarImg: rev.avatarImg || initialReviewsData[i]?.avatarImg,
          }));
          setReviewsList(merged);
        } else {
          setReviewsList(initialReviewsData);
          localStorage.setItem('rideway_customer_reviews', JSON.stringify(initialReviewsData));
        }
      } else {
        setReviewsList(initialReviewsData);
        localStorage.setItem('rideway_customer_reviews', JSON.stringify(initialReviewsData));
      }
    } catch (e) {
      setReviewsList(initialReviewsData);
    }
  }, []);

  const totalOriginal = reviewsList.length;
  const clonedReviews = totalOriginal >= 4
    ? [...reviewsList, ...reviewsList, ...reviewsList]
    : reviewsList;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const gap = 20;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slide forward every 3.5s
  useEffect(() => {
    if (isHovered || totalOriginal < 4) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovered, totalOriginal]);

  useEffect(() => {
    if (totalOriginal >= 4 && currentIndex >= totalOriginal) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - totalOriginal);
      }, 650);

      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, totalOriginal]);

  const handleNext = () => {
    if (totalOriginal < 4) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (totalOriginal < 4) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev <= 0 ? totalOriginal - 1 : prev - 1));
  };

  const handleAddReview = (newReview: ReviewItem) => {
    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    try {
      localStorage.setItem('rideway_customer_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setCurrentIndex(0);
  };

  return (
    <section id="reviews" style={{ backgroundColor: '#ffffff', padding: '75px 0 65px 0' }}>
      <div className="container-custom">
        {/* Section Header with Google 4.8 Rating Pill matching mockup */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: 'normal',
              color: '#0c2338',
              fontFamily: 'var(--font-heading)',
              marginBottom: '10px',
              letterSpacing: '0.3px',
            }}>
              {t.reviews_title}
            </h2>

            {/* Google Rating Pill matching mockup */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f0f7fc',
              border: '1px solid #d4e3ef',
              padding: '6px 14px',
              borderRadius: '9999px',
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#4285F4',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'normal',
                fontSize: '0.72rem',
                fontFamily: 'sans-serif',
              }}>
                G
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontWeight: 'normal', color: '#0c2338', fontSize: '0.88rem' }}>4.8</span>
                <div style={{ display: 'flex', gap: '1px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} color="#f97316" fill="#f97316" />
                  ))}
                </div>
              </div>

              <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 'normal', borderLeft: '1px solid #cbd5e1', paddingLeft: '8px' }}>
                Based on 500+ Google reviews
              </span>
            </div>
          </div>

          {/* Action Buttons: Write Review & Nav arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="btn btn-outline-navy"
              style={{
                padding: '8px 16px',
                fontSize: '0.82rem',
                borderRadius: '8px',
                gap: '6px',
                fontWeight: 'normal',
              }}
            >
              <PenLine size={14} color="#f97316" />
              <span>Write a Review</span>
            </button>

            {totalOriginal >= 4 && (
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={handlePrev}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#0c2338',
                  }}
                  aria-label="Previous Review"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#0c2338',
                  }}
                  aria-label="Next Review"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 6 Reviews Infinite Carousel matching mockup */}
        <div
          style={{ overflow: 'hidden', padding: '6px 0' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            style={{
              display: 'flex',
              gap: `${gap}px`,
              transform: `translateX(calc(-${currentIndex} * ((100% + ${gap}px) / ${visibleCount})))`,
              transition: isTransitioning ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            }}
          >
            {clonedReviews.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                style={{
                  flex: `0 0 calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '210px',
                  boxShadow: '0 4px 16px rgba(12, 35, 56, 0.04)',
                }}
                className="card-hover-lift"
              >
                <div>
                  {/* Rating Stars matching mockup */}
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} color="#f97316" fill="#f97316" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#334155',
                    lineHeight: 1.6,
                    marginBottom: '18px',
                  }}>
                    "{review.comment}"
                  </p>
                </div>

                {/* Author Info matching mockup */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '14px',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#0c2338',
                    border: '1.5px solid #0c2338',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {review.avatarImg ? (
                      <img
                        src={review.avatarImg}
                        alt={review.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ color: '#ffffff', fontWeight: 'normal', fontSize: '0.85rem' }}>
                        {review.avatar || review.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <div style={{ fontWeight: 'normal', fontSize: '0.92rem', color: '#0c2338' }}>
                      {review.name}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 'normal' }}>
                      {review.trip}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Interactive Modal */}
      {isWriteModalOpen && (
        <WriteReviewModal
          isOpen={isWriteModalOpen}
          onClose={() => setIsWriteModalOpen(false)}
          onSubmitReview={handleAddReview}
        />
      )}
    </section>
  );
};
