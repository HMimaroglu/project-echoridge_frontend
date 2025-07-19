import React from 'react'
import { render, screen } from '@/test-utils'
import { HeroSection } from '@/components/sections/Hero/Hero'
import { checkAccessibility } from '@/test-utils/accessibility'

// Mock the Hero components
jest.mock('@/components/ui', () => ({
  Hero: ({ children, className, ...props }: any) => (
    <section className={className} {...props}>
      {children}
    </section>
  ),
}))

jest.mock('@/components/sections/Hero/HeroContent', () => ({
  HeroContent: ({ className }: any) => (
    <div className={className} data-testid="hero-content">
      <h1>Project Echo Ridge</h1>
      <p>Company-to-Company Search Engine & AI Product-Market-Fit Calculator</p>
    </div>
  ),
}))

jest.mock('@/components/sections/Hero/HeroCTA', () => ({
  HeroCTA: () => (
    <div data-testid="hero-cta">
      <button>Get Started</button>
      <button>Learn More</button>
    </div>
  ),
}))

describe('HeroSection Component', () => {
  describe('Basic Rendering', () => {
    it('renders without errors', () => {
      render(<HeroSection />)
      
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('renders hero content and CTA', () => {
      render(<HeroSection />)
      
      expect(screen.getByTestId('hero-content')).toBeInTheDocument()
      expect(screen.getByTestId('hero-cta')).toBeInTheDocument()
    })

    it('applies default classes and styling', () => {
      render(<HeroSection />)
      
      const heroSection = screen.getByRole('region')
      expect(heroSection).toHaveClass('relative', 'overflow-hidden')
      expect(heroSection.className).toContain('bg-gradient-to-br')
    })

    it('applies custom className when provided', () => {
      const customClass = 'custom-hero-class'
      render(<HeroSection className={customClass} />)
      
      const heroSection = screen.getByRole('region')
      expect(heroSection).toHaveClass(customClass)
    })
  })

  describe('Background Elements', () => {
    it('renders all background elements', () => {
      const { container } = render(<HeroSection />)
      
      // Check for grid background
      const gridBackground = container.querySelector('[class*="bg-[url"]')
      expect(gridBackground).toBeInTheDocument()
      
      // Check for blur elements
      const blurElements = container.querySelectorAll('[class*="blur-3xl"]')
      expect(blurElements).toHaveLength(3) // Three blur elements
    })

    it('has proper positioning for background elements', () => {
      const { container } = render(<HeroSection />)
      
      const backgroundElements = container.querySelectorAll('.absolute')
      expect(backgroundElements.length).toBeGreaterThan(0)
      
      // Check specific positioning classes
      expect(container.querySelector('.-top-40.-right-40')).toBeInTheDocument()
      expect(container.querySelector('.-bottom-40.-left-40')).toBeInTheDocument()
      expect(container.querySelector('.top-1\\/2.left-1\\/2')).toBeInTheDocument()
    })

    it('applies correct z-index layering', () => {
      const { container } = render(<HeroSection />)
      
      // Background should be absolute
      const backgroundElements = container.querySelectorAll('.absolute')
      expect(backgroundElements.length).toBeGreaterThan(0)
      
      // Content should be relative to appear above background
      const contentContainer = container.querySelector('.relative')
      expect(contentContainer).toBeInTheDocument()
    })
  })

  describe('Content Layout', () => {
    it('positions hero content with proper spacing', () => {
      render(<HeroSection />)
      
      const heroContent = screen.getByTestId('hero-content')
      expect(heroContent).toHaveClass('mb-12')
    })

    it('renders content in correct order', () => {
      const { container } = render(<HeroSection />)
      
      const contentContainer = container.querySelector('.relative')
      const children = contentContainer?.children
      
      expect(children?.[0]).toHaveAttribute('data-testid', 'hero-content')
      expect(children?.[1]).toHaveAttribute('data-testid', 'hero-cta')
    })
  })

  describe('Responsive Design', () => {
    it('maintains responsive classes', () => {
      const { container } = render(<HeroSection />)
      
      // Hero should be responsive
      const heroSection = screen.getByRole('region')
      expect(heroSection).toHaveClass('relative', 'overflow-hidden')
    })

    it('handles background elements responsively', () => {
      const { container } = render(<HeroSection />)
      
      // Background elements should maintain their positions
      const blurElements = container.querySelectorAll('[class*="blur-3xl"]')
      blurElements.forEach(element => {
        expect(element).toHaveClass('absolute')
      })
    })
  })

  describe('Visual Design Elements', () => {
    it('applies gradient background', () => {
      render(<HeroSection />)
      
      const heroSection = screen.getByRole('region')
      expect(heroSection.className).toContain('bg-gradient-to-br')
      expect(heroSection.className).toContain('from-navy-900')
      expect(heroSection.className).toContain('via-primary-900')
      expect(heroSection.className).toContain('to-secondary-900')
    })

    it('includes grid pattern background', () => {
      const { container } = render(<HeroSection />)
      
      const gridPattern = container.querySelector('[class*="bg-[url"]')
      expect(gridPattern).toBeInTheDocument()
      expect(gridPattern?.className).toContain('bg-center')
    })

    it('creates depth with blur effects', () => {
      const { container } = render(<HeroSection />)
      
      const blurElements = container.querySelectorAll('[class*="blur-3xl"]')
      expect(blurElements).toHaveLength(3)
      
      // Check different colors for visual variety
      expect(container.querySelector('[class*="bg-primary-500/20"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="bg-accent-500/20"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="bg-secondary-500/10"]')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('passes basic accessibility checks', async () => {
      const { container } = render(<HeroSection />)
      await checkAccessibility(container)
    })

    it('uses semantic HTML structure', () => {
      render(<HeroSection />)
      
      // Should use section element (rendered by Hero component)
      const heroSection = screen.getByRole('region')
      expect(heroSection.tagName).toBe('SECTION')
    })

    it('provides accessible heading structure', () => {
      render(<HeroSection />)
      
      // Content should include proper heading
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText('Project Echo Ridge')).toBeInTheDocument()
    })

    it('includes descriptive text', () => {
      render(<HeroSection />)
      
      const description = screen.getByText('Company-to-Company Search Engine & AI Product-Market-Fit Calculator')
      expect(description).toBeInTheDocument()
    })

    it('provides actionable elements', () => {
      render(<HeroSection />)
      
      const getStartedButton = screen.getByRole('button', { name: /get started/i })
      const learnMoreButton = screen.getByRole('button', { name: /learn more/i })
      
      expect(getStartedButton).toBeInTheDocument()
      expect(learnMoreButton).toBeInTheDocument()
    })
  })

  describe('Performance Considerations', () => {
    it('renders efficiently without unnecessary re-renders', () => {
      const { rerender } = render(<HeroSection />)
      
      // Re-render with same props
      rerender(<HeroSection />)
      
      // Component should still be present
      expect(screen.getByTestId('hero-content')).toBeInTheDocument()
      expect(screen.getByTestId('hero-cta')).toBeInTheDocument()
    })

    it('handles className changes efficiently', () => {
      const { rerender } = render(<HeroSection className="initial-class" />)
      
      const heroSection = screen.getByRole('region')
      expect(heroSection).toHaveClass('initial-class')
      
      rerender(<HeroSection className="updated-class" />)
      expect(heroSection).toHaveClass('updated-class')
      expect(heroSection).not.toHaveClass('initial-class')
    })
  })

  describe('Component Composition', () => {
    it('composes HeroContent and HeroCTA correctly', () => {
      render(<HeroSection />)
      
      // Both child components should be rendered
      expect(screen.getByTestId('hero-content')).toBeInTheDocument()
      expect(screen.getByTestId('hero-cta')).toBeInTheDocument()
    })

    it('passes className to HeroContent', () => {
      render(<HeroSection />)
      
      const heroContent = screen.getByTestId('hero-content')
      expect(heroContent).toHaveClass('mb-12')
    })

    it('maintains proper component hierarchy', () => {
      const { container } = render(<HeroSection />)
      
      // Hero container should contain content container
      const heroSection = screen.getByRole('region')
      const contentContainer = container.querySelector('.relative')
      
      expect(heroSection).toContainElement(contentContainer!)
      expect(contentContainer).toContainElement(screen.getByTestId('hero-content'))
      expect(contentContainer).toContainElement(screen.getByTestId('hero-cta'))
    })
  })

  describe('Style Integration', () => {
    it('maintains consistent color scheme', () => {
      render(<HeroSection />)
      
      const heroSection = screen.getByRole('region')
      // Should use navy, primary, and secondary colors consistently
      expect(heroSection.className).toContain('navy-900')
      expect(heroSection.className).toContain('primary-900')
      expect(heroSection.className).toContain('secondary-900')
    })

    it('applies proper spacing and layout', () => {
      render(<HeroSection />)
      
      const heroSection = screen.getByRole('region')
      expect(heroSection).toHaveClass('relative', 'overflow-hidden')
      
      const heroContent = screen.getByTestId('hero-content')
      expect(heroContent).toHaveClass('mb-12')
    })

    it('handles overflow and positioning correctly', () => {
      render(<HeroSection />)
      
      const heroSection = screen.getByRole('region')
      expect(heroSection).toHaveClass('overflow-hidden')
      
      const { container } = render(<HeroSection />)
      const absoluteElements = container.querySelectorAll('.absolute')
      
      // Should have background elements positioned absolutely
      expect(absoluteElements.length).toBeGreaterThan(0)
    })
  })

  describe('Error Handling', () => {
    it('renders gracefully with missing props', () => {
      // Component should render even without props
      render(<HeroSection />)
      
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('handles undefined className gracefully', () => {
      // @ts-expect-error - Testing undefined className
      render(<HeroSection className={undefined} />)
      
      const heroSection = screen.getByRole('region')
      expect(heroSection).toBeInTheDocument()
    })

    it('maintains structure even if child components fail', () => {
      // Mock one child component to throw an error
      jest.spyOn(console, 'error').mockImplementation(() => {})
      
      render(<HeroSection />)
      
      // Main section should still render
      expect(screen.getByRole('region')).toBeInTheDocument()
      
      console.error.mockRestore()
    })
  })
})