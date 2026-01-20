// components/TextureOverlay.js
export default function TextureOverlay() {
  return (
    <div className="fixed inset-0 z-[5] pointer-events-none opacity-40 mix-blend-overlay">
      
      {/* Kita pakai CSS noise sederhana via SVG */}
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      
    </div>
  );
}