import { useParams, Link, Navigate } from 'react-router';
import { motion } from 'motion/react';
import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import SEO from '@/components/ui/SEO';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import * as LucideIcons from 'lucide-react';
import { detailedServices } from '@/data/detailedServices';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  
  const service = detailedServices.find(
    (s) => s.id === serviceId?.toLowerCase()
  );

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = (LucideIcons as any)[service.iconName] || LucideIcons.Building2;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://merinabuilders.in/services/${service.id}#service`,
    "name": service.title,
    "description": service.intro,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Merina Builders Construction",
      "telephone": "+91 99947 74598",
      "url": "https://merinabuilders.in"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
      { "@type": "City", "name": "Thanjavur" },
      { "@type": "City", "name": "Kumbakonam" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.deliverables.map((item, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item
        }
      }))
    }
  };

  const renderSplitTitle = (textBlack: string, textGold: string) => {
    return (
      <>
        <span className="text-ivory group-hover:text-gold transition-colors duration-300">
          {textBlack}
        </span>{' '}
        <span className="text-gradient-gold italic">
          {textGold}
        </span>
      </>
    );
  };

  return (
    <PageTransition>
      <SEO
        title={`${service.title} | Premium Construction Services`}
        description={service.description}
        keywords={service.keywords}
        schema={serviceSchema}
      />

      <main className="w-full relative pt-20 bg-navy text-ivory">
        {/* Banner Section */}
        <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold font-display text-ivory mb-4">
              {renderSplitTitle(service.titleBlack, service.titleGold)}
            </h1>
            <div className="w-20 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-ivory/60 font-semibold max-w-xl mx-auto leading-relaxed">
              {service.badge}
            </p>
          </div>
        </section>

        {/* Detailed Description */}
        <section className="section-padding bg-navy relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Details & Deliverables */}
              <div className="lg:col-span-8 space-y-8">
                <RevealOnScroll direction="right" className="space-y-6">
                  <h2 className="text-3xl font-bold font-display text-ivory">
                    Overview of Our {service.title} Division
                  </h2>
                  <p className="text-base sm:text-lg text-ivory/80 leading-relaxed font-light text-justify">
                    {service.intro}
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-justify">
                    {service.description}
                  </p>
                </RevealOnScroll>

                <RevealOnScroll direction="right" delay={0.1} className="space-y-6">
                  <h3 className="text-xl font-bold font-display text-gold uppercase tracking-wider">
                    Our Deliverables & Scope
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-navy-light/60 border border-gold/10 hover:border-gold/30 transition-all">
                        <span className="w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                          <LucideIcons.Check className="w-3 h-3 text-gold" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-ivory/85 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </RevealOnScroll>
              </div>

              {/* Right Column: Local Metrics & Why Us */}
              <div className="lg:col-span-4 space-y-6">
                {/* Highlights Card */}
                <RevealOnScroll direction="left" className="glass p-8 rounded-xl border border-gold/20 flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20 text-gold mb-2">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-ivory uppercase tracking-wider">
                    Key Performance Metrics
                  </h3>
                  <div className="space-y-4">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-gold/10 pb-3 last:border-0 last:pb-0">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">{h.label}</span>
                        <span className="text-lg font-bold font-display text-gold">{h.val}</span>
                      </div>
                    ))}
                  </div>
                </RevealOnScroll>

                {/* Why Us Bulletins */}
                <RevealOnScroll direction="left" delay={0.1} className="glass p-8 rounded-xl border border-gold/20">
                  <h3 className="text-lg font-bold font-display text-ivory uppercase tracking-wider mb-6">
                    Why Choose Our Team?
                  </h3>
                  <ul className="space-y-4">
                    {service.whyChooseUs.map((w, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ivory/80 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </RevealOnScroll>
              </div>

            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="section-padding bg-navy-light border-y border-gold/10">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge="Our Workflow"
              title={`The 5-Step Process for ${service.title}`}
              subtitle="We coordinate cost controls, site clearances, and quality milestones step-by-step to guarantee delivery without budget overruns."
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {service.process.map((step, index) => (
                <RevealOnScroll
                  key={index}
                  direction="up"
                  delay={index * 0.1}
                  className="glass p-6 rounded-xl relative flex flex-col gap-4 border border-gold/15 hover:border-gold/30 hover:shadow-lg transition-all"
                >
                  <div className="absolute top-4 right-4 text-xs font-bold text-gold/30 font-display">
                    0{index + 1}
                  </div>
                  <h4 className="text-base font-bold font-display text-gold mt-2">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-navy">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-ivory">
              Ready to Coordinate Your {service.title} Project?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Get in touch with our certified engineers to discuss blueprints, structural clearances, and initial estimates.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer"
              >
                Inquire Service
              </Link>
              <Link
                to="/estimator"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-gold/20 text-ivory hover:text-gold hover:border-gold/40 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                Run Cost Estimator
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
