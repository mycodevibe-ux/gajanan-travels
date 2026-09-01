'use client';

import React from 'react';
import { VehicleCategory } from '@/types';
import { Car, Sparkles, SlidersHorizontal } from 'lucide-react';

interface VehicleFilterProps {
  selectedCategory: VehicleCategory;
  onSelectCategory: (category: VehicleCategory) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export const VehicleFilter: React.FC<VehicleFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalCount,
}) => {
  const categories: { label: string; value: VehicleCategory }[] = [
    { label: 'All Fleet', value: 'All' },
    { label: 'Sedans (4-Seat)', value: 'Sedan' },
    { label: 'SUVs & MUVs (7-Seat)', value: 'SUV' },
    { label: 'Tempo Travellers (12-17 Seat)', value: 'Tempo' },
    { label: 'Luxury VIP Convoys', value: 'Luxury' },
    { label: 'Tourist Buses (45-Seat)', value: 'Bus' },
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      marginBottom: '32px',
      padding: '16px 20px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
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
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.86rem',
                fontWeight: isSelected ? 700 : 500,
                border: isSelected ? '1.5px solid #059669' : '1px solid #e2e8f0',
                backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                color: isSelected ? '#047857' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sort By Dropdown & Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '0.84rem', color: '#64748b' }}>
          Showing <strong>{totalCount}</strong> vehicles
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <SlidersHorizontal size={14} color="#64748b" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.84rem',
              color: '#0f172a',
              outline: 'none',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <option value="popular">Most Popular</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="capacity">Seating Capacity</option>
          </select>
        </div>
      </div>
    </div>
  );
};
