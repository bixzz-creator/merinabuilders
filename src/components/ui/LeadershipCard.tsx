import { motion } from 'motion/react';
import { ShieldCheck, HardHat, PenTool, ClipboardList } from 'lucide-react';
import type { LeadershipMember } from '@/types';

interface LeadershipCardProps {
  member: LeadershipMember;
}

export default function LeadershipCard({ member }: LeadershipCardProps) {
  const getIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'managing director':
        return <ShieldCheck className="w-8 h-8 text-gold" />;
      case 'site engineers':
        return <HardHat className="w-8 h-8 text-gold" />;
      case 'architects':
        return <PenTool className="w-8 h-8 text-gold" />;
      case 'project managers':
        return <ClipboardList className="w-8 h-8 text-gold" />;
      default:
        return <HardHat className="w-8 h-8 text-gold" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="glass p-8 rounded-xl relative hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500 flex flex-col h-full group"
    >
      {/* Decorative Gold Accent Border */}
      <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500 rounded-t-xl" />

      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-lg bg-navy flex items-center justify-center border border-gold/10 group-hover:border-gold/30 transition-colors duration-500">
          {getIcon(member.role)}
        </div>
        <div>
          <h3 className="text-xl font-bold font-display text-ivory tracking-wide">
            {member.name}
          </h3>
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mt-1">
            {member.designation}
          </p>
        </div>
      </div>

      <div className="flex-grow">
        <h4 className="text-sm font-semibold text-ivory/80 mb-3 uppercase tracking-wider">
          Key Responsibilities
        </h4>
        <ul className="space-y-2.5">
          {member.responsibilities.map((resp, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
              {resp}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
