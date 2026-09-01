import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/data/siteConfig';
import { getLocalBusinessSchema, getFaqSchema } from '@/lib/schema';

const baseUrl = siteConfig?.url ? siteConfig.url : 'https://gajanantravels.in';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Premier Tourist Vehicle Rental & Tour Packages Pune`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'gajanan travels pune',
    'pune tourist cab rental',
    'innova crysta rental pune',
    'tempo traveller hire pune',
    'pune to mahabaleshwar cab',
    'pune to goa tour cab',
    'pune to shirdi taxi',
    'outstation cab service pune',
    'pune to mumbai airport drop taxi',
    'tourist bus hire pune',
    'swargate cab booking',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    title: `${siteConfig.name} - Tourist Cabs & Outstation Packages`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Tourist Fleet`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Tourist Cabs & Tour Packages`,
    description: siteConfig.description,
    images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = getLocalBusinessSchema();
  const faqSchema = getFaqSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
