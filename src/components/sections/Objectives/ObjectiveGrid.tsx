/**
 * Objective Grid Component
 * Grid layout for objective cards
 */

import React from 'react'
import { ObjectiveCard } from './ObjectiveCard'
import type { IconName } from '@/components/ui'

interface Objective {
  id: string
  title: string
  description: string
  icon: IconName
  status: 'in-progress' | 'planned' | 'completed'
  progress: number
}

interface ObjectiveGridProps {
  objectives: Objective[]
  className?: string
}

export const ObjectiveGrid: React.FC<ObjectiveGridProps> = ({ 
  objectives,
  className = '' 
}) => {
  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${className}`}>
      {objectives.map((objective) => (
        <ObjectiveCard
          key={objective.id}
          title={objective.title}
          description={objective.description}
          icon={objective.icon}
          status={objective.status}
          progress={objective.progress}
        />
      ))}
    </div>
  )
}

export default ObjectiveGrid