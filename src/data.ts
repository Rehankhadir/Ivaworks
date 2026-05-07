import { ServiceCategory, JobListing, BlogPost } from './types';

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'consulting',
    title: 'Consulting Services',
    description: 'Helping businesses improve strategy, efficiency, growth, and decision-making.',
    approachTitle: 'Our Strategic Consulting Approach',
    approachSteps: [
      { title: 'Discover', desc: 'Identify core operational bottlenecks, target markets, and immediate opportunities.' },
      { title: 'Assess', desc: 'Perform deep-dive performance, financial, and competitor analysis.' },
      { title: 'Design', desc: 'Establish robust strategic roadmaps and performance-improving methodologies.' },
      { title: 'Implement', desc: 'Deploy tailored growth solutions and guide stakeholders through change management.' },
      { title: 'Optimize', desc: 'Monitor KPIs, gather feedback, and continuously refine processes for peak efficiency.' }
    ],
    items: [
      {
        id: 'business-strategy',
        title: 'Business Strategy',
        description: 'At IVA Work Solutions, our Business Strategy consulting helps organizations create clear direction, strengthen market position, and achieve long-term success. We work with businesses to align goals, identify growth opportunities, improve decision-making, and build practical strategies that deliver measurable results.',
        provide: [
          'Long-term strategy alignment and growth planning',
          'Market analysis and competitive positioning studies',
          'Goal setting and execution frameworks (OKRs/KPIs)',
          'Change management and strategic advisory support'
        ],
        benefits: [
          'Clear strategic direction and focus',
          'Accelerated growth and market reach',
          'Improved executive decision-making',
          'Higher agility in competitive environments'
        ]
      },
      {
        id: 'process-improvement',
        title: 'Process Improvement',
        description: 'Streamline workflows and eliminate redundancies to lower operational costs and maximize throughput. Our team identifies bottlenecks and re-engineers critical business processes using modern lean principles.',
        provide: [
          'Workflow bottleneck analysis and mapping',
          'Lean operations and process re-engineering',
          'SOP documentation and standard establishment',
          'Performance metric tracking and KPIs implementation'
        ],
        benefits: [
          'Significant reduction in operational cycle times',
          'Optimized resource utilization and minimal waste',
          'Enhanced team collaboration and clarity',
          'Higher customer satisfaction through consistent delivery'
        ]
      },
      {
        id: 'vendor-management',
        title: 'Vendor Management',
        description: 'Establish high-performing vendor networks, optimize procurement costs, and manage SLAs efficiently. We ensure your partners are aligned with your organizational standards and deliver high-value results.',
        provide: [
          'Vendor selection, evaluation, and background checks',
          'Contract negotiation and performance standard mapping',
          'SLA management and regular compliance audits',
          'Supply chain risk mitigation planning'
        ],
        benefits: [
          'Reduced procurement costs and higher budget efficiency',
          'Minimized risk of partner or supply failure',
          'Better service levels and adherence to deadlines',
          'Strong, scalable vendor relationships'
        ]
      },
      {
        id: 'growth-planning',
        title: 'Growth Planning',
        description: 'Create actionable roadmaps for sustainable business expansion, geographical reach, and portfolio diversification. Our team combines market insights with practical operational plans to back your growth ideas.',
        provide: [
          'New market entry analysis and feasibility studies',
          'Product or service line diversification strategies',
          'Financial growth forecasting and resource planning',
          'Mergers, acquisitions, and strategic partnership support'
        ],
        benefits: [
          'Structured expansion with lower financial risk',
          'Early identification of profitable niche markets',
          'Scalable operational plans to support increased volume',
          'Sustainable long-term business value'
        ]
      }
    ]
  },
  {
    id: 'staffing',
    title: 'Staffing Solutions',
    description: 'Providing skilled talent for permanent, contract, and remote workforce needs.',
    approachTitle: 'Our Talent Acquisition & Staffing Approach',
    approachSteps: [
      { title: 'Understand', desc: 'Learn your hiring goals, company culture, and detailed workforce challenges.' },
      { title: 'Source', desc: 'Leverage deep networks, direct mapping, and targeted recruitment channels.' },
      { title: 'Evaluate', desc: 'Screen candidates rigorously for hard skills, soft skills, and cultural alignment.' },
      { title: 'Deliver', desc: 'Present pre-vetted, high-quality talent quickly with minimal turnaround time.' },
      { title: 'Support', desc: 'Assist with onboarding, compliance, retention strategies, and long-term hiring feedback.' }
    ],
    items: [
      {
        id: 'permanent-hiring',
        title: 'Permanent Hiring',
        description: 'Permanent hiring is critical for building stable, productive, and growth-focused organizations. We help businesses identify, attract, and hire professionals who align with both technical requirements and company culture. Our recruitment specialists manage the end-to-end hiring process—from sourcing and screening to interview coordination and onboarding support.',
        provide: [
          'Talent Sourcing across multiple industries',
          'Rigorous screening, background verification, and skills assessments',
          'Cultural fit evaluation and role suitability checks',
          'Interview coordination and seamless candidate communication',
          'Offer negotiation and candidate closure support',
          'Onboarding assistance for a smooth transition'
        ],
        benefits: [
          'Reduced time-to-hire by leveraging pre-vetted talent databases',
          'Better employee retention and lower turnover rates',
          'Stronger cultural alignment and productivity',
          'Minimized hiring risks and streamlined recruitment overhead'
        ]
      },
      {
        id: 'contract-staffing',
        title: 'Contract Staffing',
        description: 'Contract staffing helps organizations quickly scale teams, manage project workloads, and access specialized skills without long-term commitments. We provide skilled professionals for short-term, long-term, and project-based assignments. This model is ideal for seasonal demand, urgent hiring, technical projects, and workforce flexibility.',
        provide: [
          'Short-term talent for immediate coverage or seasonal spikes',
          'Project-based staffing of developers, analysts, and project managers',
          'IT and specialized technical staffing under flexible contracts',
          'Administrative, customer support, and financial staffing solutions',
          'Contract-to-hire models to evaluate before offering permanent positions',
          'Comprehensive payroll and compliance management for contractors'
        ],
        benefits: [
          'Rapid hiring turnaround to meet sudden business demands',
          'Maximum workforce flexibility without overhead increases',
          'On-demand access to highly niche or specific technical skills',
          'Reduced fixed staffing costs and optimized operational budget'
        ]
      },
      {
        id: 'executive-search',
        title: 'Executive Search',
        description: 'Strong leadership transforms organizations. Our Executive Search service focuses on identifying and securing senior-level professionals who bring strategic vision, operational excellence, and leadership capability. We work discreetly and strategically to help businesses hire leaders who create long-term value.',
        provide: [
          'C-Level Search (CEO, COO, CFO, CTO, CIO, and Executive leadership)',
          'Senior Management Recruitment (VPs, Directors, and Heads of Departments)',
          'Strictly confidential and private leadership search processes',
          'Market mapping to identify top passive leaders in your industry',
          'In-depth leadership capability and cultural fit assessment',
          'Strategic offer negotiation and executive onboarding support'
        ],
        benefits: [
          'Robust leadership pipeline aligned with your growth vision',
          'More effective strategic execution from day one',
          'Highly secure, confidential, and professional hiring process',
          'Direct access to top-tier passive talent not on traditional job boards',
          'Lasting business transformation and improved organizational culture'
        ]
      },
      {
        id: 'workforce-planning',
        title: 'Workforce Planning',
        description: 'Workforce planning helps organizations align talent strategies with business goals. We assist businesses in forecasting workforce needs, optimizing team structures, and preparing for future expansion. This proactive approach ensures the right skills are available when needed.',
        provide: [
          'Comprehensive headcount planning based on growth targets',
          'Skill gap analysis to map current vs. future capability needs',
          'Organization design, reporting structure, and resource allocation audits',
          'Succession planning for critical and high-impact leadership roles',
          'Seasonal resource forecasting and optimization strategies',
          'Retention and employee engagement planning to prevent talent flight'
        ],
        benefits: [
          'Smarter, data-driven hiring decisions and budget planning',
          'Improved overall organizational productivity and efficiency',
          'Lower turnover risk through targeted engagement plans',
          'A future-proof workforce ready to adapt to industry changes',
          'Better cost control and alignment between Finance and HR'
        ]
      }
    ]
  },
  {
    id: 'technology',
    title: 'Technology Services',
    description: 'Modern IT solutions including development, automation, cloud, and support.',
    approachTitle: 'Our Technology Delivery Approach',
    approachSteps: [
      { title: 'Discover', desc: 'Understand business goals, legacy pain points, and current operations.' },
      { title: 'Assess', desc: 'Evaluate infrastructure, applications, system security, and cost opportunities.' },
      { title: 'Design', desc: 'Build a customized technology roadmap, high-level architecture, and deployment plan.' },
      { title: 'Implement', desc: 'Deploy future-ready solutions efficiently with minimal disruption to ongoing operations.' },
      { title: 'Optimize', desc: 'Continuously improve system performance, advanced security controls, and cloud scalability.' }
    ],
    items: [
      {
        id: 'it-consulting',
        title: 'IT Consulting',
        description: 'Strategic Technology Guidance for Better Business Decisions. Our IT Consulting services help organizations align technology investments with business goals. We evaluate your current IT environment, identify gaps, and create roadmaps that improve efficiency, reduce risk, and support growth. Whether you are planning expansion, replacing outdated systems, or launching digital initiatives, we help you make smarter technology decisions.',
        provide: [
          'IT Strategy & Roadmaps aligned with business vision, budgets, and growth priorities',
          'Digital Transformation Consulting to modernize systems, workflows, and workflows',
          'Infrastructure Consulting assessing networks, servers, and storage models',
          'Technology Audits reviewing active applications, systems, and security compliance',
          'IT Governance & Compliance planning, frameworks, and controls standards',
          'Vendor Management for evaluating third-party software, integrations, and contracts'
        ],
        benefits: [
          'Significantly better return on investment (ROI) for IT spending',
          'Improved daily operational efficiency and lower system downtime',
          'Reduced security and operational risks through proactive monitoring',
          'A crystal-clear digital growth strategy ready for scaling',
          'Stronger system governance and compliance alignment'
        ]
      },
      {
        id: 'web-development',
        title: 'Web Development',
        description: 'Build Powerful Digital Experiences That Drive Results. Your website is often the first impression of your business. We create fast, secure, responsive, and visually engaging websites that strengthen brand credibility and improve customer engagement. From business websites to custom web platforms, our development team builds solutions that combine functionality with excellent user experience.',
        provide: [
          'Corporate Website Development reflecting premium business branding',
          'E-Commerce Solutions featuring secure payment gateways and product scaling',
          'Custom Web Applications, custom client portals, dashboards, and SaaS tools',
          'Modern UI/UX Design focusing on conversions and smooth interactivity',
          'CMS Development using headless frameworks, WordPress, Shopify, or custom solutions',
          'Website Support & Maintenance, speed optimizations, updates, and daily backups'
        ],
        benefits: [
          'Strong and credible online presence reflecting premium standards',
          'Enhanced customer experience leading to longer engagement',
          'Higher conversion rates and business inquiry generation',
          'Perfect mobile-first responsiveness across all screen sizes',
          'A highly scalable platform capable of growing with your business'
        ]
      },
      {
        id: 'cloud-solutions',
        title: 'Cloud Solutions',
        description: 'Flexible, Secure & Scalable Cloud Transformation. Cloud technology enables businesses to work faster, reduce costs, and scale efficiently. Our Cloud Solutions help organizations migrate, optimize, and manage cloud environments securely. We support businesses in leveraging leading cloud platforms while improving reliability, collaboration, and business continuity.',
        provide: [
          'Cloud Deployments & Managed Services across AWS, Microsoft Azure, and GCP',
          'End-to-end Cloud Migration of files, workloads, applications, and legacy servers',
          'Multi-Cloud Strategy design for ultimate performance and server redundancy',
          'DevOps & CI/CD pipeline implementation to automate code releases',
          'Virtual infrastructure, load-balancers, and cloud database management',
          'Advanced Cloud Security including identity access controls and encryption',
          'Robust Backup & Disaster Recovery planning with rapid failover solutions'
        ],
        benefits: [
          'Substantially lower physical hardware and maintenance costs',
          'Instant, on-demand scalability for seasonal traffic and workloads',
          'Improved employee collaboration across global remote teams',
          'Virtually zero downtime through fault-tolerant cloud architecture',
          'Unrivaled security posture backed by global cloud compliance standards'
        ]
      },
      {
        id: 'automation',
        title: 'Automation',
        description: 'Smarter Processes. Faster Results. Lower Costs. Manual processes slow growth and increase errors. Our Automation Services help businesses streamline workflows, reduce repetitive tasks, and improve productivity through intelligent systems. We implement automation solutions that free teams to focus on strategic work.',
        provide: [
          'Workflow Automation of approvals, employee onboarding, and operational requests',
          'Business Process Automation targeting cross-departmental administrative routines',
          'Robotic Process Automation (RPA) utilizing bots for data entry and reports',
          'Custom CRM / ERP integrations connecting legacy databases with cloud platforms',
          'Reporting Automation delivering real-time dashboards and weekly metrics',
          'AI-powered Automation including smart routing, chatbots, and predictive workflows'
        ],
        benefits: [
          'Elimination of manual, repetitive tasks saving thousands of hours',
          'Significantly faster transaction and request operational cycles',
          'Substantially lower administrative and operational costs',
          'Drastic reduction in human errors during data inputs and processing',
          'Frees up teams to focus on highly strategic, revenue-generating tasks'
        ]
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        description: 'Protect What Matters Most. Cyber threats continue to evolve. Our Cybersecurity services help businesses protect systems, users, and sensitive data through proactive risk management and strong security frameworks. We help organizations reduce vulnerabilities, improve compliance, and build a secure digital environment.',
        provide: [
          'Comprehensive Security Assessments identifying structural vulnerabilities and risks',
          'Network Security modeling, firewalls, and secure remote VPN access',
          'Endpoint Protection for staff laptops, mobiles, and distributed work environments',
          'Identity & Access Management (IAM) implementing MFA and single-sign-on (SSO)',
          'Compliance Support for ISO 27001, GDPR, HIPAA, and industry-specific regulations',
          'Disaster Recovery and business incident response planning',
          'Security Monitoring & continuous threat detection models'
        ],
        benefits: [
          'Proactive reduction in cybersecurity breach risks and threats',
          'Strong compliance with local and international data security standards',
          'Uncompromised protection of customer records, intellectual property, and files',
          'A secure remote work environment that defends against phishing attacks',
          'Absolute business continuity assurance, preventing costly operational halts'
        ]
      }
    ]
  }
];

