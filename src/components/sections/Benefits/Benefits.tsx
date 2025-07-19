/**
 * Benefits Section Component
 * Main section showcasing platform benefits for different user types
 */

import React from 'react'
import { Section, SectionHeading, Lead, Button, ArrowRightIcon } from '@/components/ui'
import { BenefitsList } from './BenefitsList'
import { BENEFITS } from '@/lib/constants'

interface BenefitsProps {
  className?: string
}

export const Benefits: React.FC<BenefitsProps> = ({ className = '' }) => {
  return (
    <Section className={`bg-neutral-50 ${className}`}>
      <div className="text-center mb-16">
        <SectionHeading>
          Built for Every Business Need
        </SectionHeading>
        <Lead className="max-w-3xl mx-auto">
          From small development teams to large enterprises, Echo Ridge delivers value 
          across the entire business ecosystem with tailored solutions for every use case.
        </Lead>
      </div>

      {/* Benefits Grid */}
      <BenefitsList benefits={BENEFITS.map(b => ({ ...b, benefits: [...b.benefits] }))} />

      {/* Call-to-Action Section */}
      <div className="mt-16">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Business Intelligence?
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of businesses already using Echo Ridge to discover opportunities, 
            validate ideas, and accelerate growth through data-driven insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
              Start Free Trial
              <ArrowRightIcon size="sm" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-primary-200">
            No credit card required • 14-day free trial • Cancel anytime
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <h4 className="text-lg font-semibold text-navy-900 mb-2">AI-Powered Intelligence</h4>
          <p className="text-neutral-600 text-sm">
            Advanced machine learning algorithms provide accurate market insights and predictions.
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">24/7</span>
          </div>
          <h4 className="text-lg font-semibold text-navy-900 mb-2">Always Available</h4>
          <p className="text-neutral-600 text-sm">
            Real-time data processing and instant insights available around the clock.
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">∞</span>
          </div>
          <h4 className="text-lg font-semibold text-navy-900 mb-2">Scalable Solutions</h4>
          <p className="text-neutral-600 text-sm">
            Grows with your business from startup to enterprise-level operations.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default Benefits