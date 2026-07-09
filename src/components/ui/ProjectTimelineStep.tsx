import { motion } from 'motion/react';
import { ClipboardList, PenTool, CheckCircle2, HardHat, Sparkles, Key } from 'lucide-react';
import type { ProcessStep } from '@/types';

interface ProjectTimelineStepProps {
  step: ProcessStep;
  index: number;
}

export default function ProjectTimelineStep({ step, index }: ProjectTimelineStepProps) {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-gold' };
    switch (iconName.toLowerCase()) {
      case 'clipboardlist':
        return <ClipboardList {...props} />;
      case 'pentool':
        return <PenTool {...props} />;
      case 'checkcircle':
        return <CheckCircle2 {...props} />;
      case 'hardhat':
        return <HardHat {...props} />;
      case 'sparkles':
        return <Sparkles {...props} />;
      case 'key':
        return <Key {...props} />;
      default:
        return <ClipboardList {...props} />;
    }
  };

  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center mb-16 md:mb-24 last:mb-0 group">
      {/* Node / Center circle */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-navy border-2 border-gold shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform duration-300">
        {getIcon(step.icon)}
      </div>

      {/* Content box left (even indices) */}
      <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'hidden md:block md:opacity-0 md:pointer-events-none md:order-last'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass p-6 md:p-8 rounded-xl relative hover:border-gold/30 hover:shadow-md transition-all duration-300"
        >
          <span className="absolute -top-3 left-6 md:left-auto md:right-6 px-3 py-0.5 rounded-full bg-gold text-navy text-[10px] font-bold uppercase tracking-widest">
            Step 0{step.id}
          </span>
          <h3 className="text-xl font-bold font-display text-ivory mt-2 mb-3">
            {step.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      </div>

      {/* Spacer for MD screens */}
      <div className="hidden md:block w-12 h-12 shrink-0" />

      {/* Content box right (odd indices) */}
      <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${!isEven ? 'md:pl-12 md:text-left' : 'hidden md:block md:opacity-0 md:pointer-events-none'}`}>
        <motion.div
          initial={{ opacity: 0, x: !isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass p-6 md:p-8 rounded-xl relative hover:border-gold/30 hover:shadow-md transition-all duration-300"
        >
          <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gold text-navy text-[10px] font-bold uppercase tracking-widest">
            Step 0{step.id}
          </span>
          <h3 className="text-xl font-bold font-display text-ivory mt-2 mb-3">
            {step.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
