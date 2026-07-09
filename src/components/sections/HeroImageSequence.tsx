import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImagePreloader } from '@/components/hooks/useImagePreloader';
import { FRAME_CONFIG, CHAPTERS, getFrameUrl } from '@/constants/frameSequenceConfig';
import ChapterOverlay from '@/components/sections/ChapterOverlay';
import { COMPANY_NAME } from '@/constants/navigation';
import HeroSection from '@/components/sections/HeroSection';

gsap.registerPlugin(ScrollTrigger);

// ── Loading Overlay ─────────────────────────────────────────────────────────
function LoadingOverlay({ progress }: { progress: number }) {
  const percent = Math.round(progress * 100);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0E14]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,167,80,0.06),transparent_70%)]" />

      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2"
        >
          <img
            src="/logo.png"
            alt={COMPANY_NAME}
            className="h-28 w-auto object-contain"
          />
        </motion.div>

        <div className="w-48 sm:w-64">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.3, ease: 'linear' }}
            />
          </div>
          <p className="text-center mt-3 text-xs text-white/40 font-sans tracking-widest uppercase">
            Loading Experience — {percent}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Scroll Indicator ────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.6, y: 0 }}
      transition={{
        opacity: { duration: 0.8, delay: 1 },
        y: { repeat: Infinity, duration: 1.5, repeatType: 'reverse', ease: 'easeInOut' },
      }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none select-none"
    >
      <span className="text-[9px] text-gold uppercase tracking-[0.25em] font-semibold mb-2 font-sans">
        Scroll to Explore
      </span>
      <svg
        className="w-4 h-4 text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </motion.div>
  );
}

// ── Canvas Storytelling Component ───────────────────────────────────────────
function CanvasStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(0);

  const { images, progress, isReady } = useImagePreloader(10);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const activeChapter = useMemo(() => {
    return CHAPTERS.find(
      (ch) => currentFrame >= ch.frameStart && currentFrame <= ch.frameEnd
    ) ?? null;
  }, [currentFrame]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;
    let drawX: number;
    let drawY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      drawX = 0;
      drawY = (displayHeight - drawHeight) / 2;
    } else {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      drawX = 0;
      drawY = (displayHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      drawFrame(currentFrameRef.current);
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [drawFrame]);

  useEffect(() => {
    if (isReady) {
      drawFrame(0);
    }
  }, [isReady, drawFrame]);

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return;

    const container = containerRef.current;
    const pinned = pinnedRef.current;
    if (!container || !pinned) return;

    const totalFrames = FRAME_CONFIG.totalFrames;
    const frameObj = { frame: 0 };

    const anim = gsap.to(frameObj, {
      frame: totalFrames - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: pinned,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
      onUpdate: () => {
        const frameIndex = Math.min(
          Math.max(0, Math.round(frameObj.frame)),
          totalFrames - 1
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;

          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
          }
          rafIdRef.current = requestAnimationFrame(() => {
            drawFrame(frameIndex);
            setCurrentFrame(frameIndex);
          });
        }
      },
    });

    return () => {
      anim.kill();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isReady, prefersReducedMotion, drawFrame]);

  if (prefersReducedMotion) {
    return (
      <section className="relative w-full h-screen overflow-hidden bg-[#0A0E14]">
        <img
          src={getFrameUrl(0)}
          alt="Merina Builders — Premium Construction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-8 sm:left-12 z-10 max-w-xl">
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white leading-tight">
            Merina Builders
          </h1>
          <p className="mt-4 text-base text-white/70 font-sans leading-relaxed">
            Building Dreams, Delivering Excellence — 15+ years of premium construction.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0A0E14]"
      style={{ height: FRAME_CONFIG.scrollHeight }}
    >
      <div
        ref={pinnedRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        <AnimatePresence>
          {!isReady && <LoadingOverlay progress={progress} />}
        </AnimatePresence>

        <canvas
          ref={canvasRef}
          className="hero-sequence-canvas"
          role="img"
          aria-label="Cinematic construction sequence — scroll to progress through the building journey"
        />

        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/85 via-black/30 to-transparent z-30 pointer-events-none" />

        {isReady && <ChapterOverlay chapter={activeChapter} />}

        {isReady && currentFrame < 10 && <ScrollIndicator />}
      </div>
    </section>
  );
}

// ── Entry Shell Component (handles responsive routing) ──────────────────────
export default function HeroImageSequence() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(max-width: 767px)');
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleResize(mq);

    mq.addEventListener('change', handleResize);
    return () => mq.removeEventListener('change', handleResize);
  }, []);

  if (isMobile) {
    return <HeroSection />;
  }

  return <CanvasStorytelling />;
}
