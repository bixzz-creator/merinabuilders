import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import LeadershipCard from '@/components/ui/LeadershipCard';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import { leadership } from '@/data/leadership';
import { Award, ShieldCheck, Milestone, Compass } from 'lucide-react';
import aboutHeroImg from '@/assets/images/hero-construction.png';
import { motion } from 'motion/react';
import SEO from '@/components/ui/SEO';
import { Link } from 'react-router';

export default function About() {
  const founder = leadership.find((m) => m.id === 'md');
  const divisions = leadership.filter((m) => m.id !== 'md');

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us | Merina Builders Construction",
    "description": "Learn about Merina Builders, our experienced engineers, skilled workforce, commitment to quality, and decades of trusted construction excellence.",
    "url": "https://merinabuilders.in/about"
  };

  return (
    <PageTransition>
      <SEO
        title="About Merina Builders | Trusted Construction Experts"
        description="Learn about Merina Builders, our experienced engineers, skilled workforce, commitment to quality, and decades of trusted construction excellence."
        keywords="About Merina Builders, Construction Engineers Thanjavur, Skilled Builders, Construction Quality Thanjavur"
        schema={aboutSchema}
      />
      <main className="w-full relative pt-20">
        {/* Banner Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
          <img
            src={aboutHeroImg}
            alt="About Merina Builders Construction"
            title="About Merina Builders Construction Team and Story"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-ivory">
              About <span className="text-gradient-gold italic">Us</span>
            </h1>
            <p className="text-sm uppercase tracking-widest text-ivory/60 font-semibold mt-4">
              Our Journey, Core Values & Engineering Leadership
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="section-padding bg-navy relative scroll-mt-24" id="about-us">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <RevealOnScroll direction="right" className="space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.2 bg-gold/[0.03] border border-gold/30 rounded-[4px] text-gold text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] self-start shadow-[0_2px_12px_rgba(212,175,55,0.06)]">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse shrink-0" />
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-ivory">
                  20 Years of Constructing Excellence
                </h2>
                <p className="text-[17px] sm:text-[19px] md:text-[20px] text-ivory/85 leading-relaxed font-light text-justify">
                  Established in <strong>2011</strong>, <strong>Merina Builders</strong> began with a simple vision: to construct spaces that <strong>elevate lifestyles</strong> and <strong>build trust</strong> with every concrete block. Today, we stand as one of South India's <strong>premier boutique construction companies</strong>, known for <strong>luxury finishes</strong> and <strong>robust engineering</strong>.
                </p>
                <p className="text-[17px] sm:text-[19px] md:text-[20px] text-ivory/85 leading-relaxed font-light text-justify">
                  We specialize in <strong>custom residential villa builds</strong>, large <strong>commercial park complexes</strong>, and <strong>heritage restorations</strong>. By integrating modern <strong>BIM planning</strong>, strict <strong>ISO guidelines</strong>, and <strong>premium materials</strong>, we eliminate uncertainty and bring architectural blueprints to life seamlessly.
                </p>
              </RevealOnScroll>

              <RevealOnScroll direction="left" className="relative rounded-xl overflow-hidden aspect-video lg:aspect-square border border-gold/10">
                <img
                  src={aboutHeroImg}
                  alt="Construction scaffolding details and safety checks"
                  title="Construction site engineering by Merina Builders"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-navy-light border-y border-gold/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <RevealOnScroll direction="up" className="glass p-8 md:p-10 rounded-xl relative group">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20 text-gold mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-display text-ivory mb-4 group-hover:text-gold transition-colors duration-300">
                  Our Mission
                </h3>
                <p className="text-[14px] sm:text-[15px] text-ivory/80 leading-relaxed font-light text-justify">
                  To build <strong>premium quality</strong>, <strong>sustainable</strong>, and <strong>design-forward structures</strong> while ensuring complete <strong>financial transparency</strong>, <strong>on-time delivery</strong>, and <strong>100% client satisfaction</strong>.
                </p>
              </RevealOnScroll>

              {/* Vision */}
              <RevealOnScroll direction="up" delay={0.1} className="glass p-8 md:p-10 rounded-xl relative group">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20 text-gold mb-6">
                  <Milestone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-display text-ivory mb-4 group-hover:text-gold transition-colors duration-300">
                  Our Vision
                </h3>
                <p className="text-[14px] sm:text-[15px] text-ivory/80 leading-relaxed font-light text-justify">
                  To be the <strong>most trusted name</strong> in <strong>luxury construction</strong> across South India, recognized for <strong>structural innovation</strong>, <strong>environmental compliance</strong>, and <strong>premium craftsmanship</strong>.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="section-padding bg-navy scroll-mt-24" id="leadership">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Founder Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-gold">
                Led By
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-ivory mt-2">
                Meet Our Founder
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
            </motion.div>

            {/* Founder Hero Card */}
            {founder && (
              <RevealOnScroll direction="up" className="max-w-3xl mx-auto mb-24">
                <div className="relative glass p-8 md:p-10 rounded-2xl border border-gold/30 shadow-[0_12px_40px_-12px_rgba(212,175,55,0.12)] flex flex-col items-center gap-6 overflow-hidden group text-center">
                  {/* Decorative gold gradient bar on top */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
                  
                  {/* Gold gradient background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Large Icon top-center */}
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-sm group-hover:border-gold/45 transition-colors duration-500 relative z-10">
                    <ShieldCheck className="w-8 h-8" />
                  </div>

                  {/* Info */}
                  <div className="relative z-10 w-full">
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-black tracking-wide">
                      {founder.name}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-ivory/60 font-semibold mt-1.5">
                      {founder.designation}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-24 h-px bg-gold/10 my-2 relative z-10" />

                  {/* Responsibilities */}
                  <div className="w-full relative z-10 text-left md:px-6">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-gold text-center mb-4">
                      Key Responsibilities
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                      {founder.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-ivory/80 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* Team/Divisions Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-gold">
                Expertise
              </span>
              <h3 className="text-2xl md:text-4xl font-bold font-display text-ivory mt-2">
                Our Leadership Team
              </h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
            </motion.div>

            {/* Division Cards (Staggered Scroll Reveal Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {divisions.map((member, index) => (
                <RevealOnScroll
                  key={member.id}
                  direction="up"
                  delay={index * 0.15}
                  className="h-full"
                >
                  <LeadershipCard member={member} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us — Value Propositions */}
        <section className="section-padding bg-navy-light border-t border-gold/10">
          <div className="max-w-7xl mx-auto text-center">
            <SectionHeading
              badge="Why Choose Us"
              title="What Sets Us Apart"
              subtitle="We deliver premium construction with honesty, craftsmanship, and real value for every client."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: ShieldCheck, title: 'Affordable Prices',    desc: 'Fair & transparent pricing with no hidden costs' },
                { icon: Award,       title: 'On-Time Delivery',     desc: 'Projects completed as promised, every time' },
                { icon: ShieldCheck, title: 'Quality Materials',    desc: 'We use only durable, premium-grade materials' },
                { icon: Award,       title: '20+ Years Experience', desc: 'Trusted by clients across Tamil Nadu' },
              ].map((item, idx) => (
                <RevealOnScroll
                  key={idx}
                  delay={idx * 0.1}
                  className="glass p-6 rounded-xl flex flex-col items-center justify-center"
                >
                  <item.icon className="w-10 h-10 text-gold mb-4" />
                  <h4 className="text-base font-bold text-ivory">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </RevealOnScroll>
              ))}
            </div>

            {/* Services CTA */}
            <div className="mt-12 text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
