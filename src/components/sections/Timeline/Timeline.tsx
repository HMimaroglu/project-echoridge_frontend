/**
 * Timeline Section Component
 * Main section displaying project timeline with milestones
 */

import React from 'react'
import { Section, SectionHeading, Lead } from '@/components/ui'
import { TimelineTrack } from './TimelineTrack'
import { TIMELINE } from '@/lib/constants'

interface TimelineProps {
  className?: string
}

export const Timeline: React.FC<TimelineProps> = ({ className = '' }) => {
  // Calculate timeline progress
  const completedMilestones = 0 // No completed milestones yet
  const inProgressMilestones = TIMELINE.filter(milestone => milestone.status === 'in-progress').length
  const totalMilestones = TIMELINE.length

  return (
    <Section className={className}>
      <div className="text-center mb-16">
        <SectionHeading>
          Development Timeline & Milestones
        </SectionHeading>
        <Lead className="max-w-3xl mx-auto">
          Our strategic roadmap outlines key milestones and deliverables, ensuring 
          transparent progress tracking and predictable feature releases.
        </Lead>
        
        {/* Progress Summary */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-neutral-50 rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-success-600">{completedMilestones}</div>
                <div className="text-sm text-neutral-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">{inProgressMilestones}</div>
                <div className="text-sm text-neutral-600">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-600">{totalMilestones}</div>
                <div className="text-sm text-neutral-600">Total Milestones</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Track */}
      <div className="max-w-4xl mx-auto">
        <TimelineTrack milestones={TIMELINE.map(m => ({ ...m, deliverables: [...m.deliverables] }))} />
      </div>

      {/* Additional Information */}
      <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-4">
            Committed to Transparency
          </h3>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            We believe in open development and regular communication with our community. 
            Follow our progress, provide feedback, and help shape the future of Echo Ridge.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold">Q</span>
            </div>
            <h4 className="font-semibold text-navy-900 mb-2">Quarterly Updates</h4>
            <p className="text-sm text-neutral-600">
              Detailed progress reports every quarter with metrics and insights.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-accent-600 font-bold">β</span>
            </div>
            <h4 className="font-semibold text-navy-900 mb-2">Beta Access</h4>
            <p className="text-sm text-neutral-600">
              Early access to new features for community members and partners.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-secondary-600 font-bold">📊</span>
            </div>
            <h4 className="font-semibold text-navy-900 mb-2">Live Metrics</h4>
            <p className="text-sm text-neutral-600">
              Real-time development metrics and performance indicators.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Timeline