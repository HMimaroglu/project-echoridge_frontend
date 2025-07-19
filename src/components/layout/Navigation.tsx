'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { NAVIGATION } from '@/lib/constants'
import { NavigationItem } from '@/types'
import { Button, MenuIcon, XIcon, ChevronRightIcon } from '@/components/ui'

interface NavigationProps {
  transparent?: boolean
  className?: string
}

interface MobileNavProps {
  items: NavigationItem[]
  isOpen: boolean
  onClose: () => void
}

interface DesktopNavProps {
  items: NavigationItem[]
  transparent?: boolean
}

// Mobile Navigation Component
const MobileNav = ({ items, isOpen, onClose }: MobileNavProps) => {
  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleLinkClick = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Mobile menu panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl md:hidden">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <span className="text-lg font-semibold text-navy-900">Menu</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <XIcon size="sm" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors',
                      'text-neutral-700 hover:bg-primary-50 hover:text-primary-700',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                      item.disabled && 'pointer-events-none opacity-50'
                    )}
                    aria-disabled={item.disabled}
                  >
                    <span>{item.name}</span>
                    <ChevronRightIcon size="sm" className="text-neutral-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-neutral-200 px-6 py-4">
            <Button fullWidth className="mb-3">
              Get Started
            </Button>
            <Button fullWidth variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

// Desktop Navigation Component
const DesktopNav = ({ items, transparent }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex md:items-center md:space-x-1">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
            transparent
              ? 'text-white/90 hover:text-white hover:bg-white/10'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50',
            item.disabled && 'pointer-events-none opacity-50'
          )}
          aria-disabled={item.disabled}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

// Main Navigation Component
export const Navigation = ({ transparent = false, className }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
    
    return undefined
  }, [isMobileMenuOpen])

  return (
    <div className={cn('flex items-center', className)}>
      {/* Desktop Navigation */}
      <DesktopNav items={[...NAVIGATION.main]} transparent={transparent} />

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMobileMenu}
        className={cn(
          'md:hidden',
          transparent
            ? 'text-white/90 hover:text-white hover:bg-white/10'
            : 'text-neutral-600 hover:text-neutral-900'
        )}
        aria-label="Open navigation menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        <MenuIcon size="md" />
      </Button>

      {/* Mobile Navigation */}
      <MobileNav
        items={[...NAVIGATION.main]}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </div>
  )
}

// Sub-navigation component for section-specific menus
interface SubNavigationProps {
  items: NavigationItem[]
  className?: string
}

export const SubNavigation = ({ items, className }: SubNavigationProps) => {
  return (
    <nav className={cn('border-b border-neutral-200 bg-white', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex-shrink-0 border-b-2 border-transparent px-1 py-4 text-sm font-medium transition-colors',
                'text-neutral-500 hover:border-neutral-300 hover:text-neutral-700',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                item.disabled && 'pointer-events-none opacity-50'
              )}
              aria-disabled={item.disabled}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

// Breadcrumb navigation
interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[]
  className?: string
}

export const BreadcrumbNavigation = ({ items, className }: BreadcrumbNavigationProps) => {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon
                size="sm"
                className="mx-2 text-neutral-400"
                aria-hidden="true"
              />
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                {item.name}
              </Link>
            ) : (
              <span
                className={cn(
                  'text-sm font-medium',
                  index === items.length - 1
                    ? 'text-neutral-900'
                    : 'text-neutral-500'
                )}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Navigation