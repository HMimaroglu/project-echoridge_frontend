'use client'

import { useEffect } from 'react'
import { 
  Section, 
  HeroHeading, 
  Text, 
  Button, 
  Card, 
  CardContent,
  AlertTriangleIcon,
  ArrowLeftIcon,
  RefreshCwIcon 
} from '@/components/ui'
import { StickyHeader, FullFooter } from '@/components/layout'
import { ErrorProps } from '@/types'
import { isDevelopment } from '@/lib/utils'

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
    
    // In production, you might want to send this to a service like Sentry
    if (!isDevelopment()) {
      // Example: Sentry.captureException(error)
    }
  }, [error])

  const handleReset = () => {
    // Clear any client-side state that might be causing issues
    try {
      // Clear localStorage items that might be corrupted
      const keysToRemove = ['theme', 'preferences', 'cache']
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key)
        } catch {
          // Ignore localStorage errors
        }
      })
    } catch {
      // Ignore if localStorage is not available
    }

    // Reset the error boundary
    reset()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <>
      <StickyHeader />
      
      <main id="main-content" className="flex-1">
        <Section className="min-h-[80vh] flex items-center">
          <div className="w-full max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-error-100 mb-6">
                <AlertTriangleIcon size="xl" className="text-error-600" />
              </div>
              
              <HeroHeading size="4xl" className="mb-4 text-neutral-900">
                Oops! Something went wrong
              </HeroHeading>
              
              <Text size="lg" variant="muted" className="mb-8">
                We encountered an unexpected error. Our team has been notified and is working to fix the issue.
              </Text>
            </div>

            {/* Error Details Card (only in development) */}
            {isDevelopment() && (
              <Card className="mb-8 text-left">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-error-600 mb-3">
                    Development Error Details
                  </h3>
                  <div className="bg-neutral-100 rounded-md p-4 overflow-auto">
                    <pre className="text-sm text-neutral-700 whitespace-pre-wrap">
                      <strong>Error:</strong> {error.message}
                      {error.stack && (
                        <>
                          <br />
                          <br />
                          <strong>Stack Trace:</strong>
                          <br />
                          {error.stack}
                        </>
                      )}
                      {error.digest && (
                        <>
                          <br />
                          <br />
                          <strong>Error ID:</strong> {error.digest}
                        </>
                      )}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button 
                size="lg" 
                onClick={handleReset}
                className="min-w-[140px]"
              >
                <RefreshCwIcon size="sm" />
                Try Again
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleRefresh}
                className="min-w-[140px]"
              >
                <RefreshCwIcon size="sm" />
                Refresh Page
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost" 
                onClick={handleGoHome}
                className="min-w-[140px]"
              >
                <ArrowLeftIcon size="sm" />
                Go Home
              </Button>
            </div>

            {/* Additional Help */}
            <div className="text-center">
              <Text size="sm" variant="muted" className="mb-4">
                If the problem persists, please contact our support team.
              </Text>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
                <a 
                  href="mailto:support@echoridge.dev" 
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  support@echoridge.dev
                </a>
                <span className="hidden sm:inline text-neutral-300">|</span>
                <a 
                  href="tel:+15551234567" 
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>

            {/* Common Solutions */}
            <Card className="mt-12 text-left">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Common Solutions
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></span>
                    <span>Check your internet connection and try refreshing the page</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></span>
                    <span>Clear your browser cache and cookies</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></span>
                    <span>Try accessing the site from a different browser or device</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></span>
                    <span>Disable browser extensions that might interfere with the site</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>
      
      <FullFooter />
    </>
  )
}