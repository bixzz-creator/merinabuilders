import { services } from '@/data/services';
import { faqItems } from '@/data/faq';
import { projects } from '@/data/projects';
import { processSteps } from '@/data/process';
import { leadership } from '@/data/leadership';
import {
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_HOURS
} from '@/constants/navigation';

export interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export const getCompanyInfo = (): CompanyInfo => ({
  name: COMPANY_NAME,
  phone: COMPANY_PHONE,
  email: COMPANY_EMAIL,
  address: COMPANY_ADDRESS,
  hours: COMPANY_HOURS,
});

/**
 * Searches the local knowledge base to find relevant context.
 * Performs keyword matching across services, FAQ, process, and projects.
 */
export function queryKnowledgeBase(query: string): string[] {
  const normalizedQuery = query.toLowerCase().trim();
  const results: string[] = [];

  // 1. Company contact info query
  if (
    normalizedQuery.includes('contact') ||
    normalizedQuery.includes('address') ||
    normalizedQuery.includes('phone') ||
    normalizedQuery.includes('email') ||
    normalizedQuery.includes('where') ||
    normalizedQuery.includes('office')
  ) {
    results.push(
      `${COMPANY_NAME} is located at ${COMPANY_ADDRESS}. You can call us at ${COMPANY_PHONE} or email us at ${COMPANY_EMAIL}. Our working hours are ${COMPANY_HOURS}.`
    );
  }

  // 2. Founder / Leadership query
  if (
    normalizedQuery.includes('founder') ||
    normalizedQuery.includes('md') ||
    normalizedQuery.includes('owner') ||
    normalizedQuery.includes('antony') ||
    normalizedQuery.includes('louis') ||
    normalizedQuery.includes('who runs') ||
    normalizedQuery.includes('leadership')
  ) {
    const md = leadership.find(l => l.id === 'md');
    if (md) {
      results.push(
        `The Founder and Managing Director of ${COMPANY_NAME} is ${md.name}. He leads strategic vision, client relationship management, and business development.`
      );
    }
  }

  // 3. Match Services
  for (const s of services) {
    if (
      normalizedQuery.includes(s.title.toLowerCase()) ||
      s.description.toLowerCase().split(' ').some(w => w.length > 4 && normalizedQuery.includes(w))
    ) {
      results.push(
        `Service: ${s.title} - ${s.description} Key features: ${s.features.join(', ')}.`
      );
    }
  }

  // 4. Match Process
  if (normalizedQuery.includes('process') || normalizedQuery.includes('how do you work') || normalizedQuery.includes('steps')) {
    const stepsStr = processSteps.map(step => `Step ${step.id} (${step.title}): ${step.description}`).join(' | ');
    results.push(`Our construction process includes: ${stepsStr}`);
  }

  // 5. Match Projects
  for (const p of projects) {
    if (
      normalizedQuery.includes(p.title.toLowerCase()) ||
      normalizedQuery.includes(p.category.toLowerCase()) ||
      p.description.toLowerCase().split(' ').some(w => w.length > 5 && normalizedQuery.includes(w))
    ) {
      results.push(
        `Project: ${p.title} (Category: ${p.category}) - ${p.description} located in ${p.location} completed in ${p.year}. Features: ${p.features?.join(', ') || ''}.`
      );
    }
  }

  // 6. Match FAQ items
  for (const faq of faqItems) {
    if (
      normalizedQuery.includes(faq.question.toLowerCase().replace('?', '')) ||
      faq.question.toLowerCase().split(' ').some(w => w.length > 4 && normalizedQuery.includes(w))
    ) {
      results.push(`Q: ${faq.question} A: ${faq.answer}`);
    }
  }

  // Fallback default message if no matches
  if (results.length === 0) {
    results.push(
      `We specialize in Commercial Construction, Renovation & Remodeling, and comprehensive Project Management. With over 20 years of experience, we focus on durability and quality materials.`
    );
  }

  return results.slice(0, 3); // Return top 3 matches for context compactness
}
