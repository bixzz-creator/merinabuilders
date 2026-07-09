import type { NavLink } from '@/types';

export const COMPANY_NAME = 'Merina Builders Construction';
export const COMPANY_TAGLINE = 'Building Dreams, Delivering Excellence';
export const COMPANY_PHONE = '+91 99947 74598';
export const COMPANY_EMAIL = 'merinabuilders@gmail.com';
export const COMPANY_ADDRESS = '5/286, Ponnagar 2nd Street, Pasupathikovil, Thanjavur';
export const COMPANY_WHATSAPP = 'https://wa.me/919994774598';
export const COMPANY_HOURS = 'Mon - Sat: 9:00 AM - 6:00 PM';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Our Process', href: '/our-process' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/our-process' },
    { label: 'Budget Estimator', href: '/estimator' },
    { label: 'Our Blog', href: '/blog' },
  ],
  services: [
    { label: 'Commercial Construction', href: '/services/commercial-construction' },
    { label: 'Residential Construction', href: '/services/residential-construction' },
    { label: 'Renovation & Remodeling', href: '/services/renovation-remodeling' },
    { label: 'Church Construction', href: '/services/church-construction' },
  ],
  locations: [
    { label: 'Thanjavur', href: '/location/thanjavur' },
    { label: 'Kumbakonam', href: '/location/kumbakonam' },
    { label: 'Papanasam', href: '/location/papanasam' },
    { label: 'Pasupathikovil', href: '/location/pasupathikovil' },
    { label: 'Orathanadu', href: '/location/orathanadu' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'FAQ', href: '/faq' },
  ],
};

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/merinabuilders',
  instagram: 'https://instagram.com/merinabuilders',
  linkedin: 'https://linkedin.com/company/merinabuilders',
  youtube: 'https://youtube.com/@merinabuilders',
};
