import type { Metadata, Viewport } from 'next'
import { Inter, Merriweather, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import { SEO } from '@/lib/constants'
import './globals.css'

// Font imports and configuration
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
  preload: false,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
})

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(SEO.openGraph.url),
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  authors: [{ name: 'Project Echo Ridge' }],
  creator: 'Project Echo Ridge',
  publisher: 'Iskarin Group',
  category: 'Technology',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SEO.openGraph.url,
    siteName: SEO.openGraph.siteName,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [...SEO.openGraph.images],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    site: SEO.twitter.site,
    creator: SEO.twitter.handle,
    images: [...SEO.openGraph.images],
  },
  
  // Additional metadata
  applicationName: 'Echo Ridge Investments',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#4f46e5' },
    ],
  },
  
  // Manifest
  manifest: '/site.webmanifest',
  
  // Verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || null,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || null,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || null,
  },
  
  // Alternative languages
  alternates: {
    canonical: SEO.openGraph.url,
    languages: {
      'en-US': SEO.openGraph.url,
    },
  },
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'light',
}

// JSON-LD structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Echo Ridge Investments',
  description: 'Professional investment management services with a focus on long-term growth and risk management.',
  url: 'https://echoridgeinvestments.com',
  logo: 'https://echoridgeinvestments.com/logo.png',
  image: 'https://echoridgeinvestments.com/images/og-image.jpg',
  telephone: '+1 (555) 123-4567',
  email: 'info@echoridgeinvestments.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Financial District',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10004',
    addressCountry: 'US',
  },
  sameAs: [
    'https://linkedin.com/company/echo-ridge-investments',
    'https://twitter.com/echoridgeinvest',
    'https://facebook.com/echoridgeinvestments',
  ],
  serviceType: 'Investment Management',
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Investment Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Investment Management',
          description: 'Comprehensive portfolio management tailored to your financial goals.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Financial Planning',
          description: 'Strategic financial planning to help you achieve your long-term objectives.',
        },
      },
    ],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      className={cn(
        inter.variable,
        merriweather.variable,
        jetbrainsMono.variable,
        'scroll-smooth'
      )}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      
      <body 
        className={cn(
          'min-h-screen bg-white font-sans text-neutral-900 antialiased',
          'selection:bg-primary-100 selection:text-primary-900'
        )}
        suppressHydrationWarning
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-md font-medium transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Skip to main content
        </a>
        
        {/* Main application content */}
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
        
        {/* Scroll restoration and performance scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Scroll restoration
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              
              // Reduce motion for users who prefer it
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.scrollBehavior = 'auto';
              }
              
              // Theme detection and application
              (function() {
                function setTheme(theme) {
                  document.documentElement.setAttribute('data-theme', theme);
                }
                
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (savedTheme) {
                  setTheme(savedTheme);
                } else if (prefersDark) {
                  setTheme('dark');
                } else {
                  setTheme('light');
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}