export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  year: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  features?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
  highlights?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  responsibilities: string[];
  image?: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content?: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  action: string;
  actionLabel: string;
}

export interface ProcessStepDetail {
  title: string;
  desc: string;
}

export interface ServiceHighlight {
  val: string;
  label: string;
}

export interface DetailedService {
  id: string;
  badge: string;
  title: string;
  titleBlack: string;
  titleGold: string;
  intro: string;
  description: string;
  image: string;
  iconName: string;
  deliverables: string[];
  process: ProcessStepDetail[];
  whyChooseUs: string[];
  highlights: ServiceHighlight[];
  ctaText: string;
  ctaLink: string;
  keywords?: string;
}
