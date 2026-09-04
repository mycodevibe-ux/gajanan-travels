import { siteConfig } from '@/data/siteConfig';
import { BookingFormData } from '@/types';

export function createWhatsAppBookingUrl(
  formData: Partial<BookingFormData>,
  vehicleName?: string,
  packageName?: string,
  estimatedPrice?: number
): string {
  const phone = siteConfig.whatsappNumber;

  let message = `*Gajanan Tours & Travels - Booking Inquiry*\n`;
  if (formData.fullName) {
    message += `👤 *Name:* ${formData.fullName}\n`;
  }
  if (formData.phone) {
    message += `📱 *Phone:* ${formData.phone}\n`;
  }
  if (vehicleName) {
    message += `🚗 *Vehicle:* ${vehicleName}\n`;
  }
  if (formData.pickupCity) {
    message += `📍 *Pickup:* ${formData.pickupCity}\n`;
  }
  if (formData.dropCity && formData.tripType !== 'local_rental') {
    message += `🎯 *Drop:* ${formData.dropCity}\n`;
  }
  if (formData.tripType) {
    const tripNames: Record<string, string> = {
      outstation_roundtrip: 'Roundtrip',
      outstation_oneway: 'One-Way Drop',
      local_rental: 'Local City Rental',
    };
    message += `🧭 *Trip:* ${tripNames[formData.tripType] || formData.tripType}\n`;
  }
  if (formData.pickupDate) {
    message += `📅 *Date:* ${formData.pickupDate}${formData.returnDate && formData.tripType === 'outstation_roundtrip' && formData.returnDate !== formData.pickupDate ? ` to ${formData.returnDate}` : ''}\n`;
  }
  if (estimatedPrice && estimatedPrice > 0) {
    message += `💰 *Est. Total:* ₹${estimatedPrice.toLocaleString('en-IN')}\n`;
  }
  if (formData.specialRequests) {
    message += `📝 *Notes:* ${formData.specialRequests}\n`;
  }
  message += `\nPlease confirm availability & quotation. Thank you!`;

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
