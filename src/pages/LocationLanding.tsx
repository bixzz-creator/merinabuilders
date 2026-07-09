import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import SEO from '@/components/ui/SEO';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import { Building2, Home as HomeIcon, Hammer, Award, ClipboardCheck, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import aboutHeroImg from '@/assets/images/hero-construction.png';

interface LocationInfo {
  id: string;
  name: string;
  lat: number;
  lng: number;
  postalCode: string;
  keywords: string;
  description: string;
}

const LOCATIONS: Record<string, LocationInfo> = {
  thanjavur: {
    id: 'thanjavur',
    name: 'Thanjavur',
    lat: 10.7870,
    lng: 79.1378,
    postalCode: '613001',
    keywords: 'Construction Company Thanjavur, Best Construction Company in Thanjavur, Best Builders in Thanjavur, Building Contractors Thanjavur, Civil Contractors Thanjavur',
    description: 'Looking for a reliable construction company in Thanjavur? Merina Builders delivers premium home building, luxury villas, commercial developments, and old building renovations with certified safety.'
  },
  kumbakonam: {
    id: 'kumbakonam',
    name: 'Kumbakonam',
    lat: 10.9617,
    lng: 79.3881,
    postalCode: '612001',
    keywords: 'Construction Company Kumbakonam, Best Builders Kumbakonam, Building Contractors Kumbakonam, Civil Contractors Kumbakonam',
    description: 'Premier builders and civil contractors in Kumbakonam. Merina Builders builds custom duplex houses, gated community villas, and office complexes using high-grade materials.'
  },
  papanasam: {
    id: 'papanasam',
    name: 'Papanasam',
    lat: 10.9250,
    lng: 79.2782,
    postalCode: '614205',
    keywords: 'Construction Company Near Papanasam, House Builders Papanasam, Building Contractors Papanasam',
    description: 'Trusted house builders and construction contractors in Papanasam. We provide complete turnkey building solutions and Vastu-compliant residential plans.'
  },
  pasupathikovil: {
    id: 'pasupathikovil',
    name: 'Pasupathikovil',
    lat: 10.9008,
    lng: 79.2272,
    postalCode: '614206',
    keywords: 'Construction Company Near Pasupathikovil, Builders in Pasupathikovil, Contractors Pasupathikovil',
    description: 'Top-tier civil contractors and villa builders in Pasupathikovil. Explore turnkey duplex construction, structural design, and cost estimations with transparent pricing.'
  },
  orathanadu: {
    id: 'orathanadu',
    name: 'Orathanadu',
    lat: 10.6253,
    lng: 79.1481,
    postalCode: '614625',
    keywords: 'Construction Company Near Orathanadu, Best Builders Orathanadu, Contractors Orathanadu',
    description: 'Custom home building, commercial renovations, and PEB industrial structures in Orathanadu. Merina Builders is your local construction engineering expert.'
  },
  pattukkottai: {
    id: 'pattukkottai',
    name: 'Pattukkottai',
    lat: 10.4284,
    lng: 79.3175,
    postalCode: '614601',
    keywords: 'Construction Company Near Pattukkottai, Best Builders in Pattukkottai, Building Contractors Pattukkottai',
    description: 'Engineering excellence in Pattukkottai. We build premium residential houses and modern commercial complexes with dedicated PMC project control.'
  },
  needamangalam: {
    id: 'needamangalam',
    name: 'Needamangalam',
    lat: 10.7712,
    lng: 79.4087,
    postalCode: '614404',
    keywords: 'Construction Company Near Needamangalam, Builders Needamangalam, Civil Contractors Needamangalam',
    description: 'Bespoke builders and renovators serving Needamangalam. We specialize in custom homes, commercial buildings, and high-durability restorations.'
  },
  thiruvidaimarudur: {
    id: 'thiruvidaimarudur',
    name: 'Thiruvidaimarudur',
    lat: 10.9950,
    lng: 79.4589,
    postalCode: '612104',
    keywords: 'Builders Thiruvidaimarudur, Construction Company Thiruvidaimarudur, Contractors Thiruvidaimarudur',
    description: 'Specialized temple-district builders in Thiruvidaimarudur. We deliver structural concrete masonry and Vastu-aligned residential construction.'
  },
  mannargudi: {
    id: 'mannargudi',
    name: 'Mannargudi',
    lat: 10.6657,
    lng: 79.4393,
    postalCode: '614001',
    keywords: 'Construction Company Near Mannargudi, Best Builders Mannargudi, Building Contractors Mannargudi',
    description: 'Professional building and renovation services in Mannargudi. Merina Builders provides turnkey residential villa design and structural masonry.'
  },
  thiruvarur: {
    id: 'thiruvarur',
    name: 'Thiruvarur',
    lat: 10.7661,
    lng: 79.6344,
    postalCode: '610001',
    keywords: 'Construction Company Near Thiruvarur, Best Builders in Thiruvarur, Contractors Thiruvarur',
    description: 'Building custom duplex homes and commercial complex projects in Thiruvarur. High structural safety guidelines and ISO materials check guaranteed.'
  },
  mayiladuthurai: {
    id: 'mayiladuthurai',
    name: 'Mayiladuthurai',
    lat: 11.1085,
    lng: 79.6548,
    postalCode: '609001',
    keywords: 'Construction Company Near Mayiladuthurai, Best Builders Mayiladuthurai, Contractors Mayiladuthurai',
    description: 'Premium construction and remodeling services in Mayiladuthurai. From heavy industrial warehouses to custom churches, we build to last.'
  },
  nagapattinam: {
    id: 'nagapattinam',
    name: 'Nagapattinam',
    lat: 10.7644,
    lng: 79.8436,
    postalCode: '611001',
    keywords: 'Construction Company Near Nagapattinam, Builders Nagapattinam, Contractors Nagapattinam',
    description: 'Coastal-grade high-durability construction and structural waterproofing in Nagapattinam. Builders specializing in residential and industrial works.'
  },
  ariyalur: {
    id: 'ariyalur',
    name: 'Ariyalur',
    lat: 11.1401,
    lng: 79.0747,
    postalCode: '621704',
    keywords: 'Construction Company Ariyalur, Builders Ariyalur, Contractors Ariyalur',
    description: 'Turnkey residential housing, belfry spire building, and commercial warehouses construction in Ariyalur. ISO standard concrete mix builds.'
  },
  peravurani: {
    id: 'peravurani',
    name: 'Peravurani',
    lat: 10.2312,
    lng: 79.1856,
    postalCode: '614804',
    keywords: 'Builders Peravurani, Construction Contractors Peravurani, Civil Contractors Peravurani',
    description: 'Premium villa building and agricultural structures construction in Peravurani. Build with experienced civil engineers and Vastu layout planning.'
  }
};

export default function LocationLanding() {
  const { locationId } = useParams();
  
  // Fallback to Thanjavur if locationId not found
  const activeKey = locationId && LOCATIONS[locationId.toLowerCase()] ? locationId.toLowerCase() : 'thanjavur';
  const info = LOCATIONS[activeKey];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "additionalType": "https://schema.org/ConstructionCompany",
    "@id": `https://merinabuilders.in/location/${info.id}#localbusiness`,
    "name": `Merina Builders Construction — ${info.name}`,
    "description": info.description,
    "url": `https://merinabuilders.in/location/${info.id}`,
    "logo": "https://merinabuilders.in/logo.png",
    "image": "https://merinabuilders.in/logo.png",
    "telephone": "+91 99947 74598",
    "email": "merinabuilders@gmail.com",
    "priceRange": "Custom Quotations",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": info.name,
      "addressRegion": "Tamil Nadu",
      "postalCode": info.postalCode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": info.lat,
      "longitude": info.lng
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
      { "@type": "City", "name": info.name }
    ]
  };

  return (
    <PageTransition>
      <SEO
        title={`Best Construction Company in ${info.name} | Premium Builders`}
        description={info.description}
        keywords={info.keywords}
        schema={localBusinessSchema}
      />

      <main className="w-full relative pt-20">
        {/* Banner Section */}
        <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center bg-navy overflow-hidden">
          <img
            src={aboutHeroImg}
            alt={`Premium construction works in ${info.name}`}
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold font-display text-ivory mb-4">
              Builders in <span className="text-gradient-gold italic">{info.name}</span>
            </h1>
            <div className="w-20 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-ivory/60 font-semibold max-w-xl mx-auto leading-relaxed">
              Professional Engineering & Turnkey Construction Services
            </p>
          </div>
        </section>

        {/* Local Story & Intro */}
        <section className="section-padding bg-navy relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <RevealOnScroll direction="right" className="space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold/5 border border-gold/30 rounded-[4px] text-gold text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] self-start">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                  Local Construction Partner
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-ivory">
                  Your Trusted Construction Contractors in {info.name}
                </h2>
                <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-light text-justify">
                  Established in 2011, <strong>Merina Builders Construction</strong> is proud to extend its premium civil engineering, cost estimation, and contracting operations to <strong>{info.name}</strong>. We deliver high-quality structures tailored to your specifications—combining architectural safety with exquisite luxury finishes.
                </p>
                <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-light text-justify">
                  Whether you are planning to build a <strong>custom luxury villa</strong>, a multi-storey <strong>commercial shopping complex</strong>, a <strong>sacred church assembly hall</strong>, or require <strong>waterproofing repairs and renovations</strong>, our team of certified engineers coordinates your build from layout drafting to the key handover.
                </p>
                <div className="flex gap-4 pt-4">
                  <Link
                    to="/estimator"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer"
                  >
                    Use Cost Estimator
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gold/20 text-ivory hover:text-gold hover:border-gold/40 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="left" className="relative rounded-xl overflow-hidden aspect-video lg:aspect-square border border-gold/10">
                <img
                  src={aboutHeroImg}
                  alt={`Civil contractors site inspection in ${info.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Divisions Section */}
        <section className="section-padding bg-navy-light border-y border-gold/10">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge="Services Directory"
              title={`Turnkey Building Capabilities in ${info.name}`}
              subtitle={`From cost budgeting to site audits, discover why we are the top choice for builders in ${info.name}.`}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: HomeIcon, title: 'Residential Houses', desc: 'Building custom duplex houses, gated community villas, and independent Vastu-compliant homes.' },
                { icon: Building2, title: 'Commercial Infrastructure', desc: 'Constructing office buildings, shopping complexes, educational institutes, and factories.' },
                { icon: Hammer, title: 'Renovations & Repairs', desc: 'Delivering structural reinforcements, facade facelifts, belfry spires, and waterproof upgrades.' }
              ].map((service, index) => (
                <RevealOnScroll
                  key={index}
                  direction="up"
                  delay={index * 0.1}
                  className="glass p-8 rounded-xl flex flex-col items-start gap-4 hover:border-gold/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20 text-gold mb-2">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-ivory">{service.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us / Value Proposition */}
        <section className="section-padding bg-navy">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <RevealOnScroll direction="right" className="relative rounded-xl overflow-hidden aspect-video lg:aspect-square order-last lg:order-first border border-gold/10">
                <img
                  src={aboutHeroImg}
                  alt={`Turnkey materials verification by Merina Builders in ${info.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              </RevealOnScroll>

              <RevealOnScroll direction="left" className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold font-display text-ivory">
                  What Sets Us Apart in {info.name}?
                </h3>
                <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-light text-justify">
                  We maintain absolute transparency, strict scheduling controls, and certified material checks to ensure every brick laid satisfies the highest engineering codes.
                </p>
                <ul className="space-y-4">
                  {[
                    'Experienced Civil Engineers & Architects',
                    'Transparent Cost BOQ with No Hidden Fees',
                    'High Structural Safety Grades (ISO Standard)',
                    'Integrated Vastu Shastra Layout Planning',
                    'Turnkey Scheduling with On-Time Handovers'
                  ].map((value, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ivory/85">
                      <span className="w-5 h-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-gold" strokeWidth={3} />
                      </span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Local Area FAQ Section */}
        <section className="section-padding bg-navy-light border-t border-gold/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              badge="FAQ"
              title="Frequently Asked Questions"
              subtitle={`Common queries about custom home and commercial builds in ${info.name}.`}
            />

            <div className="space-y-4">
              {[
                {
                  q: `How long does it take to construct a house in ${info.name}?`,
                  a: 'Typically, a custom residential home or villa construction takes between 8 to 12 months from approval and excavation to finish works, depending on the scale and complexity.'
                },
                {
                  q: `Do you provide building consultation and Vastu planning in ${info.name}?`,
                  a: 'Yes, all our plans are drafted by experienced architects and vetted by Vastu experts. We ensure proper kitchen, bedroom, and entrance placement according to Vastu Shastra principles.'
                },
                {
                  q: 'Do you charge extra for site visits and engineering audits?',
                  a: 'No. Preliminary site visits, soil audits, and consultations are completely free of charge. We provide an initial detailed estimate based on the local materials catalog.'
                }
              ].map((faq, idx) => (
                <RevealOnScroll
                  key={idx}
                  delay={idx * 0.1}
                  className="glass p-6 rounded-xl relative hover:border-gold/20 transition-all"
                >
                  <h4 className="text-base sm:text-lg font-bold text-ivory mb-2 flex gap-2">
                    <span className="text-gold font-display font-semibold">Q:</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-5">
                    {faq.a}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
