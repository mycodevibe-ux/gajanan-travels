'use client';

import React from 'react';
import { PackageCategory } from '@/types';
import { SlidersHorizontal } from 'lucide-react';

interface PackageFilterProps {
  selectedCategory: PackageCategory;
  onSelectCategory: (category: PackageCategory) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export const PackageFilter: React.FC<PackageFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalCount,
}) => {
  const categories: { label: string; value: PackageCategory }[] = [
    { label: 'All Packages', value: 'All' },
    { label: 'Hill Stations & Mist', value: 'Hills' },
    { label: 'Heritage & Forts', value: 'Heritage' },
    { label: 'Beaches & Coastal', value: 'Beach' },
    { label: 'Temple & Pilgrimage', value: 'Pilgrimage' },
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '14px',
      marginBottom: '28px',
      padding: '14px 18px',
      backgroundColor: '#ffffff',
      borderRadius: '14px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
      border: '1px solid #e2e8f0',
    }}>
      {/* Category Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => onSelectCategory(cat.value)}
              style={{
                padding: '7px 14px',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: 'normal',
                border: isSelected ? '1.5px solid #1b4332' : '1px solid #e2e8f0',
                backgroundColor: isSelected ? '#1b4332' : '#ffffff',
                color: isSelected ? '#ffffff' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Count & Sort */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
          Showing <strong>{totalCount}</strong> packages
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <SlidersHorizontal size={14} color="#64748b" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              color: '#0f172a',
              outline: 'none',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <option value="popular">Most Popular</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="duration">Duration (Days)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
