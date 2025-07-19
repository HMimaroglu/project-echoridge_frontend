'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ContainerProps } from '@/types'

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-none',
      },
      padding: {
        true: 'px-4 sm:px-6 lg:px-8',
        false: '',
      },
    },
    defaultVariants: {
      size: 'xl',
      padding: true,
    },
  }
)

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding = true, children, ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ size, padding, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

// Specialized container variants for common use cases
const Section = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & ContainerProps
>(({ className, size = 'xl', padding = true, children, ...props }, ref) => (
  <section
    ref={ref}
    className={cn('py-12 sm:py-16 lg:py-20', className)}
    {...props}
  >
    <Container size={size} padding={padding}>
      {children}
    </Container>
  </section>
))
Section.displayName = 'Section'

const Hero = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & ContainerProps
>(({ className, size = 'xl', padding = true, children, ...props }, ref) => (
  <section
    ref={ref}
    className={cn('py-20 sm:py-24 lg:py-32', className)}
    {...props}
  >
    <Container size={size} padding={padding}>
      {children}
    </Container>
  </section>
))
Hero.displayName = 'Hero'

const ContentSection = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ContainerProps
>(({ className, size = 'lg', padding = true, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('py-8 sm:py-12', className)}
    {...props}
  >
    <Container size={size} padding={padding}>
      {children}
    </Container>
  </div>
))
ContentSection.displayName = 'ContentSection'

// Grid container for layout
const GridContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    gap?: 'sm' | 'md' | 'lg' | 'xl'
    responsive?: boolean
  }
>(({ className, cols = 1, gap = 'md', responsive = true, children, ...props }, ref) => {
  const gridClasses = cn(
    'grid',
    {
      'grid-cols-1': cols === 1,
      'grid-cols-2': cols === 2,
      'grid-cols-3': cols === 3,
      'grid-cols-4': cols === 4,
      'grid-cols-5': cols === 5,
      'grid-cols-6': cols === 6,
      'grid-cols-12': cols === 12,
    },
    responsive && {
      'sm:grid-cols-2': cols >= 2,
      'md:grid-cols-3': cols >= 3,
      'lg:grid-cols-4': cols >= 4,
      'xl:grid-cols-5': cols >= 5,
      '2xl:grid-cols-6': cols >= 6,
    },
    {
      'gap-2': gap === 'sm',
      'gap-4': gap === 'md',
      'gap-6': gap === 'lg',
      'gap-8': gap === 'xl',
    },
    className
  )

  return (
    <div
      ref={ref}
      className={gridClasses}
      {...props}
    >
      {children}
    </div>
  )
})
GridContainer.displayName = 'GridContainer'

// Flex container for layout
const FlexContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
    wrap?: boolean
    gap?: 'sm' | 'md' | 'lg' | 'xl'
  }
>(({ 
  className, 
  direction = 'row', 
  justify = 'start', 
  align = 'start', 
  wrap = false,
  gap = 'md',
  children, 
  ...props 
}, ref) => {
  const flexClasses = cn(
    'flex',
    {
      'flex-row': direction === 'row',
      'flex-col': direction === 'col',
      'flex-row-reverse': direction === 'row-reverse',
      'flex-col-reverse': direction === 'col-reverse',
    },
    {
      'justify-start': justify === 'start',
      'justify-center': justify === 'center',
      'justify-end': justify === 'end',
      'justify-between': justify === 'between',
      'justify-around': justify === 'around',
      'justify-evenly': justify === 'evenly',
    },
    {
      'items-start': align === 'start',
      'items-center': align === 'center',
      'items-end': align === 'end',
      'items-baseline': align === 'baseline',
      'items-stretch': align === 'stretch',
    },
    wrap && 'flex-wrap',
    {
      'gap-2': gap === 'sm',
      'gap-4': gap === 'md',
      'gap-6': gap === 'lg',
      'gap-8': gap === 'xl',
    },
    className
  )

  return (
    <div
      ref={ref}
      className={flexClasses}
      {...props}
    >
      {children}
    </div>
  )
})
FlexContainer.displayName = 'FlexContainer'

export { 
  Container, 
  Section, 
  Hero, 
  ContentSection, 
  GridContainer, 
  FlexContainer,
  containerVariants 
}

export type { ContainerProps }
export type ContainerVariants = VariantProps<typeof containerVariants>