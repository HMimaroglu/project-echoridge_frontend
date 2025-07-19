import React from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import userEvent from '@testing-library/user-event'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Test wrapper component that provides all necessary providers
interface TestWrapperProps {
  children: React.ReactNode
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  return (
    <div data-testid="test-wrapper">
      {children}
    </div>
  )
}

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<any>
}

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions
): RenderResult => {
  return render(ui, {
    wrapper: options?.wrapper || TestWrapper,
    ...options,
  })
}

// Enhanced render with accessibility testing
interface AccessibilityRenderResult extends RenderResult {
  checkAccessibility: () => Promise<void>
}

const renderWithAccessibility = async (
  ui: React.ReactElement,
  options?: CustomRenderOptions
): Promise<AccessibilityRenderResult> => {
  const result = customRender(ui, options)

  const checkAccessibility = async () => {
    const results = await axe(result.container)
    expect(results).toHaveNoViolations()
  }

  return {
    ...result,
    checkAccessibility,
  }
}

// User event setup with default configuration
const createUserEvent = () => {
  return userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
    delay: null, // Speed up tests by removing default delays
  })
}

// Common test data factories
export const createMockCompany = (overrides = {}) => ({
  id: '1',
  name: 'Test Company',
  symbol: 'TEST',
  sector: 'Technology',
  marketCap: 1000000000,
  description: 'A test company for unit testing',
  ...overrides,
})

export const createMockApiResponse = <T>(data: T, overrides = {}) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  timestamp: new Date().toISOString(),
  ...overrides,
})

// Mock API client
export const createMockApiClient = () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
})

// Viewport utilities for responsive testing
export const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1024, height: 768 },
  wide: { width: 1440, height: 900 },
}

export const setViewport = (viewport: keyof typeof viewports) => {
  const size = viewports[viewport]
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: size.width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: size.height,
  })
  window.dispatchEvent(new Event('resize'))
}

// Animation testing utilities
export const disableAnimations = () => {
  const style = document.createElement('style')
  style.innerHTML = `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  `
  document.head.appendChild(style)
}

export const enableAnimations = () => {
  const styles = document.head.querySelectorAll('style')
  styles.forEach((style) => {
    if (style.innerHTML.includes('animation-duration: 0s')) {
      document.head.removeChild(style)
    }
  })
}

// Wait utilities
export const waitForElementToBeRemoved = async (element: HTMLElement) => {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const removedNodes = Array.from(mutation.removedNodes)
          if (removedNodes.includes(element)) {
            observer.disconnect()
            resolve(undefined)
          }
        }
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })
  })
}

// Custom queries
export const getByAriaLabel = (container: HTMLElement, label: string) => {
  const element = container.querySelector(`[aria-label="${label}"]`)
  if (!element) {
    throw new Error(`Unable to find element with aria-label: ${label}`)
  }
  return element
}

export const getByDataTestId = (container: HTMLElement, testId: string) => {
  const element = container.querySelector(`[data-testid="${testId}"]`)
  if (!element) {
    throw new Error(`Unable to find element with data-testid: ${testId}`)
  }
  return element
}

// Re-export everything from testing-library
export * from '@testing-library/react'

// Override the render method
export {
  customRender as render,
  renderWithAccessibility,
  createUserEvent,
  TestWrapper,
}