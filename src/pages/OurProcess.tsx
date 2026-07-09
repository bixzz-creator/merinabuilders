import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectTimelineStep from '@/components/ui/ProjectTimelineStep';
import { processSteps } from '@/data/process';
import processBg from '@/assets/images/hero-construction.png';
import SEO from '@/components/ui/SEO';

export default function OurProcess() {
  const processSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://merinabuilders.in/our-process#webpage",
    "name": "Our Construction Process | Merina Builders",
    "description": "From planning to handover — discover our systematic 6-step construction process that ensures quality, transparency, and on-time delivery.",
    "url": "https://merinabuilders.in/our-process"
  };

  return (
    <PageTransition>
      <SEO
        title="Our Construction Process | Turnkey Building Stages"
        description="From planning to handover — discover our systematic 6-step construction process that ensures quality, transparency, and on-time delivery."
        keywords="Construction Process, Turnkey Construction Stages, Building Timeline, Civil Engineering Management"
        schema={processSchema}
      />
      <main className="w-full relative pt-20">
        {/* Banner Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
          <img
            src={processBg}
            alt="Our Construction Process"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-ivory">
              Our <span className="text-gradient-gold italic">Process</span>
            </h1>
            <p className="text-sm uppercase tracking-widest text-ivory/60 font-semibold mt-4">
              A systematic 6-step roadmap to structural perfection
            </p>
          </div>
        </section>

        {/* Process Timeline Section */}
        <section className="section-padding bg-navy relative">
          <div className="max-w-7xl mx-auto relative">
            <SectionHeading
              badge="Execution Roadmap"
              title="From Sketch to Handover"
              subtitle="We employ a structured workflow that guarantees high material safety standards, schedule integrity, and complete Vastu alignment."
            />

            {/* Vertical timeline connecting line */}
            <div className="absolute left-10 md:left-1/2 top-[250px] bottom-[100px] w-0.5 bg-gradient-to-b from-gold via-gold/50 to-gold/10 -translate-x-1/2 hidden md:block" />
            <div className="absolute left-10 top-[250px] bottom-[100px] w-0.5 bg-gradient-to-b from-gold via-gold/50 to-gold/10 -translate-x-1/2 md:hidden" />

            <div className="relative z-10">
              {processSteps.map((step, index) => (
                <ProjectTimelineStep key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
