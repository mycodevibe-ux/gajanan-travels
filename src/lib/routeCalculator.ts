/**
 * Route Distance, Time & Toll calculation engine for Maharashtra and interstate routes
 */

export interface RouteEstimate {
  distanceKm: number;
  durationText: { en: string; mr: string };
  durationHours: number;
  tollEstimate: number;
  routeTitle: string;
}

// Comprehensive database of destinations from Pune / Maharashtra
const knownRoutes: Record<string, { km: number; durationHours: number; toll: number }> = {
  // Konkan & Coastal
  'dapoli': { km: 185, durationHours: 4.5, toll: 160 },
  'ganpatipule': { km: 325, durationHours: 7.0, toll: 280 },
  'ratnagiri': { km: 305, durationHours: 6.5, toll: 260 },
  'alibaug': { km: 145, durationHours: 3.5, toll: 210 },
  'murud': { km: 160, durationHours: 4.0, toll: 210 },
  'malvan': { km: 390, durationHours: 8.0, toll: 380 },
  'tarkarli': { km: 395, durationHours: 8.0, toll: 380 },
  'goa': { km: 460, durationHours: 9.0, toll: 580 },
  'north goa': { km: 450, durationHours: 9.0, toll: 580 },
  'south goa': { km: 470, durationHours: 9.5, toll: 600 },
  'panaji': { km: 455, durationHours: 9.0, toll: 580 },
  'calangute': { km: 455, durationHours: 9.0, toll: 580 },
  'baga': { km: 455, durationHours: 9.0, toll: 580 },

  // Hill Stations & Weekend Getaways
  'mahabaleshwar': { km: 125, durationHours: 3.0, toll: 120 },
  'panchgani': { km: 105, durationHours: 2.5, toll: 120 },
  'lonavala': { km: 68, durationHours: 1.5, toll: 150 },
  'khandala': { km: 72, durationHours: 1.5, toll: 150 },
  'lavasa': { km: 58, durationHours: 1.75, toll: 0 },
  'maval': { km: 45, durationHours: 1.2, toll: 0 },
  'mulshi': { km: 45, durationHours: 1.2, toll: 0 },
  'matheran': { km: 120, durationHours: 3.0, toll: 200 },
  'igatpuri': { km: 245, durationHours: 5.0, toll: 280 },

  // Pilgrimage & Temples
  'shirdi': { km: 205, durationHours: 4.5, toll: 230 },
  'shani shingnapur': { km: 165, durationHours: 3.5, toll: 180 },
  'bhimashankar': { km: 110, durationHours: 3.0, toll: 80 },
  'trimbakeshwar': { km: 240, durationHours: 5.0, toll: 260 },
  'nashik': { km: 215, durationHours: 4.5, toll: 250 },
  'kolhapur': { km: 235, durationHours: 4.5, toll: 270 },
  'mahalaxmi': { km: 235, durationHours: 4.5, toll: 270 },
  'pandharpur': { km: 215, durationHours: 4.5, toll: 190 },
  'tuljapur': { km: 300, durationHours: 6.0, toll: 290 },
  'akkalkot': { km: 290, durationHours: 6.0, toll: 270 },
  'shegaon': { km: 450, durationHours: 9.0, toll: 480 },
  'jejuri': { km: 50, durationHours: 1.2, toll: 60 },
  'ashtavinayak': { km: 350, durationHours: 8.0, toll: 320 },

  // Cities & Major Hubs
  'mumbai': { km: 155, durationHours: 3.0, toll: 320 },
  'mumbai airport': { km: 165, durationHours: 3.5, toll: 350 },
  'navi mumbai': { km: 130, durationHours: 2.5, toll: 280 },
  'thane': { km: 160, durationHours: 3.2, toll: 320 },
  'satara': { km: 115, durationHours: 2.2, toll: 120 },
  'solapur': { km: 250, durationHours: 5.0, toll: 240 },
  'sangli': { km: 230, durationHours: 4.5, toll: 240 },
  'miraj': { km: 240, durationHours: 4.8, toll: 250 },
  'aurangabad': { km: 235, durationHours: 5.0, toll: 260 },
  'chhatrapati sambhajinagar': { km: 235, durationHours: 5.0, toll: 260 },
  'sambhajinagar': { km: 235, durationHours: 5.0, toll: 260 },
  'jalgaon': { km: 380, durationHours: 8.0, toll: 410 },
  'dhule': { km: 340, durationHours: 7.0, toll: 360 },
  'ahmednagar': { km: 125, durationHours: 2.5, toll: 110 },
  'nagar': { km: 125, durationHours: 2.5, toll: 110 },
  'nagpur': { km: 710, durationHours: 12.0, toll: 850 },
  'nanded': { km: 440, durationHours: 9.0, toll: 480 },
  'hyderabad': { km: 560, durationHours: 10.5, toll: 650 },
  'bangalore': { km: 840, durationHours: 14.0, toll: 980 },
  'surat': { km: 415, durationHours: 8.0, toll: 540 },
  'ahmedabad': { km: 660, durationHours: 12.0, toll: 820 },
};

