import type { DetailedService } from '@/types';
import commercialImg from '@/assets/images/hero-construction.png';
import renovationImg from '@/assets/images/modern-interior.png';
import luxuryVillaImg from '@/assets/images/luxury-villa.png';

export const detailedServices: DetailedService[] = [
  {
    id: 'commercial-construction',
    badge: 'Division 01 / Infrastructure',
    title: 'Commercial Construction',
    titleBlack: 'Commercial',
    titleGold: 'Construction',
    intro: 'Delivering modern commercial spaces that combine structural strength, functionality, and long-term value. From concept to completion, every project is engineered for durability, safety, and business growth.',
    description: 'Our commercial construction team specializes in office buildings, educational institutions, churches, retail developments, industrial facilities, and mixed-use projects. Every structure is planned with precision engineering, quality materials, regulatory compliance, and efficient project execution. We work closely with architects, engineers, consultants, and clients to deliver spaces that are functional, sustainable, and built to last.',
    image: commercialImg,
    iconName: 'Building2',
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
    ctaLink: '/contact',
    keywords: 'Commercial Construction, Commercial Buildings, Office Buildings, Shopping Complex, Factory Construction, Warehouse Construction'
  },
  {
    id: 'residential-construction',
    badge: 'Division 02 / Custom Living',
    title: 'Residential Construction',
    titleBlack: 'Residential',
    titleGold: 'Construction',
    intro: 'Building luxury villas, custom family homes, and independent duplexes that stand as structural statements of quality, comfort, and timeless beauty.',
    description: 'Our residential construction division is renowned for turning architectural plans into custom living spaces. We construct premium villas, independent homes, duplexes, and residential apartments with uncompromising engineering precision and aesthetic refinement. By employing high-grade building materials, advanced thermal insulation, and traditional Vastu Shastra principles, we ensure your home is built for multi-generational durability.',
    image: luxuryVillaImg,
    iconName: 'Home',
    deliverables: [
      'Custom Gated Community Villas',
      'Independent Duplex & Luxury Houses',
      'Modern Contemporary Family Homes',
      'Structural RCC Framed Duplex Builds',
      'Turnkey Residential Project Contracting',
      'Vastu-Compliant Space Planning',
      'Bespoke Interior & Finishing Works'
    ],
    process: [
      { title: 'Vastu & Planning', desc: 'Site alignment according to Vastu Shastra, custom space budgeting, and drafting layout.' },
      { title: '3D Elevation Design', desc: 'Developing detailed architectural concepts, interior layouts, and structural load plans.' },
      { title: 'Framing & Masonry', desc: 'Excavation, casting reinforced column footings, RCC beams, and premium brick masonry.' },
      { title: 'Plastering & Utilities', desc: 'Applying double-layer plastering and integrating internal MEP (electrical & plumbing) piping.' },
      { title: 'Finish & Handover', desc: 'Premium tiling installation, luxury painting, custom fixtures setup, and key handover.' }
    ],
    whyChooseUs: [
      '100% Vastu Shastra Compliance',
      'ISO 9001 Certified Engineering Quality',
      'Top-Tier Materials & Durable Mixes',
      'Experienced Architect Collaboration',
      'Daily App Progress Reports'
    ],
    highlights: [
      { val: '120+', label: 'Homes Delivered' },
      { val: '100%', label: 'Vastu Aligned' },
      { val: '15-Yr', label: 'Structural Warranty' }
    ],
    ctaText: 'Design Your Dream Villa',
    ctaLink: '/contact',
    keywords: 'Residential Construction, Individual House, Independent Villa, Luxury Villa, Duplex House, Custom Home Construction'
  },
  {
    id: 'industrial-construction',
    badge: 'Division 03 / Operations',
    title: 'Industrial Construction',
    titleBlack: 'Industrial',
    titleGold: 'Construction',
    intro: 'Engineering heavy-load industrial infrastructure, factories, warehouses, and cold storage units designed for operational excellence, safety, and efficiency.',
    description: 'We build heavy-duty industrial structures optimized for high-volume manufacturing, logistics, and warehouse operations. Our industrial construction covers pre-engineered steel buildings (PEB), factory structures, and heavy machinery foundations. We focus on structural integrity, high-load capacities, ventilation, and strict regulatory compliance to give your business a safe, reliable, and functional environment.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Factory',
    deliverables: [
      'Pre-Engineered Steel Buildings (PEB)',
      'Heavy-Load Manufacturing Factories',
      'High-Capacity Logistics Warehouses',
      'Controlled Temperature Cold Storage Facilities',
      'Heavy Equipment Foundations & RCC Slabs',
      'Industrial Ventilation & Safety Systems',
      'Turnkey Industrial Parks Development'
    ],
    process: [
      { title: 'Feasibility Study', desc: 'Evaluating load requirements, logistical planning, and industrial zoning clearance.' },
      { title: 'PEB Engineering', desc: 'Designing steel frames, roofing spans, and heavy machine RCC foundations.' },
      { title: 'RCC Slab Casting', desc: 'Casting thick concrete floors engineered with fiber reinforcement for high weight loads.' },
      { title: 'Erection & Cladding', desc: 'Assembling structural steel pillars, roof trusses, and safety wall cladding.' },
      { title: 'HSE Auditing', desc: 'Completing fire safety checks, mechanical installations, and final clearance reports.' }
    ],
    whyChooseUs: [
      'Heavy Machinery Load Certifications',
      'Pre-Engineered Steel (PEB) Experts',
      'Zero Site Incident Safety Track Record',
      'Scalable Column-Free Design Spans',
      'Efficient Cost Planning & Logistics'
    ],
    highlights: [
      { val: '45+', label: 'Industrial Units' },
      { val: '500T+', label: 'Steel Erected' },
      { val: '0', label: 'Safety Incidents' }
    ],
    ctaText: 'Build Industrial Facility',
    ctaLink: '/contact',
    keywords: 'Industrial Construction, Factory Construction, Warehouse Construction, PEB Builders, Civil Contractors'
  },
  {
    id: 'renovation-remodeling',
    badge: 'Division 04 / Restoration',
    title: 'Renovation & Remodeling',
    titleBlack: 'Renovation &',
    titleGold: 'Remodeling',
    intro: 'Revitalizing heritage landmarks, sacred spaces, and contemporary properties. We fuse structural reinforcement with modern architectural finishes to prolong building lifespans.',
    description: 'Our specialized renovation division breathes new life into existing buildings. We deliver comprehensive structural repairs, advanced waterproofing, and heritage restoration for landmarks and churches. From custom flooring and paint finishes to complete electrical and plumbing system upgrades, our team optimizes layout utility while upgrading the exterior facade. We ensure every project complies with modern safety standards without losing its original architectural soul.',
    image: renovationImg,
    iconName: 'Hammer',
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
    ctaLink: '/contact',
    keywords: 'House Renovation, Home Renovation, Building Renovation, Commercial Renovation, Renovation Contractors, Old Building Renovation'
  },
  {
    id: 'church-construction',
    badge: 'Division 05 / Sacred Spaces',
    title: 'Church Construction',
    titleBlack: 'Church',
    titleGold: 'Construction',
    intro: 'Designing and constructing sacred church buildings and assembly halls that blend spiritual elegance, grand acoustics, and high structural safety.',
    description: 'Our specialized sacred architecture division creates breathtaking church buildings, parish halls, and community assembly spaces. We understand that church building requires a unique combination of high-span structural engineering (for column-free halls), optimal acoustics, and beautiful decorative finishes. We work closely with parish councils and dioceses across Tamil Nadu to construct timeless sacred landmarks that serve the community for centuries.',
    image: commercialImg,
    iconName: 'Award',
    deliverables: [
      'Large-Span Assembly & Worship Halls',
      'Belfry & Church Spire Engineering',
      'Acoustically Optimized Interiors',
      'Granite Altar & Parish Building Builds',
      'Heritage & Gothic Style Facades',
      'Column-Free Roof Truss Systems',
      'Seismic-Resistant Community Structures'
    ],
    process: [
      { title: 'Archdiocese Vetting', desc: 'Collaborating on liturgical rules, community capacity plans, and spire layouts.' },
      { title: 'Acoustic Engineering', desc: 'Designing interior domes, wall panels, and audio placements to prevent echoes.' },
      { title: 'Foundation Piling', desc: 'Boring deep concrete piles to support high-ceiling structures and spires.' },
      { title: 'Truss & Arch Work', desc: 'Erecting large-span structural roof trusses and masonry columns.' },
      { title: 'Spiritual Handover', desc: 'Installing liturgical altars, stained glass windows, and final safety clearances.' }
    ],
    whyChooseUs: [
      'Diocesan Vetted & Trusted Team',
      'Column-Free High Span Engineering',
      'Acoustic Design and Simulation',
      'Bespoke Traditional Stone Masonry',
      'Multi-Generational Design Durability (100+ Years)'
    ],
    highlights: [
      { val: '15+', label: 'Churches Erected' },
      { val: '1500+', label: 'Worship Capacity' },
      { val: '100+ Yr', label: 'Design Life' }
    ],
    ctaText: 'Consult Sacred Build',
    ctaLink: '/contact',
    keywords: 'Church Construction, Sacred Architecture, Church Renovation, Building Contractors Tamil Nadu'
  },
  {
    id: 'project-management',
    badge: 'Division 06 / Operations',
    title: 'Project Management & Consultancy',
    titleBlack: 'Project Management &',
    titleGold: 'Consultancy',
    intro: 'Safeguarding your investments through rigorous schedule monitoring, cost control, and uncompromising quality assurance. We manage the complexity, you own the results.',
    description: 'Our Project Management Consultancy (PMC) controls construction risk at every phase. We oversee cost budgeting, vendor vetting, and procurement management, ensuring transparency and eliminating budget overruns. With dedicated site supervision, timeline monitoring, and detailed project documentation, we coordinate all subcontractors while maintaining strict safety and regulatory compliance. From concept to handover, we act as your trusted technical partner.',
    image: renovationImg,
    iconName: 'ClipboardCheck',
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
    ctaLink: '/contact',
    keywords: 'Construction Project Management, Turnkey Construction, Construction Planning, Material Planning, Construction Quality Control'
  }
];
