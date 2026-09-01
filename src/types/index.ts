export type VehicleCategory = 'All' | 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury' | 'Tempo' | 'Bus';

export interface Vehicle {
  id: string;
  name: string;
  category: Exclude<VehicleCategory, 'All'>;
  tagline: string;
  passengerCapacity: number;
  luggageCapacity: number;
  ac: boolean;
  fuelType: 'Diesel' | 'Petrol' | 'Electric' | 'CNG';
  transmission: 'Manual' | 'Automatic';
  pricePerKm: number;
  baseFarePerDay: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  extraHourRate: number;
  image: string;
  features: string[];
  popular: boolean;
  rating: number;
  reviewsCount: number;
}

export type PackageCategory = 'All' | 'Hills' | 'Heritage' | 'Beach' | 'Pilgrimage' | 'Wildlife' | 'Adventure';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  mealPlan: string;
  stay: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destination: string;
  region: string;
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  originalPrice: number;
  discountPercent: number;
  category: Exclude<PackageCategory, 'All'>;
  image: string;
  gallery: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  hotelTier: string;
  vehicleIncluded: string;
  rating: number;
  reviewsCount: number;
  popular: boolean;
}

export interface PopularRoute {
  id: string;
  fromCity: string;
  toCity: string;
  distanceKm: number;
  durationHours: number;
  startingPrice: number;
  tollIncluded: boolean;
  popularCab: string;
  bestTimeToVisit: string;
  image: string;
  keyAttractions: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  features: string[];
  priceStarting: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  tripType: string;
  vehicleBooked?: string;
  packageBooked?: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'pricing' | 'vehicles' | 'trips';
}

export type TripType = 
  | 'outstation_roundtrip' 
  | 'outstation_oneway' 
  | 'local_rental' 
  | 'airport_transfer' 
  | 'tour_package';

export interface BookingAddOns {
  childSeat: boolean;
  englishDriver: boolean;
  roofCarrier: boolean;
  petFriendly: boolean;
}

export interface BookingFormData {
  tripType: TripType;
  pickupCity: string;
  dropCity: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  rentalPackageHours?: '4hr40km' | '8hr80km' | '12hr120km';
  selectedVehicleId?: string;
  selectedPackageId?: string;
  passengers: number;
  luggage: number;
  fullName: string;
  phone: string;
  email: string;
  specialRequests: string;
  addOns: BookingAddOns;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  operatingHours: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
  stats: {
    happyCustomers: number;
    totalKmCovered: number;
    verifiedDrivers: number;
    destinations: number;
    fleetSize: number;
    yearsOfExperience: number;
    rating: number;
  };
  rating: {
    score: number;
    reviewsCount: number;
  };
}
