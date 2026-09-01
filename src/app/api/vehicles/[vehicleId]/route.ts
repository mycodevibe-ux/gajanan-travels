import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const imageMap: Record<string, string> = {
  'swift-dzire': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\019ffd7b-ec6d-4960-82be-a3e576829f8c\\white_swift_dzire_1788251432290.jpg',
  'ertiga': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\019ffd7b-ec6d-4960-82be-a3e576829f8c\\white_maruti_ertiga_1788251450479.jpg',
  'innova-crysta': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\019ffd7b-ec6d-4960-82be-a3e576829f8c\\white_innova_crysta_1788251468237.jpg',
  'tata-17-seater': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\019ffd7b-ec6d-4960-82be-a3e576829f8c\\white_tempo_traveller_17_1788251488711.jpg',
  'tata-20-seater': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\019ffd7b-ec6d-4960-82be-a3e576829f8c\\white_tourist_bus_20_1788251505865.jpg',
};

export async function GET(
  request: Request,
  { params }: { params: { vehicleId: string } }
) {
  const vehicleId = params.vehicleId;
  const imagePath = imageMap[vehicleId];

  if (imagePath && fs.existsSync(imagePath)) {
    try {
      const buffer = fs.readFileSync(imagePath);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch (e) {
      console.error('Error reading vehicle image', e);
    }
  }

  // Fallback to high-res white cars
  return NextResponse.redirect('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80');
}
