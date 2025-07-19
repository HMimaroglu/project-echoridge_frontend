/**
 * Hero Content Component
 * Main content area for the hero section
 */

import React from 'react'
import { HeroHeading, Lead } from '@/components/ui'

interface HeroContentProps {
  className?: string
}

export const HeroContent: React.FC<HeroContentProps> = ({ className = '' }) => {
  return (
    <div className={`mx-auto max-w-4xl text-center ${className}`}>
      <HeroHeading className="mb-6 text-white">
        Connect. Collaborate.
        <span className="block text-transparent bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text">
          Create Impact.
        </span>
      </HeroHeading>
      
      <Lead className="mb-8 text-xl text-white/90 max-w-3xl mx-auto">
        Find aligned organizations and build meaningful partnerships.
      </Lead>
    </div>
  )
}

export default HeroContent