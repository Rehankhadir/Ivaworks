export interface JobOffer {
  title: string;
  desc: string;
}

export interface JobListing {
  id: string;
  title: string;
  slug?: string;
  category: 'Consulting' | 'Staffing' | 'Technology';
  type: 'Full-time' | 'Contract' | 'Remote' | 'Part-time';
  location: string;
  experience: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  whatWeOffer: JobOffer[];
  status?: 'draft' | 'published';
}

export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  category: 'Consulting' | 'Staffing' | 'Technology' | 'Insights';
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
  status?: 'draft' | 'published';
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}
