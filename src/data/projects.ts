import type { Project } from '@/types';

// Real project images from our completed work
// Church photos → best for commercial/construction category projects
// Opening ceremony photos → best for showcasing completed landmark projects

export const projects: Project[] = [
  {
    id: 'church-alangara',
    title: 'Alangara Anni Church',
    category: 'Commercial',
    description: 'A beautifully crafted church construction project showcasing Merina Builders\' expertise in large-scale religious structures. Completed with meticulous attention to architectural detail and structural integrity.',
    location: 'Tamil Nadu',
    year: '2024',
    image: '/gallery/church/church-1.webp',
    features: ['Structural Integrity', 'Architectural Detail', 'Premium Finishes', 'On-time Delivery'],
  },
  {
    id: 'church-construction-js',
    title: 'Church Construction Project',
    category: 'Commercial',
    description: 'A major church construction showcasing our team\'s capability in handling complex religious architecture. Structural framework, masonry, and finishing all executed to highest quality standards.',
    location: 'Tamil Nadu',
    year: '2024',
    image: '/gallery/church/church-2.jpeg',
    features: ['Masonry Work', 'Structural Framework', 'Quality Assurance', 'Vendor Coordination'],
  },
  {
    id: 'building-inauguration-1',
    title: 'Building Inauguration Ceremony',
    category: 'Commercial',
    description: 'A landmark commercial building project completed and inaugurated — a testament to Merina Builders\' commitment to on-time delivery and client satisfaction.',
    location: 'Tamil Nadu',
    year: '2024',
    image: '/gallery/openings/opening-2.jpeg',
    features: ['Commercial Build', 'Timely Delivery', 'ISO Standards', 'Client Handover'],
  },
  {
    id: 'church-exterior',
    title: 'Church Exterior – Completed Handover',
    category: 'Renovation',
    description: 'Exterior finishing and structural reinforcement of a completed church project, demonstrating our renovation and finishing expertise on large-scale religious buildings.',
    location: 'Tamil Nadu',
    year: '2023',
    image: '/gallery/church/church-3.jpeg',
    features: ['Exterior Finishing', 'Structural Reinforcement', 'Period Details', 'Heritage Preservation'],
  },
  {
    id: 'opening-ceremony',
    title: 'Project Opening Ceremony',
    category: 'Commercial',
    description: 'A completed project inauguration event celebrating the delivery of a major construction milestone by the Merina Builders team.',
    location: 'Tamil Nadu',
    year: '2023',
    image: '/gallery/openings/opening-1.jpeg',
    features: ['Project Delivery', 'Community Impact', 'Quality Construction', 'Client Satisfaction'],
  },
  {
    id: 'church-progress',
    title: 'Church Construction – Progress View',
    category: 'Renovation',
    description: 'Mid-construction view of a major church project, showing detailed structural work and Merina Builders\' meticulous approach to large-scale religious architecture.',
    location: 'Tamil Nadu',
    year: '2023',
    image: '/gallery/church/church-4.jpeg',
    features: ['Progress Tracking', 'Quality Control', 'Budget Adherence', 'Safety Standards'],
  },
];
