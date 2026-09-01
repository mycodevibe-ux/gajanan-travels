import { ServiceItem } from '@/types';

export const servicesData: ServiceItem[] = [
  {
    id: 'outstation-tours',
    title: 'Outstation Road Trips & Multi-City Tours',
    shortDesc: 'One-way and roundtrip tourist cab rentals across Maharashtra and India.',
    fullDesc: 'Experience the absolute freedom of highway road trips with dedicated clean tourist cabs, experienced chauffeurs who know every scenic pitstop, transparent per-km rates, and zero hidden toll surcharges.',
    iconName: 'Compass',
    badge: 'Most Popular',
    features: [
      'Flexible itineraries & custom detour stops',
      'All interstate tax & toll options included',
      'Night-driving certified background-checked chauffeurs',
      'Zero cancellation charge up to 6 hours before trip'
    ],
    priceStarting: '₹12 / km',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'local-hourly-rental',
    title: 'Local City Sightseeing & Hourly Rental',
    shortDesc: 'Rent a dedicated cab by the hour (4hr/40km, 8hr/80km, 12hr/120km) for unlimited city stops.',
    fullDesc: 'Explore historic monuments, shopping districts, temples, and meetings across the city at your own pace without booking multiple short rides. Your chauffeur stays parked waiting for you at every stop.',
    iconName: 'Clock',
    badge: 'Unlimited Stops',
    features: [
      '4-Hour / 8-Hour / 12-Hour flexible packages',
      'Driver acts as knowledgeable local city guide',
      'Hassle-free parking handling in congested markets',
      'Ideal for shopping sprees, family events, and city tours'
    ],
    priceStarting: '₹1,499 / 8 hrs',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'tempo-group-travel',
    title: 'Tempo Traveller & Tourist Bus Charters',
    shortDesc: '12 to 20-seater luxury Maharaja tempo travellers and tourist coaches for group excursions.',
    fullDesc: 'Planning a family reunion, corporate offsite, school excursion, or pilgrimage group tour? Our fleet of 17 and 20-seater Force and Tata buses offer pushback seats, individual AC vents, smart TV entertainment, and large luggage space.',
    iconName: 'Users',
    badge: 'Family & Group',
    features: [
      '2x1 Maharaja Reclining comfortable seats',
      'High power AC vents for every row',
      'Dual expert commercial drivers for long trips',
      'Ample under-belly and rooftop luggage capacity'
    ],
    priceStarting: '₹26 / km',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80',
  },
];
