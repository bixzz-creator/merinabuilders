import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Planning',
    description: 'We begin with a thorough consultation to understand your vision, requirements, and budget. Our team conducts site analysis, feasibility studies, and creates a detailed project roadmap.',
    icon: 'ClipboardList',
  },
  {
    id: 2,
    title: 'Design',
    description: 'Our architects create detailed architectural designs, floor plans, and material selections. We iterate until the design perfectly matches your expectations.',
    icon: 'PenTool',
  },
  {
    id: 3,
    title: 'Approval',
    description: 'We handle all regulatory approvals, building permits, and compliance documentation. Our team ensures every legal requirement is met before breaking ground.',
    icon: 'CheckCircle',
  },
  {
    id: 4,
    title: 'Construction',
    description: 'Our experienced engineers and workers bring the design to life with premium materials, advanced techniques, and strict quality control at every stage.',
    icon: 'HardHat',
  },
  {
    id: 5,
    title: 'Finishing',
    description: 'Meticulous finishing touches — from flooring and painting to electrical fixtures and landscaping. Every detail is perfected to deliver a premium result.',
    icon: 'Sparkles',
  },
  {
    id: 6,
    title: 'Handover',
    description: 'Final inspection, quality certification, and a comprehensive walkthrough before handing over the keys. We ensure 100% satisfaction with warranty support.',
    icon: 'Key',
  },
];
