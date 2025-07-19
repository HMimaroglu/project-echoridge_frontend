/**
 * Hero Call-to-Action Component
 * Action buttons and trust indicators for the hero section
 */

import React from 'react'
import { Button, FlexContainer, ArrowRightIcon } from '@/components/ui'
import { STATISTICS } from '@/lib/constants'
import { formatNumber, formatPercentage } from '@/lib/utils'

interface HeroCTAProps {
  className?: string
}

export const HeroCTA: React.FC<HeroCTAProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      {/* Action Buttons */}
      <FlexContainer justify="center" gap="lg" className="mb-12">
        <Button size="lg" className="bg-white text-navy-900 hover:bg-neutral-100">
          Start Free Trial
          <ArrowRightIcon size="sm" />
        </Button>
        <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
          Request Demo
        </Button>
      </FlexContainer>
      
      {/* Trust Indicators */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
        {STATISTICS.stats.map((stat) => (
          <div key={stat.id} className="text-white">
            <div className="text-2xl font-bold text-accent-400 md:text-3xl">
              {stat.format === 'percentage' ? formatPercentage(stat.value) :
               formatNumber(stat.value)}{stat.suffix}
            </div>
            <div className="text-sm text-white/70 md:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Additional Trust Signal */}
      <div className="mt-8 text-center text-sm text-white/60">
        Trusted by developers and enterprises worldwide • Part of Iskarin Group
      </div>
    </div>
  )
}

export default HeroCTA