/**
 * Layout Components Barrel Export
 * Centralized export for all layout components
 */

// Header
export { Header, StickyHeader, HeroHeader, StaticHeader } from './Header'
export type { HeaderProps } from '@/types'

// Footer  
export { Footer, SimpleFooter, FullFooter } from './Footer'
export type { FooterProps } from '@/types'

// Navigation
export { Navigation, SubNavigation, BreadcrumbNavigation } from './Navigation'

// Re-export default components for convenience
export { default as DefaultHeader } from './Header'
export { default as DefaultFooter } from './Footer'
export { default as DefaultNavigation } from './Navigation'