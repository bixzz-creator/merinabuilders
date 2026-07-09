import { motion, AnimatePresence } from 'motion/react';
import type { Chapter } from '@/constants/frameSequenceConfig';

interface ChapterOverlayProps {
  chapter: Chapter | null;
}

/**
 * Cinematic chapter overlay that appears over the canvas.
 *
 * Animations:
 * - Container fades in with slight upward slide
 * - Children (subtitle → title → description) stagger in
 * - Exit: fade + blur + slide down
 */
export default function ChapterOverlay({ chapter }: ChapterOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {chapter && (
        <motion.div
          key={chapter.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-20 pointer-events-none flex items-end"
        >
          {/* Bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Chapter content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-28">
            <div className="max-w-xl">
              {/* Subtitle / Label */}
              <motion.span
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4 sm:mb-5"
              >
                {chapter.subtitle}
              </motion.span>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] tracking-tight"
              >
                {chapter.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 0.85, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/75 font-sans leading-relaxed tracking-wide font-light max-w-md"
              >
                {chapter.description}
              </motion.p>

              {/* Decorative gold line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 sm:mt-6 h-px w-20 bg-gradient-to-r from-gold to-transparent origin-left"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
