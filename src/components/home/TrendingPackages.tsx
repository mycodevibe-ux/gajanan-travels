'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import { tourPackagesData } from '@/data/packages';
import { TourPackage } from '@/types';
import { PackageCard } from '@/components/packages/PackageCard';

interface TrendingPackagesProps {
  onOpenDetails: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export const TrendingPackages: React.FC<TrendingPackagesProps> = ({
  onOpenDetails,
  onBookPackage,
}) => {
  const featuredPackages = tourPackagesData.slice(0, 3);

  return (
    <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container-custom">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Sparkles size={14} />
            <span>Hand-Crafted Itineraries</span>
          </div>
          <h2 className="section-title">
            Trending Holiday Tour Packages
          </h2>
          <p className="section-subtitle">
            All-inclusive vacations featuring private AC cabs, vetted 4-star hotel stays, daily breakfast, and customized sightseeing.
          </p>
        </div>

        {/* Packages 3-Grid */}
        <div className="grid-3" style={{ marginBottom: '40px' }}>
          {featuredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onOpenDetails={onOpenDetails}
              onBookPackage={onBookPackage}
            />
          ))}
        </div>

        {/* Explore All Packages CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/packages"
            className="btn btn-gold btn-lg"
            style={{ display: 'inline-flex', gap: '8px' }}
          >
            <span>Explore All Holiday Packages</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
