/**
 * Footer Component
 * Main footer with trusted-company styling and Iskarin Group branding
 */

import React from 'react'
import { Container, Text, Link } from '@/components/ui'
import { FooterNav } from './FooterNav'
import { FooterSocial } from './FooterSocial'
import { NAVIGATION, COMPANY } from '@/lib/constants'

interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`bg-white border-t border-neutral-200 ${className}`}>
      <Container className="py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-6 md:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-navy-900 mb-2">
                {COMPANY.name}
              </h2>
              <p className="text-neutral-600 mb-4 max-w-md">
                {COMPANY.description}
              </p>
              <div className="text-sm text-neutral-500">
                A product of <Link href="https://iskarin.com" className="text-primary-600 hover:text-primary-700 font-medium">Iskarin Group</Link>
              </div>
            </div>
            
            {/* Trust Signals */}
            <div className="space-y-2 text-sm text-neutral-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span>SOC 2 Type II compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span>99.9% uptime guarantee</span>
              </div>
            </div>
          </div>
          
          {/* Footer Navigation */}
          {NAVIGATION.footer.map((section) => (
            <FooterNav
              key={section.title}
              title={section.title}
              links={[...section.links]}
            />
          ))}
        </div>
        
        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <FooterSocial socialLinks={[...NAVIGATION.social]} />
        </div>
      </Container>
      
      {/* Bottom Footer */}
      <div className="bg-neutral-50 border-t border-neutral-200">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-neutral-600">
              <span>© {currentYear} Iskarin Group</span>
              <Link href="/privacy" className="hover:text-primary-600">Privacy</Link>
              <Link href="/accessibility" className="hover:text-primary-600">Accessibility</Link>
              <Link href="/investors" className="hover:text-primary-600">Investor Relations</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Text size="sm" variant="muted">
                Built with precision in San Francisco
              </Text>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <Text size="xs" variant="muted">All systems operational</Text>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer