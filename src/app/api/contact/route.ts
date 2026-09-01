import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, tripType, message, pickupCity, dropCity, vehicleName, pickupDate, estimatedFare } = data;

    // Dispatch to FormSubmit.co
    const formSubmitPromise = fetch('https://formsubmit.co/ajax/mycodevibe@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `🚗 New Cab Booking Inquiry - ${name || 'Customer'} (${phone || ''})`,
        _template: 'table',
        _captcha: 'false',
        'Customer Name': name || 'N/A',
        'Phone Number': phone || 'N/A',
        'Customer Email': email || 'N/A',
        'Service / Trip Type': tripType || 'Outstation Trip',
        'Pickup Location': pickupCity || 'N/A',
        'Drop Destination': dropCity || 'N/A',
        'Selected Vehicle': vehicleName || 'N/A',
        'Pickup Date': pickupDate || 'N/A',
        'Estimated Fare': estimatedFare ? `Rs. ${estimatedFare}` : 'N/A',
        'Customer Message / Notes': message || 'None',
      }),
    });

    const [formSubmitRes] = await Promise.allSettled([formSubmitPromise]);
    
    let result = null;
    if (formSubmitRes.status === 'fulfilled') {
      try {
        result = await formSubmitRes.value.json();
      } catch (e) {
        result = { status: 'dispatched' };
      }
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error sending email lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
