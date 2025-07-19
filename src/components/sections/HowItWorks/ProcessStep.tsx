/**
 * Process Step Component
 * Individual step in the "How It Works" process
 */

import React from 'react'
import { Card, CardContent, Heading, Text, CheckIcon } from '@/components/ui'

interface ProcessStepProps {
  step?: string
  title: string
  description: string
  details: string[]
  isActive?: boolean
  className?: string
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ 
  step,
  title, 
  description, 
  details,
  isActive = false,
  className = '' 
}) => {
  return (
    <Card className={`h-full transition-all duration-300 ${isActive ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-md'} ${className}`}>
      <CardContent className="p-6">
        {step && (
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-lg mb-4">
            {step}
          </div>
        )}
        
        <Heading level={3} className="text-xl font-semibold text-navy-900 mb-3">
          {title}
        </Heading>
        
        <Text variant="muted" className="mb-6">
          {description}
        </Text>
        
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CheckIcon size="sm" className="text-success-600 flex-shrink-0 mt-0.5" />
              <Text size="sm" className="text-neutral-700">
                {detail}
              </Text>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default ProcessStep