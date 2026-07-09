import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Wallet,
  Clock3,
  ShieldCheck,
  HardHat,
  Users,
  ClipboardList,
  Shield,
  HeartHandshake,
  ArrowRight,
  Check,
} from 'lucide-react';

// ── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ── Feature card data ────────────────────────────────────────────────────────
const features = [
  {
    Icon: Wallet,
    title: 'Affordable Pricing',
    description:
      'We provide competitive pricing without compromising quality. Every quotation is transparent, detailed, and designed to suit your budget.',
    color: 'amber',
  },
  {
    Icon: Clock3,
    title: 'On-Time Project Delivery',
    description:
      'We follow structured project timelines and milestone tracking to ensure every project is completed on schedule — no delays, no surprises.',
    color: 'blue',
  },
  {
    Icon: ShieldCheck,
    title: 'Premium Quality Materials',
    description:
      'Only trusted and certified construction materials are used to ensure long-lasting strength, durability, and safety in every structure.',
    color: 'emerald',
  },
  {
    Icon: HardHat,
    title: 'Experienced Engineers',
    description:
      'Our qualified civil engineers oversee every phase of construction, ensuring technical excellence and structural integrity from foundation to finish.',
    color: 'purple',
  },
  {
    Icon: Users,
    title: 'Skilled Workforce',
    description:
      'Our experienced supervisors, masons, carpenters, electricians, and technicians work together to deliver exceptional craftsmanship at every stage.',
    color: 'orange',
  },
  {
    Icon: ClipboardList,
    title: 'Complete Transparency',
    description:
      'Clients receive clear quotations, regular progress updates, budget tracking, and open communication throughout the entire project lifecycle.',
    color: 'teal',
  },
  {
    Icon: Shield,
    title: 'Safety & Quality Assurance',
    description:
      'Every project follows strict safety standards, quality inspections, and full compliance with industry best practices and regulatory requirements.',
    color: 'indigo',
  },
  {
    Icon: HeartHandshake,
    title: 'Customer Satisfaction',
    description:
      'Our reputation is built on trust, repeat clients, and consistently delivering projects that exceed expectations — from first brick to final handover.',
    color: 'rose',
  },
];

// ── Stats data ───────────────────────────────────────────────────────────────
const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 100, suffix: '%', label: 'Transparent Process' },
];

// ── Commitment checklist ──────────────────────────────────────────────────────
const commitments = [
  'Transparent Quotations',
  'No Hidden Charges',
  'Dedicated Site Engineer',
  'Weekly Progress Updates',
  'Premium Materials Only',
  'On-Time Delivery',
  'Safety First',
  'Post-Project Support',
];

