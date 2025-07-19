import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Section, 
  HeroHeading, 
  Text, 
  Button, 
  Card, 
  CardContent,
  GridContainer,
  SearchIcon,
  ArrowLeftIcon,
  HomeIcon,
  BookOpenIcon,
  TrendingUpIcon,
  CalculatorIcon,
  ShieldIcon
} from '@/components/ui'
import { StickyHeader, FullFooter } from '@/components/layout'
import { COMPANY, NAVIGATION } from '@/lib/constants'

// Metadata for the 404 page
export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. Return to Echo Ridge Investments homepage or explore our services.',
  robots: {
    index: false,
    follow: false,
  },
}

// Generate structured data for 404 page
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '404 - Page Not Found',
  description: 'The requested page could not be found on Echo Ridge Investments website.',
  url: 'https://echoridgeinvestments.com/404',
  isPartOf: {
    '@type': 'WebSite',
    name: COMPANY.name,
    url: 'https://echoridgeinvestments.com',
  },
}

export default function NotFound() {
  // Popular pages to suggest
  const popularPages = [
    {
      title: 'Investment Services',
      description: 'Learn about our comprehensive investment management solutions.',
      href: '#services',
      icon: TrendingUpIcon,
    },
    {
      title: 'Financial Planning', 
      description: 'Discover our strategic financial planning services.',
      href: '#services',
      icon: CalculatorIcon,
    },
    {
      title: 'Risk Management',
      description: 'Understand our approach to protecting your investments.',
      href: '#services', 
      icon: ShieldIcon,
    },
    {
      title: 'Resources & Insights',
      description: 'Access market research and investment guides.',
      href: '/resources',
      icon: BookOpenIcon,
    },
  ]

  // Main navigation suggestions
  const navigationSuggestions = NAVIGATION.main.slice(0, 6)

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <StickyHeader />
      
      <main id="main-content" className="flex-1">
        <Section className="min-h-[80vh] flex items-center">
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* 404 Display */}
            <div className="mb-8">
              <div className="inline-block text-8xl font-bold text-primary-600 mb-4 md:text-9xl">
                404
              </div>
              
              <HeroHeading size="4xl" className="mb-4 text-neutral-900">
                Page Not Found
              </HeroHeading>
              
              <Text size="lg" variant="muted" className="mb-8 max-w-2xl mx-auto">
                The page you're looking for doesn't exist or has been moved. 
                Let's help you find what you need.
              </Text>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/">
                <Button size="lg">
                  <HomeIcon size="sm" />
                  Go Home
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" onClick={() => window.history.back()}>
                <ArrowLeftIcon size="sm" />
                Go Back
              </Button>
              
              <Link href="/search">
                <Button size="lg" variant="ghost">
                  <SearchIcon size="sm" />
                  Search Site
                </Button>
              </Link>
            </div>

            {/* Popular Pages */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Popular Pages
              </h2>
              
              <GridContainer cols={2} gap="md" className="md:grid-cols-2 lg:grid-cols-4">
                {popularPages.map((page) => (
                  <Link key={page.title} href={page.href}>
                    <Card hoverable clickable>
                      <CardContent className="text-center p-6">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 mb-4">
                          <page.icon size="lg" className="text-primary-600" />
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2">
                          {page.title}
                        </h3>
                        <Text size="sm" variant="muted">
                          {page.description}
                        </Text>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </GridContainer>
            </div>

            {/* Navigation Links */}
            <Card className="mb-12">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Site Navigation
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                  {navigationSuggestions.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium p-2 rounded-md hover:bg-primary-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="text-center">
              <Text size="sm" variant="muted" className="mb-4">
                Can't find what you're looking for? Get in touch with our team.
              </Text>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
                <a 
                  href={`mailto:${COMPANY.email}`}
                  className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
                >
                  {COMPANY.email}
                </a>
                <span className="hidden sm:inline text-neutral-300">|</span>
                <a 
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
                >
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            {/* Search Suggestions */}
            <Card className="mt-12 text-left">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Search Tips
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></span>
                    <span>Try searching for "investment management" or "financial planning"</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></span>
                    <span>Check the URL for typos or incorrect characters</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></span>
                    <span>Browse our main navigation menu for key sections</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></span>
                    <span>Visit our resources page for guides and market insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>
      
      <FullFooter />
    </>
  )
}