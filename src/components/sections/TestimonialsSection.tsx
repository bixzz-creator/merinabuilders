import { testimonials } from '@/data/testimonials';
import SectionHeading from '@/components/ui/SectionHeading';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const midPoint = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, midPoint);
  const secondRow = testimonials.slice(midPoint);

  const TestimonialCard = ({ item }: { item: typeof testimonials[0] }) => (
    <div className="w-[350px] md:w-[400px] glass p-6 md:p-8 rounded-xl flex flex-col justify-between shrink-0 select-none hover:border-gold/30 hover:scale-[1.02] transition-all duration-300">
      <div>
        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < item.rating ? 'text-gold fill-gold' : 'text-ivory/20'
              }`}
            />
          ))}
        </div>
        
        {/* Review Content */}
        <p className="text-sm text-ivory/80 leading-relaxed italic mb-6">
          "{item.content}"
        </p>
      </div>

      {/* User Info */}
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
  );

  return (
    <section className="py-24 bg-navy-light relative overflow-hidden border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeading
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Read the authentic feedback from property owners and developers who built their landmarks with us."
        />
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-6 w-full overflow-hidden relative">
        {/* Fade overlays on edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-navy-light to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-navy-light to-transparent z-10 pointer-events-none" />

        {/* Row 1: Scrolling Left */}
        <div className="flex w-max gap-6 animate-marquee-left hover:pause-animation">
          {/* Double content for seamless looping */}
          {firstRow.concat(firstRow).map((item, index) => (
            <TestimonialCard key={`row1-${item.id}-${index}`} item={item} />
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex w-max gap-6 animate-marquee-right hover:pause-animation">
          {/* Double content for seamless looping */}
          {secondRow.concat(secondRow).map((item, index) => (
            <TestimonialCard key={`row2-${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
