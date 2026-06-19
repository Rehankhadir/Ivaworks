import type { Page } from '../types';

export const validPages: Page[] = [
  'home',
  'about',
  'services',
  'consulting-services',
  'staffing-solutions',
  'technology-services',
  'careers',
  'blog',
  'contact',
  'privacy-policy',
  'terms-of-service',
  'cookie-policy',
];

export const categoryToPageMap = {
  consulting: 'consulting-services',
  staffing: 'staffing-solutions',
  technology: 'technology-services',
} as const satisfies Record<'consulting' | 'staffing' | 'technology', Page>;

export function getInitialPage(): Page {
  const hash = window.location.hash.replace('#', '') as Page;
  return validPages.includes(hash) ? hash : 'home';
}

export function isServicePage(page: Page): boolean {
  return ['services', 'consulting-services', 'staffing-solutions', 'technology-services'].includes(page);
}
