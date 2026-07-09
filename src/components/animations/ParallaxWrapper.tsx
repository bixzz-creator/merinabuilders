import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number; // 0.1 to 1 representing intensity
  className?: string;
}

export default function ParallaxWrapper({ children, speed = 0.3, className = '' }: ParallaxWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element) return;

      gsap.to(element, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`w-full h-full will-change-transform ${className}`}>
      {children}
    </div>
  );
}
