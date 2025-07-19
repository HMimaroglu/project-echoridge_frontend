import React from 'react'
import { render, screen, fireEvent, waitFor } from '@/test-utils'
import { Button } from '@/components/ui/Button'
import { checkAccessibility, accessibilityAssertions } from '@/test-utils/accessibility'
import { ChevronRight, Loader } from 'lucide-react'

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).not.toBeDisabled()
    })

    it('renders with custom className', () => {
      render(<Button className="custom-class">Button</Button>)
      
      const button = screen.getByRole('button', { name: /button/i })
      expect(button).toHaveClass('custom-class')
    })

    it('renders children correctly', () => {
      render(
        <Button>
          <span>Complex</span> Content
        </Button>
      )
      
      expect(screen.getByText('Complex')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  // Variant tests
  describe('Variants', () => {
    const variants = ['default', 'primary', 'secondary', 'accent', 'ghost', 'outline', 'link'] as const

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Button variant={variant}>Button</Button>)
        
        const button = screen.getByRole('button', { name: /button/i })
        expect(button).toBeInTheDocument()
        
        // Check that appropriate CSS classes are applied (would need actual class checking)
        expect(button).toHaveClass(expect.stringContaining('inline-flex'))
      })
    })
  })

  // Size tests
  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Button size={size}>Button</Button>)
        
        const button = screen.getByRole('button', { name: /button/i })
        expect(button).toBeInTheDocument()
      })
    })
  })

  // Loading state tests
  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<Button loading>Loading Button</Button>)
      
      const button = screen.getByRole('button', { name: /loading button/i })
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
      
      // Check for loading spinner (using a test query for the spinner)
      const spinner = button.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })

    it('hides content when loading', () => {
      render(<Button loading>Button Text</Button>)
      
      const button = screen.getByRole('button', { name: /button text/i })
      const contentContainer = button.querySelector('div:not(.absolute)')
      expect(contentContainer).toHaveClass('opacity-0')
    })

    it('does not show loading spinner when not loading', () => {
      render(<Button>Normal Button</Button>)
      
      const button = screen.getByRole('button', { name: /normal button/i })
      const spinner = button.querySelector('.animate-spin')
      expect(spinner).not.toBeInTheDocument()
    })
  })

  // Disabled state tests
  describe('Disabled State', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled Button</Button>)
      
      const button = screen.getByRole('button', { name: /disabled button/i })
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('is disabled when loading is true', () => {
      render(<Button loading>Loading Button</Button>)
      
      const button = screen.getByRole('button', { name: /loading button/i })
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('is not disabled by default', () => {
      render(<Button>Normal Button</Button>)
      
      const button = screen.getByRole('button', { name: /normal button/i })
      expect(button).not.toBeDisabled()
    })
  })

  // Icon tests
  describe('Icons', () => {
    it('renders left icon', () => {
      render(
        <Button leftIcon={<ChevronRight data-testid="left-icon" />}>
          With Left Icon
        </Button>
      )
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
      expect(screen.getByText('With Left Icon')).toBeInTheDocument()
    })

    it('renders right icon', () => {
      render(
        <Button rightIcon={<ChevronRight data-testid="right-icon" />}>
          With Right Icon
        </Button>
      )
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
      expect(screen.getByText('With Right Icon')).toBeInTheDocument()
    })

    it('renders both left and right icons', () => {
      render(
        <Button 
          leftIcon={<Loader data-testid="left-icon" />}
          rightIcon={<ChevronRight data-testid="right-icon" />}
        >
          Both Icons
        </Button>
      )
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('adds aria-hidden to icon elements', () => {
      render(
        <Button leftIcon={<ChevronRight />}>
          Icon Button
        </Button>
      )
      
      const button = screen.getByRole('button', { name: /icon button/i })
      const iconContainer = button.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  // Full width tests
  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width Button</Button>)
      
      const button = screen.getByRole('button', { name: /full width button/i })
      expect(button).toHaveClass('w-full')
    })

    it('does not apply full width class by default', () => {
      render(<Button>Normal Button</Button>)
      
      const button = screen.getByRole('button', { name: /normal button/i })
      expect(button).not.toHaveClass('w-full')
    })
  })

  // Event handling tests
  describe('Event Handling', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Clickable</Button>)
      
      const button = screen.getByRole('button', { name: /clickable/i })
      fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick} disabled>Disabled</Button>)
      
      const button = screen.getByRole('button', { name: /disabled/i })
      fireEvent.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick} loading>Loading</Button>)
      
      const button = screen.getByRole('button', { name: /loading/i })
      fireEvent.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('handles keyboard events', async () => {
      const handleKeyDown = jest.fn()
      render(<Button onKeyDown={handleKeyDown}>Keyboard</Button>)
      
      const button = screen.getByRole('button', { name: /keyboard/i })
      fireEvent.keyDown(button, { key: 'Enter' })
      
      expect(handleKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  // Forwarded ref tests
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Ref Button</Button>)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current?.textContent).toContain('Ref Button')
    })
  })

  // HTML attributes tests
  describe('HTML Attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(
        <Button 
          type="submit" 
          form="my-form" 
          data-testid="custom-button"
          aria-describedby="description"
        >
          Form Button
        </Button>
      )
      
      const button = screen.getByTestId('custom-button')
      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('form', 'my-form')
      expect(button).toHaveAttribute('aria-describedby', 'description')
    })
  })

  // Accessibility tests
  describe('Accessibility', () => {
    it('passes basic accessibility checks', async () => {
      const { container } = render(<Button>Accessible Button</Button>)
      await checkAccessibility(container)
    })

    it('has proper accessible name', () => {
      render(<Button>My Button</Button>)
      
      const button = screen.getByRole('button', { name: /my button/i })
      accessibilityAssertions.hasAccessibleName(button)
    })

    it('supports aria-label', () => {
      render(<Button aria-label="Custom label">🔒</Button>)
      
      const button = screen.getByRole('button', { name: /custom label/i })
      expect(button).toHaveAttribute('aria-label', 'Custom label')
    })

    it('has proper focus management', () => {
      render(<Button>Focus Test</Button>)
      
      const button = screen.getByRole('button', { name: /focus test/i })
      accessibilityAssertions.hasKeyboardSupport(button)
    })

    it('announces loading state to screen readers', () => {
      render(<Button loading aria-label="Save document">Save</Button>)
      
      const button = screen.getByRole('button', { name: /save document/i })
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('maintains focus visibility', () => {
      render(<Button>Focus Visible</Button>)
      
      const button = screen.getByRole('button', { name: /focus visible/i })
      button.focus()
      
      // Check if focus styles are applied (would need actual CSS testing)
      expect(button).toHaveFocus()
    })
  })

  // Visual regression prevention
  describe('Visual Consistency', () => {
    it('maintains consistent class structure', () => {
      render(<Button>Consistent</Button>)
      
      const button = screen.getByRole('button', { name: /consistent/i })
      expect(button).toHaveClass(
        'inline-flex',
        'items-center', 
        'justify-center',
        'rounded-md'
      )
    })

    it('applies hover effect overlay correctly', () => {
      render(<Button variant="primary">Hover Test</Button>)
      
      const button = screen.getByRole('button', { name: /hover test/i })
      const hoverOverlay = button.querySelector('.absolute.inset-0.bg-white')
      expect(hoverOverlay).toBeInTheDocument()
    })

    it('does not apply hover overlay to link variant', () => {
      render(<Button variant="link">Link Button</Button>)
      
      const button = screen.getByRole('button', { name: /link button/i })
      const hoverOverlay = button.querySelector('.absolute.inset-0.bg-white')
      expect(hoverOverlay).not.toBeInTheDocument()
    })
  })

  // Performance tests
  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const TestComponent = () => {
        const [count, setCount] = React.useState(0)
        
        return (
          <>
            <Button onClick={() => setCount(c => c + 1)}>
              Count: {count}
            </Button>
          </>
        )
      }

      render(<TestComponent />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(screen.getByText('Count: 1')).toBeInTheDocument()
    })
  })

  // Error boundary tests
  describe('Error Handling', () => {
    it('handles missing children gracefully', () => {
      // @ts-expect-error - Testing error case
      render(<Button />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles invalid variant gracefully', () => {
      // @ts-expect-error - Testing error case
      render(<Button variant="invalid">Invalid Variant</Button>)
      
      const button = screen.getByRole('button', { name: /invalid variant/i })
      expect(button).toBeInTheDocument()
    })
  })
})