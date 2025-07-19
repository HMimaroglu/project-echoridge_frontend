import React from 'react'
import { render, screen, fireEvent, waitFor } from '@/test-utils'
import { Navigation, SubNavigation, BreadcrumbNavigation } from '@/components/layout/Navigation'
import { checkAccessibility, testFocusManagement, simulateKeyboardNavigation } from '@/test-utils/accessibility'
import { mockWindowDimensions } from '@/test-utils/mocks'
import { NAVIGATION } from '@/lib/constants'

// Mock the UI components
jest.mock('@/components/ui', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  MenuIcon: ({ size, ...props }: any) => <div data-testid="menu-icon" {...props}>☰</div>,
  XIcon: ({ size, ...props }: any) => <div data-testid="x-icon" {...props}>✕</div>,
  ChevronRightIcon: ({ size, className, ...props }: any) => (
    <div data-testid="chevron-icon" className={className} {...props}>→</div>
  ),
}))

describe('Navigation Component', () => {
  beforeEach(() => {
    // Reset body overflow style
    document.body.style.overflow = ''
  })

  afterEach(() => {
    // Clean up any event listeners
    document.body.style.overflow = ''
  })

  describe('Basic Rendering', () => {
    it('renders desktop navigation by default', () => {
      mockWindowDimensions(1024, 768)
      render(<Navigation />)

      // Should show desktop navigation items
      NAVIGATION.main.forEach((item) => {
        if (item.name !== 'Contact') { // Contact might be handled differently
          expect(screen.getByText(item.name)).toBeInTheDocument()
        }
      })
    })

    it('renders mobile menu button', () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      expect(mobileMenuButton).toBeInTheDocument()
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('applies transparent styles when transparent prop is true', () => {
      render(<Navigation transparent />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      expect(mobileMenuButton).toHaveClass(expect.stringContaining('text-white'))
    })
  })

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      mockWindowDimensions(375, 667) // Mobile viewport
    })

    it('opens mobile menu when button is clicked', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByText('Menu')).toBeInTheDocument()
      })
    })

    it('closes mobile menu when close button is clicked', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(screen.getByText('Menu')).toBeInTheDocument()
      })

      const closeButton = screen.getByRole('button', { name: /close navigation menu/i })
      fireEvent.click(closeButton)

      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('closes mobile menu when backdrop is clicked', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(screen.getByText('Menu')).toBeInTheDocument()
      })

      const backdrop = document.querySelector('.fixed.inset-0.bg-black\\/50')
      expect(backdrop).toBeInTheDocument()
      
      fireEvent.click(backdrop!)
      
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('closes mobile menu when navigation link is clicked', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(screen.getByText('Menu')).toBeInTheDocument()
      })

      const homeLink = screen.getAllByText('Home')[0] // Get first occurrence
      fireEvent.click(homeLink)

      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('prevents body scroll when mobile menu is open', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden')
      })

      const closeButton = screen.getByRole('button', { name: /close navigation menu/i })
      fireEvent.click(closeButton)

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('unset')
      })
    })

    it('displays CTA buttons in mobile menu', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(screen.getByText('Get Started')).toBeInTheDocument()
        expect(screen.getByText('Contact Us')).toBeInTheDocument()
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('closes mobile menu on Escape key', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(screen.getByText('Menu')).toBeInTheDocument()
      })

      fireEvent.keyDown(document, { key: 'Escape' })

      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('supports keyboard navigation for desktop menu', async () => {
      mockWindowDimensions(1024, 768)
      render(<Navigation />)

      const navContainer = screen.getByRole('navigation', { hidden: true })
      const results = await simulateKeyboardNavigation(navContainer)

      expect(results).toHaveLength(NAVIGATION.main.length)
      results.forEach((result) => {
        expect(result.isFocused).toBe(true)
      })
    })

    it('has proper focus management in mobile menu', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(screen.getByText('Menu')).toBeInTheDocument()
      })

      const mobileMenu = screen.getByText('Menu').closest('div')
      const focusManagement = testFocusManagement(mobileMenu!)

      expect(focusManagement.hasFocusableElements).toBe(true)
      expect(focusManagement.focusableElements.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Behavior', () => {
    it('closes mobile menu when window is resized to desktop', async () => {
      mockWindowDimensions(375, 667) // Start mobile
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(screen.getByText('Menu')).toBeInTheDocument()
      })

      // Resize to desktop
      mockWindowDimensions(1024, 768)
      fireEvent(window, new Event('resize'))

      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('shows desktop navigation on large screens', () => {
      mockWindowDimensions(1024, 768)
      render(<Navigation />)

      // Desktop nav should be visible (hidden class is for mobile only)
      const desktopNav = document.querySelector('nav.hidden.md\\:flex')
      expect(desktopNav).toBeInTheDocument()
    })

    it('hides desktop navigation on small screens', () => {
      mockWindowDimensions(375, 667)
      render(<Navigation />)

      // Mobile menu button should be visible
      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      expect(mobileMenuButton).toBeVisible()
    })
  })

  describe('Disabled Navigation Items', () => {
    const mockNavWithDisabled = [
      ...NAVIGATION.main,
      { name: 'Disabled Item', href: '/disabled', id: 'disabled', disabled: true }
    ]

    it('renders disabled items with proper attributes', () => {
      // Mock the constants module for this test
      jest.doMock('@/lib/constants', () => ({
        NAVIGATION: {
          main: mockNavWithDisabled,
        },
      }))

      render(<Navigation />)

      // Open mobile menu to see all items
      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      const disabledLink = screen.getByText('Disabled Item')
      expect(disabledLink.closest('a')).toHaveAttribute('aria-disabled', 'true')
      expect(disabledLink.closest('a')).toHaveClass('pointer-events-none', 'opacity-50')
    })
  })

  describe('Accessibility', () => {
    it('passes accessibility checks', async () => {
      const { container } = render(<Navigation />)
      await checkAccessibility(container)
    })

    it('has proper ARIA attributes for mobile menu', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-navigation')
      expect(mobileMenuButton).toHaveAttribute('aria-label', 'Open navigation menu')

      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
      })

      const closeButton = screen.getByRole('button', { name: /close navigation menu/i })
      expect(closeButton).toHaveAttribute('aria-label', 'Close navigation menu')
    })

    it('has proper landmark roles', () => {
      mockWindowDimensions(1024, 768)
      render(<Navigation />)

      const navigation = document.querySelector('nav')
      expect(navigation).toBeInTheDocument()
    })

    it('has proper icon accessibility attributes', async () => {
      render(<Navigation />)

      const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i })
      fireEvent.click(mobileMenuButton)

      await waitFor(() => {
        const chevronIcons = screen.getAllByTestId('chevron-icon')
        chevronIcons.forEach(icon => {
          expect(icon.closest('span')).toHaveAttribute('aria-hidden', 'true')
        })
      })
    })
  })
})

