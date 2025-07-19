'use client'

import { forwardRef, createElement } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { HeadingProps } from '@/types'

const headingVariants = cva(
  'font-sans tracking-tight',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
      },
      variant: {
        default: 'text-neutral-900',
        gradient: 'bg-gradient-to-r from-primary-600 via-cobalt-600 to-accent-600 bg-clip-text text-transparent',
        muted: 'text-neutral-600',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
      },
    },
    defaultVariants: {
      size: 'lg',
      variant: 'default',
      weight: 'semibold',
    },
  }
)

// Default size mapping for heading levels
const defaultSizeForLevel = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'md',
} as const

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ 
    className, 
    level = 2, 
    size, 
    variant = 'default', 
    weight = 'semibold',
    children, 
    ...props 
  }, ref) => {
    // Use explicit size or fall back to default for the heading level
    const headingSize = size || defaultSizeForLevel[level]
    
    // Determine the HTML tag based on level
    const tag = `h${level}` as keyof JSX.IntrinsicElements

    return createElement(
      tag,
      {
        className: cn(headingVariants({ size: headingSize, variant, weight, className })),
        ref,
        ...props,
      },
      children
    )
  }
)

Heading.displayName = 'Heading'

// Convenient pre-configured heading components
const H1 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  ({ size = '5xl', weight = 'bold', ...props }, ref) => (
    <Heading ref={ref} level={1} size={size} weight={weight} {...props} />
  )
)
H1.displayName = 'H1'

const H2 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  ({ size = '4xl', weight = 'bold', ...props }, ref) => (
    <Heading ref={ref} level={2} size={size} weight={weight} {...props} />
  )
)
H2.displayName = 'H2'

const H3 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  ({ size = '3xl', weight = 'semibold', ...props }, ref) => (
    <Heading ref={ref} level={3} size={size} weight={weight} {...props} />
  )
)
H3.displayName = 'H3'

const H4 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  ({ size = '2xl', weight = 'semibold', ...props }, ref) => (
    <Heading ref={ref} level={4} size={size} weight={weight} {...props} />
  )
)
H4.displayName = 'H4'

const H5 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  ({ size = 'xl', weight = 'medium', ...props }, ref) => (
    <Heading ref={ref} level={5} size={size} weight={weight} {...props} />
  )
)
H5.displayName = 'H5'

const H6 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  ({ size = 'lg', weight = 'medium', ...props }, ref) => (
    <Heading ref={ref} level={6} size={size} weight={weight} {...props} />
  )
)
H6.displayName = 'H6'

// Special heading variants for marketing/hero sections
const HeroHeading = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  ({ 
    size = '6xl', 
    variant = 'gradient', 
    weight = 'bold', 
    className,
    ...props 
  }, ref) => (
    <Heading 
      ref={ref} 
      level={1} 
      size={size} 
      variant={variant} 
      weight={weight}
      className={cn('leading-tight', className)}
      {...props} 
    />
  )
)
HeroHeading.displayName = 'HeroHeading'

const SectionHeading = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  ({ 
    size = '4xl', 
    variant = 'default', 
    weight = 'bold', 
    className,
    ...props 
  }, ref) => (
    <Heading 
      ref={ref} 
      level={2} 
      size={size} 
      variant={variant} 
      weight={weight}
      className={cn('text-center mb-4', className)}
      {...props} 
    />
  )
)
SectionHeading.displayName = 'SectionHeading'

const SubsectionHeading = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  ({ 
    size = '2xl', 
    variant = 'default', 
    weight = 'semibold', 
    className,
    ...props 
  }, ref) => (
    <Heading 
      ref={ref} 
      level={3} 
      size={size} 
      variant={variant} 
      weight={weight}
      className={cn('mb-3', className)}
      {...props} 
    />
  )
)
SubsectionHeading.displayName = 'SubsectionHeading'

export { 
  Heading, 
  H1, 
  H2, 
  H3, 
  H4, 
  H5, 
  H6,
  HeroHeading,
  SectionHeading,
  SubsectionHeading,
  headingVariants 
}

export type { HeadingProps }
export type HeadingVariants = VariantProps<typeof headingVariants>