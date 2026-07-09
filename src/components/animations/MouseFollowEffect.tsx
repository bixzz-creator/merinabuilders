import { useState, useRef, useEffect } from 'react';

interface MouseFollowEffectProps {
  children: React.ReactNode;
  intensity?: number; // scale multiplier
  className?: string;
}

export default function MouseFollowEffect({
  children,
  intensity = 15,
  className = '',
}: MouseFollowEffectProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    // Calculate normalized mouse positions from -0.5 to 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setCoords({ x: x * intensity, y: y * intensity });
  };

  const handleMouseLeave = () => {
    // Reset to center smoothly
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
