import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('WCAG 2.1 AA Compliance', () => {
    test('should pass full page accessibility audit', async ({ page }) => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass accessibility audit with mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass accessibility audit with high contrast mode', async ({ page }) => {
      // Simulate high contrast mode
      await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    })
  })

  test.describe('Keyboard Navigation', () => {
    test('should support full keyboard navigation', async ({ page }) => {
      // Start from the beginning
      await page.keyboard.press('Tab')

      // Count focusable elements
      let focusedElements = 0
      const maxTabs = 50 // Reasonable limit to prevent infinite loops

      for (let i = 0; i < maxTabs; i++) {
        const focusedElement = page.locator(':focus')
        
        if (await focusedElement.count() > 0) {
          focusedElements++
          
          // Get the tag name of the focused element
          const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase())
          const role = await focusedElement.getAttribute('role')
          
          // Should be a focusable element
          const focusableTags = ['button', 'a', 'input', 'select', 'textarea']
          const isFocusable = focusableTags.includes(tagName) || 
                            role === 'button' || 
                            role === 'link' ||
                            await focusedElement.getAttribute('tabindex') === '0'
          
          expect(isFocusable).toBeTruthy()
          
          await page.keyboard.press('Tab')
        } else {
          break
        }
      }

      expect(focusedElements).toBeGreaterThan(0)
    })

    test('should support reverse tab navigation', async ({ page }) => {
      // Navigate forward first
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab')
      }

      const forwardElement = page.locator(':focus')
      const forwardElementText = await forwardElement.textContent()

      // Navigate backward
      await page.keyboard.press('Shift+Tab')
      const backwardElement = page.locator(':focus')
      
      // Should focus a different element
      const backwardElementText = await backwardElement.textContent()
      expect(backwardElementText).not.toBe(forwardElementText)
    })

    test('should activate links with Enter key', async ({ page }) => {
      // Find a navigation link
      const navLink = page.getByRole('link', { name: /how it works/i }).first()
      await navLink.focus()
      
      // Activate with Enter
      await page.keyboard.press('Enter')
      
      // Should navigate to the section
      await expect(page.locator('#how-it-works')).toBeInViewport()
    })

    test('should activate buttons with Enter and Space', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      await mobileMenuButton.focus()
      
      // Activate with Enter
      await page.keyboard.press('Enter')
      await expect(page.getByText('Menu')).toBeVisible()
      
      // Close menu
      const closeButton = page.getByRole('button', { name: /close navigation menu/i })
      await closeButton.focus()
      
      // Activate with Space
      await page.keyboard.press(' ')
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })

    test('should close mobile menu with Escape key', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      await mobileMenuButton.click()
      await expect(page.getByText('Menu')).toBeVisible()
      
      // Close with Escape
      await page.keyboard.press('Escape')
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })

    test('should trap focus in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      await mobileMenuButton.click()
      
      // Focus should start in the menu
      const closeButton = page.getByRole('button', { name: /close navigation menu/i })
      await expect(closeButton).toBeVisible()
      
      // Navigate through menu items
      await page.keyboard.press('Tab')
      const focusedElement = page.locator(':focus')
      
      // Should be within the menu container
      const isInMenu = await focusedElement.evaluate(el => {
        const menu = el.closest('[role="dialog"], .fixed')
        return !!menu
      })
      
      expect(isInMenu).toBeTruthy()
    })
  })

  test.describe('Focus Management', () => {
    test('should have visible focus indicators', async ({ page }) => {
      await page.keyboard.press('Tab')
      
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
      
      // Check for focus indication
      const focusStyles = await focusedElement.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          outlineStyle: styles.outlineStyle,
          boxShadow: styles.boxShadow,
          borderColor: styles.borderColor,
        }
      })
      
      // Should have some kind of focus indication
      const hasFocusIndication = 
        (focusStyles.outline && focusStyles.outline !== 'none') ||
        (focusStyles.boxShadow && focusStyles.boxShadow !== 'none') ||
        focusStyles.outlineWidth !== '0px' ||
        focusStyles.outlineStyle !== 'none'
      
      expect(hasFocusIndication).toBeTruthy()
    })

    test('should maintain logical tab order', async ({ page }) => {
      const tabOrder: string[] = []
      
      // Navigate through first several elements
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab')
        
        const focusedElement = page.locator(':focus')
        if (await focusedElement.count() > 0) {
          const elementInfo = await focusedElement.evaluate(el => {
            return {
              tagName: el.tagName.toLowerCase(),
              text: el.textContent?.trim() || '',
              id: el.id || '',
              className: el.className || '',
            }
          })
          
          tabOrder.push(`${elementInfo.tagName}:${elementInfo.text}`)
        }
      }
      
      // Tab order should be logical (not empty and should have interactive elements)
      expect(tabOrder.length).toBeGreaterThan(0)
      
      // Should include navigation elements early in tab order
      const hasEarlyNavigation = tabOrder.slice(0, 5).some(item => 
        item.includes('home') || item.includes('navigation') || item.includes('menu')
      )
      expect(hasEarlyNavigation).toBeTruthy()
    })

    test('should skip to main content', async ({ page }) => {
      // Look for skip link (might be hidden until focused)
      const skipLink = page.locator('a[href="#main"], a[href="#main-content"], .skip-link').first()
      
      if (await skipLink.count() > 0) {
        await skipLink.focus()
        await expect(skipLink).toBeFocused()
        
        await page.keyboard.press('Enter')
        
        // Should focus or scroll to main content
        const mainContent = page.locator('#main, #main-content, main').first()
        await expect(mainContent).toBeInViewport()
      }
    })
  })

  test.describe('Screen Reader Support', () => {
    test('should have proper heading structure', async ({ page }) => {
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
      
      expect(headings.length).toBeGreaterThan(0)
      
      // Should have exactly one h1
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)
      
      // Check heading levels don't skip
      const headingLevels = await Promise.all(
        headings.map(heading => 
          heading.evaluate(el => parseInt(el.tagName[1]))
        )
      )
      
      for (let i = 1; i < headingLevels.length; i++) {
        const currentLevel = headingLevels[i]
        const maxPrevLevel = Math.max(...headingLevels.slice(0, i))
        
        // Should not skip more than one level
        expect(currentLevel - maxPrevLevel).toBeLessThanOrEqual(1)
      }
    })

    test('should have proper landmark roles', async ({ page }) => {
      // Check for main landmark
      const main = page.locator('main, [role="main"]')
      await expect(main).toBeVisible()
      
      // Check for navigation landmark
      const navigation = page.locator('nav, [role="navigation"]')
      await expect(navigation).toBeVisible()
      
      // Check for banner (header)
      const banner = page.locator('header, [role="banner"]')
      await expect(banner).toBeVisible()
      
      // Check for contentinfo (footer)
      const contentinfo = page.locator('footer, [role="contentinfo"]')
      await expect(contentinfo).toBeVisible()
    })

    test('should have accessible button names', async ({ page }) => {
      const buttons = page.getByRole('button')
      const buttonCount = await buttons.count()
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i)
        
        // Get accessible name
        const accessibleName = await button.evaluate(el => {
          return el.textContent?.trim() || 
                 el.getAttribute('aria-label') || 
                 el.getAttribute('title') ||
                 ''
        })
        
        expect(accessibleName).toBeTruthy()
        expect(accessibleName.length).toBeGreaterThan(0)
      }
    })

    test('should have accessible link names', async ({ page }) => {
      const links = page.getByRole('link')
      const linkCount = await links.count()
      
      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i)
        
        // Get accessible name
        const accessibleName = await link.evaluate(el => {
          return el.textContent?.trim() || 
                 el.getAttribute('aria-label') || 
                 el.getAttribute('title') ||
                 ''
        })
        
        expect(accessibleName).toBeTruthy()
        expect(accessibleName.length).toBeGreaterThan(0)
      }
    })

    test('should provide status announcements for dynamic content', async ({ page }) => {
      // Look for live regions
      const liveRegions = page.locator('[aria-live], [role="status"], [role="alert"]')
      
      if (await liveRegions.count() > 0) {
        // Live regions should have proper attributes
        const firstRegion = liveRegions.first()
        const ariaLive = await firstRegion.getAttribute('aria-live')
        const role = await firstRegion.getAttribute('role')
        
        const isValidLiveRegion = 
          ariaLive === 'polite' || 
          ariaLive === 'assertive' ||
          role === 'status' ||
          role === 'alert'
        
        expect(isValidLiveRegion).toBeTruthy()
      }
    })
  })

  test.describe('Motion and Animation', () => {
    test('should respect reduced motion preferences', async ({ page }) => {
      // Simulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' })
      
      // Navigate to trigger any animations
      await page.getByRole('link', { name: /how it works/i }).click()
      
      // Check that animations are reduced/disabled
      const animatedElements = page.locator('[class*="animate"], [style*="animation"], [style*="transition"]')
      const count = await animatedElements.count()
      
      if (count > 0) {
        // Check if animations are actually reduced
        const firstAnimated = animatedElements.first()
        const animationDuration = await firstAnimated.evaluate(el => {
          const styles = window.getComputedStyle(el)
          return styles.animationDuration || styles.transitionDuration
        })
        
        // Should have reduced animation duration or be disabled
        expect(['0s', '0.01s', '']).toContain(animationDuration)
      }
    })

    test('should not cause seizures with flashing content', async ({ page }) => {
      // Look for any potentially flashing elements
      const flashingElements = page.locator('[class*="blink"], [class*="flash"], [style*="animation"]')
      const count = await flashingElements.count()
      
      // If there are animated elements, they should not flash rapidly
      for (let i = 0; i < count; i++) {
        const element = flashingElements.nth(i)
        const animationName = await element.evaluate(el => {
          const styles = window.getComputedStyle(el)
          return styles.animationName
        })
        
        // Should not have rapid flashing animations
        expect(animationName).not.toMatch(/(blink|flash|strobe)/i)
      }
    })
  })

  test.describe('Color and Contrast', () => {
    test('should not rely solely on color for information', async ({ page }) => {
      // This is more of a visual test, but we can check for proper use of text, icons, etc.
      
      // Look for elements that might rely on color alone
      const coloredElements = page.locator('[style*="color"], .text-red, .text-green, .text-blue')
      const count = await coloredElements.count()
      
      // If there are colored elements, they should have additional indicators
      for (let i = 0; i < Math.min(count, 5); i++) { // Limit to first 5 for performance
        const element = coloredElements.nth(i)
        
        // Should have text content or other indicators
        const hasText = await element.textContent()
        const hasIcon = await element.locator('svg, img, [class*="icon"]').count()
        const hasAriaLabel = await element.getAttribute('aria-label')
        
        const hasNonColorIndicator = 
          (hasText && hasText.trim().length > 0) || 
          hasIcon > 0 || 
          hasAriaLabel
        
        expect(hasNonColorIndicator).toBeTruthy()
      }
    })

    test('should maintain readability in high contrast mode', async ({ page }) => {
      // Enable high contrast mode
      await page.emulateMedia({ colorScheme: 'dark' })
      
      // Check that content is still visible
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByRole('navigation')).toBeVisible()
      
      // Check that interactive elements are still visible
      const buttons = page.getByRole('button')
      const buttonCount = await buttons.count()
      
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        await expect(buttons.nth(i)).toBeVisible()
      }
    })
  })

  test.describe('Form Accessibility', () => {
    test('should have accessible form elements if present', async ({ page }) => {
      const forms = page.locator('form')
      const formCount = await forms.count()
      
      if (formCount > 0) {
        const form = forms.first()
        
        // Check for labels
        const inputs = form.locator('input, select, textarea')
        const inputCount = await inputs.count()
        
        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i)
          
          // Should have label or aria-label
          const id = await input.getAttribute('id')
          const ariaLabel = await input.getAttribute('aria-label')
          const ariaLabelledby = await input.getAttribute('aria-labelledby')
          
          let hasLabel = false
          
          if (id) {
            const label = page.locator(`label[for="${id}"]`)
            hasLabel = await label.count() > 0
          }
          
          const isLabelled = hasLabel || ariaLabel || ariaLabelledby
          expect(isLabelled).toBeTruthy()
        }
      }
    })

    test('should have accessible error messages if present', async ({ page }) => {
      // Look for error states
      const errorElements = page.locator('[aria-invalid="true"], .error, [role="alert"]')
      const errorCount = await errorElements.count()
      
      if (errorCount > 0) {
        const firstError = errorElements.first()
        
        // Should be associated with form field
        const ariaDescribedby = await firstError.getAttribute('aria-describedby')
        const role = await firstError.getAttribute('role')
        
        const isProperError = ariaDescribedby || role === 'alert'
        expect(isProperError).toBeTruthy()
      }
    })
  })

  test.describe('Mobile Accessibility', () => {
    test('should be accessible on touch devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Check touch targets are large enough (minimum 44x44px)
      const interactiveElements = page.locator('button, a, input, select')
      const count = await interactiveElements.count()
      
      for (let i = 0; i < Math.min(count, 10); i++) {
        const element = interactiveElements.nth(i)
        const box = await element.boundingBox()
        
        if (box) {
          expect(box.width).toBeGreaterThanOrEqual(44)
          expect(box.height).toBeGreaterThanOrEqual(44)
        }
      }
    })

    test('should support zoom up to 200%', async ({ page }) => {
      // Zoom to 200%
      await page.setViewportSize({ width: 1200, height: 800 })
      await page.evaluate(() => {
        document.body.style.zoom = '2'
      })
      
      // Content should still be accessible
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByRole('navigation')).toBeVisible()
      
      // Interactive elements should still be usable
      const firstButton = page.getByRole('button').first()
      if (await firstButton.count() > 0) {
        await expect(firstButton).toBeVisible()
      }
    })
  })
})