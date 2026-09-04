import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ==========================================
// 1. OFFICIAL WHATSAPP ICON (ORIGINAL PATH)
// ==========================================
export const WhatsAppOriginalIcon: React.FC<IconProps & { fillBg?: boolean }> = ({
  size = 24,
  color = '#25D366',
  className,
  style,
  fillBg = false,
}) => {
  if (fillBg) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
      >
        <circle cx="12" cy="12" r="12" fill="#25D366" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.04 4.5C7.88 4.5 4.5 7.88 4.5 12.04C4.5 13.37 4.85 14.67 5.51 15.81L4.5 19.5L8.27 18.51C9.37 19.11 10.61 19.43 11.87 19.43C16.03 19.43 19.41 16.05 19.41 11.89C19.41 9.87 18.63 7.98 17.2 6.55C15.78 5.12 13.88 4.34 11.87 4.34L12.04 4.5ZM12.04 18.15C10.91 18.15 9.8 17.85 8.84 17.28L8.61 17.14L6.24 17.76L6.87 15.44L6.72 15.19C6.09 14.19 5.76 13.04 5.76 11.85C5.76 8.39 8.57 5.58 12.04 5.58C13.72 5.58 15.29 6.23 16.48 7.42C17.67 8.61 18.32 10.18 18.32 11.86C18.32 15.33 15.51 18.15 12.04 18.15ZM15.49 13.75C15.3 13.66 14.38 13.2 14.21 13.14C14.04 13.08 13.91 13.05 13.78 13.24C13.66 13.43 13.29 13.86 13.18 13.99C13.07 14.11 12.96 14.13 12.77 14.04C12.58 13.94 11.97 13.74 11.24 13.1C10.68 12.6 10.3 11.98 10.19 11.79C10.08 11.6 10.18 11.5 10.28 11.4C10.36 11.32 10.47 11.18 10.56 11.07C10.66 10.97 10.69 10.89 10.75 10.76C10.81 10.64 10.78 10.53 10.74 10.43C10.69 10.34 10.32 9.43 10.16 9.05C10.01 8.69 9.86 8.73 9.75 8.73C9.64 8.73 9.52 8.72 9.39 8.72C9.26 8.72 9.06 8.77 8.88 8.96C8.71 9.14 8.23 9.6 8.23 10.54C8.23 11.47 8.91 12.37 9 12.49C9.1 12.62 10.34 14.52 12.23 15.34C12.68 15.54 13.03 15.65 13.31 15.74C13.76 15.88 14.17 15.86 14.5 15.81C14.86 15.76 15.61 15.36 15.77 14.92C15.93 14.48 15.93 14.1 15.88 14.02C15.83 13.94 15.71 13.89 15.49 13.75Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.29C4.24 14.97 3.81 13.46 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.1 13.65 14.88 13.57C14.65 13.49 14.49 13.45 14.32 13.7C14.16 13.95 13.68 14.52 13.53 14.69C13.39 14.85 13.24 14.87 12.99 14.75C12.74 14.62 11.94 14.36 10.99 13.52C10.25 12.86 9.75 12.05 9.61 11.8C9.46 11.55 9.59 11.42 9.72 11.29C9.83 11.18 9.97 11 10.09 10.86C10.22 10.72 10.26 10.62 10.34 10.45C10.42 10.29 10.38 10.14 10.32 10.02C10.26 9.9 9.77 8.7 9.56 8.21C9.37 7.73 9.17 7.79 9.02 7.78C8.88 7.78 8.72 7.77 8.55 7.77C8.39 7.77 8.12 7.83 7.89 8.08C7.67 8.32 7.03 8.92 7.03 10.15C7.03 11.37 7.92 12.55 8.04 12.71C8.17 12.88 9.79 15.37 12.27 16.44C12.86 16.7 13.32 16.85 13.68 16.96C14.27 17.15 14.81 17.12 15.24 17.06C15.71 16.99 16.7 16.46 16.9 15.89C17.11 15.31 17.11 14.82 17.05 14.71C16.98 14.61 16.82 14.54 16.56 14.37Z"
        fill={color}
      />
    </svg>
  );
};

