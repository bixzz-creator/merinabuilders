import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'commercial',
    title: 'Commercial Construction',
    description: 'Engineering high-durability, regulation-compliant commercial facilities—from corporate complexes to educational centers—optimized for structural safety and business operations.',
    icon: 'Building2',
    features: ['Office Buildings', 'Commercial Complexes', 'Educational Centers', 'Structural Engineering', 'Turnkey Construction'],
    image: '/images/hero-construction.png',
    highlights: [
      'Grade-A corporate office parks & smart complexes',
      'Seismic-resistant framing & structural compliance',
      'Energy-efficient green designs & LEED planning',
    ],
  },
  {
    id: 'residential',
    title: 'Residential Construction',
    description: 'Building modern, comfortable, and durable homes — from individual villas to multi-unit residential complexes — designed with quality craftsmanship and attention to detail.',
    icon: 'Home',
    features: ['Villas', 'Apartments', 'Gated Communities', 'Interior Finishing', 'Renovation'],
    image: '/images/luxury-villa.png',
    highlights: [
      'Custom contemporary villas & premium luxury homes',
      'Acoustic insulation & advanced ventilation systems',
      'High-end modular kitchens & bespoke interior carpentry',
    ],
  },
  {
    id: 'industrial',
    title: 'Industrial Construction',
    description: 'Delivering robust industrial facilities including warehouses, factories, and manufacturing units, engineered for operational efficiency and long-term structural performance.',
    icon: 'Factory',
    features: ['Warehouses', 'Factories', 'Manufacturing Units', 'Cold Storage', 'Logistics Hubs'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Heavy-duty floor slabs engineered for high-tonnage loads',
      'Large-span pre-engineered steel buildings (PEB)',
      'Advanced cold storage systems & thermal containment',
    ],
  },
  {
    id: 'renovation',
    title: 'Renovation & Remodeling',
    description: 'Transforming existing structures with modern upgrades, structural reinforcement, and updated finishes — extending building life while enhancing aesthetics and functionality.',
    icon: 'Hammer',
    features: ['Structural Retrofitting', 'Interior Remodeling', 'Facade Upgrades', 'MEP Upgrades'],
    image: '/images/modern-interior.png',
    highlights: [
      'Seismic retrofitting & structural wall reinforcements',
      'Modern exterior curtain walls & high-performance glazing',
      'Complete upgrade of MEP (Mechanical, Electrical, Plumbing) services',
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure Development',
    description: 'Executing large-scale infrastructure projects including roads, bridges, and public utilities with precision engineering and adherence to safety regulations.',
    icon: 'HardHat',
    features: ['Roads & Bridges', 'Public Utilities', 'Site Development', 'Earthwork'],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Large-scale concrete flyovers, underpasses, & highway bridges',
      'Comprehensive storm drainage & utility pipeline laying',
      'Precision grading, excavation, & mass earthworks',
    ],
  },
];
