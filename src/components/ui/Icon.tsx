'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { IconProps, ElementSize } from '@/types'
import * as LucideIcons from 'lucide-react'

// Size mapping for icons
const sizeMap: Record<ElementSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
}

// Common icon names type for better TypeScript support
export type IconName = keyof typeof LucideIcons

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 'md', className, color, strokeWidth = 2, ...props }, ref) => {
    // Get the icon size
    const iconSize = typeof size === 'number' ? size : sizeMap[size]
    
    // Dynamically get the icon component from Lucide
    const IconComponent = LucideIcons[name as IconName] as React.ComponentType<any>
    
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in Lucide React`)
      return null
    }

    return (
      <IconComponent
        ref={ref}
        size={iconSize}
        color={color}
        strokeWidth={strokeWidth}
        className={cn('inline-block', className)}
        aria-hidden="true"
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'

// Predefined common icons for easy use
const ChevronDownIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="ChevronDown" {...props} />
)
ChevronDownIcon.displayName = 'ChevronDownIcon'

const ChevronUpIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="ChevronUp" {...props} />
)
ChevronUpIcon.displayName = 'ChevronUpIcon'

const ChevronLeftIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="ChevronLeft" {...props} />
)
ChevronLeftIcon.displayName = 'ChevronLeftIcon'

const ChevronRightIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="ChevronRight" {...props} />
)
ChevronRightIcon.displayName = 'ChevronRightIcon'

const MenuIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Menu" {...props} />
)
MenuIcon.displayName = 'MenuIcon'

const XIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="X" {...props} />
)
XIcon.displayName = 'XIcon'

const ExternalLinkIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="ExternalLink" {...props} />
)
ExternalLinkIcon.displayName = 'ExternalLinkIcon'

const ArrowRightIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="ArrowRight" {...props} />
)
ArrowRightIcon.displayName = 'ArrowRightIcon'

const ArrowLeftIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="ArrowLeft" {...props} />
)
ArrowLeftIcon.displayName = 'ArrowLeftIcon'

const CheckIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Check" {...props} />
)
CheckIcon.displayName = 'CheckIcon'

const StarIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Star" {...props} />
)
StarIcon.displayName = 'StarIcon'

const HeartIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Heart" {...props} />
)
HeartIcon.displayName = 'HeartIcon'

const SearchIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Search" {...props} />
)
SearchIcon.displayName = 'SearchIcon'

const UserIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="User" {...props} />
)
UserIcon.displayName = 'UserIcon'

const MailIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Mail" {...props} />
)
MailIcon.displayName = 'MailIcon'

const PhoneIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Phone" {...props} />
)
PhoneIcon.displayName = 'PhoneIcon'

const MapPinIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="MapPin" {...props} />
)
MapPinIcon.displayName = 'MapPinIcon'

const CalendarIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Calendar" {...props} />
)
CalendarIcon.displayName = 'CalendarIcon'

const ClockIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Clock" {...props} />
)
ClockIcon.displayName = 'ClockIcon'

// Business/Finance specific icons
const TrendingUpIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="TrendingUp" {...props} />
)
TrendingUpIcon.displayName = 'TrendingUpIcon'

const TrendingDownIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="TrendingDown" {...props} />
)
TrendingDownIcon.displayName = 'TrendingDownIcon'

const DollarSignIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="DollarSign" {...props} />
)
DollarSignIcon.displayName = 'DollarSignIcon'

const PieChartIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="PieChart" {...props} />
)
PieChartIcon.displayName = 'PieChartIcon'

const BarChartIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="BarChart3" {...props} />
)
BarChartIcon.displayName = 'BarChartIcon'

const LineChartIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="LineChart" {...props} />
)
LineChartIcon.displayName = 'LineChartIcon'

const ShieldIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Shield" {...props} />
)
ShieldIcon.displayName = 'ShieldIcon'

const CalculatorIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Calculator" {...props} />
)
CalculatorIcon.displayName = 'CalculatorIcon'

const BriefcaseIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Briefcase" {...props} />
)
BriefcaseIcon.displayName = 'BriefcaseIcon'

const BuildingIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Building" {...props} />
)
BuildingIcon.displayName = 'BuildingIcon'

// Social media icons
const LinkedinIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Linkedin" {...props} />
)
LinkedinIcon.displayName = 'LinkedinIcon'

const TwitterIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Twitter" {...props} />
)
TwitterIcon.displayName = 'TwitterIcon'

const FacebookIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Facebook" {...props} />
)
FacebookIcon.displayName = 'FacebookIcon'

const GithubIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Github" {...props} />
)
GithubIcon.displayName = 'GithubIcon'

const InstagramIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Instagram" {...props} />
)
InstagramIcon.displayName = 'InstagramIcon'

// Status icons
const AlertCircleIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="AlertCircle" {...props} />
)
AlertCircleIcon.displayName = 'AlertCircleIcon'

const CheckCircleIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="CheckCircle" {...props} />
)
CheckCircleIcon.displayName = 'CheckCircleIcon'

const InfoIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Info" {...props} />
)
InfoIcon.displayName = 'InfoIcon'

const AlertTriangleIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="AlertTriangle" {...props} />
)
AlertTriangleIcon.displayName = 'AlertTriangleIcon'

const LoaderIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Loader2" {...props} />
)
LoaderIcon.displayName = 'LoaderIcon'

const RefreshCwIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="RefreshCw" {...props} />
)
RefreshCwIcon.displayName = 'RefreshCwIcon'

const BookOpenIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="BookOpen" {...props} />
)
BookOpenIcon.displayName = 'BookOpenIcon'

const HomeIcon = forwardRef<SVGSVGElement, Omit<IconProps, 'name'>>(
  (props, ref) => <Icon ref={ref} name="Home" {...props} />
)
HomeIcon.displayName = 'HomeIcon'

export {
  Icon,
  // Navigation
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  // General
  CheckIcon,
  StarIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  // Business/Finance
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  PieChartIcon,
  BarChartIcon,
  LineChartIcon,
  ShieldIcon,
  CalculatorIcon,
  BriefcaseIcon,
  BuildingIcon,
  // Social
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  // Status
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  AlertTriangleIcon,
  LoaderIcon,
  RefreshCwIcon,
  BookOpenIcon,
  HomeIcon,
}

export type { IconProps }