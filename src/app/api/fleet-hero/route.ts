import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const sourcePath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\019ffd7b-ec6d-4960-82be-a3e576829f8c\\fleet_banner_montage_1788249973576.jpg';

  try {
    // Also copy to public/images if public directory exists or create it
    const publicDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const publicDest = path.join(publicDir, 'fleet-hero.jpg');
    if (!fs.existsSync(publicDest) && fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, publicDest);
    }

    if (fs.existsSync(sourcePath)) {
      const buffer = fs.readFileSync(sourcePath);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } else if (fs.existsSync(publicDest)) {
      const buffer = fs.readFileSync(publicDest);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  } catch (err) {
    console.error('Error loading image', err);
  }

  // Fallback to high quality fleet image
  return NextResponse.redirect('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80');
}
