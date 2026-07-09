/**
 * Frame Sequence Configuration
 * ────────────────────────────
 * Single source of truth for the cinematic scroll-controlled image sequence.
 * Update `totalFrames` here if the frame count changes (e.g. 221 → 300).
 */

export const FRAME_CONFIG = {
  /** Base path relative to public/ root */
  basePath: '/Landing Photos/',
  /** Filename prefix before the zero-padded number */
  prefix: 'ezgif-frame-',
  /** File extension */
  extension: '.jpg',
  /** Total number of frames available */
  totalFrames: 240,
  /** First frame number (1-based) */
  startIndex: 1,
  /** Zero-padding length for frame numbers (e.g. 3 → "001") */
  padLength: 3,
  /** Total scroll height for the pinned section */
  scrollHeight: '500vh',
} as const;

/**
 * Generate the URL for a given frame index (0-based).
 */
export function getFrameUrl(index: number): string {
  const frameNumber = index + FRAME_CONFIG.startIndex;
  const padded = String(frameNumber).padStart(FRAME_CONFIG.padLength, '0');
  return `${FRAME_CONFIG.basePath}${FRAME_CONFIG.prefix}${padded}${FRAME_CONFIG.extension}`;
}

// ── Chapter Definitions ─────────────────────────────────────────────────────

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** 0-based frame index where chapter becomes visible */
  frameStart: number;
  /** 0-based frame index where chapter fades out */
  frameEnd: number;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'vision',
    title: 'Vision',
    subtitle: 'Where It All Begins',
    description: 'Every landmark starts as a single idea — a vision of what could be.',
    frameStart: 0,
    frameEnd: 39,
  },
  {
    id: 'blueprint',
    title: 'Blueprint',
    subtitle: 'Precision Engineering',
    description: 'Meticulous planning transforms imagination into actionable design.',
    frameStart: 40,
    frameEnd: 79,
  },
  {
    id: 'foundation',
    title: 'Foundation',
    subtitle: 'Built to Last',
    description: 'Strong foundations carry the weight of generations yet to come.',
    frameStart: 80,
    frameEnd: 119,
  },
  {
    id: 'construction',
    title: 'Construction',
    subtitle: 'Craftsmanship in Motion',
    description: 'Skilled hands and modern engineering shape raw materials into form.',
    frameStart: 120,
    frameEnd: 159,
  },
  {
    id: 'completion',
    title: 'Completion',
    subtitle: 'The Finished Masterpiece',
    description: 'A project delivered with precision, beauty, and uncompromising quality.',
    frameStart: 160,
    frameEnd: 199,
  },
  {
    id: 'merinal',
    title: 'Merina Builders',
    subtitle: 'Building Dreams, Delivering Excellence',
    description: '15+ years of premium construction. 150+ projects completed. 100% client satisfaction.',
    frameStart: 200,
    frameEnd: 239,
  },
];
