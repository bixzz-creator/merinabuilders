import type { BlogPost } from '@/types';
import heroImg from '@/assets/images/hero-construction.png';
import villaImg from '@/assets/images/luxury-villa.png';
import interiorImg from '@/assets/images/modern-interior.png';

export const blogPosts: BlogPost[] = [
  {
    id: 'choosing-right-construction-materials',
    title: 'How to Choose the Right Construction Materials for Your Dream Home',
    excerpt: 'A comprehensive guide to selecting premium construction materials that ensure durability, aesthetics, and value for your residential project.',
    category: 'Materials',
    date: '2024-12-15',
    readTime: '8 min',
    image: heroImg,
  },
  {
    id: 'vastu-modern-homes',
    title: 'Integrating Vastu Shastra in Modern Home Design',
    excerpt: 'How to blend traditional Vastu principles with contemporary architecture for homes that are both spiritually aligned and aesthetically modern.',
    category: 'Design',
    date: '2024-11-28',
    readTime: '6 min',
    image: villaImg,
  },
  {
    id: 'sustainable-construction-2024',
    title: 'Sustainable Construction Practices in 2024',
    excerpt: 'Explore the latest eco-friendly construction techniques, green materials, and energy-efficient designs that reduce environmental impact.',
    category: 'Sustainability',
    date: '2024-11-10',
    readTime: '7 min',
    image: heroImg,
  },
  {
    id: 'renovation-vs-rebuild',
    title: 'Renovation vs. Rebuild: Making the Right Decision',
    excerpt: 'A practical guide to help homeowners decide between renovating their existing property or building from scratch based on cost, time, and goals.',
    category: 'Tips',
    date: '2024-10-22',
    readTime: '5 min',
    image: interiorImg,
  },
  {
    id: 'smart-home-integration',
    title: 'Smart Home Integration in New Construction',
    excerpt: 'From voice-controlled lighting to automated security — how to plan for smart home technology during the construction phase.',
    category: 'Technology',
    date: '2024-10-05',
    readTime: '6 min',
    image: villaImg,
  },
  {
    id: 'construction-cost-management',
    title: '10 Tips to Manage Construction Costs Without Compromising Quality',
    excerpt: 'Practical strategies for homeowners and developers to keep their construction budget in check while maintaining premium quality standards.',
    category: 'Tips',
    date: '2024-09-18',
    readTime: '7 min',
    image: heroImg,
  },
];
