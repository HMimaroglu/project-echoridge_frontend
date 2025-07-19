/**
 * Timeline Item Component
 * Individual milestone in the timeline
 */

import React from 'react'
import { Heading, Text, CheckIcon } from '@/components/ui'

interface TimelineItemProps {
  quarter: string
  title: string
  description: string
  status: 'in-progress' | 'planned' | 'completed'
  deliverables: string[]
  isLast?: boolean
  className?: string
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  quarter,
  title,
  description,
  status,
  deliverables,
  isLast = false,
  className = ''
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-4 h-4 bg-success-500 rounded-full flex items-center justify-center">
            <CheckIcon size="xs" className="text-white" />
          </div>
        )
      case 'in-progress':
        return (
          <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
          </div>
        )
      case 'planned':
        return <div className="w-4 h-4 bg-neutral-300 rounded-full"></div>
      default:
        return <div className="w-4 h-4 bg-neutral-300 rounded-full"></div>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success-600 bg-success-50 border-success-200'
      case 'in-progress':
        return 'text-primary-600 bg-primary-50 border-primary-200'
      case 'planned':
        return 'text-neutral-600 bg-neutral-50 border-neutral-200'
      default:
        return 'text-neutral-600 bg-neutral-50 border-neutral-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'planned':
        return 'Planned'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Timeline Track */}
      {!isLast && (
        <div className="absolute left-2 top-8 w-0.5 h-full bg-neutral-200"></div>
      )}
      
      {/* Content */}
      <div className="flex items-start space-x-4">
        {/* Timeline Dot */}
        <div className="relative z-10 mt-2">
          {getStatusIcon(status)}
        </div>
        
        {/* Content Card */}
        <div className={`flex-1 border rounded-lg p-6 bg-white ${getStatusColor(status)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-primary-600 bg-primary-100 px-2 py-1 rounded">
                {quarter}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(status)}`}>
                {getStatusLabel(status)}
              </span>
            </div>
          </div>
          
          <Heading level={3} className="text-xl font-semibold text-navy-900 mb-3">
            {title}
          </Heading>
          
          <Text variant="muted" className="mb-4">
            {description}
          </Text>
          
          {/* Deliverables */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-700 mb-2">Key Deliverables:</h4>
            <ul className="space-y-1">
              {deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                  <Text size="sm" className="text-neutral-600">
                    {deliverable}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineItem