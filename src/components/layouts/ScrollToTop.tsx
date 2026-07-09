import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (hash) {
      const targetId = hash.substring(1);
      let attempts = 0;
      
      const scrollToElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < 10) {
          attempts++;
          setTimeout(scrollToElement, 100);
        }
      };
      
      // Initial trigger
      setTimeout(scrollToElement, 250);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius; // approx 113.1
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-gold hover:bg-gold-light text-[#0A0E14] shadow-lg shadow-gold/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border border-gold/15 cursor-pointer pointer-events-auto"
          aria-label="Scroll back to top"
        >
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="rgba(10, 14, 20, 0.15)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="#0A0E14"
              strokeWidth="2"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
              className="transition-[stroke-dashoffset] duration-75 ease-out"
            />
          </svg>

          {/* Arrow up icon */}
          <ArrowUp className="w-5 h-5 stroke-[2.5] relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
