import { JobListing, BlogPost } from './types';

export const JOB_LISTINGS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Senior Business Analyst',
    category: 'Consulting',
    type: 'Full-time',
    location: 'New York, NY (Hybrid)',
    experience: '5+ Years',
    description: 'We are seeking a Senior Business Analyst to assist client companies in analyzing operational workflows, designing KPI tracking metrics, and conducting process improvement audits using lean models.',
    skills: ['Process Mapping', 'Business Analytics', 'Lean Six Sigma', 'Stakeholder Management'],
    responsibilities: [
      'Analyze current business processes and operational workflows.',
      'Design KPI tracking metrics and dashboards to measure performance.',
      'Conduct process improvement audits using lean methodologies.',
      'Collaborate with cross-functional teams and client stakeholders.',
      'Prepare insights, recommendations, and presentations for clients.',
      'Support the implementation of solutions and monitor outcomes.',
    ],
    requirements: [
      '5+ years of experience in business analysis or consulting.',
      'Strong experience in process mapping, KPI tracking, and data analysis.',
      'Knowledge of Lean Six Sigma methodologies.',
      'Excellent communication and stakeholder management skills.',
      'Proficiency in SQL, Excel, and BI tools (e.g., Power BI, Tableau).',
      "Bachelor's degree in Business, Engineering, or related field (MBA preferred).",
    ],
    whatWeOffer: [
      { title: 'Competitive Salary', desc: 'Market-competitive pay with performance bonuses.' },
      { title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision coverage.' },
      { title: 'Work-Life Balance', desc: 'Flexible work hours and hybrid work environment.' },
      { title: 'Learning & Growth', desc: 'Access to training programs, certifications, and workshops.' },
      { title: 'Collaborative Culture', desc: 'Work with talented professionals in a supportive environment.' },
      { title: 'Additional Benefits', desc: '401(k) matching, paid time off, and more.' },
    ],
  },
  {
    id: 'job-2',
    title: 'Senior React Developer',
    category: 'Technology',
    type: 'Remote',
    location: 'Global Remote',
    experience: '4+ Years',
    description: 'Join our Technology Services team to build state-of-the-art corporate web platforms, cloud-based applications, and e-commerce applications for our global clients.',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'RESTful APIs', 'Next.js'],
    responsibilities: [
      'Develop high-performance, scalable frontend applications using React.js and TypeScript.',
      'Collaborate with designers and backend engineers to deliver seamless user experiences.',
      'Integrate RESTful APIs and third-party services into web platforms.',
      'Participate in code reviews, architectural discussions, and sprint planning.',
      'Optimize applications for speed, accessibility, and cross-browser compatibility.',
      'Mentor junior developers and uphold engineering best practices.',
    ],
    requirements: [
      '4+ years of professional React.js development experience.',
      'Strong proficiency in TypeScript and modern JavaScript (ES2020+).',
      'Experience with Tailwind CSS, component libraries, and design systems.',
      'Solid understanding of RESTful API integration and state management (Redux/Zustand).',
      'Familiarity with Next.js, SSR, and performance optimization techniques.',
      "Bachelor's degree in Computer Science or equivalent practical experience.",
    ],
    whatWeOffer: [
      { title: 'Competitive Salary', desc: 'Market-competitive pay with performance bonuses.' },
      { title: 'Fully Remote', desc: 'Work from anywhere in the world with flexible hours.' },
      { title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision coverage.' },
      { title: 'Learning & Growth', desc: 'Access to training programs, certifications, and workshops.' },
      { title: 'Collaborative Culture', desc: 'Work with a global team of top-tier engineers.' },
      { title: 'Additional Benefits', desc: 'Home office stipend, paid time off, and more.' },
    ],
  },
  {
    id: 'job-3',
    title: 'Cloud DevOps Architect',
    category: 'Technology',
    type: 'Full-time',
    location: 'San Francisco, CA (Hybrid)',
    experience: '6+ Years',
    description: 'We are looking for a cloud expert experienced with AWS and Azure to design CI/CD deployment pipelines, manage containerized environments, and optimize cloud security protocols.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    responsibilities: [
      'Design and maintain CI/CD pipelines for automated deployment workflows.',
      'Manage containerized environments using Docker and Kubernetes.',
      'Architect cloud infrastructure on AWS and Azure following best practices.',
      'Implement cloud security protocols, access controls, and compliance standards.',
      'Monitor system performance, uptime, and incident response.',
      'Collaborate with development teams to streamline release cycles.',
    ],
    requirements: [
      '6+ years of experience in DevOps, cloud architecture, or site reliability engineering.',
      'Expert-level proficiency with AWS and/or Azure cloud platforms.',
      'Strong hands-on experience with Docker, Kubernetes, and container orchestration.',
      'Experience building and managing CI/CD pipelines (Jenkins, GitHub Actions, etc.).',
      'Proficiency in infrastructure-as-code tools such as Terraform or CloudFormation.',
      'Relevant cloud certifications (AWS Solutions Architect, Azure DevOps Engineer) preferred.',
    ],
    whatWeOffer: [
      { title: 'Competitive Salary', desc: 'Market-competitive pay with performance bonuses.' },
      { title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision coverage.' },
      { title: 'Hybrid Flexibility', desc: 'Hybrid work schedule with in-office collaboration days.' },
      { title: 'Learning & Growth', desc: 'Cloud certification reimbursements and training budget.' },
      { title: 'Collaborative Culture', desc: 'Work alongside world-class infrastructure engineers.' },
      { title: 'Additional Benefits', desc: '401(k) matching, paid time off, and more.' },
    ],
  },
  {
    id: 'job-4',
    title: 'Executive Recruitment Consultant',
    category: 'Staffing',
    type: 'Full-time',
    location: 'Chicago, IL',
    experience: '3+ Years',
    description: 'Help us identify, evaluate, and attract top passive executives (C-level and Directors) for our premium enterprise clients. Exceptional communication skills are required.',
    skills: ['Executive Search', 'Headhunting', 'Candidate Screening', 'Talent Mapping'],
    responsibilities: [
      'Source and engage passive C-level and Director-level candidates through direct outreach.',
      'Conduct in-depth candidate screenings, competency interviews, and assessments.',
      'Build and maintain a strong pipeline of senior executive talent across industries.',
      'Partner with client stakeholders to understand leadership needs and culture fit.',
      'Manage the full recruitment lifecycle from sourcing to offer negotiation.',
      'Deliver market intelligence and talent mapping reports to clients.',
    ],
    requirements: [
      '3+ years of experience in executive search or senior-level recruitment.',
      'Proven track record of placing C-level or Director-level candidates.',
      'Excellent interpersonal, negotiation, and communication skills.',
      'Strong network within corporate and enterprise talent communities.',
      'Experience using LinkedIn Recruiter, ATS platforms, and CRM tools.',
      "Bachelor's degree in Human Resources, Business, or related field.",
    ],
    whatWeOffer: [
      { title: 'Competitive Salary', desc: 'Base salary plus uncapped placement commissions.' },
      { title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision coverage.' },
      { title: 'Work-Life Balance', desc: 'Flexible work hours and hybrid-friendly environment.' },
      { title: 'Learning & Growth', desc: 'Access to recruitment training programs and industry events.' },
      { title: 'Collaborative Culture', desc: 'Join a high-performing, supportive recruitment team.' },
      { title: 'Additional Benefits', desc: '401(k) matching, paid time off, and more.' },
    ],
  },
  {
    id: 'job-5',
    title: 'RPA Process Automation Specialist',
    category: 'Technology',
    type: 'Contract',
    location: 'Remote',
    experience: '3+ Years',
    description: 'Develop and deploy robotic process automation bots (UiPath, Power Automate) to automate repetitive data-entry and workflow approvals for global clients.',
    skills: ['RPA', 'UiPath', 'Power Automate', 'Python', 'Process Automation'],
    responsibilities: [
      'Design, develop, and deploy RPA bots using UiPath and Power Automate.',
      'Identify automation opportunities by analyzing existing manual workflows.',
      'Collaborate with business analysts and process owners to define automation scope.',
      'Test, debug, and maintain automation scripts for production reliability.',
      'Document bot architecture, workflows, and operational runbooks.',
      'Provide support and optimization for deployed automation solutions.',
    ],
    requirements: [
      '3+ years of experience in RPA development (UiPath, Power Automate, or Blue Prism).',
      'Strong understanding of business process analysis and workflow optimization.',
      'Proficiency in Python or VBA for scripting and data manipulation.',
      'Experience integrating RPA with ERP systems, APIs, and databases.',
      'Excellent analytical and problem-solving skills.',
      'RPA certification (UiPath Certified Developer or equivalent) is a plus.',
    ],
    whatWeOffer: [
      { title: 'Competitive Rate', desc: 'Competitive contract hourly rate with renewal opportunities.' },
      { title: 'Fully Remote', desc: 'Work remotely with a flexible engagement schedule.' },
      { title: 'Cutting-Edge Projects', desc: 'Work on enterprise-grade automation for global clients.' },
      { title: 'Learning & Growth', desc: 'Access to RPA tools, training resources, and certifications.' },
      { title: 'Collaborative Culture', desc: 'Integrated team environment with direct client exposure.' },
      { title: 'Additional Benefits', desc: 'Performance-based bonuses and contract extensions.' },
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Strategic IT Consulting Boosts ROI: A Complete Guide',
    category: 'Technology',
    date: 'February 15, 2026',
    author: 'Elena Rostova, Principal IT Consultant',
    readTime: '6 min read',
    summary: 'Discover how matching your technology investments directly with your core business strategy can eliminate operational wastage, boost delivery performance, and maximize ROI.',
    content: `Technology is no longer just a support function in modern business; it is the ultimate driver of efficiency, customer experience, and long-term enterprise growth. However, many organizations make the critical mistake of investing in software or cloud upgrades without aligning them with strategic business objectives.

In this guide, we break down how strategic IT consulting addresses this challenge:
1. Identifying Bottlenecks: A thorough audit of current technical systems reveals hidden software licenses, manual task handovers, and security holes.
2. Formulating Roadmaps: A multi-year technology road map helps prioritize cloud migration, database centralization, and custom web platform development based on direct budget forecasts.
3. Managing Vendor Performance: Proper vendor alignment ensures third-party tools fulfill service level agreements (SLAs), lowering support costs.

By treating IT as a core strategic partner rather than an administrative expense, businesses can unlock double-digit improvements in operational throughput and ROI.`,
    image: 'https://images.pexels.com/photos/7993898/pexels-photo-7993898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800'
  },
  {
    id: 'blog-2',
    title: 'Navigating the Post-Pandemic Talent Landscape: Staffing Best Practices',
    category: 'Staffing',
    date: 'January 22, 2026',
    author: 'Marcus Vance, Head of Talent Acquisition',
    readTime: '5 min read',
    summary: 'Explore how top companies are combining permanent recruitment, flexible contract staffing, and proactive workforce planning to stay agile in a highly competitive job market.',
    content: `The job market in 2026 demands unprecedented agility. Businesses are finding it increasingly difficult to hire skilled developers, certified engineers, and strategic managers on a permanent basis quickly enough to meet market opportunities.

To counter this talent squeeze, high-performing enterprises are adopting a blended staffing strategy:
- Permanent Hiring for Core Culture: Build stable, long-term leadership and cultural anchors with highly aligned full-time recruits.
- Contract Staffing for Project Spikes: Leverage remote or short-term specialists for technical projects or seasonal demand without adding permanent fixed payroll overhead.
- Workforce Planning as a Shield: Continuously conduct skill gap analyses to predict hiring requirements 6 months in advance.

Implementing these practices helps companies scale their workforce on demand, reduces time-to-hire, and drastically lowers staffing risks.`,
    image: 'https://images.pexels.com/photos/7792835/pexels-photo-7792835.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800'
  },
  {
    id: 'blog-3',
    title: '5 Process Improvement Strategies That Can Double Your Operational Efficiency',
    category: 'Consulting',
    date: 'December 10, 2025',
    author: 'Samantha Lin, Lean Operations Director',
    readTime: '8 min read',
    summary: 'Learn practical process re-engineering and lean workflow strategies that eliminate administrative waste, map critical bottlenecks, and increase daily throughput.',
    content: `Operational inefficiency is the silent killer of profitability. Even successful companies often carry heavy administrative waste—such as manual request approvals, repetitive email follow-ups, and siloed data systems.

Here are 5 proven lean process improvement steps to double your team's efficiency:
1. Map Your Value Stream: Document every single hand-off and step in your product delivery. Identify where work stalls.
2. Implement SOPs: Solidify Standard Operating Procedures so tasks are executed consistently every single time.
3. Integrate Legacy Databases: Eliminate manual copying of files across CRM and ERP platforms. Connect them through API integrations.
4. Automate approvals: Move away from email chains. Implement centralized, automated request workflows.
5. Review KPIs Weekly: Continuously track cycle times and error rates to refine workflows dynamically.

By taking these proactive steps, organizations reduce friction, lower operational costs, and boost employee morale.`,
    image: 'https://images.pexels.com/photos/8127807/pexels-photo-8127807.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800'
  }
];