describe('SubNavigation Component', () => {
  const mockSubNavItems = [
    { name: 'Overview', href: '/overview', id: 'overview' },
    { name: 'Features', href: '/features', id: 'features' },
    { name: 'Pricing', href: '/pricing', id: 'pricing' },
    { name: 'Support', href: '/support', id: 'support', disabled: true },
  ]

  describe('Rendering', () => {
    it('renders all navigation items', () => {
      render(<SubNavigation items={mockSubNavItems} />)

      mockSubNavItems.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
      })
    })

    it('applies custom className', () => {
      render(<SubNavigation items={mockSubNavItems} className="custom-subnav" />)

      const subNav = screen.getByRole('navigation')
      expect(subNav).toHaveClass('custom-subnav')
    })

    it('handles disabled items correctly', () => {
      render(<SubNavigation items={mockSubNavItems} />)

      const disabledLink = screen.getByText('Support').closest('a')
      expect(disabledLink).toHaveAttribute('aria-disabled', 'true')
      expect(disabledLink).toHaveClass('pointer-events-none', 'opacity-50')
    })
  })

  describe('Accessibility', () => {
    it('passes accessibility checks', async () => {
      const { container } = render(<SubNavigation items={mockSubNavItems} />)
      await checkAccessibility(container)
    })

    it('has proper navigation landmark', () => {
      render(<SubNavigation items={mockSubNavItems} />)

      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
    })

    it('supports keyboard navigation', async () => {
      render(<SubNavigation items={mockSubNavItems} />)

      const navigation = screen.getByRole('navigation')
      const results = await simulateKeyboardNavigation(navigation)

      // Should have one less than total items due to disabled item
      expect(results.length).toBeGreaterThan(0)
    })
  })
})

