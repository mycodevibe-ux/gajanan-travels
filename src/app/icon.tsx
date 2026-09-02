import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(135deg, #0c2338 0%, #05121e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          borderRadius: '7px',
          fontWeight: 'bold',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          position: 'relative',
        }}
      >
        <span style={{ color: '#ffffff', marginRight: '1px' }}>G</span>
        <div
          style={{
            position: 'absolute',
            top: '3px',
            right: '3px',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#f97316',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
