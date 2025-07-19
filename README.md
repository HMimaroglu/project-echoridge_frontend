# Project Echo Ridge

**A company-to-company search engine and AI product-market-fit calculator**

Echo Ridge is an enterprise-grade web application that provides comprehensive company search capabilities and AI-powered product-market-fit analysis. Built with cutting-edge technologies and designed for scalability, Echo Ridge serves as the public face of Iskarin Group's innovative business intelligence platform.

## Overview

Project Echo Ridge represents the convergence of advanced search technology and artificial intelligence to solve one of business's most challenging problems: finding product-market fit. Our platform enables organizations to search through comprehensive company databases and leverage AI algorithms to calculate precise product-market-fit scores.

### Key Features

- **Comprehensive Company Search**: Advanced search capabilities across global company databases
- **AI-Powered PMF Calculator**: Machine learning algorithms to determine product-market-fit scores
- **Enterprise-Grade Security**: Built with security best practices and compliance standards
- **Responsive Design**: Optimized experience across all devices and screen sizes
- **Accessibility First**: WCAG 2.1 AA compliant for inclusive user experience
- **High Performance**: Optimized for speed with 90+ Lighthouse scores

## Brand Voice & Design Philosophy

### Enterprise Trust Signals

Echo Ridge's design draws inspiration from established enterprise leaders including IBM, Microsoft, Accenture, Deloitte, and Cisco, incorporating:

- **Professional Color Palette**: Navy, cobalt, and purple accents against clean whites and grays
- **Minimal, Clean Aesthetic**: Focused on functionality and clarity
- **Trust-Building Elements**: Clear hierarchies, consistent spacing, and professional typography
- **Enterprise Credibility**: Industry-standard layouts and interaction patterns

### Why These Design Choices?

**Hero Section**: Immediately communicates value proposition with clear call-to-action, following enterprise landing page best practices.

**Timeline/Milestones**: Demonstrates project maturity and roadmap transparency, building confidence in our development process.

**How It Works Flow**: Simplifies complex technology into understandable steps, making our sophisticated platform approachable.

**Objectives Cards**: Clearly presents our strategic initiatives, showing comprehensive planning and execution capabilities.

**IBM-Style Navigation**: Clean, persistent navigation that users from enterprise environments expect and trust.

## Technology Stack

### Core Framework
- **Next.js 14**: Latest App Router with React 18+ for optimal performance
- **TypeScript**: Full type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens

### Development Quality
- **ESLint & Prettier**: Code quality and consistency enforcement
- **Husky**: Pre-commit hooks for quality gates
- **Jest & Playwright**: Comprehensive testing strategy
- **GitHub Actions**: Automated CI/CD pipeline

### Performance Optimization
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Code Splitting**: Automatic optimization through App Router
- **Caching Strategy**: Intelligent caching for static and dynamic content
- **Bundle Analysis**: Webpack bundle analyzer for optimization insights

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Landing page
│   ├── globals.css        # Global styles
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── sections/          # Landing page sections
│   ├── layout/            # Layout components
│   └── providers/         # Context providers
├── lib/                   # Utilities and APIs
│   ├── api/               # API integration
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Helper functions
└── types/                 # TypeScript definitions
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iskarin-group/echo-ridge-website.git
cd echo-ridge-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## Performance Standards

Echo Ridge maintains enterprise-grade performance standards:

- **Lighthouse Performance**: 90+ score
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO Optimization**: Structured data and meta tags
- **Security**: CSP headers and security best practices

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- AWS Amplify
- Netlify
- Railway
- DigitalOcean App Platform

## Contributing

We welcome contributions from the development community. Please read our contributing guidelines and code of conduct before submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

For technical support or questions about Project Echo Ridge:

- **Documentation**: Check our developer documentation in `README_DEV.md`
- **Issues**: Report bugs or request features on our GitHub repository
- **Contact**: Reach out to our development team through official channels

## License

This project is proprietary software owned by Iskarin Group. All rights reserved.

## About Iskarin Group

Iskarin Group is a leading technology company focused on developing innovative business intelligence solutions. Project Echo Ridge represents our commitment to advancing the state of company research and product-market-fit analysis through cutting-edge technology and user-centered design.

---

**© 2025 Iskarin Group • Privacy • Accessibility • Investor Relations**

*Built with Next.js 14, TypeScript, and Tailwind CSS*