import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    
    // Constrain position between 0% and 100%
    setSliderPosition(Math.max(0, Math.min(position, 100)));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-xl border border-gold/10 select-none ${className}`}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After construction/renovation"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-xs font-semibold uppercase tracking-wider text-ivory">
        {afterLabel}
      </div>

      {/* Before Image (Overlay clipped by width) */}
      <div
        className="absolute inset-0 z-10 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImage}
          alt="Before construction/renovation"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current?.clientWidth || '100%' }}
        />
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-xs font-semibold uppercase tracking-wider text-gold">
          {beforeLabel}
        </div>
      </div>

      {/* Slider bar & handle */}
      <div
        style={{ left: `${sliderPosition}%` }}
        className="absolute top-0 bottom-0 z-20 w-1 bg-gradient-to-b from-gold/50 via-gold to-gold/50 cursor-ew-resize -translate-x-1/2 flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="w-10 h-10 rounded-full bg-navy border-2 border-gold flex items-center justify-center shadow-lg shadow-black/40 hover:scale-105 active:scale-95 transition-transform duration-200">
          <svg
            className="w-5 h-5 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
