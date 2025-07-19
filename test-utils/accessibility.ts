import { axe, toHaveNoViolations, AxeResults } from 'jest-axe'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// WCAG 2.1 AA compliance configuration
export const accessibilityConfig = {
  rules: {
    // WCAG 2.1 Level AA rules
    'color-contrast': { enabled: true },
    'color-contrast-enhanced': { enabled: false }, // AAA level
    'keyboard-navigation': { enabled: true },
    'focus-management': { enabled: true },
    'aria-labels': { enabled: true },
    'semantic-markup': { enabled: true },
    'heading-structure': { enabled: true },
    'link-purpose': { enabled: true },
    'form-labels': { enabled: true },
    'error-identification': { enabled: true },
    'error-suggestion': { enabled: true },
    'page-title': { enabled: true },
    'language-identification': { enabled: true },
    'focus-visible': { enabled: true },
    'target-size': { enabled: true },
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  exclude: [
    // Exclude third-party components that we can't control
    '.third-party-widget',
    '[data-testid="external-embed"]',
  ],
}

// Accessibility testing utility
export const checkAccessibility = async (
  container: HTMLElement | Element,
  options: any = {}
): Promise<AxeResults> => {
  const config = {
    ...accessibilityConfig,
    ...options,
  }

  const results = await axe(container, config)
  expect(results).toHaveNoViolations()
  
  return results
}

// Check specific accessibility rules
export const checkColorContrast = async (container: HTMLElement) => {
  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: true },
    },
    tags: ['wcag2aa'],
  })
  
  expect(results).toHaveNoViolations()
  return results
}

export const checkKeyboardNavigation = async (container: HTMLElement) => {
  const results = await axe(container, {
    rules: {
      'keyboard': { enabled: true },
      'focus-management': { enabled: true },
      'tabindex': { enabled: true },
    },
    tags: ['wcag2a', 'wcag2aa'],
  })
  
  expect(results).toHaveNoViolations()
  return results
}

export const checkAriaCompliance = async (container: HTMLElement) => {
  const results = await axe(container, {
    rules: {
      'aria-allowed-attr': { enabled: true },
      'aria-required-attr': { enabled: true },
      'aria-required-children': { enabled: true },
      'aria-required-parent': { enabled: true },
      'aria-roles': { enabled: true },
      'aria-valid-attr': { enabled: true },
      'aria-valid-attr-value': { enabled: true },
    },
    tags: ['wcag2a', 'wcag2aa'],
  })
  
  expect(results).toHaveNoViolations()
  return results
}

export const checkFormAccessibility = async (container: HTMLElement) => {
  const results = await axe(container, {
    rules: {
      'label': { enabled: true },
      'form-field-multiple-labels': { enabled: true },
      'fieldset': { enabled: true },
      'legend': { enabled: true },
    },
    tags: ['wcag2a', 'wcag2aa'],
  })
  
  expect(results).toHaveNoViolations()
  return results
}

export const checkHeadingStructure = async (container: HTMLElement) => {
  const results = await axe(container, {
    rules: {
      'heading-order': { enabled: true },
      'empty-heading': { enabled: true },
    },
    tags: ['best-practice'],
  })
  
  expect(results).toHaveNoViolations()
  return results
}

// Screen reader testing utilities
export const getAccessibleText = (element: HTMLElement): string => {
  // Get text that would be announced by screen readers
  return element.textContent?.trim() || 
         element.getAttribute('aria-label') || 
         element.getAttribute('title') || 
         ''
}

export const getAccessibleDescription = (element: HTMLElement): string => {
  const describedBy = element.getAttribute('aria-describedby')
  if (describedBy) {
    const descriptionElement = document.getElementById(describedBy)
    return descriptionElement?.textContent?.trim() || ''
  }
  return element.getAttribute('aria-description') || ''
}

// Focus management testing
export const testFocusManagement = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  return {
    focusableElements: Array.from(focusableElements),
    firstFocusable: focusableElements[0] as HTMLElement,
    lastFocusable: focusableElements[focusableElements.length - 1] as HTMLElement,
    hasFocusableElements: focusableElements.length > 0,
  }
}

// Keyboard navigation testing
export const simulateKeyboardNavigation = async (container: HTMLElement) => {
  const { focusableElements } = testFocusManagement(container)
  
  const results = []
  
  for (let i = 0; i < focusableElements.length; i++) {
    const element = focusableElements[i] as HTMLElement
    element.focus()
    
    results.push({
      element,
      isFocused: document.activeElement === element,
      hasVisibleFocus: window.getComputedStyle(element).outline !== 'none',
      accessibleName: getAccessibleText(element),
    })
    
    // Simulate Tab key
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      bubbles: true,
    })
    element.dispatchEvent(tabEvent)
  }
  
  return results
}

// ARIA live region testing
export const testLiveRegion = (element: HTMLElement) => {
  const liveRegion = element.getAttribute('aria-live')
  const atomic = element.getAttribute('aria-atomic')
  const relevant = element.getAttribute('aria-relevant')
  
  return {
    hasLiveRegion: !!liveRegion,
    politeness: liveRegion || 'off',
    isAtomic: atomic === 'true',
    relevance: relevant || 'additions text',
  }
}

// Color contrast testing (manual check)
export const testColorContrast = (element: HTMLElement) => {
  const styles = window.getComputedStyle(element)
  const color = styles.color
  const backgroundColor = styles.backgroundColor
  
  return {
    color,
    backgroundColor,
    // Note: Actual contrast calculation would require color parsing
    // This is a simplified version for testing purposes
    hasContrast: color !== backgroundColor,
  }
}

// Motion preferences testing
export const testMotionPreferences = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  
  return {
    prefersReducedMotion: prefersReducedMotion.matches,
    supportsMotionPreferences: prefersReducedMotion.media !== 'not all',
  }
}

// Export commonly used accessibility assertions
export const accessibilityAssertions = {
  hasAccessibleName: (element: HTMLElement) => {
    const accessibleName = getAccessibleText(element)
    expect(accessibleName).not.toBe('')
  },
  
  hasProperRole: (element: HTMLElement, expectedRole: string) => {
    const role = element.getAttribute('role') || element.tagName.toLowerCase()
    expect(role).toBe(expectedRole)
  },
  
  hasKeyboardSupport: (element: HTMLElement) => {
    const tabIndex = element.getAttribute('tabindex')
    expect(element.tagName.toLowerCase()).toMatch(/(button|input|select|textarea|a)/)
    if (tabIndex) {
      expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(0)
    }
  },
  
  hasAriaExpanded: (element: HTMLElement, expected: boolean) => {
    const ariaExpanded = element.getAttribute('aria-expanded')
    expect(ariaExpanded).toBe(expected.toString())
  },
}