export const JOB_LISTINGS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Senior Business Analyst',
    category: 'Consulting',
    type: 'Full-time',
    location: 'New York, NY (Hybrid)',
    experience: '5+ Years',
    description: 'We are seeking a Senior Business Analyst to assist client companies in analyzing operational workflows, designing KPI tracking metrics, and conducting process improvement audits using lean models.',
    skills: ['Process Mapping', 'Business Analytics', 'Lean Six Sigma', 'Stakeholder Management']
  },
  {
    id: 'job-2',
    title: 'Senior React Developer',
    category: 'Technology',
    type: 'Remote',
    location: 'Global Remote',
    experience: '4+ Years',
    description: 'Join our Technology Services team to build state-of-the-art corporate web platforms, cloud-based applications, and e-commerce applications for our global clients.',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'RESTful APIs', 'Next.js']
  },
  {
    id: 'job-3',
    title: 'Cloud DevOps Architect',
    category: 'Technology',
    type: 'Full-time',
    location: 'San Francisco, CA (Hybrid)',
    experience: '6+ Years',
    description: 'We are looking for a cloud expert experienced with AWS and Azure to design CI/CD deployment pipelines, manage containerized environments, and optimize cloud security protocols.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
  },
  {
    id: 'job-4',
    title: 'Executive Recruitment Consultant',
    category: 'Staffing',
    type: 'Full-time',
    location: 'Chicago, IL',
    experience: '3+ Years',
    description: 'Help us identify, evaluate, and attract top passive executives (C-level and Directors) for our premium enterprise clients. Exceptional communication skills are required.',
    skills: ['Executive Search', 'Headhunting', 'Candidate Screening', 'Talent Mapping']
  },
  {
    id: 'job-5',
    title: 'RPA Process Automation Specialist',
    category: 'Technology',
    type: 'Contract',
    location: 'Remote',
    experience: '3+ Years',
    description: 'Develop and deploy robotic process automation bots (UiPath, Power Automate) to automate repetitive data-entry and workflow approvals for global clients.',
    skills: ['RPA', 'UiPath', 'Power Automate', 'Python', 'Process Automation']
  }
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

export const TESTIMONIALS = [
  {
    quote: "IVA Work Solutions transformed our operational strategy and completed our complex cloud migration with zero downtime. They are a rare partner that excels at both high-level consulting and hand-on tech execution.",
    author: "Richard Kessler",
    role: "CTO, FinTech Alliance Group",
    image: "https://images.pexels.com/photos/5313161/pexels-photo-5313161.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120"
  },
  {
    quote: "We were struggling to hire niche software architects for over 3 months. IVA Work Solutions mapped the market, found pre-screened passive candidates, and helped us make two critical permanent hires within 14 days.",
    author: "Elena Vasquez",
    role: "VP of People, HealthVibe Inc.",
    image: "https://images.pexels.com/photos/8636591/pexels-photo-8636591.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120"
  },
  {
    quote: "Their workflow automation consulting cut down our internal process cycle times by 45%. The automation of data entry tasks saved us hundreds of operational hours monthly. Their solutions are highly cost-effective and future-ready.",
    author: "Arjun Mehta",
    role: "Director of Operations, Zenith Global Logistics",
    image: "https://images.pexels.com/photos/7689856/pexels-photo-7689856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120"
  }
];

export const CORE_VALUES = [
  {
    title: 'Our Mission',
    desc: 'To empower businesses with smart consulting, skilled talent, and innovative technology solutions that drive growth, efficiency, and long-term success.'
  },
  {
    title: 'Our Vision',
    desc: 'To become a trusted global partner for organizations seeking complete business solutions through consulting, staffing, and digital transformation.'
  },
  {
    title: 'Our Approach',
    desc: 'We combine industry expertise, strategic thinking, and practical execution to deliver customized solutions tailored to each client’s unique goals.'
  },
  {
    title: 'Our Commitment',
    desc: 'We are committed to quality, reliability, and lasting partnerships—providing exceptional service and measurable results at every stage of your journey.'
  }
];
