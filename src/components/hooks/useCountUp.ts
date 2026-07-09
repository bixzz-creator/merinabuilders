import { useState, useEffect, useRef } from 'react';

interface UseCountUpProps {
  end: number;
  duration?: number; // in milliseconds
  suffix?: string;
  trigger?: boolean;
}

export function useCountUp({ end, duration = 2000, suffix = '', trigger = true }: UseCountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);

      // Easing function: easeOutQuad
      const easedProgress = percentage * (2 - percentage);
      const currentCount = Math.floor(easedProgress * end);

      setCount(currentCount);
      countRef.current = currentCount;

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      startTime.current = null;
    };
  }, [end, duration, trigger]);

  return `${count}${suffix}`;
}
