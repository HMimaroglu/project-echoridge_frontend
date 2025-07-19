/**
 * Objective Card Component
 * Individual objective card with progress indicator
 */

import React from 'react'
import { Card, CardContent, CardHeader, Heading, Text, Icon } from '@/components/ui'
import type { IconName } from '@/components/ui'

interface ObjectiveCardProps {
  title: string
  description: string
  icon: IconName
  status: 'in-progress' | 'planned' | 'completed'
  progress: number
  className?: string
}

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  title,
  description,
  icon,
  status,
  progress,
  className = ''
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success-600 bg-success-100'
      case 'in-progress':
        return 'text-primary-600 bg-primary-100'
      case 'planned':
        return 'text-neutral-600 bg-neutral-100'
      default:
        return 'text-neutral-600 bg-neutral-100'
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

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-500'
      case 'in-progress':
        return 'bg-primary-500'
      case 'planned':
        return 'bg-neutral-400'
      default:
        return 'bg-neutral-400'
    }
  }

  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${getStatusColor(status)}`}>
            <Icon name={icon} size="lg" />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {getStatusLabel(status)}
          </span>
        </div>
        
        <Heading level={3} className="text-xl font-semibold text-navy-900 mb-3">
          {title}
        </Heading>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Text variant="muted" className="mb-6">
          {description}
        </Text>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-700">Progress</span>
            <span className="text-sm font-bold text-neutral-900">{progress}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(status)}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ObjectiveCard