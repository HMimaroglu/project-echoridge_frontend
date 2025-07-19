'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { SkeletonProps } from '@/types'

const skeletonVariants = cva(
  'bg-neutral-200 rounded-md',
  {
    variants: {
      variant: {
        text: 'h-4 w-full',
        rectangular: 'w-full h-full',
        circular: 'rounded-full aspect-square',
      },
      animation: {
        pulse: 'animate-pulse',
        wave: 'animate-gradient-x bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'rectangular',
      animation: 'pulse',
    },
  }
)

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    variant = 'rectangular', 
    animation = 'pulse',
    width,
    height,
    lines = 1,
    style,
    ...props 
  }, ref) => {
    // Handle text variant with multiple lines
    if (variant === 'text' && lines > 1) {
      return (
        <div className={cn('space-y-2', className)} ref={ref} {...props}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                skeletonVariants({ variant, animation }),
                index === lines - 1 && 'w-4/5' // Last line is shorter
              )}
              style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                ...style,
              }}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        className={cn(skeletonVariants({ variant, animation, className }))}
        ref={ref}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// Pre-configured skeleton components for common use cases
const SkeletonText = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ lines = 3, className, ...props }, ref) => (
    <Skeleton
      ref={ref}
      variant="text"
      lines={lines}
      className={className}
      {...props}
    />
  )
)
SkeletonText.displayName = 'SkeletonText'

const SkeletonCircle = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ width = 40, height = 40, className, ...props }, ref) => (
    <Skeleton
      ref={ref}
      variant="circular"
      width={width}
      height={height}
      className={className}
      {...props}
    />
  )
)
SkeletonCircle.displayName = 'SkeletonCircle'

const SkeletonAvatar = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ width = 48, height = 48, className, ...props }, ref) => (
    <Skeleton
      ref={ref}
      variant="circular"
      width={width}
      height={height}
      className={className}
      {...props}
    />
  )
)
SkeletonAvatar.displayName = 'SkeletonAvatar'

const SkeletonButton = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ width = 100, height = 40, className, ...props }, ref) => (
    <Skeleton
      ref={ref}
      variant="rectangular"
      width={width}
      height={height}
      className={cn('rounded-md', className)}
      {...props}
    />
  )
)
SkeletonButton.displayName = 'SkeletonButton'

const SkeletonCard = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <div className={cn('p-6 space-y-4', className)} ref={ref} {...props}>
      <Skeleton variant="rectangular" height={200} />
      <div className="space-y-2">
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={16} lines={2} />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </div>
    </div>
  )
)
SkeletonCard.displayName = 'SkeletonCard'

const SkeletonTable = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'> & { rows?: number; cols?: number }>(
  ({ rows = 5, cols = 4, className, ...props }, ref) => (
    <div className={cn('space-y-2', className)} ref={ref} {...props}>
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, index) => (
          <Skeleton key={`header-${index}`} variant="text" height={20} className="flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" height={16} className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
)
SkeletonTable.displayName = 'SkeletonTable'

const SkeletonList = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'> & { items?: number }>(
  ({ items = 5, className, ...props }, ref) => (
    <div className={cn('space-y-4', className)} ref={ref} {...props}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <SkeletonCircle width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" height={16} width="60%" />
            <Skeleton variant="text" height={14} width="40%" />
          </div>
        </div>
      ))}
    </div>
  )
)
SkeletonList.displayName = 'SkeletonList'

const SkeletonChart = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ height = 300, className, ...props }, ref) => (
    <div className={cn('space-y-4', className)} ref={ref} {...props}>
      <div className="flex justify-between items-center">
        <Skeleton variant="text" width={200} height={24} />
        <Skeleton variant="rectangular" width={120} height={32} />
      </div>
      <Skeleton variant="rectangular" height={height} />
      <div className="flex justify-center space-x-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Skeleton variant="circular" width={12} height={12} />
            <Skeleton variant="text" width={60} height={14} />
          </div>
        ))}
      </div>
    </div>
  )
)
SkeletonChart.displayName = 'SkeletonChart'

const SkeletonProfile = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <div className={cn('flex flex-col items-center space-y-4 text-center', className)} ref={ref} {...props}>
      <SkeletonAvatar width={80} height={80} />
      <div className="space-y-2 w-full max-w-xs">
        <Skeleton variant="text" height={20} width="80%" className="mx-auto" />
        <Skeleton variant="text" height={16} width="60%" className="mx-auto" />
        <Skeleton variant="text" height={14} lines={2} />
      </div>
      <div className="flex space-x-2">
        <SkeletonButton width={80} height={32} />
        <SkeletonButton width={80} height={32} />
      </div>
    </div>
  )
)
SkeletonProfile.displayName = 'SkeletonProfile'

export {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  SkeletonChart,
  SkeletonProfile,
  skeletonVariants,
}

export type { SkeletonProps }
export type SkeletonVariants = VariantProps<typeof skeletonVariants>