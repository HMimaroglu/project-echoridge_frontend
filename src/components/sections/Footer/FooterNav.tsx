/**
 * Footer Navigation Component
 * Navigation links for the footer
 */

import React from 'react'
import { Link } from '@/components/ui'

interface FooterNavProps {
  title: string
  links: Array<{
    name: string
    href: string
  }>
  className?: string
}

export const FooterNav: React.FC<FooterNavProps> = ({ 
  title, 
  links, 
  className = '' 
}) => {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-navy-900 tracking-wider uppercase mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterNav