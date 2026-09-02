import { Vehicle, BookingFormData } from '@/types';
import { vehiclesData } from '@/data/vehicles';

export interface PriceCalculationResult {
  baseAmount: number;
  driverAllowance: number;
  estimatedTollTaxes: number;
  addOnsAmount: number;
  totalEstimate: number;
  estimatedDistanceKm: number;
  totalDays: number;
  breakdownNotes: string[];
}

// Distance map for popular routes (one-way km)
const routeDistanceMap: Record<string, number> = {
  mahabaleshwar: 125,
  panchgani: 105,
  goa: 460,
  shirdi: 205,
  mumbai: 155,
  'mumbai airport': 165,
  lonavala: 70,
  khandala: 75,
  alibaug: 145,
  kolhapur: 235,
  nashik: 215,
  trimbakeshwar: 240,
  lavasa: 60,
  aurangabad: 235,
  sambhajinagar: 235,
  satara: 115,
  solapur: 250,
  hyderabad: 560,
  bangalore: 840,
};

function getRouteDistance(pickup = '', drop = ''): number {
  const cleanDrop = drop.toLowerCase().trim();
  for (const [key, km] of Object.entries(routeDistanceMap)) {
    if (cleanDrop.includes(key)) {
      return km;
    }
  }
  return 150; // default estimated one-way km
}

export function calculateEstimatedPrice(formData: Partial<BookingFormData>): PriceCalculationResult {
  let baseAmount = 0;
  let driverAllowance = 0;
  let estimatedTollTaxes = 0;
  let addOnsAmount = 0;
  const breakdownNotes: string[] = [];

  const vehicle = vehiclesData.find(v => v.id === formData.selectedVehicleId) || vehiclesData[0];

  // Calculate Days
  let days = 1;
  if (formData.pickupDate && formData.returnDate && formData.tripType === 'outstation_roundtrip') {
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      days = Math.max(1, diffDays);
    }
  }

  // Calculate Add-ons
  if (formData.addOns) {
    if (formData.addOns.childSeat) {
      addOnsAmount += 400;
      breakdownNotes.push('Child Safety Seat: ₹400');
    }
    if (formData.addOns.roofCarrier) {
      addOnsAmount += 500;
      breakdownNotes.push('Luggage Roof Carrier: ₹500');
    }
    if (formData.addOns.petFriendly) {
      addOnsAmount += 350;
      breakdownNotes.push('Pet Sanitized Cab: ₹350');
    }
  }

  const oneWayKm = getRouteDistance(formData.pickupCity, formData.dropCity);
  let totalDistanceKm = 0;

  switch (formData.tripType) {
    case 'local_rental': {
      let hoursMultiplier = 1;
      let hoursText = '8 Hours / 80 KM';
      totalDistanceKm = 80;

      if (formData.rentalPackageHours === '4hr40km') {
        hoursMultiplier = 0.65;
        hoursText = '4 Hours / 40 KM';
        totalDistanceKm = 40;
      } else if (formData.rentalPackageHours === '12hr120km') {
        hoursMultiplier = 1.45;
        hoursText = '12 Hours / 120 KM';
        totalDistanceKm = 120;
      }

      baseAmount = Math.round(vehicle.baseFarePerDay * 0.7 * hoursMultiplier);
      driverAllowance = 250;
      breakdownNotes.push(`Local City Rental: ${vehicle.name} (${hoursText})`);
      breakdownNotes.push(`Local Driver Allowance: ₹${driverAllowance}`);
      break;
    }

    case 'airport_transfer': {
      totalDistanceKm = 60;
      baseAmount = Math.max(999, Math.round(vehicle.pricePerKm * 50));
      driverAllowance = 150;
      estimatedTollTaxes = 150;
      breakdownNotes.push(`Airport Transfer: ${vehicle.name} (Flight-Tracked)`);
      breakdownNotes.push(`Airport Entry & Parking Estimate: ₹${estimatedTollTaxes}`);
      break;
    }

    case 'outstation_oneway': {
      totalDistanceKm = Math.max(vehicle.minKmPerDay || 200, oneWayKm);
      baseAmount = totalDistanceKm * vehicle.pricePerKm;
      driverAllowance = vehicle.driverAllowancePerDay;
      estimatedTollTaxes = Math.round(totalDistanceKm * 1.5);
      breakdownNotes.push(`Outstation One-Way (~${totalDistanceKm} KM billed @ ₹${vehicle.pricePerKm}/km)`);
      breakdownNotes.push(`Driver Day Allowance: ₹${driverAllowance}`);
      breakdownNotes.push(`Estimated Toll & Border Tax: ₹${estimatedTollTaxes}`);
      break;
    }

    case 'outstation_roundtrip':
    default: {
      const minDailyKm = vehicle.minKmPerDay || 250;
      const actualDistance = oneWayKm * 2;
      const minBillableKm = minDailyKm * days;
      totalDistanceKm = Math.max(actualDistance, minBillableKm);

      baseAmount = totalDistanceKm * vehicle.pricePerKm;
      driverAllowance = vehicle.driverAllowancePerDay * days;
      estimatedTollTaxes = 350 * days;

      breakdownNotes.push(`Outstation Roundtrip (${days} Day(s), ~${totalDistanceKm} KM @ ₹${vehicle.pricePerKm}/km)`);
      breakdownNotes.push(`Driver Allowance (${days} days @ ₹${vehicle.driverAllowancePerDay}/day): ₹${driverAllowance}`);
      breakdownNotes.push(`Estimated Tolls & Taxes: ₹${estimatedTollTaxes}`);
      break;
    }
  }

  const totalEstimate = baseAmount + driverAllowance + estimatedTollTaxes + addOnsAmount;

  return {
    baseAmount,
    driverAllowance,
    estimatedTollTaxes,
    addOnsAmount,
    totalEstimate,
    estimatedDistanceKm: totalDistanceKm,
    totalDays: days,
    breakdownNotes,
  };
}
