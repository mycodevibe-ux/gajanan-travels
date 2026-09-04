import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const imageMap: Record<string, string> = {
  'swift-dzire': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9ee3a423-dafc-4d08-9103-353559d89983\\swift_dzire_transparent_1788324291339.jpg',
  'ertiga': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9ee3a423-dafc-4d08-9103-353559d89983\\ertiga_transparent_1788324306358.jpg',
  'innova-crysta': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9ee3a423-dafc-4d08-9103-353559d89983\\innova_crysta_transparent_1788324321037.jpg',
  'tempo-17-seater-nonac': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9ee3a423-dafc-4d08-9103-353559d89983\\tempo_traveller_transparent_1788324336068.jpg',
  'tempo-17-seater-ac': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9ee3a423-dafc-4d08-9103-353559d89983\\tempo_traveller_transparent_1788324336068.jpg',
  'bus-20-seater-nonac': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9ee3a423-dafc-4d08-9103-353559d89983\\tourist_bus_transparent_1788324351105.jpg',
  'bus-20-seater-ac': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9ee3a423-dafc-4d08-9103-353559d89983\\tourist_bus_transparent_1788324351105.jpg',
  'bus-32-seater-nonac': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9ee3a423-dafc-4d08-9103-353559d89983\\tourist_bus_transparent_1788324351105.jpg',
  'bus-40-seater-nonac': 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9ee3a423-dafc-4d08-9103-353559d89983\\tourist_bus_transparent_1788324351105.jpg',
};

export function generateStaticParams() {
  return [
    { vehicleId: 'swift-dzire' },
    { vehicleId: 'ertiga' },
    { vehicleId: 'innova-crysta' },
    { vehicleId: 'tempo-17-seater-nonac' },
    { vehicleId: 'tempo-17-seater-ac' },
    { vehicleId: 'bus-20-seater-nonac' },
    { vehicleId: 'bus-20-seater-ac' },
    { vehicleId: 'bus-32-seater-nonac' },
    { vehicleId: 'bus-40-seater-nonac' },
  ];
}

export async function GET(
  request: Request,
  { params }: { params: { vehicleId: string } }
) {
  const vehicleId = params.vehicleId;
  const imagePath = imageMap[vehicleId];

  // Try to copy to public/images/vehicles directory if accessible
  try {
    const vehiclesDir = path.join(process.cwd(), 'public', 'images', 'vehicles');
    if (!fs.existsSync(vehiclesDir)) {
      fs.mkdirSync(vehiclesDir, { recursive: true });
    }
    const publicDest = path.join(vehiclesDir, `${vehicleId}.jpg`);
    if (imagePath && fs.existsSync(imagePath) && !fs.existsSync(publicDest)) {
      fs.copyFileSync(imagePath, publicDest);
    }
  } catch (err) {
    // ignore copy error
  }

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
