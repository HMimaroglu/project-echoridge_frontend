/**
 * Objectives Section Component
 * Main section displaying project objectives with progress
 */

import React from 'react'
import { Section, SectionHeading, Lead } from '@/components/ui'
import { ObjectiveGrid } from './ObjectiveGrid'
import { OBJECTIVES } from '@/lib/constants'

interface ObjectivesProps {
  className?: string
}

export const Objectives: React.FC<ObjectivesProps> = ({ className = '' }) => {
  // Calculate overall progress
  const totalProgress = OBJECTIVES.reduce((sum, obj) => sum + obj.progress, 0)
  const averageProgress = Math.round(totalProgress / OBJECTIVES.length)

  return (
    <Section className={className}>
      <div className="text-center mb-16">
        <SectionHeading>
          Project Objectives & Roadmap
        </SectionHeading>
        <Lead className="max-w-3xl mx-auto">
          Our strategic objectives drive the development of Echo Ridge, ensuring we deliver 
          a comprehensive platform that meets the evolving needs of modern businesses.
        </Lead>
        
        {/* Overall Progress Indicator */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-neutral-700">Overall Progress</span>
              <span className="text-lg font-bold text-primary-600">{averageProgress}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000"
                style={{ width: `${averageProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-neutral-600 mt-2">
              {OBJECTIVES.filter(obj => obj.status === 'in-progress').length} active, {OBJECTIVES.filter(obj => obj.status === 'planned').length} planned objectives
            </p>
          </div>
        </div>
      </div>

      {/* Objectives Grid */}
      <ObjectiveGrid objectives={[...OBJECTIVES]} />

      {/* Additional Context */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-navy-900 mb-4">
            Development Philosophy
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            We prioritize iterative development and continuous feedback to ensure each 
            objective delivers real value. Our approach emphasizes building robust 
            foundations while maintaining flexibility for future enhancements.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-secondary-50 to-neutral-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-navy-900 mb-4">
            Iskarin Integration
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            As part of the Iskarin Group, Echo Ridge benefits from enterprise-grade 
            infrastructure and proven methodologies, enabling us to deliver 
            professional-quality solutions from day one.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default Objectives