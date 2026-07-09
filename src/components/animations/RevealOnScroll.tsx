import { motion } from 'motion/react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
}: RevealOnScrollProps) {
  const getVariants = () => {
    const hidden = {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    };

    return {
      hidden,
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1] as any, // Cubic-bezier for smooth motion
        },
      },
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
