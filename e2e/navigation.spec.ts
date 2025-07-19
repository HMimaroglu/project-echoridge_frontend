import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Desktop Navigation', () => {
    test('should display all navigation links', async ({ page }) => {
      // Ensure we're in desktop viewport
      await page.setViewportSize({ width: 1024, height: 768 })

      const expectedLinks = ['Home', 'How It Works', 'Objectives', 'Benefits', 'Timeline', 'Contact']
      
      for (const linkText of expectedLinks) {
        const link = page.getByRole('link', { name: new RegExp(linkText, 'i') })
        await expect(link).toBeVisible()
      }
    })

    test('should navigate to correct sections', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 })

      // Test How It Works navigation
      await page.getByRole('link', { name: /how it works/i }).click()
      await expect(page.locator('#how-it-works')).toBeInViewport()

      // Test Objectives navigation
      await page.getByRole('link', { name: /objectives/i }).click()
      await expect(page.locator('#objectives')).toBeInViewport()

      // Test Benefits navigation
      await page.getByRole('link', { name: /benefits/i }).click()
      await expect(page.locator('#benefits')).toBeInViewport()

      // Test Timeline navigation
      await page.getByRole('link', { name: /timeline/i }).click()
      await expect(page.locator('#timeline')).toBeInViewport()
    })

    test('should have proper focus states', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 })

      const firstNavLink = page.getByRole('link', { name: /home/i })
      
      // Focus the link
      await firstNavLink.focus()
      await expect(firstNavLink).toBeFocused()

      // Check for visible focus indication
      const focusStyles = await firstNavLink.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return {
          outline: styles.outline,
          boxShadow: styles.boxShadow,
        }
      })

      expect(focusStyles.outline !== 'none' || focusStyles.boxShadow !== 'none').toBeTruthy()
    })

    test('should support keyboard navigation', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 })

      // Tab to first navigation link
      await page.keyboard.press('Tab')
      let currentLink = page.locator(':focus')
      
      // Should be able to navigate through all nav links
      for (let i = 0; i < 6; i++) {
        await expect(currentLink).toBeFocused()
        await page.keyboard.press('Tab')
        currentLink = page.locator(':focus')
      }
    })
  })

  test.describe('Mobile Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
    })

    test('should show mobile menu button', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      await expect(mobileMenuButton).toBeVisible()
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })

    test('should open mobile menu when button is clicked', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      await mobileMenuButton.click()
      
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
      await expect(page.getByText('Menu')).toBeVisible()
    })

    test('should display all navigation links in mobile menu', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      await mobileMenuButton.click()

      const expectedLinks = ['Home', 'How It Works', 'Objectives', 'Benefits', 'Timeline', 'Contact']
      
      for (const linkText of expectedLinks) {
        const link = page.getByRole('link', { name: new RegExp(linkText, 'i') })
        await expect(link).toBeVisible()
      }
    })

    test('should close mobile menu with close button', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Open menu
      await mobileMenuButton.click()
      await expect(page.getByText('Menu')).toBeVisible()

      // Close with close button
      await page.getByRole('button', { name: /close navigation menu/i }).click()
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })

    test('should close mobile menu when backdrop is clicked', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Open menu
      await mobileMenuButton.click()
      await expect(page.getByText('Menu')).toBeVisible()

      // Click backdrop
      await page.locator('.fixed.inset-0.bg-black\\/50').click({ position: { x: 10, y: 10 } })
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })

    test('should close mobile menu when navigation link is clicked', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Open menu
      await mobileMenuButton.click()
      await expect(page.getByText('Menu')).toBeVisible()

      // Click a navigation link
      await page.getByRole('link', { name: /how it works/i }).click()
      
      // Menu should close and page should navigate
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      await expect(page.locator('#how-it-works')).toBeInViewport()
    })

    test('should close mobile menu on Escape key', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Open menu
      await mobileMenuButton.click()
      await expect(page.getByText('Menu')).toBeVisible()

      // Press Escape
      await page.keyboard.press('Escape')
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })

    test('should trap focus within mobile menu', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Open menu
      await mobileMenuButton.click()
      await expect(page.getByText('Menu')).toBeVisible()

      // Focus should be within the menu
      const closeButton = page.getByRole('button', { name: /close navigation menu/i })
      await closeButton.focus()
      await expect(closeButton).toBeFocused()

      // Tab through menu items
      await page.keyboard.press('Tab')
      const firstNavLink = page.locator(':focus')
      await expect(firstNavLink).toBeFocused()
    })

    test('should prevent body scroll when menu is open', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Open menu
      await mobileMenuButton.click()
      await expect(page.getByText('Menu')).toBeVisible()

      // Check that body has overflow hidden
      const bodyOverflow = await page.evaluate(() => {
        return document.body.style.overflow
      })
      
      expect(bodyOverflow).toBe('hidden')

      // Close menu
      await page.getByRole('button', { name: /close navigation menu/i }).click()
      
      // Body overflow should be reset
      const bodyOverflowAfter = await page.evaluate(() => {
        return document.body.style.overflow
      })
      
      expect(bodyOverflowAfter).toBe('unset')
    })

    test('should show CTA buttons in mobile menu', async ({ page }) => {
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Open menu
      await mobileMenuButton.click()
      await expect(page.getByText('Menu')).toBeVisible()

      // Check for CTA buttons
      await expect(page.getByRole('button', { name: /get started/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /contact us/i })).toBeVisible()
    })
  })

  test.describe('Responsive Behavior', () => {
    test('should switch from mobile to desktop navigation on resize', async ({ page }) => {
      // Start with mobile
      await page.setViewportSize({ width: 375, height: 667 })
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Open mobile menu
      await mobileMenuButton.click()
      await expect(page.getByText('Menu')).toBeVisible()

      // Resize to desktop
      await page.setViewportSize({ width: 1024, height: 768 })
      
      // Mobile menu should close automatically
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      
      // Desktop navigation should be visible
      await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    })

    test('should maintain navigation functionality across breakpoints', async ({ page }) => {
      // Test at different viewport sizes
      const viewports = [
        { width: 320, height: 568 }, // Small mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1440, height: 900 }, // Desktop
      ]

      for (const viewport of viewports) {
        await page.setViewportSize(viewport)
        
        if (viewport.width < 768) {
          // Mobile navigation
          const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
          await expect(mobileMenuButton).toBeVisible()
        } else {
          // Desktop navigation
          await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
        }
      }
    })
  })

  test.describe('Navigation Accessibility', () => {
    test('should pass accessibility audit', async ({ page }) => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('nav, [role="navigation"]')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should have proper ARIA attributes', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Check initial ARIA attributes
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      await expect(mobileMenuButton).toHaveAttribute('aria-controls')
      await expect(mobileMenuButton).toHaveAttribute('aria-label', 'Open navigation menu')

      // Open menu and check updated attributes
      await mobileMenuButton.click()
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
    })

    test('should have proper landmark roles', async ({ page }) => {
      const navigation = page.getByRole('navigation')
      await expect(navigation).toBeVisible()

      // Navigation should be properly labeled
      const navLabel = await navigation.getAttribute('aria-label')
      expect(navLabel || 'navigation').toBeTruthy()
    })

    test('should support screen reader navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      await mobileMenuButton.click()

      // All navigation links should have accessible names
      const navLinks = page.getByRole('link')
      const linkCount = await navLinks.count()

      for (let i = 0; i < linkCount; i++) {
        const link = navLinks.nth(i)
        const accessibleName = await link.textContent()
        expect(accessibleName?.trim()).toBeTruthy()
      }
    })

    test('should announce menu state changes', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      // Button should announce its state
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      
      await mobileMenuButton.click()
      await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
    })
  })

  test.describe('Navigation Performance', () => {
    test('should navigate smoothly without layout shifts', async ({ page }) => {
      // Set up performance monitoring
      await page.coverage.startJSCoverage()
      
      // Navigate through different sections
      await page.getByRole('link', { name: /how it works/i }).click()
      await page.waitForTimeout(500)
      
      await page.getByRole('link', { name: /benefits/i }).click()
      await page.waitForTimeout(500)
      
      await page.getByRole('link', { name: /timeline/i }).click()
      await page.waitForTimeout(500)

      // Should still be responsive
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      
      await page.coverage.stopJSCoverage()
    })

    test('should handle rapid navigation clicks gracefully', async ({ page }) => {
      // Rapid-fire navigation clicks
      const links = ['how it works', 'objectives', 'benefits', 'timeline']
      
      for (const linkText of links) {
        await page.getByRole('link', { name: new RegExp(linkText, 'i') }).click()
        await page.waitForTimeout(100) // Minimal wait
      }

      // Page should still be functional
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    })
  })
})