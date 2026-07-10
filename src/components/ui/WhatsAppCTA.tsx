import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_WHATSAPP } from '@/constants/navigation';

export default function WhatsAppCTA() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans print:hidden">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute bottom-20 left-0 bg-[#0B1320] border border-gold/15 text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
          >
            Chat with us on WhatsApp
            {/* Tooltip arrow */}
            <div className="absolute top-full left-6 -mt-px w-2 h-2 bg-[#0B1320] border-r border-b border-gold/15 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular WhatsApp Button */}
      <motion.a
        href={COMPANY_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-16 h-16 rounded-full cursor-pointer z-10"
        animate={{
          y: [-4, 4],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 3,
            ease: 'easeInOut',
          },
        }}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat with us on WhatsApp"
      >
        {/* WhatsApp Logo Image */}
        <img
          src="/Whatsapp.avif"
          alt="WhatsApp Logo"
          className="w-14 h-14 object-contain z-10"
        />
      </motion.a>
    </div>
  );
}
