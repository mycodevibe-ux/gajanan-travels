import { siteConfig } from '@/data/siteConfig';
import { vehiclesData } from '@/data/vehicles';
import { tourPackagesData } from '@/data/packages';
import { faqsData } from '@/data/faqs';

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '₹₹ - ₹₹₹',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.5562',
      longitude: '77.1000',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.rating.score.toString(),
      reviewCount: siteConfig.rating.reviewsCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function getTourPackagesSchema() {
  return tourPackagesData.map((pkg) => ({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.subtitle,
    touristType: ['Family', 'Couples', 'Solo', 'Group'],
    offers: {
      '@type': 'Offer',
      price: pkg.pricePerPerson,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
    },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: pkg.itinerary.length,
      itemListElement: pkg.itinerary.map((day, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: day.title,
        description: day.description,
      })),
    },
  }));
}

export function getFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
