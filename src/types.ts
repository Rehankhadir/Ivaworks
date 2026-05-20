export type Page = 'home' | 'about' | 'services' | 'consulting-services' | 'staffing-solutions' | 'technology-services' | 'careers' | 'blog' | 'contact' | 'admin';

export interface SubService {
  id: string;
  title: string;
  description: string;
  provideLabel: string;
  provide: string[];
  benefitsLabel: string;
  benefits: string[];
}

export interface ServiceCategory {
  id: 'consulting' | 'staffing' | 'technology';
  title: string;
  description: string;
  heroParagraphs: string[];
  items: SubService[];
  approachTitle: string;
  approachSteps: { title: string; desc: string }[];
}

export interface JobOffer {
  title: string;
  desc: string;
}

export interface JobListing {
  id: string;
  title: string;
  category: 'Consulting' | 'Staffing' | 'Technology';
  type: 'Full-time' | 'Contract' | 'Remote' | 'Part-time';
  location: string;
  experience: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  whatWeOffer: JobOffer[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Consulting' | 'Staffing' | 'Technology' | 'Insights';
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
}
