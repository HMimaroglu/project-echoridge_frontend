/**
 * Input Component
 * Flexible input component with validation, icons, and various states
 */

'use client'

import React, { forwardRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon } from './Icon'

const inputVariants = cva(
  'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-gray-50 border-gray-200 focus-visible:bg-white',
        outlined: 'bg-transparent border-2',
        ghost: 'border-transparent bg-gray-50 focus-visible:border-gray-300 focus-visible:bg-white',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      state: {
        default: '',
        error: 'border-red-500 focus-visible:ring-red-500 text-red-900 placeholder:text-red-300',
        success: 'border-green-500 focus-visible:ring-green-500 text-green-900',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500 text-yellow-900',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
)

const labelVariants = cva(
  'block text-sm font-medium leading-6',
  {
    variants: {
      state: {
        default: 'text-gray-900',
        error: 'text-red-900',
        success: 'text-green-900',
        warning: 'text-yellow-900',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
)

const helperTextVariants = cva(
  'mt-1 text-xs',
  {
    variants: {
      state: {
        default: 'text-gray-600',
        error: 'text-red-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: string
  rightIcon?: string
  onLeftIconClick?: () => void
  onRightIconClick?: () => void
  loading?: boolean
  showPasswordToggle?: boolean
  clearable?: boolean
  onClear?: () => void
  containerClassName?: string
  labelClassName?: string
  helperTextClassName?: string
}

export { inputVariants, labelVariants, helperTextVariants }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      type = 'text',
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      onLeftIconClick,
      onRightIconClick,
      loading,
      showPasswordToggle,
      clearable,
      onClear,
      containerClassName,
      labelClassName,
      helperTextClassName,
      disabled,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [internalId] = useState(() => id || `input-${Math.random().toString(36).substr(2, 9)}`)

    // Determine the actual input type
    const inputType = type === 'password' && showPassword ? 'text' : type

    // Determine state based on error
    const actualState = error ? 'error' : state

    // Show clear button if clearable and has value
    const showClear = clearable && value && !disabled && !loading

    // Show password toggle if it's a password input and showPasswordToggle is true
    const showPasswordToggleButton = type === 'password' && showPasswordToggle

    // Calculate right icon
    let computedRightIcon = rightIcon
    if (loading) {
      computedRightIcon = 'loader'
    } else if (showClear) {
      computedRightIcon = 'x'
    } else if (showPasswordToggleButton) {
      computedRightIcon = showPassword ? 'eye-off' : 'eye'
    }

    const handleRightIconClick = () => {
      if (loading) return

      if (showClear) {
        onClear?.()
      } else if (showPasswordToggleButton) {
        setShowPassword(!showPassword)
      } else {
        onRightIconClick?.()
      }
    }

    const inputElement = (
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon
              name={leftIcon}
              size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
              className={cn(
                'text-gray-400',
                onLeftIconClick && 'cursor-pointer hover:text-gray-600',
                actualState === 'error' && 'text-red-400',
                actualState === 'success' && 'text-green-400',
                actualState === 'warning' && 'text-yellow-400'
              )}
              onClick={onLeftIconClick}
            />
          </div>
        )}

        <input
          type={inputType}
          className={cn(
            inputVariants({ variant, size, state: actualState }),
            leftIcon && 'pl-10',
            computedRightIcon && 'pr-10',
            className
          )}
          ref={ref}
          disabled={disabled || loading}
          value={value}
          id={internalId}
          aria-invalid={actualState === 'error'}
          aria-describedby={
            error ? `${internalId}-error` : helperText ? `${internalId}-helper` : undefined
          }
          {...props}
        />

        {computedRightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Icon
              name={computedRightIcon}
              size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
              className={cn(
                'text-gray-400',
                (onRightIconClick || showClear || showPasswordToggleButton) && 
                  'cursor-pointer hover:text-gray-600',
                loading && 'animate-spin',
                actualState === 'error' && 'text-red-400',
                actualState === 'success' && 'text-green-400',
                actualState === 'warning' && 'text-yellow-400'
              )}
              onClick={handleRightIconClick}
            />
          </div>
        )}
      </div>
    )

    if (label || error || helperText) {
      return (
        <div className={cn('space-y-1', containerClassName)}>
          {label && (
            <label
              htmlFor={internalId}
              className={cn(labelVariants({ state: actualState }), labelClassName)}
            >
              {label}
            </label>
          )}
          {inputElement}
          {error && (
            <p
              id={`${internalId}-error`}
              className={cn(helperTextVariants({ state: 'error' }), helperTextClassName)}
              role="alert"
            >
              {error}
            </p>
          )}
          {!error && helperText && (
            <p
              id={`${internalId}-helper`}
              className={cn(helperTextVariants({ state: actualState }), helperTextClassName)}
            >
              {helperText}
            </p>
          )}
        </div>
      )
    }

    return inputElement
  }
)

Input.displayName = 'Input'

// Textarea component with similar API
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  loading?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  containerClassName?: string
  labelClassName?: string
  helperTextClassName?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      state,
      label,
      helperText,
      error,
      loading,
      resize = 'vertical',
      containerClassName,
      labelClassName,
      helperTextClassName,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [internalId] = useState(() => id || `textarea-${Math.random().toString(36).substr(2, 9)}`)

    // Determine state based on error
    const actualState = error ? 'error' : state

    const textareaElement = (
      <textarea
        className={cn(
          inputVariants({ variant, state: actualState }),
          'min-h-[80px]',
          resize === 'none' && 'resize-none',
          resize === 'vertical' && 'resize-y',
          resize === 'horizontal' && 'resize-x',
          resize === 'both' && 'resize',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        id={internalId}
        aria-invalid={actualState === 'error'}
        aria-describedby={
          error ? `${internalId}-error` : helperText ? `${internalId}-helper` : undefined
        }
        {...props}
      />
    )

    if (label || error || helperText) {
      return (
        <div className={cn('space-y-1', containerClassName)}>
          {label && (
            <label
              htmlFor={internalId}
              className={cn(labelVariants({ state: actualState }), labelClassName)}
            >
              {label}
            </label>
          )}
          {textareaElement}
          {error && (
            <p
              id={`${internalId}-error`}
              className={cn(helperTextVariants({ state: 'error' }), helperTextClassName)}
              role="alert"
            >
              {error}
            </p>
          )}
          {!error && helperText && (
            <p
              id={`${internalId}-helper`}
              className={cn(helperTextVariants({ state: actualState }), helperTextClassName)}
            >
              {helperText}
            </p>
          )}
        </div>
      )
    }

    return textareaElement
  }
)

Textarea.displayName = 'Textarea'

// Select component
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  placeholder?: string
  loading?: boolean
  containerClassName?: string
  labelClassName?: string
  helperTextClassName?: string
  options?: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      state,
      label,
      helperText,
      error,
      placeholder,
      loading,
      containerClassName,
      labelClassName,
      helperTextClassName,
      disabled,
      children,
      options,
      id,
      ...props
    },
    ref
  ) => {
    const [internalId] = useState(() => id || `select-${Math.random().toString(36).substr(2, 9)}`)

    // Determine state based on error
    const actualState = error ? 'error' : state

    const selectElement = (
      <select
        className={cn(
          inputVariants({ variant, state: actualState }),
          'bg-white cursor-pointer',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        id={internalId}
        aria-invalid={actualState === 'error'}
        aria-describedby={
          error ? `${internalId}-error` : helperText ? `${internalId}-helper` : undefined
        }
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))
          : children}
      </select>
    )

    if (label || error || helperText) {
      return (
        <div className={cn('space-y-1', containerClassName)}>
          {label && (
            <label
              htmlFor={internalId}
              className={cn(labelVariants({ state: actualState }), labelClassName)}
            >
              {label}
            </label>
          )}
          {selectElement}
          {error && (
            <p
              id={`${internalId}-error`}
              className={cn(helperTextVariants({ state: 'error' }), helperTextClassName)}
              role="alert"
            >
              {error}
            </p>
          )}
          {!error && helperText && (
            <p
              id={`${internalId}-helper`}
              className={cn(helperTextVariants({ state: actualState }), helperTextClassName)}
            >
              {helperText}
            </p>
          )}
        </div>
      )
    }

    return selectElement
  }
)

Select.displayName = 'Select'

// Export types
export type { VariantProps }
export type InputVariants = VariantProps<typeof inputVariants>