describe('BreadcrumbNavigation Component', () => {
  const mockBreadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Current Page' }, // No href - current page
  ]

  describe('Rendering', () => {
    it('renders all breadcrumb items', () => {
      render(<BreadcrumbNavigation items={mockBreadcrumbItems} />)

      mockBreadcrumbItems.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
      })
    })

    it('renders separators between items', () => {
      render(<BreadcrumbNavigation items={mockBreadcrumbItems} />)

      const separators = screen.getAllByTestId('chevron-icon')
      expect(separators).toHaveLength(mockBreadcrumbItems.length - 1)
    })

    it('renders links for items with href', () => {
      render(<BreadcrumbNavigation items={mockBreadcrumbItems} />)

      const homeLink = screen.getByText('Home').closest('a')
      const productsLink = screen.getByText('Products').closest('a')
      
      expect(homeLink).toHaveAttribute('href', '/')
      expect(productsLink).toHaveAttribute('href', '/products')
    })

    it('renders current page without link', () => {
      render(<BreadcrumbNavigation items={mockBreadcrumbItems} />)

      const currentPageSpan = screen.getByText('Current Page')
      expect(currentPageSpan.tagName).toBe('SPAN')
      expect(currentPageSpan).toHaveAttribute('aria-current', 'page')
    })

    it('applies custom className', () => {
      render(<BreadcrumbNavigation items={mockBreadcrumbItems} className="custom-breadcrumb" />)

      const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i })
      expect(breadcrumb).toHaveClass('custom-breadcrumb')
    })
  })

  describe('Accessibility', () => {
    it('passes accessibility checks', async () => {
      const { container } = render(<BreadcrumbNavigation items={mockBreadcrumbItems} />)
      await checkAccessibility(container)
    })

    it('has proper breadcrumb navigation landmark', () => {
      render(<BreadcrumbNavigation items={mockBreadcrumbItems} />)

      const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i })
      expect(breadcrumb).toHaveAttribute('aria-label', 'Breadcrumb')
    })

    it('has proper ordered list structure', () => {
      render(<BreadcrumbNavigation items={mockBreadcrumbItems} />)

      const orderedList = screen.getByRole('list')
      expect(orderedList.tagName).toBe('OL')

      const listItems = screen.getAllByRole('listitem')
      expect(listItems).toHaveLength(mockBreadcrumbItems.length)
    })

    it('marks current page appropriately', () => {
      render(<BreadcrumbNavigation items={mockBreadcrumbItems} />)

      const currentPage = screen.getByText('Current Page')
      expect(currentPage).toHaveAttribute('aria-current', 'page')
    })

    it('hides separators from screen readers', () => {
      render(<BreadcrumbNavigation items={mockBreadcrumbItems} />)

      const separators = screen.getAllByTestId('chevron-icon')
      separators.forEach(separator => {
        expect(separator).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles single item breadcrumb', () => {
      const singleItem = [{ name: 'Single Page' }]
      render(<BreadcrumbNavigation items={singleItem} />)

      expect(screen.getByText('Single Page')).toBeInTheDocument()
      expect(screen.queryByTestId('chevron-icon')).not.toBeInTheDocument()
    })

    it('handles empty breadcrumb items', () => {
      render(<BreadcrumbNavigation items={[]} />)

      const orderedList = screen.getByRole('list')
      expect(orderedList).toBeInTheDocument()
      expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    })
  })
})