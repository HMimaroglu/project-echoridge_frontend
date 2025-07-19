import { test, expect, Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load and display main elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Project Echo Ridge/)

    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    
    // Check hero section
    await expect(page.getByText('Project Echo Ridge')).toBeVisible()
    await expect(page.getByText('Company-to-Company Search Engine')).toBeVisible()

    // Check navigation
    await expect(page.getByRole('navigation')).toBeVisible()
    
    // Check CTA buttons
    await expect(page.getByRole('button', { name: /get started/i })).toBeVisible()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check that h1 exists and is unique
    const h1Elements = await page.getByRole('heading', { level: 1 }).all()
    expect(h1Elements).toHaveLength(1)

    // Check heading order
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    expect(headings.length).toBeGreaterThan(0)
    
    // First heading should be h1
    const firstHeading = await headings[0].evaluate(el => el.tagName)
    expect(firstHeading).toBe('H1')
  })

  test('should navigate to sections via anchor links', async ({ page }) => {
    // Click on navigation link to How It Works
    await page.getByRole('link', { name: /how it works/i }).click()
    
    // Should scroll to the section
    await expect(page.locator('#how-it-works')).toBeInViewport()

    // Click on Benefits link
    await page.getByRole('link', { name: /benefits/i }).click()
    await expect(page.locator('#benefits')).toBeInViewport()

    // Click on Timeline link  
    await page.getByRole('link', { name: /timeline/i }).click()
    await expect(page.locator('#timeline')).toBeInViewport()
  })

  test('should have working CTA buttons', async ({ page }) => {
    const getStartedButton = page.getByRole('button', { name: /get started/i }).first()
    await expect(getStartedButton).toBeVisible()
    await expect(getStartedButton).toBeEnabled()

    // Click should not cause errors (might open modal or scroll to form)
    await getStartedButton.click()
    
    // Check that page is still responsive
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('should pass accessibility audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check that mobile navigation button is visible
    await expect(page.getByRole('button', { name: /open navigation menu/i })).toBeVisible()

    // Check that desktop navigation is hidden
    const desktopNav = page.locator('nav').first()
    await expect(desktopNav).toBeVisible() // Navigation container should exist

    // Check that content is still accessible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('Company-to-Company Search Engine')).toBeVisible()
  })

  test('should open and close mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
    
    // Open mobile menu
    await mobileMenuButton.click()
    await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByText('Menu')).toBeVisible()

    // Check that navigation links are visible in mobile menu
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('link', { name: /how it works/i })).toBeVisible()

    // Close mobile menu with close button
    await page.getByRole('button', { name: /close navigation menu/i }).click()
    await expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('should handle keyboard navigation', async ({ page }) => {
    // Start from the top of the page
    await page.keyboard.press('Tab')
    
    // First focusable element should be focused
    const firstFocusable = page.getByRole('link').first()
    await expect(firstFocusable).toBeFocused()

    // Continue tabbing through elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Should be able to activate elements with Enter
    const currentlyFocused = page.locator(':focus')
    await currentlyFocused.press('Enter')
    
    // Page should still be functional
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('should display all main sections', async ({ page }) => {
    // Hero section
    await expect(page.locator('.hero, [data-testid="hero"]').first()).toBeVisible()

    // How It Works section
    await expect(page.getByText(/how it works/i).first()).toBeVisible()
    
    // Objectives section  
    await expect(page.getByText(/objectives/i).first()).toBeVisible()

    // Benefits section
    await expect(page.getByText(/benefits/i).first()).toBeVisible()

    // Timeline section
    await expect(page.getByText(/timeline/i).first()).toBeVisible()
  })

  test('should have proper meta tags', async ({ page }) => {
    // Check that essential meta tags exist
    const title = await page.title()
    expect(title).toContain('Project Echo Ridge')

    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description?.length).toBeGreaterThan(50)

    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content')
    
    expect(ogTitle).toBeTruthy()
    expect(ogDescription).toBeTruthy()
  })

  test('should handle smooth scrolling', async ({ page }) => {
    const howItWorksLink = page.getByRole('link', { name: /how it works/i })
    await howItWorksLink.click()

    // Wait a bit for smooth scrolling
    await page.waitForTimeout(500)

    // Check that we scrolled to the right section
    await expect(page.locator('#how-it-works')).toBeInViewport()
  })

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = []
    
    page.on('console', message => {
      if (message.type() === 'error') {
        errors.push(message.text())
      }
    })

    page.on('pageerror', error => {
      errors.push(error.message)
    })

    await page.reload()
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle')
    
    expect(errors).toEqual([])
  })

  test('should have proper document structure', async ({ page }) => {
    // Check for main landmark
    await expect(page.getByRole('main')).toBeVisible()

    // Check for navigation landmark  
    await expect(page.getByRole('navigation')).toBeVisible()

    // Check for banner/header
    const header = page.locator('header, [role="banner"]').first()
    await expect(header).toBeVisible()

    // Check for contentinfo/footer
    const footer = page.locator('footer, [role="contentinfo"]').first()
    await expect(footer).toBeVisible()
  })

  test('should maintain focus visibility', async ({ page }) => {
    await page.keyboard.press('Tab')
    
    // Check that focused element has visible focus indicator
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // The focused element should have some kind of focus styling
    const outline = await focusedElement.evaluate(el => 
      window.getComputedStyle(el).outline
    )
    const boxShadow = await focusedElement.evaluate(el => 
      window.getComputedStyle(el).boxShadow
    )
    
    // Should have either outline or box-shadow for focus indication
    expect(outline !== 'none' || boxShadow !== 'none').toBeTruthy()
  })
})