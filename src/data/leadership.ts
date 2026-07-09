import type { LeadershipMember } from '@/types';

export const leadership: LeadershipMember[] = [
  {
    id: 'md',
    name: 'Antony Louis P',
    role: 'Founder',
    designation: 'Founder & Managing Director',
    responsibilities: [
      'Strategic vision and company growth',
      'Client relationship management',
      'Business development and partnerships',
      'Quality assurance oversight',
    ],
  },
  {
    id: 'chief-engineer',
    name: 'Engineering Division',
    role: 'Site Engineers',
    designation: 'Chief Site Engineers',
    responsibilities: [
      'On-site construction supervision',
      'Quality control and inspection',
      'Safety compliance management',
      'Technical problem resolution',
    ],
  },
  {
    id: 'architects',
    name: 'Design Division',
    role: 'Architects',
    designation: 'Senior Architects',
    responsibilities: [
      'Architectural design and planning',
      '2D drafting and space planning',
      'Sustainable design integration',
      'Building code compliance',
    ],
  },
  {
    id: 'project-managers',
    name: 'Project Division',
    role: 'Project Managers',
    designation: 'Senior Project Managers',
    responsibilities: [
      'Timeline and milestone management',
      'Budget planning and cost control',
      'Vendor and contractor coordination',
      'Client communication and reporting',
    ],
  },
];
