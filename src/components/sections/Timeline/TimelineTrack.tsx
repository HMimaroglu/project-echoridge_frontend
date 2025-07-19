/**
 * Timeline Track Component
 * Visual timeline track using Tailwind border-l
 */

import React from 'react'
import { TimelineItem } from './TimelineItem'

interface TimelineMilestone {
  id: string
  quarter: string
  title: string
  description: string
  status: 'in-progress' | 'planned' | 'completed'
  deliverables: string[]
}

interface TimelineTrackProps {
  milestones: TimelineMilestone[]
  className?: string
}

export const TimelineTrack: React.FC<TimelineTrackProps> = ({ 
  milestones,
  className = '' 
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {milestones.map((milestone, index) => (
        <TimelineItem
          key={milestone.id}
          quarter={milestone.quarter}
          title={milestone.title}
          description={milestone.description}
          status={milestone.status}
          deliverables={milestone.deliverables}
          isLast={index === milestones.length - 1}
        />
      ))}
    </div>
  )
}

export default TimelineTrack