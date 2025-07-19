/**
 * Benefit Item Component
 * Individual benefit item with icon and content
 */

import React from 'react'
import { Card, CardContent, CardHeader, Heading, Text, Icon, CheckIcon } from '@/components/ui'
import type { IconName } from '@/components/ui'

interface BenefitItemProps {
  title: string
  icon: IconName
  benefits: string[]
  className?: string
}

export const BenefitItem: React.FC<BenefitItemProps> = ({
  title,
  icon,
  benefits,
  className = ''
}) => {
  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-100 to-accent-100">
            <Icon name={icon} size="lg" className="text-primary-600" />
          </div>
          <Heading level={3} className="text-xl font-semibold text-navy-900">
            {title}
          </Heading>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CheckIcon size="sm" className="text-success-600 flex-shrink-0 mt-1" />
              <Text size="sm" className="text-neutral-700 leading-relaxed">
                {benefit}
              </Text>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default BenefitItem