import { useState } from 'react';
import { motion } from 'motion/react';
import { services } from '@/data/services';
import SectionHeading from '@/components/ui/SectionHeading';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router';
import commercialImg from '@/assets/images/hero-construction.png';
import renovationImg from '@/assets/images/modern-interior.png';
import luxuryVillaImg from '@/assets/images/luxury-villa.png';

export default function ServicesOverviewSection() {
  // Map service IDs to the generated images
  const getImageForService = (id: string) => {
    switch (id) {
      case 'commercial':
        return commercialImg;
      case 'residential':
        return luxuryVillaImg;
      case 'industrial':
        return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80';
      case 'renovation':
        return renovationImg;
      case 'infrastructure':
        return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80';
      default:
        return commercialImg;
    }
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Services"
          title="Exceptional Architecture, Built to Last"
          subtitle="Explore our design and construction divisions, optimized for high structural safety and modern finishes."
        />

        {/* Alternating Left-Right Services Cards */}
        <div className="mt-16 space-y-24 md:space-y-28">
          {services.map((service, index) => {
            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Building2;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-16 w-full py-2 hover:-translate-y-2 transition-all duration-500 ease-out`}
              >
                {/* Image Side (40% width on desktop) */}
                <div className="w-full md:w-[40%] relative overflow-hidden rounded-[24px] h-[350px] md:h-[480px] shrink-0 border border-gold/15 shadow-xl">
                  <img
                    src={getImageForService(service.id)}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  />
                </div>

                {/* Content Side (60% width on desktop) */}
                <div className="w-full md:w-[60%] flex flex-col justify-center items-start bg-transparent p-2 sm:p-6 lg:p-10">
                  {/* Badge & Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 text-gold flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-gold-light">
                      0{index + 1} / {service.id.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-gradient-gold tracking-wide mb-4 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-ivory/80 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                    {service.description}
                  </p>

                  {/* Highlights Checklist */}
                  {service.highlights && service.highlights.length > 0 && (
                    <ul className="space-y-3 mb-8 text-left max-w-xl">
                      {service.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-3 text-ivory/85 text-xs sm:text-sm">
                          <span className="w-5 h-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                            <LucideIcons.Check className="w-2.5 h-2.5 text-gold" strokeWidth={3} />
                          </span>
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Features */}
                  <div className="flex flex-wrap gap-2.5 mb-10">
                    {service.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-xs font-semibold tracking-wider text-ivory/95 bg-white/5 hover:bg-gold/15 hover:text-gold px-3.5 py-2 rounded-full border border-gold/10 transition-colors duration-300"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Call to action */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gold hover:text-gold-light transition-colors tracking-widest uppercase group/link"
                  >
                    Explore Service
                    <span className="transform translate-x-0 group-hover/link:translate-x-2 transition-transform duration-300 text-base">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
