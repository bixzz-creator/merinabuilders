import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import * as LucideIcons from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  iconName: string;
  className?: string;
  delay?: number;
}

export default function BentoCard({
  title,
  description,
  iconName,
  className = '',
  delay = 0,
}: BentoCardProps) {
  // Dynamically resolve lucide icons
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

  // Mouse tracking position variables
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`glass p-8 rounded-xl relative overflow-hidden group hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 flex flex-col justify-between ${className}`}
    >
      {/* Interactive background radial glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(200, 167, 80, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Decorative background static gold blur */}
      <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/10 transition-all duration-500 pointer-events-none z-0" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center border border-gold/10 group-hover:border-gold/30 group-hover:scale-105 transition-all duration-500 mb-6">
          <IconComponent className="w-6 h-6 text-gold" />
        </div>
        
        <h3 className="text-xl font-bold font-display text-ivory tracking-wide mb-3 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Indicator Arrow */}
      <div className="mt-8 flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 relative z-10">
        <span>Excellence Guaranteed</span>
      </div>
    </motion.div>
  );
}
