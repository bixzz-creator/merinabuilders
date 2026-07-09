import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectShowcaseSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollEl = scrollRef.current;
      const pinEl = pinRef.current;
      if (!scrollEl || !pinEl) return;

      // Only perform pinning & horizontal scroll on medium screens and larger
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const amountToScroll = scrollEl.scrollWidth - window.innerWidth + 80;

        gsap.to(scrollEl, {
          x: -amountToScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: pinEl,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${amountToScroll}`,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: pinRef }
  );

  return (
    <div ref={pinRef} className="bg-navy-light overflow-hidden">
      {/* Section Header */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            badge="Portfolio"
            title="Featured Masterpieces"
            subtitle="Explore our select residential and commercial landmark projects completed with structural excellence."
            align="left"
            className="mb-0"
          />
          <Link to="/projects" className="shrink-0">
            <Button className="rounded-full bg-transparent hover:bg-gold/10 text-gold border border-gold/30 px-8 py-6 text-sm font-semibold transition-all duration-300">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Pinned horizontal scrolling wrapper */}
      <div className="h-screen md:h-[70vh] flex items-center py-10 md:py-0">
        <div
          ref={scrollRef}
          className="flex gap-8 px-4 sm:px-6 lg:px-8 h-full items-center min-w-max"
        >
          {projects.slice(0, 4).map((project) => (
            <div
              key={project.id}
              className="w-[85vw] sm:w-[500px] md:w-[600px] h-[50vh] md:h-[55vh] relative rounded-xl overflow-hidden group shadow-lg shadow-black/40 border border-gold/10 bg-[#060C14]"
            >
              {/* Blurred background copy for aspect ratio filling */}
              <img
                src={project.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-105 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
              />

              {/* Contained foreground image (always fully visible) */}
              <img
                src={project.image}
                alt={project.title}
                className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Dark bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10 pointer-events-none" />

              {/* Info Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end z-20">
                <span className="px-3 py-1 rounded bg-gold/20 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-widest self-start mb-3">
                  {project.category}
                </span>

                <h3 className="text-xl md:text-2xl font-bold font-display text-[#FDFBF7] tracking-wide mb-2 group-hover:text-gold transition-colors duration-300 [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
                  {project.title}
                </h3>

                {/* Sliding details panel */}
                <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="overflow-hidden">
                    <p className="text-xs md:text-sm text-[#FDFBF7]/85 mb-4 max-w-md leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.4)]">
                      {project.description}
                    </p>

                    <div className="flex justify-between items-center text-xs text-[#FDFBF7]/60 border-t border-white/10 pt-4 mb-4">
                      <span>📍 {project.location}</span>
                      <span>🗓️ Completed: {project.year}</span>
                    </div>

                    <span className="text-xs text-gold font-bold tracking-widest uppercase flex items-center gap-1.5">
                      Explore Case Study <span className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* View More Card */}
          <div className="w-[85vw] sm:w-[350px] h-[50vh] md:h-[55vh] flex flex-col items-center justify-center glass rounded-xl border border-gold/20 p-8 text-center group">
            <h3 className="text-2xl font-bold font-display text-gradient-gold mb-4">
              Your Project Next?
            </h3>
            <p className="text-sm text-muted-foreground mb-8 max-w-xs">
              Let\'s collaborate to conceptualize, design, and construct your dream property.
            </p>
            <Link to="/contact">
              <Button className="rounded-full bg-gradient-to-r from-gold to-gold-light text-navy font-bold hover:shadow-lg hover:shadow-gold/20 transition-all duration-300">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
