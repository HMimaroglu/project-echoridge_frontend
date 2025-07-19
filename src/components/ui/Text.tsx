'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { TextProps } from '@/types'

const textVariants = cva(
  'font-sans',
  {
    variants: {
      size: {
        xs: 'text-xs leading-4',
        sm: 'text-sm leading-5',
        base: 'text-base leading-6',
        lg: 'text-lg leading-7',
        xl: 'text-xl leading-8',
      },
      variant: {
        default: 'text-neutral-700',
        muted: 'text-neutral-600',
        accent: 'text-primary-600',
        error: 'text-error-600',
        success: 'text-success-600',
        warning: 'text-warning-600',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      truncate: {
        true: 'truncate',
        false: '',
      },
    },
    defaultVariants: {
      size: 'base',
      variant: 'default',
      weight: 'normal',
      align: 'left',
      truncate: false,
    },
  }
)

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ 
    className, 
    size = 'base', 
    variant = 'default', 
    weight = 'normal',
    align = 'left',
    truncate = false,
    children, 
    ...props 
  }, ref) => {
    return (
      <p
        className={cn(textVariants({ size, variant, weight, align, truncate, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    )
  }
)

Text.displayName = 'Text'

// Specialized text components for common use cases
const Lead = forwardRef<HTMLParagraphElement, Omit<TextProps, 'size'>>(
  ({ className, variant = 'muted', weight = 'normal', ...props }, ref) => (
    <Text
      ref={ref}
      size="lg"
      variant={variant}
      weight={weight}
      className={cn('leading-relaxed', className)}
      {...props}
    />
  )
)
Lead.displayName = 'Lead'

const Small = forwardRef<HTMLElement, Omit<TextProps, 'size'>>(
  ({ className, variant = 'muted', weight = 'normal', children, ...props }, ref) => (
    <small
      ref={ref}
      className={cn(textVariants({ size: 'sm', variant, weight, className }))}
      {...props}
    >
      {children}
    </small>
  )
)
Small.displayName = 'Small'

const Caption = forwardRef<HTMLParagraphElement, Omit<TextProps, 'size'>>(
  ({ className, variant = 'muted', weight = 'normal', ...props }, ref) => (
    <Text
      ref={ref}
      size="xs"
      variant={variant}
      weight={weight}
      className={cn('uppercase tracking-wide', className)}
      {...props}
    />
  )
)
Caption.displayName = 'Caption'

const Blockquote = forwardRef<HTMLQuoteElement, Omit<TextProps, 'size'>>(
  ({ className, variant = 'default', weight = 'medium', children, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        textVariants({ size: 'lg', variant, weight }),
        'border-l-4 border-primary-300 pl-6 italic',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  )
)
Blockquote.displayName = 'Blockquote'

const Code = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        'relative rounded bg-neutral-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-primary-600',
        className
      )}
      {...props}
    >
      {children}
    </code>
  )
)
Code.displayName = 'Code'

const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none text-neutral-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
)
Label.displayName = 'Label'

// Link component with proper styling
const Link = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'text-primary-600 underline-offset-4 transition-colors hover:text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
)
Link.displayName = 'Link'

// Utility text components
const ErrorText = forwardRef<HTMLParagraphElement, Omit<TextProps, 'variant'>>(
  ({ className, size = 'sm', ...props }, ref) => (
    <Text
      ref={ref}
      size={size}
      variant="error"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
)
ErrorText.displayName = 'ErrorText'

const SuccessText = forwardRef<HTMLParagraphElement, Omit<TextProps, 'variant'>>(
  ({ className, size = 'sm', ...props }, ref) => (
    <Text
      ref={ref}
      size={size}
      variant="success"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
)
SuccessText.displayName = 'SuccessText'

const WarningText = forwardRef<HTMLParagraphElement, Omit<TextProps, 'variant'>>(
  ({ className, size = 'sm', ...props }, ref) => (
    <Text
      ref={ref}
      size={size}
      variant="warning"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
)
WarningText.displayName = 'WarningText'

const MutedText = forwardRef<HTMLParagraphElement, Omit<TextProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      variant="muted"
      className={className}
      {...props}
    />
  )
)
MutedText.displayName = 'MutedText'

export { 
  Text, 
  Lead, 
  Small, 
  Caption, 
  Blockquote, 
  Code, 
  Label, 
  Link,
  ErrorText,
  SuccessText,
  WarningText,
  MutedText,
  textVariants 
}

export type { TextProps }
export type TextVariants = VariantProps<typeof textVariants>