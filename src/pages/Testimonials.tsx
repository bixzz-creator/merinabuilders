import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { testimonials } from '@/data/testimonials';
import { Star, Quote } from 'lucide-react';
import testimonialBg from '@/assets/images/modern-interior.png';

export default function Testimonials() {
  return (
    <PageTransition>
      <main className="w-full relative pt-20">
        {/* Banner Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
          <img
            src={testimonialBg}
            alt="Client Testimonials"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-ivory">
              Client <span className="text-gradient-gold italic">Reviews</span>
            </h1>
            <p className="text-sm uppercase tracking-widest text-ivory/60 font-semibold mt-4">
              100% Client Satisfaction Across 150+ Projects
            </p>
          </div>
        </section>

        {/* Sliding Infinite Marquee Banner */}
        <TestimonialsSection />

        {/* Detailed Grid of Testimonials */}
        <section className="section-padding bg-navy">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge="Client Stories"
              title="Verified Experiences"
              subtitle="Browse through detailed testimonials detailing the transparency, schedule adherence, and premium quality they experienced."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="glass p-8 rounded-xl flex flex-col justify-between relative hover:border-gold/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-gold/10 group-hover:text-gold/20 transition-colors duration-300" />
                  
                  <div>
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating ? 'text-gold fill-gold' : 'text-ivory/20'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-ivory/80 leading-relaxed italic mb-8 relative z-10">
                      "{item.content}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 font-bold font-display text-gold">
                      {item.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ivory">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
