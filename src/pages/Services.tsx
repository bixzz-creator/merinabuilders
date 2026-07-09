import { useEffect, useState } from 'react';
import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'motion/react';
import CTASection from '@/components/sections/CTASection';
import { Link, useLocation } from 'react-router';
import SEO from '@/components/ui/SEO';
import { 
  Building2, 
  Hammer, 
  ClipboardCheck, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Workflow, 
  Briefcase
} from 'lucide-react';

import commercialImg from '@/assets/images/hero-construction.png';
import renovationImg from '@/assets/images/modern-interior.png';
import projectMgmtImg from '@/assets/images/luxury-villa.png';

interface ProcessStep {
  title: string;
  desc: string;
}

interface Stat {
  val: string;
  label: string;
}

interface DetailedService {
  id: string;
  badge: string;
  title: string;
  titleBlack: string;
  titleGold: string;
  intro: string;
  description: string;
  image: string;
  icon: React.ComponentType<any>;
  deliverables: string[];
  process: ProcessStep[];
  whyChooseUs: string[];
  highlights: Stat[];
  ctaText: string;
  ctaLink: string;
}

const DETAILED_SERVICES: DetailedService[] = [
  {
    id: 'commercial',
    badge: 'Division 01 / Infrastructure',
    title: 'Commercial Construction',
    titleBlack: 'Commercial',
    titleGold: 'Construction',
    intro: 'Delivering modern commercial spaces that combine structural strength, functionality, and long-term value. From concept to completion, every project is engineered for durability, safety, and business growth.',
    description: 'Our commercial construction team specializes in office buildings, educational institutions, churches, retail developments, industrial facilities, and mixed-use projects. Every structure is planned with precision engineering, quality materials, regulatory compliance, and efficient project execution. We work closely with architects, engineers, consultants, and clients to deliver spaces that are functional, sustainable, and built to last.',
    image: commercialImg,
    icon: Building2,
    deliverables: [
      'Corporate Office Buildings & Tech Parks',
      'Multi-Storey Commercial Complexes',
      'Educational Institutions & Campus Facilities',
      'Custom Churches & Assembly Halls',
      'Industrial Warehouses & Manufacturing Plants',
      'High-Load Structural Engineering',
      'Turnkey Building Solutions'
    ],
    process: [
      { title: 'Planning', desc: 'Detailed site evaluation, zoning compliance, and pre-construction clearance.' },
      { title: 'Design Coordination', desc: 'Collaboration with architects to finalize blueprints, MEP planning, and load specs.' },
      { title: 'Construction', desc: 'Execution of earthworks, deep foundations, RCC framing, and masonry.' },
      { title: 'Quality Inspection', desc: 'Rigorous structural strength tests, safety audits, and material validations.' },
      { title: 'Project Handover', desc: 'Regulatory occupancy certification and detailed client walkthrough.' }
    ],
    whyChooseUs: [
      'Experienced Engineering Team',
      'Premium Construction Materials',
      'Transparent Project Tracking',
      'Strict Quality Standards',
      'On-Time Delivery'
    ],
    highlights: [
      { val: '150+', label: 'Projects Delivered' },
      { val: '15+', label: 'Years Experience' },
      { val: '98%', label: 'Client Satisfaction' }
    ],
    ctaText: 'Explore Commercial Projects',
    ctaLink: '/contact'
  },
  {
    id: 'renovation',
    badge: 'Division 02 / Restoration',
    title: 'Renovation & Remodeling',
    titleBlack: 'Renovation &',
    titleGold: 'Remodeling',
    intro: 'Revitalizing heritage landmarks, sacred spaces, and contemporary properties. We fuse structural reinforcement with modern architectural finishes to prolong building lifespans.',
    description: 'Our specialized renovation division breathes new life into existing buildings. We deliver comprehensive structural repairs, advanced waterproofing, and heritage restoration for landmarks and churches. From custom flooring and paint finishes to complete electrical and plumbing system upgrades, our team optimizes layout utility while upgrading the exterior facade. We ensure every project complies with modern safety standards without losing its original architectural soul.',
    image: renovationImg,
    icon: Hammer,
    deliverables: [
      'Heritage Building Restoration',
      'Aesthetic & Structural Church Renovations',
      'High-Durability Structural Repairs',
      'Contemporary Interior Modernization',
      'Premium Exterior Facelift & Cladding',
      'Multi-Layer Waterproofing Systems',
      'High-End Flooring & Epoxy Finishes',
      'Electrical & Plumbing System Upgrades',
      'Architectural Space Optimization'
    ],
    process: [
      { title: 'Condition Assessment', desc: 'Non-destructive testing, moisture analysis, and structural integrity scans.' },
      { title: 'Feasibility & Design', desc: 'Balancing preservation requirements with modern usage patterns and MEP systems.' },
      { title: 'Structural Repair', desc: 'Reinforcing columns, repairing cracks, and applying advanced waterproofing.' },
      { title: 'Finishes & Upgrades', desc: 'Installing premium flooring, high-end paint, and smart electrical fixtures.' },
      { title: 'Quality Assurance', desc: 'Final seal audits, plumbing pressure checks, and finish-work validation.' }
    ],
    whyChooseUs: [
      'Specialized Heritage Expertise',
      'Grade-A Waterproofing Systems',
      'Structurally Certified Engineers',
      'Minimum Site Disruption',
      'Transparent Cost Estimation'
    ],
    highlights: [
      { val: '85+', label: 'Restorations Completed' },
      { val: '20+', label: 'Churches Restored' },
      { val: '10-Yr', label: 'Waterproofing Warranty' }
    ],
    ctaText: 'Inquire About Remodeling',
    ctaLink: '/contact'
  },
  {
    id: 'project-management',
    badge: 'Division 03 / Operations',
    title: 'Project Management & Consultancy',
    titleBlack: 'Project Management &',
    titleGold: 'Consultancy',
    intro: 'Safeguarding your investments through rigorous schedule monitoring, cost control, and uncompromising quality assurance. We manage the complexity, you own the results.',
    description: 'Our Project Management Consultancy (PMC) controls construction risk at every phase. We oversee cost budgeting, vendor vetting, and procurement management, ensuring transparency and eliminating budget overruns. With dedicated site supervision, timeline monitoring, and detailed project documentation, we coordinate all subcontractors while maintaining strict safety and regulatory compliance. From concept to handover, we act as your trusted technical partner.',
    image: projectMgmtImg,
    icon: ClipboardCheck,
    deliverables: [
      'Feasibility & Preliminary Planning',
      'Detailed Budget Estimation & Cost Control',
      'Subcontractor Vetting & Coordination',
      'Material Procurement & Quality Validation',
      'Daily On-Site Supervision & HSE Management',
      'Milestone Scheduling & Timeline Tracking',
      'Multi-Tier Quality Control Protocols',
      'Safety and HSE Compliance Enforcement',
      'Regulatory Clearances & Final Handover Reports'
    ],
    process: [
      { title: 'Feasibility Analysis', desc: 'Cost-benefit analyses, risk logging, and project timeline drafting.' },
      { title: 'Budget Vetting', desc: 'Detailed bill of quantities (BOQ) preparation and cost optimization.' },
      { title: 'Procurement Setup', desc: 'Sourcing certified raw materials and onboarding vetted specialty vendors.' },
      { title: 'Onsite Management', desc: 'Daily supervision, safety monitoring, and quality inspection runs.' },
      { title: 'Audits & Handover', desc: 'Comprehensive system checks, documentation compiling, and project closeout.' }
    ],
    whyChooseUs: [
      'Zero Budget Overrun Guarantee',
      'Strict Safety Protocols (HSE)',
      'Daily Portal Progress Updates',
      'Rigorous Quality Inspections',
      'Vetted Vendor Network'
    ],
    highlights: [
      { val: '100%', label: 'On-Time Delivery' },
      { val: '0', label: 'Safety Incidents' },
      { val: '24/7', label: 'Client Portal Access' }
    ],
    ctaText: 'Consult With Our Team',
    ctaLink: '/contact'
  }
];