/**
 * Calculates estimated distance, duration, and toll for given pickup and destination
 */
export function getRouteEstimate(pickup = '', destination = ''): RouteEstimate {
  const cleanDest = (destination || '').toLowerCase().trim();
  const cleanPickup = (pickup || '').toLowerCase().trim();

  // Look for match in known routes
  let matchedKey: string | null = null;
  for (const key of Object.keys(knownRoutes)) {
    if (cleanDest.includes(key) || key.includes(cleanDest)) {
      matchedKey = key;
      break;
    }
  }

  // If not matched by destination, try pickup if destination is Pune
  if (!matchedKey && (cleanDest.includes('pune') || cleanDest === '')) {
    for (const key of Object.keys(knownRoutes)) {
      if (cleanPickup.includes(key) || key.includes(cleanPickup)) {
        matchedKey = key;
        break;
      }
    }
  }

  let distanceKm = 150;
  let durationHours = 3.5;
  let tollEstimate = 150;

  if (matchedKey && knownRoutes[matchedKey]) {
    const data = knownRoutes[matchedKey];
    distanceKm = data.km;
    durationHours = data.durationHours;
    tollEstimate = data.toll;
  } else if (cleanDest.length > 2) {
    // Intelligent heuristic estimation for unknown destinations
    // Average speed ~45-50 km/h in Maharashtra terrain
    distanceKm = 160;
    durationHours = 3.5;
    tollEstimate = Math.round(distanceKm * 0.9);
  }

  // Local route adjustment if both pickup & destination are within Pune
  const puneKeywords = ['katraj', 'swargate', 'kothrud', 'wakad', 'hinjewadi', 'hadapsar', 'vimannagar', 'baner', 'airport', 'shivajinagar', 'pimpri', 'chinchwad', 'kondhwa', 'kharadi'];
  const isPickupLocal = puneKeywords.some(k => cleanPickup.includes(k));
  const isDestLocal = puneKeywords.some(k => cleanDest.includes(k));

  if (isPickupLocal && isDestLocal && cleanDest.length > 0) {
    distanceKm = 28;
    durationHours = 1.0;
    tollEstimate = 0;
  }

  // Format hours and minutes
  const fullHours = Math.floor(durationHours);
  const minutes = Math.round((durationHours - fullHours) * 60);

  let durationEn = '';
  let durationMr = '';

  if (fullHours > 0 && minutes > 0) {
    durationEn = `~ ${fullHours} hr ${minutes} min`;
    durationMr = `~ ${fullHours} तास ${minutes} मिनिटे`;
  } else if (fullHours > 0) {
    durationEn = `~ ${fullHours} hrs`;
    durationMr = `~ ${fullHours} तास`;
  } else {
    durationEn = `~ ${minutes} mins`;
    durationMr = `~ ${minutes} मिनिटे`;
  }

  const pTitle = pickup ? (pickup.charAt(0).toUpperCase() + pickup.slice(1)) : 'Pune';
  const dTitle = destination ? (destination.charAt(0).toUpperCase() + destination.slice(1)) : 'Destination';

  return {
    distanceKm,
    durationHours,
    durationText: { en: durationEn, mr: durationMr },
    tollEstimate,
    routeTitle: `${pTitle} → ${dTitle}`,
  };
}

/**
 * Calculates estimated cab fare based on vehicle type, distance and number of days
 */
export function getCabFareEstimate(vehicleType: string, distanceKm: number, days: number = 1): number {
  let ratePerKm = 12; // Sedan default
  let minKmPerDay = 300;
  let driverAllowancePerDay = 350;

  const v = (vehicleType || '').toLowerCase();
  if (v.includes('suv') && !v.includes('luxury') && !v.includes('innova')) {
    ratePerKm = 15; // Ertiga
    driverAllowancePerDay = 400;
  } else if (v.includes('innova') || v.includes('luxury suv')) {
    ratePerKm = 18; // Innova Crysta
    driverAllowancePerDay = 400;
  } else if (v.includes('tempo') || v.includes('17')) {
    ratePerKm = 26; // Tempo 17
    driverAllowancePerDay = 500;
  } else if (v.includes('bus') || v.includes('20')) {
    ratePerKm = 32; // Bus 20
    driverAllowancePerDay = 600;
  } else if (v.includes('urbania')) {
    ratePerKm = 28; // Urbania
    driverAllowancePerDay = 500;
  }

  const validDays = Math.max(1, days);
  const minBillableKm = minKmPerDay * validDays;
  const actualKm = distanceKm * 2; // Roundtrip
  const billableKm = Math.max(minBillableKm, actualKm);
  return (billableKm * ratePerKm) + (driverAllowancePerDay * validDays);
}
