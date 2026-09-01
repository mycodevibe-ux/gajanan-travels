import { siteConfig } from '@/data/siteConfig';
import { BookingFormData } from '@/types';

export function createWhatsAppBookingUrl(
  formData: Partial<BookingFormData>,
  vehicleName?: string,
  packageName?: string,
  estimatedPrice?: number
): string {
  const phone = siteConfig.whatsappNumber;

  let message = `Hello *${siteConfig.name}*! 👋\n\n`;
  message += `I would like to inquire/book a ride with you:\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;

  if (packageName) {
    message += `🗺️ *Package:* ${packageName}\n`;
  }

  if (vehicleName) {
    message += `🚘 *Vehicle:* ${vehicleName}\n`;
  }

  if (formData.tripType) {
    const tripNames: Record<string, string> = {
      outstation_roundtrip: 'Outstation Roundtrip',
      outstation_oneway: 'Outstation One-Way Drop',
      local_rental: 'Local City Rental',
      airport_transfer: 'Airport Transfer',
      tour_package: 'Tour Package',
    };
    message += `🧭 *Trip Type:* ${tripNames[formData.tripType] || formData.tripType}\n`;
  }

  if (formData.pickupCity) {
    message += `🚩 *Pickup:* ${formData.pickupCity}\n`;
  }

  if (formData.dropCity && formData.tripType !== 'local_rental') {
    message += `🏁 *Destination:* ${formData.dropCity}\n`;
  }

  if (formData.pickupDate) {
    message += `📅 *Pickup Date:* ${formData.pickupDate} ${formData.pickupTime ? `at ${formData.pickupTime}` : ''}\n`;
  }

  if (formData.returnDate && formData.tripType === 'outstation_roundtrip') {
    message += `🔄 *Return Date:* ${formData.returnDate}\n`;
  }

  if (formData.rentalPackageHours && formData.tripType === 'local_rental') {
    message += `⏱️ *Package Duration:* ${formData.rentalPackageHours}\n`;
  }

  if (formData.passengers) {
    message += `👥 *Passengers:* ${formData.passengers} Persons\n`;
  }

  if (estimatedPrice && estimatedPrice > 0) {
    message += `💰 *Estimated Fare:* ₹${estimatedPrice.toLocaleString('en-IN')}\n`;
  }

  if (formData.fullName) {
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Customer Name:* ${formData.fullName}\n`;
    if (formData.phone) {
      message += `📱 *Contact Number:* ${formData.phone}\n`;
    }
  }

  if (formData.specialRequests) {
    message += `📝 *Notes:* ${formData.specialRequests}\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Please confirm driver availability & total quotation. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function createVehicleInquiryUrl(vehicleName: string, ratePerKm?: number): string {
  const phone = siteConfig.whatsappNumber;
  let message = `Hello *${siteConfig.name}*! 👋\n\n`;
  message += `I am interested in booking *${vehicleName}*`;
  if (ratePerKm) {
    message += ` (₹${ratePerKm}/km)`;
  }
  message += `.\n\nPlease share vehicle availability, total pricing, and chauffeur details.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function createPackageInquiryUrl(packageTitle: string, duration?: string, pricePerPerson?: number): string {
  const phone = siteConfig.whatsappNumber;
  let message = `Hello *${siteConfig.name}*! 👋\n\n`;
  message += `I am interested in the *${packageTitle}* tour package`;
  if (duration) {
    message += ` (${duration})`;
  }
  if (pricePerPerson) {
    message += ` starting at ₹${pricePerPerson.toLocaleString('en-IN')}/person`;
  }
  message += `.\n\nPlease share the detailed itinerary, customized dates, and booking process.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function createRouteInquiryUrl(from: string, to: string, distance?: number, price?: number): string {
  const phone = siteConfig.whatsappNumber;
  let message = `Hello *${siteConfig.name}*! 👋\n\n`;
  message += `I am interested in booking a ride for *${from} → ${to}*`;
  if (distance) {
    message += ` (${distance} km)`;
  }
  if (price) {
    message += ` (Est. ₹${price.toLocaleString('en-IN')})`;
  }
  message += `.\n\nPlease share available cab options and final rate.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function createGeneralInquiryUrl(topic = 'General Booking Inquiry'): string {
  const text = `Hello ${siteConfig.name}! 👋 I am inquiring about: ${topic}. Please connect with me.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
