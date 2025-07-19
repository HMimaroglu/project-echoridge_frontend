'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { COMPANY } from '@/lib/constants'
import { HeaderProps } from '@/types'
import { Container, Button } from '@/components/ui'
import { Navigation } from './Navigation'

export const Header = ({ transparent = false, fixed = true }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    if (fixed) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
    
    return undefined
  }, [fixed])

  // Determine header styles based on state
  const isTransparent = transparent && !isScrolled
  const shouldShowShadow = fixed && isScrolled

  return (
    <header
      className={cn(
        'z-40 w-full transition-all duration-300',
        fixed && 'fixed top-0 left-0 right-0',
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-neutral-200/50',
        shouldShowShadow && 'shadow-lg'
      )}
    >
      <Container size="xl" padding>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className={cn(
                'flex items-center space-x-3 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md'
              )}
              aria-label={`${COMPANY.name} - Home`}
            >
              {/* Logo Icon */}
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                  isTransparent
                    ? 'bg-white/20 text-white'
                    : 'bg-primary-600 text-white'
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-10-5zM10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>

              {/* Company Name */}
              <div className="flex flex-col">
                <span
                  className={cn(
                    'text-lg font-bold leading-tight transition-colors',
                    isTransparent ? 'text-white' : 'text-navy-900'
                  )}
                >
                  {COMPANY.name}
                </span>
                <span
                  className={cn(
                    'text-xs font-medium leading-tight transition-colors',
                    isTransparent ? 'text-white/80' : 'text-neutral-600'
                  )}
                >
                  {COMPANY.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <Navigation transparent={isTransparent} />

          {/* CTA Buttons */}
          <div className="hidden items-center space-x-3 lg:flex">
            <Button
              variant={isTransparent ? 'ghost' : 'outline'}
              size="sm"
              className={cn(
                isTransparent &&
                  'border-white/30 text-white hover:bg-white/10 hover:border-white/50'
              )}
            >
              Login
            </Button>
            <Button
              variant={isTransparent ? 'outline' : 'primary'}
              size="sm"
              className={cn(
                isTransparent &&
                  'border-white text-white hover:bg-white hover:text-navy-900'
              )}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Container>

      {/* Secondary Navigation Bar (optional) */}
      {!transparent && (
        <div className="hidden border-t border-neutral-100 bg-neutral-50/50 lg:block">
          <Container size="xl" padding>
            <div className="flex h-10 items-center justify-between text-xs">
              <div className="flex items-center space-x-6 text-neutral-600">
                <span className="flex items-center">
                  <span className="mr-1">📞</span>
                  {COMPANY.phone}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">✉️</span>
                  {COMPANY.email}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/client-portal"
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Client Portal
                </Link>
                <Link
                  href="/resources"
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Resources
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}

// Sticky header variant for interior pages
export const StickyHeader = () => {
  return <Header transparent={false} fixed={true} />
}

// Hero header variant for landing pages
export const HeroHeader = () => {
  return <Header transparent={true} fixed={true} />
}

// Static header variant (no fixed positioning)
export const StaticHeader = () => {
  return <Header transparent={false} fixed={false} />
}

export default Header