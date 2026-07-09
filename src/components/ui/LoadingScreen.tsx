import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_NAME } from '@/constants/navigation';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 300); // Wait briefly before hiding
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-navy flex flex-col items-center justify-center select-none"
        >
          {/* Logo container */}
          <div className="flex flex-col items-center max-w-sm px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-4 flex justify-center"
            >
              <img
                src="/logo.png"
                alt={COMPANY_NAME}
                className="h-36 w-auto object-contain"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.4 }}
              className="text-ivory text-xs uppercase tracking-widest mt-2"
            >
              Premium Construction
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-8">
              <motion.div
                className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <span className="text-gold text-sm font-medium mt-2">{Math.min(progress, 100)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
