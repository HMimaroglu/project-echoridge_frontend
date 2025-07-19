/**
 * Hero Section Component
 * Main hero section with background, content, and call-to-action
 */

import React from 'react'
import { Hero as HeroContainer } from '@/components/ui'
import { HeroContent } from './HeroContent'
import { HeroCTA } from './HeroCTA'

interface HeroSectionProps {
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  return (
    <HeroContainer className={`relative overflow-hidden bg-gradient-to-br from-navy-900 via-primary-900 to-secondary-900 ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary-500/10 blur-3xl" />
      
      {/* Content */}
      <div className="relative">
        <HeroContent className="mb-12" />
        <HeroCTA />
      </div>
    </HeroContainer>
  )
}

export default HeroSection