const colorThemes: Record<string, {
  iconBg: string;
  iconText: string;
  iconBorder: string;
  cardHoverBorder: string;
  cardHoverShadow: string;
  accentLine: string;
  glow: string;
  numColor: string;
  hoverText: string;
}> = {
  amber: {
    iconBg: 'bg-amber-50/70',
    iconText: 'text-amber-600',
    iconBorder: 'border-amber-200/50',
    cardHoverBorder: 'hover:border-amber-300/60',
    cardHoverShadow: 'hover:shadow-[0_12px_30px_-6px_rgba(217,119,6,0.08)]',
    accentLine: 'bg-amber-500',
    glow: 'bg-gradient-to-r from-amber-500/[0.02] to-transparent',
    numColor: 'text-amber-600/5',
    hoverText: 'group-hover:text-amber-700',
  },
  blue: {
    iconBg: 'bg-blue-50/70',
    iconText: 'text-blue-600',
    iconBorder: 'border-blue-200/50',
    cardHoverBorder: 'hover:border-blue-300/60',
    cardHoverShadow: 'hover:shadow-[0_12px_30px_-6px_rgba(37,99,235,0.08)]',
    accentLine: 'bg-blue-500',
    glow: 'bg-gradient-to-r from-blue-500/[0.02] to-transparent',
    numColor: 'text-blue-600/5',
    hoverText: 'group-hover:text-blue-700',
  },
  emerald: {
    iconBg: 'bg-emerald-50/70',
    iconText: 'text-emerald-600',
    iconBorder: 'border-emerald-200/50',
    cardHoverBorder: 'hover:border-emerald-300/60',
    cardHoverShadow: 'hover:shadow-[0_12px_30px_-6px_rgba(16,185,129,0.08)]',
    accentLine: 'bg-emerald-500',
    glow: 'bg-gradient-to-r from-emerald-500/[0.02] to-transparent',
    numColor: 'text-emerald-600/5',
    hoverText: 'group-hover:text-emerald-700',
  },
  purple: {
    iconBg: 'bg-purple-50/70',
    iconText: 'text-purple-600',
    iconBorder: 'border-purple-200/50',
    cardHoverBorder: 'hover:border-purple-300/60',
    cardHoverShadow: 'hover:shadow-[0_12px_30px_-6px_rgba(147,51,234,0.08)]',
    accentLine: 'bg-purple-500',
    glow: 'bg-gradient-to-r from-purple-500/[0.02] to-transparent',
    numColor: 'text-purple-600/5',
    hoverText: 'group-hover:text-purple-700',
  },
  orange: {
    iconBg: 'bg-orange-50/70',
    iconText: 'text-orange-600',
    iconBorder: 'border-orange-200/50',
    cardHoverBorder: 'hover:border-orange-300/60',
    cardHoverShadow: 'hover:shadow-[0_12px_30px_-6px_rgba(249,115,22,0.08)]',
    accentLine: 'bg-orange-500',
    glow: 'bg-gradient-to-r from-orange-500/[0.02] to-transparent',
    numColor: 'text-orange-600/5',
    hoverText: 'group-hover:text-orange-700',
  },
  teal: {
    iconBg: 'bg-teal-50/70',
    iconText: 'text-teal-600',
    iconBorder: 'border-teal-200/50',
    cardHoverBorder: 'hover:border-teal-300/60',
    cardHoverShadow: 'hover:shadow-[0_12px_30px_-6px_rgba(13,148,136,0.08)]',
    accentLine: 'bg-teal-600',
    glow: 'bg-gradient-to-r from-teal-500/[0.02] to-transparent',
    numColor: 'text-teal-600/5',
    hoverText: 'group-hover:text-teal-700',
  },
  indigo: {
    iconBg: 'bg-indigo-50/70',
    iconText: 'text-indigo-600',
    iconBorder: 'border-indigo-200/50',
    cardHoverBorder: 'hover:border-indigo-300/60',
    cardHoverShadow: 'hover:shadow-[0_12px_30px_-6px_rgba(79,70,229,0.08)]',
    accentLine: 'bg-indigo-500',
    glow: 'bg-gradient-to-r from-indigo-500/[0.02] to-transparent',
    numColor: 'text-indigo-600/5',
    hoverText: 'group-hover:text-indigo-700',
  },
  rose: {
    iconBg: 'bg-rose-50/70',
    iconText: 'text-rose-600',
    iconBorder: 'border-rose-200/50',
    cardHoverBorder: 'hover:border-rose-300/60',
    cardHoverShadow: 'hover:shadow-[0_12px_30px_-6px_rgba(225,29,72,0.08)]',
    accentLine: 'bg-rose-500',
    glow: 'bg-gradient-to-r from-rose-500/[0.02] to-transparent',
    numColor: 'text-rose-600/5',
    hoverText: 'group-hover:text-rose-700',
  },
};

// ── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({
  Icon,
  title,
  description,
  index,
  color,
}: {
  Icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  color: string;
}) {
  const theme = colorThemes[color] || colorThemes.amber;
  const stepNumber = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative bg-white/60 backdrop-blur-sm border border-[#E8E3D9] rounded-2xl p-6 flex flex-row items-start gap-5 overflow-hidden cursor-default shadow-sm transition-all duration-300 w-full ${theme.cardHoverBorder} ${theme.cardHoverShadow}`}
    >
      {/* Gold glow background on hover */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${theme.glow}`} />

      {/* Left accent line */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme.accentLine}`} />

      {/* Faded step number background decoration */}
      <span className={`absolute right-6 bottom-2 text-7xl font-bold font-display select-none pointer-events-none transition-all duration-500 group-hover:scale-110 ${theme.numColor}`}>
        {stepNumber}
      </span>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} border ${theme.iconBorder} flex items-center justify-center transition-all duration-300 shrink-0`}>
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className={`${theme.iconText} transition-colors duration-300 flex items-center justify-center`}
        >
          <Icon className="w-7 h-7" strokeWidth={1.8} fill="currentColor" fillOpacity={0.15} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1 text-left relative z-10">
        <h3 className={`text-[18px] sm:text-[19px] font-bold text-[#18181B] leading-snug tracking-tight transition-colors duration-200 ${theme.hoverText}`}>
          {title}
        </h3>
        <p className="text-[14px] text-[#18181B]/65 leading-relaxed font-light text-left pr-6">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function WhyChooseUsSection() {
  return (
    <section className="py-28 px-4 bg-gradient-to-b from-[#FAF8F5] via-[#FDFBF7] to-[#FAF8F5] border-y border-[#E8E3D9]/60 relative overflow-hidden" id="why-choose-us">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full
          bg-gradient-radial from-gold/[0.05] via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full
          bg-gradient-radial from-gold/[0.04] via-transparent to-transparent blur-2xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">Why Choose Us</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-[#18181B] leading-[1.12] tracking-tight mb-4">
            Why Choose{' '}
            <span className="text-gradient-gold italic">Merinal Builders</span>
          </h2>

          {/* Colored underline/accent mark */}
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-6 rounded-full" />

          <p className="text-[15px] text-[#18181B]/55 leading-relaxed font-light">
            Building Trust Through Quality, Transparency, and Commitment.
          </p>
        </motion.div>

        {/* ── Feature Cards Grid (2-Column Grid on Desktop) ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {features.map((feat, i) => (
            <FeatureCard key={feat.title} {...feat} index={i} />
          ))}
        </div>

        {/* ── Statistics Strip ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-20"
        >
          <div className="bg-[#18181B] rounded-3xl px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Subtle gold line at top */}
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent rounded-full" />

            {stats.map(({ value, suffix, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-1"
              >
                <span className="text-4xl md:text-5xl font-display font-bold text-gradient-gold leading-none">
                  <AnimatedCounter target={value} suffix={suffix} />
                </span>
                <span className="text-[12px] uppercase tracking-[0.15em] text-white/45 font-medium mt-1">
                  {label}
                </span>
              </motion.div>
            ))}

            {/* Bottom subtle line */}
            <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent rounded-full" />
          </div>
        </motion.div>

        {/* ── Our Commitment Strip ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-white to-[#F8F6F0] border border-[#E8E3D9] rounded-3xl px-8 py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl md:text-3xl text-[#18181B] mb-2">Our Commitment to You</h3>
              <p className="text-[13px] text-[#18181B]/50">Every project. Every time. No exceptions.</p>
            </div>

            {/* Checklist grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {commitments.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0
                    group-hover:bg-gold/20 group-hover:border-gold/50 transition-all duration-300">
                    <Check className="w-3 h-3 text-gold" strokeWidth={2.5} />
                  </div>
                  <span className="text-[13px] text-[#18181B]/70 font-medium leading-snug group-hover:text-[#18181B] transition-colors duration-200">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Final CTA ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="font-display text-3xl md:text-4xl text-[#18181B] mb-3 leading-tight">
            Let's Build Something{' '}
            <span className="text-gradient-gold italic">Extraordinary</span> Together
          </h3>
          <p className="text-[14px] text-[#18181B]/50 mb-8 max-w-md mx-auto">
            Talk to our team today. Zero obligations. 100% transparency.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#18181B] text-[#FDFBF7] rounded-full
              text-[13px] font-semibold tracking-wide uppercase
              hover:bg-gold hover:text-[#18181B] hover:shadow-xl hover:shadow-gold/25
              transition-all duration-350 group"
          >
            Request a Free Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