// ==========================================
// 2. HIGH QUALITY VEHICLE SVG ICONS
// ==========================================

// 1. Sedan Icon (Swift Dzire)
export const SedanIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Aerodynamic Sedan Body Line */}
    <path
      d="M3 16.5L4.8 11.2C5.2 9.9 6.3 9 7.7 9H17.8C19.1 9 20.3 9.8 20.8 11.1L23.2 16.5M2 16.5H26V20.5C26 21.05 25.55 21.5 25 21.5H23M2 16.5V20.5C2 21.05 2.45 21.5 3 21.5H5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Windows & Pillar */}
    <path
      d="M7.5 10H12.5V16.5H5.8L7.5 10Z"
      fill={color}
      fillOpacity="0.15"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 10H17.5L20 16.5H13.5V10Z"
      fill={color}
      fillOpacity="0.15"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    {/* Wheels with Alloy detail */}
    <circle cx="7.5" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="7.5" cy="21.5" r="1" fill={color} />
    <circle cx="20.5" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="20.5" cy="21.5" r="1" fill={color} />
    {/* Front Headlight & Door Line */}
    <path d="M23 17.5H25" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M13 16.5V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 2. MUV / SUV 7-Seater Icon (Ertiga)
export const MuvIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Roof rails */}
    <path d="M7 6.5H21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 6.5V8M19 6.5V8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    {/* MUV High Body */}
    <path
      d="M2.5 16.5L4.5 9.2C4.9 8.2 5.8 7.5 6.9 7.5H20.2C21.3 7.5 22.2 8.3 22.6 9.3L25.5 16.5M2 16.5H26V20.8C26 21.4 25.5 21.8 25 21.8H23M2 16.5V20.8C2 21.4 2.5 21.8 3 21.8H5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* 3-Row Windows */}
    <path
      d="M7 9H11.5V16.5H5L7 9Z"
      fill={color}
      fillOpacity="0.15"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 9H17V16.5H12.5V9Z"
      fill={color}
      fillOpacity="0.15"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M18 9H20.2L22.5 16.5H18V9Z"
      fill={color}
      fillOpacity="0.15"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    {/* Wheels */}
    <circle cx="7.5" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="7.5" cy="21.5" r="1" fill={color} />
    <circle cx="20.5" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="20.5" cy="21.5" r="1" fill={color} />
  </svg>
);

// 3. Luxury SUV / MPV Icon (Innova Crysta)
export const LuxurySuvIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Crown / Luxury Badge Accent */}
    <path
      d="M2.5 16L4.8 8.8C5.2 7.6 6.3 6.8 7.6 6.8H20.4C21.7 6.8 22.8 7.6 23.2 8.8L25.8 16M2 16H26V21C26 21.6 25.5 22 25 22H23M2 16V21C2 21.6 2.5 22 3 22H5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Sleek Tinted Windows */}
    <path
      d="M7.5 8.2H12.5V15.5H5.5L7.5 8.2Z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 8.2H18V15.5H13.5V8.2Z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M19 8.2H20.5L23 15.5H19V8.2Z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    {/* Front Chrome Bumper Grill Line */}
    <path d="M23.5 17.5H25.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M10 18.5H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    {/* Wheels */}
    <circle cx="7.5" cy="21.5" r="3" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="7.5" cy="21.5" r="1.2" fill={color} />
    <circle cx="20.5" cy="21.5" r="3" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="20.5" cy="21.5" r="1.2" fill={color} />
  </svg>
);

// 4. Tempo Traveller / 17 Seater Van Icon (Force TT)
export const TempoTravellerIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Roof Luggage Rack */}
    <path d="M4 3.5H20M6 3.5V5M11 3.5V5M16 3.5V5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    {/* High Van Body */}
    <path
      d="M2.5 17V6.5C2.5 5.7 3.2 5 4 5H20.5C21.4 5 22.1 5.6 22.4 6.5L25.5 14.5C25.8 15.2 26 16 26 16.8V21C26 21.6 25.5 22 25 22H23M2.5 17H26M2.5 17V21C2.5 21.6 3 22 3.6 22H5.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Passenger Windows */}
    <rect x="5.5" y="7.5" width="3.5" height="5.5" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.3" />
    <rect x="10.5" y="7.5" width="3.5" height="5.5" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.3" />
    <rect x="15.5" y="7.5" width="3.5" height="5.5" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.3" />
    {/* Front Windshield */}
    <path d="M20.5 7.5L23.5 14H20.5V7.5Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    {/* Wheels */}
    <circle cx="8" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="8" cy="21.5" r="1" fill={color} />
    <circle cx="20.5" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="20.5" cy="21.5" r="1" fill={color} />
  </svg>
);

