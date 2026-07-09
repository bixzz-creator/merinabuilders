import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { PhoneCall } from 'lucide-react';
import { COMPANY_PHONE } from '@/constants/navigation';

export default function CTASection() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto glass p-10 md:p-16 rounded-2xl border border-gold/25 relative z-10 text-center overflow-hidden">
        {/* Background gradient shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5 pointer-events-none" />

        <div className="flex flex-col items-center select-none">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold uppercase tracking-widest border border-gold/25 mb-6"
          >
            Start Your Journey
          </motion.span>

          <h2 className="text-3xl md:text-5xl font-bold font-display text-ivory max-w-2xl mb-6">
            Let\'s Build Your <span className="text-gradient-gold">Masterpiece</span> Together
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Reach out to schedule a free project consultation, coordinate site visits, or request construction cost estimates.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link to="/contact">
              <Button className="rounded-full bg-gradient-to-r from-gold to-gold-light text-navy font-bold hover:shadow-lg hover:shadow-gold/30 hover:scale-105 active:scale-95 transition-all duration-300 px-8 py-6 text-base cursor-pointer">
                Book Site Visit
              </Button>
            </Link>
            
            <a
              href={`tel:${COMPANY_PHONE}`}
              className="flex items-center gap-2 px-8 py-4 rounded-full glass text-gold font-bold hover:bg-gold/10 hover:border-gold/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {COMPANY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
