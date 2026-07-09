import { useState } from 'react';
import { motion } from 'motion/react';
import { useCountUp } from '@/components/hooks/useCountUp';
import { Briefcase, Calendar, Home, Smile } from 'lucide-react';

export default function TrustedBySection() {
  const [startCount, setStartCount] = useState(false);

  const projectsCount = useCountUp({ end: 100, trigger: startCount, suffix: '+' });
  const yearsCount = useCountUp({ end: 20, trigger: startCount, suffix: '+' });
  const housesCount = useCountUp({ end: 5, trigger: startCount, suffix: '+' });
  const satisfactionCount = useCountUp({ end: 100, trigger: startCount, suffix: '%' });

  return (
    <motion.section
      onViewportEnter={() => setStartCount(true)}
      viewport={{ once: true, margin: '-100px' }}
      className="bg-navy-light py-24 border-y border-gold/10 relative overflow-hidden"
    >
      {/* Decorative subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Projects Completed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center p-4"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 mb-4">
              <Briefcase className="w-6 h-6 text-gold" />
            </div>
            <span className="text-4xl md:text-5xl font-bold text-gradient-gold tracking-tight font-display">
              {projectsCount}
            </span>
            <span className="text-xs uppercase tracking-widest text-ivory/60 font-semibold mt-2">
              Projects Completed
            </span>
          </motion.div>

          {/* Years Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center p-4 border-l border-gold/10 lg:border-l-0"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 mb-4">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <span className="text-4xl md:text-5xl font-bold text-gradient-gold tracking-tight font-display">
              {yearsCount}
            </span>
            <span className="text-xs uppercase tracking-widest text-ivory/60 font-semibold mt-2">
              Years Experience
            </span>
          </motion.div>

          {/* Completed Houses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center text-center p-4 border-l-0 lg:border-l border-gold/10"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 mb-4">
              <Home className="w-6 h-6 text-gold" />
            </div>
            <span className="text-4xl md:text-5xl font-bold text-gradient-gold tracking-tight font-display">
              {housesCount}
            </span>
            <span className="text-xs uppercase tracking-widest text-ivory/60 font-semibold mt-2">
              Completed Houses
            </span>
          </motion.div>

          {/* Satisfaction Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center text-center p-4 border-l border-gold/10"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 mb-4">
              <Smile className="w-6 h-6 text-gold" />
            </div>
            <span className="text-4xl md:text-5xl font-bold text-gradient-gold tracking-tight font-display">
              {satisfactionCount}
            </span>
            <span className="text-xs uppercase tracking-widest text-ivory/60 font-semibold mt-2">
              Client Satisfaction
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
