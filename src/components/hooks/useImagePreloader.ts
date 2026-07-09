import { useState, useEffect, useRef, useCallback } from 'react';
import { FRAME_CONFIG, getFrameUrl } from '@/constants/frameSequenceConfig';

interface PreloaderState {
  /** Array of loaded HTMLImageElement instances, indexed 0→totalFrames-1 */
  images: HTMLImageElement[];
  /** Number of frames loaded so far */
  loadedCount: number;
  /** Total frame count */
  totalCount: number;
  /** 0→1 loading progress */
  progress: number;
  /** True when all frames are loaded */
  isReady: boolean;
}

/**
 * Batch-preloads all image sequence frames using native Image() objects.
 *
 * Strategy:
 * - Creates all Image objects up front (no DOM insertion)
 * - Loads in parallel batches (default concurrency = 8)
 * - Tracks progress via React state (debounced to avoid excessive re-renders)
 * - Returns stable image array reference
 */
export function useImagePreloader(concurrency = 8): PreloaderState {
  const totalCount = FRAME_CONFIG.totalFrames;
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Debounced state sync — push loadedCount to React state at 30fps max
  const scheduleStateSync = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setLoadedCount(loadedRef.current);
      rafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Pre-allocate the image array
    const images: HTMLImageElement[] = new Array(totalCount);
    imagesRef.current = images;

    // Queue of frame indices to load
    const queue: number[] = [];
    for (let i = 0; i < totalCount; i++) {
      queue.push(i);
    }

    let queueIndex = 0;

    function loadNext() {
      if (cancelled) return;
      if (queueIndex >= totalCount) return;

      const idx = queue[queueIndex++];
      const img = new Image();
      img.decoding = 'async';

      img.onload = () => {
        if (cancelled) return;
        images[idx] = img;
        loadedRef.current++;
        scheduleStateSync();

        if (loadedRef.current >= totalCount) {
          setLoadedCount(totalCount);
          setIsReady(true);
        } else {
          loadNext();
        }
      };

      img.onerror = () => {
        if (cancelled) return;
        // Still count errored frames so progress completes
        console.warn(`Failed to load frame ${idx}: ${getFrameUrl(idx)}`);
        loadedRef.current++;
        scheduleStateSync();

        if (loadedRef.current >= totalCount) {
          setLoadedCount(totalCount);
          setIsReady(true);
        } else {
          loadNext();
        }
      };

      img.src = getFrameUrl(idx);
    }

    // Start initial batch
    const initialBatch = Math.min(concurrency, totalCount);
    for (let i = 0; i < initialBatch; i++) {
      loadNext();
    }

    return () => {
      cancelled = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [totalCount, concurrency, scheduleStateSync]);

  return {
    images: imagesRef.current,
    loadedCount,
    totalCount,
    progress: totalCount > 0 ? loadedCount / totalCount : 0,
    isReady,
  };
}
