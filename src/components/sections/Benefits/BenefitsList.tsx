/**
 * Benefits List Component
 * Grid layout for benefit items
 */

import React from 'react'
import { BenefitItem } from './BenefitItem'
import type { IconName } from '@/components/ui'

interface Benefit {
  id: string
  title: string
  icon: IconName
  benefits: string[]
}

interface BenefitsListProps {
  benefits: Benefit[]
  className?: string
}

export const BenefitsList: React.FC<BenefitsListProps> = ({ 
  benefits,
  className = '' 
}) => {
  return (
    <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {benefits.map((benefit) => (
        <BenefitItem
          key={benefit.id}
          title={benefit.title}
          icon={benefit.icon}
          benefits={benefit.benefits}
        />
      ))}
    </div>
  )
}

export default BenefitsList