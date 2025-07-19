import { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'

/**
 * Common utility types
 */
export type PropsWithChildren<P = {}> = P & { children?: ReactNode }

export type ElementSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ElementVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'

export type ElementState = 'default' | 'loading' | 'disabled' | 'error' | 'success'

/**
 * Component Props Types
 */

// Button Component Types
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  children: ReactNode
}

// Card Component Types
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hoverable?: boolean
  clickable?: boolean
  children: ReactNode
}

// Container Component Types
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
  children: ReactNode
}

// Heading Component Types
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  variant?: 'default' | 'gradient' | 'muted'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  children: ReactNode
}

// Text Component Types
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  variant?: 'default' | 'muted' | 'accent' | 'error' | 'success' | 'warning'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  children: ReactNode
}

// Icon Component Types
export interface IconProps {
  name: string
  size?: number | ElementSize
  className?: string
  color?: string
  strokeWidth?: number
}

// Skeleton Component Types
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  variant?: 'text' | 'rectangular' | 'circular'
  animation?: 'pulse' | 'wave' | 'none'
  lines?: number
}

/**
 * Navigation Types
 */
export interface NavigationItem {
  name: string
  href: string
  id: string
  external?: boolean
  disabled?: boolean
}

export interface NavigationSection {
  title: string
  links: NavigationItem[]
}

export interface SocialLink {
  name: string
  href: string
  icon: string
}

/**
 * Content Types
 */
export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  link?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  credentials: string[]
  specialties: string[]
  linkedin?: string
  email?: string
}

export interface Statistic {
  id: string
  label: string
  value: number
  format: 'number' | 'currency' | 'percentage'
  suffix?: string
  prefix?: string
}

export interface PerformanceData {
  year: number
  value: number
}

export interface AllocationData {
  category: string
  value: number
  color: string
}

export interface ChartData {
  id: string
  title: string
  subtitle?: string
  data: PerformanceData[] | AllocationData[]
}

/**
 * Form Types
 */
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  consent: boolean
}

export interface NewsletterFormData {
  email: string
  firstName?: string
  lastName?: string
}

export interface ConsultationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  investmentAmount: string
  investmentGoals: string[]
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  timeHorizon: string
  preferredDate: string
  additionalNotes?: string
}

/**
 * API Response Types
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ContactResponse {
  id: string
  timestamp: string
  status: 'received' | 'processing' | 'completed'
}

export interface PerformanceResponse {
  portfolioData: PerformanceData[]
  allocationData: AllocationData[]
  benchmarkData?: PerformanceData[]
  lastUpdated: string
}

/**
 * Layout Types
 */
export interface LayoutProps {
  children: ReactNode
}

export interface HeaderProps {
  transparent?: boolean
  fixed?: boolean
}

export interface FooterProps {
  minimal?: boolean
}

/**
 * SEO Types
 */
export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export interface OpenGraphProps {
  title: string
  description: string
  url: string
  type: 'website' | 'article'
  images: {
    url: string
    width: number
    height: number
    alt: string
  }[]
  siteName: string
}

export interface TwitterProps {
  card: 'summary' | 'summary_large_image'
  site: string
  creator: string
  title: string
  description: string
  image: string
}

/**
 * Animation Types
 */
export interface AnimationProps {
  delay?: number
  duration?: number
  easing?: string
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  iterationCount?: number | 'infinite'
  playState?: 'running' | 'paused'
}

export interface IntersectionObserverProps {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  skip?: boolean
}

/**
 * Theme Types
 */
export interface Theme {
  colors: {
    primary: Record<number, string>
    secondary: Record<number, string>
    accent: Record<number, string>
    neutral: Record<number, string>
    success: Record<number, string>
    warning: Record<number, string>
    error: Record<number, string>
  }
  fonts: {
    sans: string[]
    serif: string[]
    mono: string[]
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
  breakpoints: Record<string, number>
}

/**
 * Error Types
 */
export interface ErrorInfo {
  componentStack: string
  errorBoundary?: string
}

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Loading Types
 */
export interface LoadingProps {
  size?: ElementSize
  variant?: 'spinner' | 'dots' | 'bars' | 'skeleton'
  text?: string
  fullScreen?: boolean
}

/**
 * Utility Types
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Required<T, K extends keyof T> = T & {
  [P in K]-?: T[P]
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

/**
 * Event Types
 */
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
export type KeyboardHandler = (event: React.KeyboardEvent<HTMLElement>) => void

/**
 * Generic Component Types
 */
export interface ComponentWithVariants<T> {
  variants: T
  defaultVariants?: Partial<T>
}

export type ComponentVariants<T> = VariantProps<T>

/**
 * Feature Flag Types
 */
export interface FeatureFlags {
  analytics: boolean
  chatbot: boolean
  newsletter: boolean
  darkMode: boolean
  experimentalFeatures: boolean
}

/**
 * Environment Types
 */
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test'
  NEXT_PUBLIC_SITE_URL: string
  NEXT_PUBLIC_API_URL: string
  NEXT_PUBLIC_ENABLE_ANALYTICS: string
  NEXT_PUBLIC_ENABLE_CHATBOT: string
  NEXT_PUBLIC_ENABLE_NEWSLETTER: string
  NEXT_PUBLIC_ENABLE_DARK_MODE: string
}

/**
 * Re-export commonly used types from React
 */
export type {
  ReactNode,
  ReactElement,
  FC,
  ComponentProps,
  ComponentType,
  RefObject,
  MutableRefObject,
  CSSProperties,
} from 'react'