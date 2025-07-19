/**
 * Footer Social Component
 * Social media links for the footer
 */

import React from 'react'
import { Icon, LinkedinIcon, TwitterIcon, GithubIcon } from '@/components/ui'

interface SocialLink {
  name: string
  href: string
  icon: string
}

interface FooterSocialProps {
  socialLinks: SocialLink[]
  className?: string
}

export const FooterSocial: React.FC<FooterSocialProps> = ({ 
  socialLinks, 
  className = '' 
}) => {

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-navy-900 tracking-wider uppercase mb-4">
        Follow Us
      </h3>
      <div className="flex space-x-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-primary-600 hover:text-white transition-all duration-200"
            aria-label={social.name}
          >
            {social.icon === 'linkedin' && <LinkedinIcon size="sm" />}
            {social.icon === 'twitter' && <TwitterIcon size="sm" />}
            {social.icon === 'github' && <GithubIcon size="sm" />}
            {!['linkedin', 'twitter', 'github'].includes(social.icon) && (
              <Icon name="ExternalLink" size="sm" />
            )}
          </a>
        ))}
      </div>
    </div>
  )
}

export default FooterSocial