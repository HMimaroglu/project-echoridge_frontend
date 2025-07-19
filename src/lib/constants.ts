/**
 * Application Constants for Project Echo Ridge
 * Centralized configuration and constant values
 */

// Company Information
export const COMPANY = {
  name: 'Project Echo Ridge',
  tagline: 'Collaborative Business Intelligence Network',
  description: 'A collective platform connecting organizations to share insights, discover partnerships, and strengthen business ecosystems through intelligent search and collaborative analysis.',
  founded: 2025,
  email: 'info@echoridge.dev',
  phone: '+1 (555) 123-4567',
  parent: 'Iskarin Group',
  address: {
    street: '123 Innovation District',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
  },
} as const

// Navigation Links
export const NAVIGATION = {
  main: [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { name: 'Objectives', href: '#objectives', id: 'objectives' },
    { name: 'Benefits', href: '#benefits', id: 'benefits' },
    { name: 'Timeline', href: '#timeline', id: 'timeline' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ],
  footer: [
    {
      title: 'Platform',
      links: [
        { name: 'Company Search', href: '#search' },
        { name: 'AI PMF Calculator', href: '#calculator' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Iskarin Group', href: 'https://iskarin.com' },
        { name: 'Investor Relations', href: '/investors' },
        { name: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Developer API', href: '/api' },
        { name: 'Case Studies', href: '/cases' },
        { name: 'Research', href: '/research' },
        { name: 'Support', href: '/support' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Accessibility', href: '/accessibility' },
        { name: 'Security', href: '/security' },
      ],
    },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/echo-ridge',
      icon: 'linkedin',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/echoridgedev',
      icon: 'twitter',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/echo-ridge',
      icon: 'github',
    },
  ],
} as const

// How It Works Process
export const PROCESS_STEPS = [
  {
    id: 'define-goals',
    step: '01',
    title: 'Define Goals',
    description: 'Share your collaboration interests and partnership needs.',
    details: [
      'Partnership objectives',
      'Resource capabilities',
    ],
  },
  {
    id: 'find-matches',
    step: '02',
    title: 'Find Matches',
    description: 'Our AI identifies aligned organizations in your network.',
    details: [
      'Intelligent matching',
      'Compatibility scoring',
    ],
  },
  {
    id: 'collaborate',
    step: '03',
    title: 'Collaborate',
    description: 'Connect directly and build impactful partnerships.',
    details: [
      'Direct communication',
      'Partnership development',
    ],
  },
] as const

// Project Objectives
export const OBJECTIVES = [
  {
    id: 'matching-ai',
    title: 'AI Matching',
    description: 'Smart organization pairing technology.',
    icon: 'Search',
    status: 'in-progress',
    progress: 75,
  },
  {
    id: 'platform-launch',
    title: 'Platform Launch',
    description: 'Simple, effective collaboration network.',
    icon: 'Building',
    status: 'in-progress',
    progress: 45,
  },
] as const

// Platform Benefits
export const BENEFITS = [
  {
    id: 'organizations',
    title: 'For Organizations',
    icon: 'Building',
    benefits: [
      'Find strategic partners',
      'Share resources efficiently',
    ],
  },
  {
    id: 'nonprofits',
    title: 'For Nonprofits',
    icon: 'User',
    benefits: [
      'Connect with corporate allies',
      'Amplify mission impact',
    ],
  },
] as const

// Timeline Milestones
export const TIMELINE = [
  {
    id: 'q1-2025',
    quarter: 'Q1 2025',
    title: 'Foundation & Core Development',
    description: 'Complete core search engine development and initial AI model training.',
    status: 'in-progress',
    deliverables: [
      'MVP search algorithm',
      'Initial PMF calculator',
      'Basic user interface',
    ],
  },
  {
    id: 'q2-2025',
    quarter: 'Q2 2025',
    title: 'Platform Integration',
    description: 'Integrate with Iskarin infrastructure and expand data sources.',
    status: 'planned',
    deliverables: [
      'Iskarin platform integration',
      'Enhanced data pipeline',
      'User authentication system',
    ],
  },
  {
    id: 'q3-2025',
    quarter: 'Q3 2025',
    title: 'Beta Launch',
    description: 'Launch closed beta with select enterprise partners.',
    status: 'planned',
    deliverables: [
      'Beta platform release',
      'Partner onboarding',
      'Feedback collection system',
    ],
  },
  {
    id: 'q4-2025',
    quarter: 'Q4 2025',
    title: 'Public Release',
    description: 'Full platform launch with comprehensive feature set.',
    status: 'planned',
    deliverables: [
      'Public platform launch',
      'Advanced AI features',
      'Enterprise support',
    ],
  },
  {
    id: 'q1-2026',
    quarter: 'Q1 2026',
    title: 'Scale & Optimize',
    description: 'Scale platform infrastructure and optimize performance.',
    status: 'planned',
    deliverables: [
      'Global infrastructure',
      'Performance optimization',
      'Advanced analytics',
    ],
  },
  {
    id: 'q2-2026',
    quarter: 'Q2 2026',
    title: 'Market Expansion',
    description: 'Expand to new markets and industry verticals.',
    status: 'planned',
    deliverables: [
      'International expansion',
      'Industry-specific features',
      'Partnership ecosystem',
    ],
  },
] as const

// Platform Statistics
export const STATISTICS = {
  stats: [
    {
      id: 'companies',
      label: 'Companies Indexed',
      value: 2500000,
      format: 'number',
      suffix: '+',
    },
    {
      id: 'accuracy',
      label: 'AI Accuracy Rate',
      value: 94.7,
      format: 'percentage',
      suffix: '%',
    },
    {
      id: 'searches',
      label: 'Searches Processed',
      value: 150000,
      format: 'number',
      suffix: '+',
    },
    {
      id: 'time-saved',
      label: 'Average Time Saved',
      value: 87,
      format: 'percentage',
      suffix: '%',
    },
  ],
} as const

// Contact Information
export const CONTACT = {
  office: {
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM PST',
    phone: COMPANY.phone,
    email: COMPANY.email,
    address: COMPANY.address,
  },
  form: {
    subjects: [
      'General Inquiry',
      'Platform Demo',
      'Enterprise Partnership',
      'API Access',
      'Technical Support',
      'Investment Opportunity',
      'Other',
    ],
  },
} as const

// SEO and Meta
export const SEO = {
  defaultTitle: `${COMPANY.name} - ${COMPANY.tagline}`,
  titleTemplate: `%s | ${COMPANY.name}`,
  defaultDescription: COMPANY.description,
  keywords: [
    'company search engine',
    'AI product market fit',
    'business intelligence',
    'market analysis',
    'company discovery',
    'B2B search',
    'enterprise AI',
    'startup validation',
    'Echo Ridge',
    'Iskarin Group',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://echoridge.dev',
    siteName: COMPANY.name,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} - ${COMPANY.tagline}`,
      },
    ],
  },
  twitter: {
    handle: '@echoridgedev',
    site: '@echoridgedev',
    cardType: 'summary_large_image',
  },
} as const

// Animation and UI
export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  stagger: {
    fast: 50,
    normal: 100,
    slow: 200,
  },
} as const

// Breakpoints (should match Tailwind config)
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1600,
} as const

// Z-Index Scale
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

// API Endpoints (when backend is implemented)
export const API = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  endpoints: {
    contact: '/contact',
    newsletter: '/newsletter',
    consultation: '/consultation',
    performance: '/performance',
    insights: '/insights',
  },
} as const

// Feature Flags
export const FEATURES = {
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  chatbot: process.env.NEXT_PUBLIC_ENABLE_CHATBOT === 'true',
  newsletter: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER === 'true',
  darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
} as const

// Error Messages
export const ERRORS = {
  generic: 'An unexpected error occurred. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  notFound: 'The requested resource was not found.',
  unauthorized: 'You are not authorized to access this resource.',
  rateLimit: 'Too many requests. Please try again later.',
} as const

// Success Messages
export const SUCCESS = {
  contact: 'Thank you for your message. We will get back to you soon.',
  newsletter: 'Successfully subscribed to our newsletter.',
  consultation: 'Consultation request submitted successfully.',
  form: 'Form submitted successfully.',
} as const