// 5. Luxury Tourist Bus / Coach Icon (Tata 20+ Seater)
export const TouristBusIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Roof AC Pod */}
    <rect x="9" y="2.5" width="10" height="2" rx="1" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.3" />
    {/* Heavy Coach Body */}
    <path
      d="M2.5 17V5.5C2.5 4.7 3.2 4 4 4H22.5C23.6 4 24.6 4.8 24.8 6L25.8 15.5C25.9 16 26 16.5 26 17V21C26 21.6 25.5 22 25 22H23M2.5 17H26M2.5 17V21C2.5 21.6 3 22 3.6 22H5.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Panoramic Passenger Windows */}
    <rect x="5" y="6.5" width="3.2" height="6.5" rx="0.8" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" />
    <rect x="9.5" y="6.5" width="3.2" height="6.5" rx="0.8" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" />
    <rect x="14" y="6.5" width="3.2" height="6.5" rx="0.8" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" />
    <rect x="18.5" y="6.5" width="4.5" height="6.5" rx="0.8" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" />
    {/* Wheels */}
    <circle cx="8" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="8" cy="21.5" r="1" fill={color} />
    <circle cx="20.5" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="20.5" cy="21.5" r="1" fill={color} />
  </svg>
);

// 6. Force Urbania Luxury Executive Van Icon
export const UrbaniaIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Aerodynamic Van Body */}
    <path
      d="M2.5 16.5V6C2.5 5 3.3 4.2 4.3 4.2H19.5C20.5 4.2 21.4 4.9 21.7 5.8L25.2 14.5C25.7 15.2 26 16 26 16.8V21C26 21.6 25.5 22 25 22H23M2.5 16.5H26M2.5 16.5V21C2.5 21.6 3 22 3.6 22H5.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Modern Flush Windows */}
    <rect x="5.5" y="6.5" width="4" height="6" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.3" />
    <rect x="11" y="6.5" width="4" height="6" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.3" />
    <path d="M16.5 6.5H19.5L22.5 13.5H16.5V6.5Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    {/* Wheels */}
    <circle cx="8" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="8" cy="21.5" r="1" fill={color} />
    <circle cx="20.5" cy="21.5" r="2.8" stroke={color} strokeWidth="2" fill="#ffffff" />
    <circle cx="20.5" cy="21.5" r="1" fill={color} />
  </svg>
);

/**
 * Returns the matching vehicle icon based on vehicle id or category
 */
export function getVehicleIcon(vehicleIdOrCategory: string, size = 20, color = '#1b4332') {
  const key = (vehicleIdOrCategory || '').toLowerCase();
  
  if (key.includes('swift') || key.includes('dzire') || key === 'sedan') {
    return <SedanIcon size={size} color={color} />;
  }
  if (key.includes('ertiga') || key.includes('muv')) {
    return <MuvIcon size={size} color={color} />;
  }
  if (key.includes('innova') || key.includes('crysta') || key.includes('luxury') || key.includes('suv')) {
    return <LuxurySuvIcon size={size} color={color} />;
  }
  if (key.includes('tempo') || key.includes('17') || key.includes('traveller')) {
    return <TempoTravellerIcon size={size} color={color} />;
  }
  if (key.includes('bus') || key.includes('20') || key.includes('32') || key.includes('40') || key.includes('coach')) {
    return <TouristBusIcon size={size} color={color} />;
  }
  if (key.includes('urbania')) {
    return <UrbaniaIcon size={size} color={color} />;
  }

  return <SedanIcon size={size} color={color} />;
}
