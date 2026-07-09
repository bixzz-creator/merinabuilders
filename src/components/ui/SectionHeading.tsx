import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isLeft = align === 'left';

  const renderSplitTitle = (text: string) => {
    const words = text.split(' ');
    if (words.length <= 1) return text;
    
    // Split: first 60% of words in black, last 40% (or at least 1 word) in gold italic
    const goldCount = Math.max(1, Math.floor(words.length * 0.4));
    const blackCount = words.length - goldCount;
    
    const blackPart = words.slice(0, blackCount).join(' ');
    const goldPart = words.slice(blackCount).join(' ');
    
    return (
      <>
        {blackPart}{' '}
        <span className="text-gradient-gold italic">{goldPart}</span>
      </>
    );
  };

  return (
    <div className={`mb-16 flex flex-col ${isLeft ? 'items-start text-left' : 'items-center text-center'} ${className}`}>
      {badge && (
        <motion.div
          whileHover="hover"
          className="relative pl-4 py-1 text-gold text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-5 inline-flex items-center cursor-default select-none overflow-hidden"
        >
          {/* Vertical Gold Line */}
          <motion.span 
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold origin-center"
            variants={{
              hover: { scaleY: 1.2, width: '3px' }
            }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Sliding Background */}
          <motion.span 
            className="absolute inset-0 bg-gold/[0.04] z-[-1] origin-left"
            initial={{ scaleX: 0 }}
            variants={{
              hover: { scaleX: 1 }
            }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold tracking-tight text-ivory max-w-3xl font-display"
      >
        {renderSplitTitle(title)}
      </motion.h2>

      {/* Underline Divider */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '80px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="h-1 bg-gradient-to-r from-gold to-gold-light mt-4 rounded-full"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg mt-6 max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
