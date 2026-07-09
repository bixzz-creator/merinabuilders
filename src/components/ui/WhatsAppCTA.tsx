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

      {/* Circular/Squircle WhatsApp Button */}
      <motion.a
        href={COMPANY_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-[60px] h-[60px] rounded-[18px] bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-xl shadow-black/35 border border-white/10 cursor-pointer z-10"
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
          scale: 1.08,
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
        }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chat with us on WhatsApp"
      >
        {/* Soft green pulse ring */}
        <span className="absolute inset-0 rounded-[18px] border border-[#25D366]/30 animate-pulse opacity-60 pointer-events-none" />
        
        {/* WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.024-5.123-2.887-6.986a9.775 9.775 0 0 0-6.969-2.837c-5.439 0-9.865 4.415-9.869 9.866-.002 1.77.47 3.498 1.368 5.011L1.1 21.053l4.757-1.25c1.472.82 3.12 1.25 4.79 1.25z" />
          <path d="M17.433 14.346c-.3-.15-1.771-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.951 1.176-.176.2-.351.224-.651.074-2.824-1.411-4.636-3.003-5.46-4.426-.225-.387-.024-.596.176-.795.18-.18.4-.474.6-.711.2-.237.266-.4.4-.663.13-.263.067-.5-.033-.7-.1-.2-.776-1.874-1.063-2.563-.28-.674-.56-.581-.767-.591l-.658-.013c-.227 0-.598.085-.91.424-.313.339-1.196 1.171-1.196 2.855 0 1.685 1.229 3.313 1.4 3.538.171.224 2.42 3.693 5.861 5.176 2.87 1.233 3.882 1.1 4.761 1.012.88-.088 1.771-.725 2.022-1.388.251-.663.251-1.225.176-1.35-.075-.125-.275-.2-.575-.35z" />
        </svg>
      </motion.a>
    </div>
  );
}