export default function Services() {
  const location = useLocation();
  const [activeHash, setActiveHash] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.substring(1);
      setActiveHash(hashId);
      setIsFocused(true);

      const timer = setTimeout(() => {
        setIsFocused(false);
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      setActiveHash('');
      setIsFocused(false);
    }
  }, [location.hash]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Wait a short duration to ensure page transitions & rendering have finished
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [location]);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Construction Services | Merina Builders Construction",
    "description": "Explore Merina Builders' professional construction services including commercial construction, renovation, remodeling, project management, and engineering solutions.",
    "url": "https://merinabuilders.in/services"
  };

  return (
    <PageTransition>
      <SEO
        title="Construction Services | Commercial Construction, Renovation & Project Management"
        description="Explore Merina Builders' professional construction services including commercial construction, renovation, remodeling, project management, and engineering solutions."
        keywords="Construction Services Thanjavur, Commercial Building Contractors, Renovation Services, Project Management Construction"
        schema={servicesSchema}
      />
      <main className="w-full relative pt-20 bg-navy text-ivory">
        {/* Banner Section */}
        <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <img
            src={projectMgmtImg}
            alt="Services offered by Merina Builders Construction"
            title="Services offered by Merina Builders Construction"
            className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold font-display text-ivory mb-4">
              Our{' '}
              <span className="text-gradient-gold italic">Capabilities</span>
            </h1>
            <div className="w-20 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-ivory/60 font-semibold max-w-xl mx-auto leading-relaxed">
              Premium Construction, Restoration, and End-to-End Project Control
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 hover:bg-gold/20 text-gold text-xs uppercase font-bold tracking-widest border border-gold/30 transition-all cursor-pointer"
              >
                Browse Projects Portfolio <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Premium Horizontal Editorial Cards Stack */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24 md:pb-32 bg-navy">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge="Our Divisions"
              title="Tailored Engineering Solutions"
              subtitle="From planning permissions and design sketches to construction and keys, we handle everything under one roof."
            />

            <div className="mt-16 space-y-24 lg:space-y-36">
              {DETAILED_SERVICES.map((service, index) => {
                const Icon = service.icon;
                const isEven = index % 2 === 0;
                
                const isTargeted = activeHash === service.id;
                const isDimmed = isFocused && !isTargeted;

                return (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full py-4 border-b border-ivory/10 pb-16 lg:pb-24 last:border-0 scroll-mt-28 transition-all duration-700 ${
                      isTargeted 
                        ? 'scale-[1.02] border-gold/45 rounded-3xl p-6 bg-gold/[0.015] shadow-[0_0_60px_rgba(212,175,55,0.16)]' 
                        : isDimmed 
                        ? 'opacity-20 blur-[1.5px] pointer-events-none scale-[0.98]' 
                        : 'opacity-100 blur-0 scale-100'
                    }`}
                  >
                    {/* Header Block: Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                      {/* Left: Text Info */}
                      <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        {/* Division Number & Badge */}
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.2em] text-gold">
                            {service.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-wide mb-6 text-ivory">
                          {service.titleBlack}{' '}
                          <span className="text-gradient-gold italic">{service.titleGold}</span>
                        </h2>

                        {/* Short Introduction */}
                        <p className="text-base sm:text-lg font-light text-ivory/90 leading-relaxed border-l-2 border-gold/60 pl-6 mb-8 max-w-2xl">
                          {service.intro}
                        </p>

                        {/* Detailed Description */}
                        <p className="text-sm sm:text-base text-ivory/70 leading-relaxed font-sans max-w-2xl">
                          {service.description}
                        </p>
                      </div>

                      {/* Right: Immersive Image Frame */}
                      <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="relative group overflow-hidden rounded-[24px] border border-gold/15 shadow-2xl bg-navy-light p-2 transition-all duration-500 hover:border-gold/30">
                          {/* Inner container for image */}
                          <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] rounded-[18px] overflow-hidden">
                            <img
                              src={service.image}
                              alt={`${service.title} - Merina Builders`}
                              title={`${service.title} engineering project details`}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                              loading="lazy"
                              width={600}
                              height={450}
                            />
                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Content Grid — Black & Gold */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 pt-16 border-t border-gold/10">

                      {/* Panel 1: Key Deliverables */}
                      <div className="relative group/panel bg-[#0A0A0A] border border-gold/20 rounded-2xl p-7 flex flex-col gap-5
                        hover:border-gold/50 hover:shadow-[0_0_40px_-8px_rgba(212,175,55,0.18)] transition-all duration-400 overflow-hidden">
                        {/* Top gold glow line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                        <div className="flex items-center gap-3 pb-4 border-b border-gold/15">
                          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                            <Briefcase className="w-5 h-5 text-gold" />
                          </div>
                          <h3 className="text-[10px] uppercase font-bold tracking-[0.22em] text-gold">
                            Key Deliverables
                          </h3>
                        </div>
                        <ul className="space-y-3.5">
                          {service.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 group/item">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0 group-hover/item:scale-125 transition-transform duration-200" />
                              <span className="text-[13px] font-medium text-white/70 leading-relaxed group-hover/item:text-white/90 transition-colors duration-200">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                      </div>

                      {/* Panel 2: Our Process */}
                      <div className="relative group/panel bg-[#0A0A0A] border border-gold/20 rounded-2xl p-7 flex flex-col gap-5
                        hover:border-gold/50 hover:shadow-[0_0_40px_-8px_rgba(212,175,55,0.18)] transition-all duration-400 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                        <div className="flex items-center gap-3 pb-4 border-b border-gold/15">
                          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                            <Workflow className="w-5 h-5 text-gold" />
                          </div>
                          <h3 className="text-[10px] uppercase font-bold tracking-[0.22em] text-gold">
                            Our Process
                          </h3>
                        </div>
                        <div className="relative pl-5 border-l-2 border-gold/25 space-y-5">
                          {service.process.map((step, i) => (
                            <div key={i} className="relative group/step">
                              <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-[#0A0A0A] border-2 border-gold/60 group-hover/step:bg-gold transition-all duration-300" />
                              <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold mb-1.5">
                                {step.title}
                              </h4>
                              <p className="text-[13px] text-white/55 leading-relaxed">
                                {step.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                      </div>

                      {/* Panel 3: Why Choose Merinal + Stats */}
                      <div className="relative group/panel bg-[#0A0A0A] border border-gold/20 rounded-2xl p-7 flex flex-col gap-5
                        hover:border-gold/50 hover:shadow-[0_0_40px_-8px_rgba(212,175,55,0.18)] transition-all duration-400 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                        <div className="flex items-center gap-3 pb-4 border-b border-gold/15">
                          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-5 h-5 text-gold" />
                          </div>
                          <h3 className="text-[10px] uppercase font-bold tracking-[0.22em] text-gold">
                            Why Choose Merinal
                          </h3>
                        </div>
                        <ul className="space-y-3.5">
                          {service.whyChooseUs.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 group/item">
                              <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0
                                group-hover/item:bg-gold/20 transition-colors duration-200">
                                <Check className="w-3 h-3 text-gold" />
                              </div>
                              <span className="text-[13px] font-medium text-white/70 leading-snug group-hover/item:text-white/90 transition-colors duration-200">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Project Statistics */}
                        <div className="mt-auto pt-5 border-t border-gold/15">
                          <div className="grid grid-cols-3 gap-2">
                            {service.highlights.map((stat, i) => (
                              <div key={i} className="text-center">
                                <span className="block text-2xl font-bold font-display text-gradient-gold leading-none">
                                  {stat.val}
                                </span>
                                <span className="block text-[8px] uppercase tracking-wider text-white/35 font-semibold mt-1.5 leading-tight">
                                  {stat.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                      </div>

                    </div>


                    {/* CTA Action button */}
                    <div className="w-full flex justify-end mt-12 pt-4">
                      <Link
                        to={service.ctaLink}
                        className="group/cta inline-flex items-center gap-4 px-8 py-3.5 rounded-full border border-gold/30 hover:border-gold bg-transparent text-xs font-bold text-ivory uppercase tracking-widest hover:bg-gold/5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>{service.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                      </Link>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </PageTransition>
  );
}
