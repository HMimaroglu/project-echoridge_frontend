/**
 * UI Components Barrel Export
 * Centralized export for all UI components
 */

// Button
export { Button, buttonVariants } from './Button'
export type { ButtonProps, ButtonVariants } from './Button'

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from './Card'
export type { CardProps, CardVariants } from './Card'

// Container
export {
  Container,
  Section,
  Hero,
  ContentSection,
  GridContainer,
  FlexContainer,
  containerVariants,
} from './Container'
export type { ContainerProps, ContainerVariants } from './Container'

// Heading
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
  headingVariants,
} from './Heading'
export type { HeadingProps, HeadingVariants } from './Heading'

// Text
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
  textVariants,
} from './Text'
export type { TextProps, TextVariants } from './Text'

// Icon
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
  GithubIcon,
} from './Icon'
export type { IconProps, IconName } from './Icon'

// Input
export {
  Input,
  Textarea,
  Select,
  inputVariants,
} from './Input'
export type { InputProps, TextareaProps, SelectProps, InputVariants } from './Input'

// Skeleton
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
} from './Skeleton'
export type { SkeletonProps, SkeletonVariants } from './Skeleton'