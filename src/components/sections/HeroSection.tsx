import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import FloatingParticles from '@/components/animations/FloatingParticles';
import MouseFollowEffect from '@/components/animations/MouseFollowEffect';
import heroBg from '@/assets/images/hero-construction.png';
import { COMPANY_NAME } from '@/constants/navigation';

// Counter component for animated stats
function Counter({ value, duration = 2.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    // Use exponential or step easing for premium feel
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 12);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  
  // Parallax scroll effect: backgrounds scroll slower than text contents
  const backgroundY = useTransform(scrollY, [0, 800], [0, 240]);
  const contentY = useTransform(scrollY, [0, 800], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0A121E] flex items-center justify-center pt-24 pb-16">
      {/* 1. Parallax Background Image with Zoom effect */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
      >
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          src={heroBg}
          alt="Premium luxury commercial building construction site"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 2. Brand Specific Color Lighting & Rays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A121E] via-[#0A121E]/60 to-[#0A121E]/35 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(200,167,80,0.15),transparent_60%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.08),transparent_50%)] z-10 pointer-events-none" />

      {/* 3. Architectural Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,167,80,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,167,80,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none z-10" />

      {/* 4. Vector Crane Silhouettes (Cinematic depth) */}
      <svg className="absolute bottom-0 right-0 w-full h-[65%] opacity-15 pointer-events-none text-gold/30 z-10 hidden md:block" viewBox="0 0 1000 600" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Ground line */}
        <line x1="0" y1="580" x2="1000" y2="580" strokeWidth="2" />
        {/* Crane Right */}
        <g transform="translate(740, 160)">
          <line x1="50" y1="420" x2="50" y2="50" strokeWidth="2" />
          <line x1="45" y1="420" x2="55" y2="420" />
          <path d="M40 420 L50 390 L60 420 M40 390 L50 360 L60 390 M40 360 L50 330 L60 360 M40 330 L50 300 L60 330 M40 300 L50 270 L60 300 M40 270 L50 240 L60 270 M40 240 L50 210 L60 240 M40 210 L50 180 L60 210 M40 180 L50 150 L60 180 M40 150 L50 120 L60 150 M40 120 L50 90 L60 120 M40 90 L50 60 L60 90" />
          <polygon points="40,50 60,50 50,30" fill="currentColor" opacity="0.3" />
          <line x1="-160" y1="50" x2="180" y2="50" strokeWidth="2.5" />
          <rect x="110" y="50" width="35" height="22" fill="currentColor" opacity="0.4" />
          <line x1="50" y1="30" x2="-160" y2="50" />
          <line x1="50" y1="30" x2="110" y2="50" />
          <line x1="-90" y1="50" x2="-90" y2="180" strokeWidth="0.8" />
          <circle cx="-90" cy="180" r="3.5" fill="currentColor" />
        </g>
        {/* Crane Left */}
        <g transform="translate(180, 260) scale(0.75)">
          <line x1="50" y1="420" x2="50" y2="50" strokeWidth="1.5" />
          <path d="M40 420 L50 390 L60 420 M40 390 L50 360 L60 390 M40 360 L50 330 L60 360 M40 330 L50 300 L60 330 M40 300 L50 270 L60 300 M40 270 L50 240 L60 270 M40 240 L50 210 L60 240 M40 210 L50 180 L60 210" />
          <line x1="-120" y1="50" x2="140" y2="50" strokeWidth="2" />
          <rect x="90" y="50" width="25" height="18" fill="currentColor" opacity="0.4" />
          <line x1="50" y1="30" x2="-120" y2="50" />
          <line x1="50" y1="30" x2="90" y2="50" />
          <line x1="-50" y1="50" x2="-50" y2="140" strokeWidth="0.8" />
        </g>
      </svg>

      {/* 5. Golden Dust Particles (Mix blend screen overlay) */}
      <FloatingParticles />

      {/* 6. Elegant Construction-themed Floating Elements */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
        {/* Shape 1: Floating Steel Truss (Top Left) */}
        <motion.div
          initial={{ opacity: 0, x: -60, y: 100 }}
          animate={{
            opacity: 1,
            y: [100, 115, 100],
            rotate: [12, 16, 12],
          }}
          transition={{
            y: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
            rotate: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
            opacity: { duration: 1.2, delay: 0.5 },
          }}
          className="absolute top-[18%] left-[8%] hidden lg:block"
        >
          <svg viewBox="0 0 200 40" className="w-56 h-12 text-gold/30 fill-none stroke-current" strokeWidth="1.2">
            <line x1="0" y1="5" x2="200" y2="5" />
            <line x1="0" y1="35" x2="200" y2="35" />
            <line x1="0" y1="5" x2="40" y2="35" />
            <line x1="40" y1="35" x2="80" y2="5" />
            <line x1="80" y1="5" x2="120" y2="35" />
            <line x1="120" y1="35" x2="160" y2="5" />
            <line x1="160" y1="5" x2="200" y2="35" />
            <line x1="40" y1="5" x2="40" y2="35" />
            <line x1="80" y1="5" x2="80" y2="35" />
            <line x1="120" y1="5" x2="120" y2="35" />
            <line x1="160" y1="5" x2="160" y2="35" />
          </svg>
        </motion.div>

        {/* Shape 2: Isometric 3D Structural Frame (Top Right) */}
        <motion.div
          initial={{ opacity: 0, x: 80, y: 120 }}
          animate={{
            opacity: 1,
            y: [120, 105, 120],
            rotate: [-15, -10, -15],
          }}
          transition={{
            y: { repeat: Infinity, duration: 7, ease: 'easeInOut' },
            rotate: { repeat: Infinity, duration: 9, ease: 'easeInOut' },
            opacity: { duration: 1.2, delay: 0.7 },
          }}
          className="absolute top-[15%] right-[10%] hidden lg:block"
        >
          <svg viewBox="0 0 100 110" className="w-24 h-26 text-gold/30 fill-none stroke-current" strokeWidth="1.2">
            <polygon points="50,10 90,30 50,50 10,30" />
            <polygon points="50,70 90,90 50,110 10,90" strokeDasharray="3 3" />
            <line x1="10" y1="30" x2="10" y2="90" />
            <line x1="50" y1="50" x2="50" y2="110" />
            <line x1="90" y1="30" x2="90" y2="90" />
            <polygon points="50,40 90,60 50,80 10,60" />
          </svg>
        </motion.div>

        {/* Shape 3: Drafting Compass & Design Circles (Middle Right) */}
        <motion.div
          initial={{ opacity: 0, y: 340 }}
          animate={{
            opacity: 1,
            y: [340, 355, 340],
            rotate: [45, 60, 45],
          }}
          transition={{
            y: { repeat: Infinity, duration: 9, ease: 'easeInOut' },
            rotate: { repeat: Infinity, duration: 12, ease: 'easeInOut' },
            opacity: { duration: 1.2, delay: 0.9 },
          }}
          className="absolute top-[45%] right-[6%] hidden xl:block"
        >
          <svg viewBox="0 0 100 100" className="w-28 h-28 text-gold/20 fill-none stroke-current" strokeWidth="1">
            <circle cx="50" cy="50" r="42" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="28" />
            <line x1="50" y1="0" x2="50" y2="100" />
            <line x1="0" y1="50" x2="100" y2="50" />
            <path d="M 20 20 L 80 80 M 20 80 L 80 20" strokeDasharray="2 2" />
          </svg>
        </motion.div>

        {/* Shape 4: Glass Blueprint Plan Sheet (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, x: -100, y: 480 }}
          animate={{
            opacity: 1,
            y: [480, 465, 480],
            rotate: [-8, -12, -8],
          }}
          transition={{
            y: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
            rotate: { repeat: Infinity, duration: 11, ease: 'easeInOut' },
            opacity: { duration: 1.5, delay: 0.6 },
          }}
          className="absolute bottom-[20%] left-[5%] hidden xl:block z-10"
        >
          <div className="w-36 h-26 bg-gold/5 border border-gold/15 rounded-lg backdrop-blur-xs flex items-center justify-center p-3 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,167,80,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,167,80,0.05)_1px,transparent_1px)] bg-[size:8px_8px]" />
            <svg viewBox="0 0 80 60" className="w-24 h-18 text-gold/30 fill-none stroke-current" strokeWidth="1">
              <rect x="5" y="5" width="70" height="50" strokeDasharray="2 2" />
              <line x1="15" y1="42" x2="40" y2="12" />
              <line x1="40" y1="12" x2="65" y2="42" />
              <line x1="15" y1="42" x2="65" y2="42" />
              <circle cx="40" cy="28" r="6" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* 7. Interactive Content Container with Mouse Follow Parallax */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <MouseFollowEffect intensity={18}>
          <div className="flex flex-col items-center select-none">
            {/* Header Badge */}
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden md:inline-block px-5 py-2 rounded-full bg-gold/10 text-gold text-xs font-semibold uppercase tracking-[0.2em] border border-gold/25 mb-8"
            >
              Premium Construction Company
            </motion.span>

            {/* DM Serif Typography Luxury Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold font-display tracking-tight text-[#FDFBF7] max-w-5xl leading-[1.08] drop-shadow-sm"
            >
              Building Tomorrow,<br />
              <span className="text-gradient-gold">Creating Timeless Landmarks</span>
            </motion.h1>

            {/* Plus Jakarta Sans Typography Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-base sm:text-lg md:text-xl text-[#FDFBF7]/85 max-w-2xl mt-8 font-sans leading-relaxed tracking-wide font-light"
            >
              We deliver premium commercial construction, renovation, and project management solutions with uncompromising quality, precision, and craftsmanship.
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap gap-5 justify-center mt-10"
            >
              <Link
                to="/contact"
                className="px-9 py-4 rounded-full bg-gradient-to-r from-gold to-gold-light text-[#18181B] font-bold hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer text-sm tracking-wide"
              >
                Request Free Quote
              </Link>
              <Link
                to="/projects"
                className="px-9 py-4 rounded-full bg-white/5 border border-white/20 text-[#FDFBF7] font-bold hover:bg-white/10 hover:border-gold/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer text-sm tracking-wide"
              >
                Explore Our Projects
              </Link>
            </motion.div>

            {/* 8. Trust Metrics Counters Section (With subtle separators) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="grid grid-cols-3 gap-4 md:gap-12 mt-16 pt-8 border-t border-gold/15 max-w-3xl w-full"
            >
              <div className="text-center">
                <p className="text-2xl sm:text-4xl font-bold font-display text-gradient-gold">
                  <Counter value={150} />+
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FDFBF7]/60 mt-1 font-semibold">Completed Projects</p>
              </div>
              <div className="text-center border-x border-gold/15 px-2 md:px-6">
                <p className="text-2xl sm:text-4xl font-bold font-display text-gradient-gold">
                  <Counter value={15} />+
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FDFBF7]/60 mt-1 font-semibold">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-4xl font-bold font-display text-gradient-gold">
                  <Counter value={100} />%
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FDFBF7]/60 mt-1 font-semibold">Client Satisfaction</p>
              </div>
            </motion.div>

          </div>
        </MouseFollowEffect>
      </motion.div>

      {/* 9. Scroll to Explore Indicator (Animated arrow) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.65, y: 0 }}
        transition={{ repeat: Infinity, duration: 1.6, repeatType: 'reverse', delay: 1.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none select-none"
      >
        <span className="text-[9px] text-gold uppercase tracking-[0.25em] font-semibold mb-2">Scroll to Explore</span>
        <svg
          className="w-4.5 h-4.5 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
