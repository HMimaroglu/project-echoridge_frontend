import type { Metadata } from 'next'
import { HeroHeader } from '@/components/layout'
import { 
  HeroLanding,
  HowItWorks,
  Objectives,
  Benefits,
  Timeline,
  MainFooter
} from '@/components/sections'
import { COMPANY } from '@/lib/constants'

// Page metadata
export const metadata: Metadata = {
  title: 'Home',
  description: 'Revolutionary company-to-company search engine and AI product-market-fit calculator. Discover opportunities, validate ideas, and accelerate growth with Echo Ridge.',
  openGraph: {
    title: `${COMPANY.name} - ${COMPANY.tagline}`,
    description: 'Revolutionary company-to-company search engine and AI product-market-fit calculator. Discover opportunities, validate ideas, and accelerate growth with Echo Ridge.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroHeader />
      
      <main id="main-content" className="flex-1">
        <HeroLanding />
        <HowItWorks />
        <Objectives />
        <Benefits />
        <Timeline />
      </main>
      
      <MainFooter />
    </>
  )
}