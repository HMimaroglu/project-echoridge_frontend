/**
 * How It Works Section Component
 * Main section showing the 3-step process
 */

import React from 'react'
import { Section, SectionHeading, Lead } from '@/components/ui'
import { ProcessStep } from './ProcessStep'
import { ProcessFlow } from './ProcessFlow'
import { PROCESS_STEPS } from '@/lib/constants'

interface HowItWorksProps {
  className?: string
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ className = '' }) => {
  // Create flow steps for the visual representation
  const flowSteps = PROCESS_STEPS.map(step => ({
    id: step.id,
    title: step.title
  }))

  return (
    <Section className={`bg-neutral-50 ${className}`}>
      <div className="text-center mb-16">
        <SectionHeading>
          How Echo Ridge Works
        </SectionHeading>
        <Lead className="max-w-3xl mx-auto">
          Our revolutionary platform combines intelligent company discovery with AI-powered 
          product-market-fit analysis to accelerate your business decisions.
        </Lead>
      </div>

      {/* Process Flow Visualization */}
      <ProcessFlow steps={flowSteps} className="mb-16" />

      {/* Process Steps Grid - Responsive Layout */}
      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {PROCESS_STEPS.map((processStep, index) => (
          <ProcessStep
            key={processStep.id}
            step={processStep.step}
            title={processStep.title}
            description={processStep.description}
            details={[...processStep.details]}
            isActive={index === 0} // Highlight first step
          />
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-16 text-center">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-navy-900 mb-4">
            Seamless Integration with Your Workflow
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            Echo Ridge integrates seamlessly with your existing business processes, providing 
            real-time insights and actionable intelligence that help you identify market 
            opportunities, validate product concepts, and make informed strategic decisions 
            with confidence.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default HowItWorks