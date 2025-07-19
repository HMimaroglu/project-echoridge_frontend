/**
 * Process Flow Component
 * Visual flow representation of the process steps
 */

import React from 'react'
import { ArrowRightIcon } from '@/components/ui'

interface ProcessFlowProps {
  steps: Array<{ id: string; title: string }>
  className?: string
}

export const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps, className = '' }) => {
  return (
    <div className={`flex items-center justify-center space-x-4 lg:space-x-8 mb-12 ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step Node */}
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-primary-600 mb-2"></div>
            <span className="text-sm font-medium text-navy-900 text-center max-w-24">
              {step.title}
            </span>
          </div>
          
          {/* Arrow (if not last step) */}
          {index < steps.length - 1 && (
            <div className="hidden sm:flex items-center text-primary-400">
              <ArrowRightIcon size="sm" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ProcessFlow